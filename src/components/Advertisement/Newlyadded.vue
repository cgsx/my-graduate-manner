<template>
  <div>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">广告管理</span>
      </Col>
      <Col span="4" class="text-right" offset="15">
      <span class="backList fontWeight cursor" @click="backList">返回</span>
      </Col>
    </Row>
    <Row class="Advertinglist" style="background: #fff">
      <Col span="16" offset="2" style="padding-bottom: 30px; ">
      <div class="content_one">
        <label for="" class="fontWeight"><span class="star"><Icon type="asterisk"></Icon></span>广告名称</label>
        <p class="content_input_item"><input type="text" placeholder="请输入广告名称" v-model="advert.name"
                                             v-on:blur="check('name')">

          <Tooltip placement="right"  content="广告名称不能为空" :always="tool.name" class="tool">

            </Tooltip>
          </p>
        </div>
        <div class="content_one">
          <label for="" class="fontWeight">&nbsp;&nbsp;&nbsp;广告描述</label>
          <p class="content_input_item"><input type="text"placeholder="请输入广告描述" v-model="advert.describe"></p>
        </div>
        <div class="content_one">
          <label for="" class="fontWeight"><span class="star"><Icon type="asterisk"></Icon></span>广告素材</label>
          <div class="content_input_item">
            <img :src="imgUrl" v-show="upLoadId!=''">
            <img src="../../assets/image/yzmpic.jpg" alt="" v-show="upLoadId==''">
          </div>
          <div v-for="item in uploadList" class="content_input_item">
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :data="{type:'06',advertisementId:advert.uuid}"
            action="/cnct_im/common/uploadAdvertisementIcon"
          >
            <div>
              <Button class="mr10 cursor newaddUploadBtn" type="primary" style="margin-top: 10px;width:95px">上传</Button>
            </div>
          </Upload>
          </Tooltip>
        </p>
      </div>
      <div class="content_one">
        <label for="" class="fontWeight"><span class="star"><Icon type="asterisk"></Icon></span>广告所属栏目</label>
        <p class="content_input_item">
          <input type="text" placeholder="请输入广告所属栏目" v-model="advert.column" v-on:blur="check('column')">
          <Tooltip placement="right" content="广告所属栏目不能为空" :always="tool.column" class="tool">

          </Tooltip>
        </p>

      </div>
      <div class="content_one">
        <label for="" class="fontWeight">&nbsp;&nbsp;&nbsp;链接地址</label>
        <p class="content_input_item"><input type="text" placeholder="请输入链接地址" v-model="advert.address"></p>
      </div>
      <div class="content_one">
        <label for="" class="fontWeight">&nbsp;&nbsp;&nbsp;显示顺序</label>
        <p class="content_input_item"><input type="text" placeholder="请输入显示顺序" v-model="advert.sequence"></p>
      </div>
      <div class="content_one">
        <label for="" class="fontWeight">&nbsp;&nbsp;&nbsp;投放状态</label>
        <p class="content_input_item">
          <i-switch v-model="switch1" @on-change="change"></i-switch>
        </p>
      </div>
      <div class="content_one ">
        <Button type="success" class=" mr10 cursor newaddUploadBtn" @click="insertAdvert">保存</Button>
        <Button type="ghost" class=" cursor" @click="cancelInsert">取消</Button>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'APImanagement',
    data () {
      return {
        switch1: false,
        advert:{//广告
            name:'',
          describe:'',
          column:'',
          address:'',
          sequence:1,
          state:'N',
          valid:'Y',
          upLoadId:'',
          uuid:'',//广告唯一表示
        },
        upLoadId:'',
        tool:{
            name:false,
          column:false
        },
        uploadList: [],
        imgUrl: '',
        defaultData: []//默认已有数据
      }
    },
    mounted(){
      this.uploadList = this.$refs.upload.fileList;
      this.loadDefault();
    },
    methods: {
      check(name){//表单验证
        var self = this;
        if (name == 'name') {
          if (self.advert.name == '') {
            self.tool.name = true;
            return false;
          } else {
            self.tool.name = false;
            return true;
          }
        } else {
          if (self.advert.column == '') {
            self.tool.column = true;
            return false;
          } else {
            self.tool.column = false;
            return true;
          }

        }

      },
//        加载默认
      loadDefault(){
         var self=this;
         self.defaultData=sessionStorage.getItem("data");
         if(self.defaultData==''){
             return ;
         }else {
           self.advert = JSON.parse(self.defaultData);
           if (self.advert.upLoadId == null) {
             self.upLoadId = '';
           } else {
             self.imgUrl = "cnct_im/common/showImage?fileId=" + self.advert.upLoadId;
             self.upLoadId = self.advert.upLoadId;
             delete self.advert.upLoadId;
             if (self.advert.state == "Y") {
               self.switch1 = true;
             } else {
               self.switch1 = false;
             }

          }
        }
      },
//        返回到列表也
      backList(){
        var self = this;
        self.$router.push({name: "Advertisinglist"});

      },
      insertAdvert(){
        var self = this;
        delete self.advert.create_user;
        delete self.advert.create_time;
        if (self.check('name') && self.check('column')) {
            if(self.upLoadId!=''){
              self.$http.post('/advertisement/insertOrUpdate', self.advert).then((m) => {
                if (m.data.code != 100) {
                  self.$Message.error(m.data.msg);
                  return false;
                }
                self.$Message.info({
                  content: m.data.msg,
                  onClose: function () {
                    self.$router.push({name: "Advertisinglist"});
                  }
                })
              });
            }else{
                self.$Message.info("必须要上传广告素材");
            }

        }

      },
      handleSuccess (res, file) {
        var self = this;
        if (file.response.code != 100) {
          self.$Message.error(file.response.msg);
          return false;
        }

        self.$Message.success({content:file.response.msg,onClose:function(){
            self.imgUrl="cnct_im/common/showImage?fileId="+file.response.data;
            self.advert.upLoadId=file.response.data;
            self.upLoadId=file.response.data;
        }});
      },
      cancelInsert(){
        var self = this;
        self.$router.push({name: "Advertisinglist"});

      },
      change (status) {
        if (status) {
          this.advert.state = 'Y';
        } else {
          this.advert.state = 'N';

        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .right_item_api {
    margin-left: 20px;
  }


  .backList {
    padding: 5px 25px;
    border: 1px solid #1CB394;
    background: #fff;
    border-radius: 5px;
    color: #1CB394;
  }

  .content_button button {
    padding: 3px 20px;
    border-radius: 3px;
  }

  .content_button .success {
    background: #1CB394;
    color: #fff;
    border: 0;
  }

  .content_button .cecal {
    border: 1px solid #eee;
    background: #fff;
  }

  .content_input_item button {
    background: #1CB394;
    padding: 5px 25px;
    color: #fff;
    border: 0;
    border-radius: 3px;
  }

  .content_input_item {
    margin-top: 10px;
    position: relative;
    height: auto;
    overflow: hidden;
  }

  .content_input_item img {
    width: 30%;
    height: 100%;
    transition: all 0.6s;
  }

  .content_input_item img:hover {
    transform: scale(1.5);
  }

  .star {
    color: red;
    margin-right: 3px;
  }

  .content_one {
    margin-top: 20px;
  }
  .Advertinglist .content_input_item .tool{
  position: absolute;
  top: -23px;
  margin-left: 5px;
}
  .Advertinglist .content_input_item input {
    width: 80%;
    height: 30px;
    padding: 5px 10px;
    border: 1px solid #eee;
    border-radius: 3px;
  }
.Advertinglist{
margin: 10px 10px 20px 10px;

}
  .newaddUploadBtn {
    background: #1CB394;
    border-color: #1CB394;
    width: 95px
  }

  .newaddUploadBtn:hover {
    background-color: #47cb89;
    border-color: #47cb89;
  }

  .content_input_item .ivu-switch-checked {
    background-color: orange;
    border-color: orange;
  }
</style>

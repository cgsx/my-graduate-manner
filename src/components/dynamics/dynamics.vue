<template>
  <div>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">公司动态管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="height:100%">

      <div class="apiManageContainer">
        <Row class="apiManage_one">
          <Col span="10" offset="14" class="text-right">
          <span class="fr cursor" @click="openInsert"> <Button type="ghost" >添加动态</Button></span>
          </Col>
        </Row>
        <div class="apiManaeListContainer advert">
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-for="item in advertList" :key="item.uuid">
            <Col span="2">
            <span class="ciclr ">
                  <img :src="$store.state.imgcon+'/conmon/showImg.php?uuid='+item.uuid+'&type=11'" alt="">
            </span>
            </Col>
            <Col span="17">
            <p class="fontWeight ml20 vc">标题：{{item.title}}</p>
            <p>
              <span class="mar_right ml20 vc">时间：{{item.time}}</span>
            </p>
            </Col>
            <Col span="4" class=" text-right cursor">
            <span class="mr10" @click="openUpdate(item)">更改</span>
            <span @click="delTeam(item.uuid)">删除</span>
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg " type="flex" justify="center" align="middle" v-if="advertList==false">
            <Col span="24" class="text-center">
            暂无数据列表
            </Col>
          </Row>

        </div>
      </div>
    </Row>
    <Modal
      v-model="modal1"

      title="修改"
    >
      <p>
      <Form :model="formItem" :label-width="80">
      <FormItem label="标志" class="upload">
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php'" :data="{uuid:formItem.uuid,type:11}" >
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        <img :src="$store.state.imgcon+'/conmon/showImg.php?uuid='+formItem.uuid+'&type=11'" alt="">
      </FormItem>
        <FormItem label="标题"  >
          <Input v-model="formItem.title" placeholder="请输入标题" ></Input>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="formItem.des" type="textarea" placeholder="请输入描述" ></Input>
        </FormItem>
      </Form>
      </p>
      <p slot="footer">
        <Button type="ghost" @click="modal1=false">取消</Button>
        <Button type="primary" @click="updateTeam">确定</Button>
      </p>
    </Modal>

    <Modal
      v-model="modal3"

      title="新增"
    >
      <p>
      <Form ref="insertList" :model="insertList" :rules="rulesTwo" :label-width="80">
      <FormItem label="标志"  >
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php'" :data="{type:11}" :on-success="uploadSucc">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="标题"  prop="title">
        <Input v-model="insertList.title" placeholder="请输入标题" ></Input>
      </FormItem>
      <FormItem label="描述" prop="des">
        <Input v-model="insertList.des" type="textarea" placeholder="请输入描述" ></Input>
      </FormItem>
      </Form>
      </p>
      <p slot="footer">
        <Button type="ghost" @click="modal1=false">取消</Button>
        <Button type="primary" @click="insertTeam">确定</Button>
      </p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'APImanagement',
    data () {
      return {
        modal1: false,
        modal3:false,
        advertList: [],//广告列表列表
        formItem:{},
        insertList:{} ,rulesTwo:{
          title:[{required:true,message:'不能为空'}],
          des:[{required:true,message:'不能为空'}],

        },
      }
    },

    mounted(){
        this.loadCompany();
    },
    methods: {
      uploadSucc(res,file,fileList){
        this.insertList.imgid=res.data.imgid;
      },
      openUpdate(item){
var self=this;
self.modal1=true;
        self.formItem={
          uuid:item.uuid,
          title:item.title,
          des:item.description
        }
      },
      delTeam(item){
        var self=this;
        self.$Modal.confirm({title:'删除','content':"是否确认删除？删除之后产品不可恢复哦",okText:'确定删除',cancelText:'取消',onOk(){
          self.$http.post("mg_trends/mg_trends_del.php",{uuid:item}).then((m)=>{
            if(m.data.code!=100){
              self.$Message.info(m.data.msg);
              return false;
            }
            self.$Message.info(m.data.msg);
            self.loadCompany();

          }).catch(function () {
            self.$Message.info("请求失败！");
          })
        },onCancel(){
          self.$Message.info("取消！");
        }})
      },
      updateTeam(){
        var self=this;
        self.$http.post("mg_trends/mg_trends_update.php",self.formItem).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.$Message.info(m.data.msg);
          self.modal1=false;
          self.loadCompany();
        })
      },
      insertTeam(){
        var self=this;
        self.$refs.insertList.validate((valid) => {
          if (valid) {
            if(self.insertList.imgid!=null){
        self.$http.post("mg_trends/mg_trends_insert.php",self.insertList).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.$Message.info(m.data.msg);
          self.modal3=false;
          self.loadCompany();
        })  } else {
        self.$Message.error("必须添加图片！");
  }
  }else{
    self.$Message.info("不通过");
  }


  })
      },
      openInsert(){
        var self=this;
        self.modal3=true;
      },
      loadCompany(){
   var self=this;
   self.$http.post("mg_trends/mg_trends.php").then((m)=>{
     if(m.data.code!=100){
       self.$Message.info(m.data.msg);
       return false;
     }
     self.advertList=m.data.data;
   })
 }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

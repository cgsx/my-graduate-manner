<template>
  <Row>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">空间管理</span>
      </Col>
      <Col span="2" offset="15" v-on:click.native=" contentHeader ('Y')" class="center cursor" v-bind:class="{ borderContent: valid=='Y' }">
      <span >开放的空间</span>
      <span class="spaceM_border_bottom_position"></span>
      </Col>
      <Col span="2" class="center cursor" v-on:click.native=" contentHeader ('N')" v-bind:class="{ borderContent: valid=='N' }">
      <span >关闭的空间</span>
      <span class="spaceM_border_bottom_position"></span>
      </Col>
    </Row>
    <Row class="apiManage" style="height:100%">
      <div class="apiManageContainer">
        <Row class=" Spacemanage_one">
          <Col span="14" class="apimage_hidden" v-if="postUuid.length">
          <Checkbox @on-change="checkAll" v-model="isCheckAll" >已选择{{postUuid.length}}项</Checkbox>
          <span class="Spacemanage_one_choolse cursor" @click="modal1 = true" v-if="showDel">
               <i class="iconfont icon-chahao"></i>强制关闭
          </span>
          <Modal
            v-model="modal1"
            @on-cancel="noPass='';postUuid=[]"
            title="强制关闭">
            <p>
              <textarea class="textarea_reson" name="" id="" cols="30" rows="10" placeholder="请填写不通过原因"
                        v-model="noPass"></textarea>
            </p>
            <p slot="footer">
              <Button @click="noPass='';postUuid=[];modal1=false" type="text">取消</Button>
              <Button @click="closeSpace" type="primary">确定</Button>
            </p>
          </Modal>
          </Col>
          <Col span="9" offset="1" class="text-right fr">
          <span class="Spacemanage_one_input">
              <i class="iconfont icon-fangdajing1" style="top:-1px"></i>
              <input type="text" placeholder="请输入关键字" v-model="spaceName">
          </span>
          </Col>
        </Row>
        <div class="apiManaeListContainer spacemanner">
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-for="item in spaceList"
               :key="item.createTime">
            <Col span="1" v-if="item.valid=='Y'">
            <CheckboxGroup @on-change="check" v-model="postUuid" :value="item.uuid" >
              <Checkbox :label="item.uuid"></Checkbox>
            </CheckboxGroup>
            </Col>
            <Col span="2">
            <span class="ciclr">
                            <img src="../../assets/image/tx.png" alt="" v-show="item.url==null">
              <img :src="'/cnct_im/common/showImage?fileId=' + item.url" alt="" v-show="item.url!=null">
            </span>
            </Col>
            <Col :span="item.valid=='Y'?9:6">
            <span class="fontWeight">{{item.spaceName}}</span>
            </Col>
            <Col span="3" class="color_aaa">
            {{item.realname}}</Col>
            <Col span="3" class="color_aaa">
            {{item.phoneNum}}</Col>
            <Col span="3" class="color_aaa text-center">
            {{item.createTime|date("2")}}</Col>
            <Col span="3" class="color_aaa text-right">
            {{item.valid=='Y'?'开放':'关闭'}}</Col>
            <Col span="4" v-if="valid=='N'" class="color_aaa text-right">
            <span class="reson cursor" @click="modelRason = true;textReson=item.reason"> 原因查看</span>
            <Modal
              v-model="modelRason"
              title="关闭原因"
            >
              <p>
                <textarea class="textarea_reson" name="" readonly id="" cols="30" v-model="textReson" rows="10" value="">请填写下架原因</textarea>
              </p>
              <div slot="footer">
              </div>
            </Modal>
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg " style="border-bottom: 0" type="flex" justify="center" align="middle" v-if="spaceList==false">
            <Col span="24" class="text-center" >
            暂无数据列表
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg test" v-if="PageTotal/pageSize>1" type="flex" justify="center" align="middle">
            <Col span="24" class="text-center">
            <Page show-elevator show-total :total="PageTotal" :page-size='pageSize' @on-change="change"></Page>
            </Col>
          </Row>
        </div>
      </div>
    </Row>
  </Row>
</template>

<script>
  export default {
    name: 'APImanagement',
    data () {
      return {
        modal1: false,
        modelRason:false,
        textReson:'',
        spaceList: [],//空间列表
        spaceName: '',//搜索框名字
        currentPage: 1,//当前页码
        PageTotal: 0,//总条数
        pageSize: 0,//每页条数
        valid: 'Y',//开放还是关闭
        isCheckAll: false,//是否选中
        postUuid: [],//选中的
        showDel: false,//显示强制关闭按钮
        noPass: '',//没有通过的说明
      }
    },
    mounted(){
      this.loadSpace();
    },
    watch: {
      spaceName: function (old, cur) {
        var self = this;
        setTimeout(function () {
          if (self.spaceName != old) {
            return false;
          }
          self.loadSpace();
        }, 500)
      },
      postUuid:function(){
        if(!this.postUuid.length){
          this.showDel = false;
          this.isCheckAll = false;
        }
      }
    },
    methods: {
      check: function () {//单选
        if (this.postUuid.length < 1) {
          this.showDel = false;
        } else {
          this.showDel = true;
        }
        if (this.postUuid.length == this.spaceList.length) {
          this.isCheckAll = true;
        } else {
          this.isCheckAll = false;
        }
      },
      checkAll: function () {//全选
        let self = this;
        self.postUuid = [];
        if (self.isCheckAll) {
          self.spaceList.forEach(function (value, index) {
            self.postUuid.push(value.uuid);
          });
          self.showDel = self.postUuid.length == 0 ? false : true;
        } else {
          self.showDel = false;
        }
      },
      loadSpace(){   //space加载
        var self = this;
        self.$http.get("/workspace/manageSpaceList?currentPage=" + self.currentPage + '&name=' + self.spaceName + "&valid=" + self.valid).then((m) => {
          if (m.data.code != 100) {
            self.$Message.error(m.data.msg);
            return false;
          }
          self.isCheckAll = false;
          self.spaceList = m.data.data.list;
          self.PageTotal = m.data.data.total;
          self.pageSize = m.data.data.pageSize;
          self.showDel = false;
          self.postUuid = [];
        }).catch(function () {
          self.$Message.error('请求失败！');
        })
      },
      closeSpace(){
        var self = this;
        let spaceIds = self.postUuid.join(',');
        self.$http.post('/workspace/manageDelete', {spaceIds: spaceIds, valid: "N", reason: self.noPass}).then((m) => {
          if (m.data.code != 100) {
            self.$Message.error(m.data.msg);
            return false;
          }
          self.$Message.info({
            content: m.data.msg,
            onClose: function () {
              self.modal1 = false;
              self.spaceList = m.data.data.list;
            }
          })
        }).catch(function () {
          self.$Message.error('请求失败！');
        })
      },
      change: function (page) {
        var self = this;
        self.currentPage = page;
        self.loadSpace();
      },
      contentHeader (obj) {
        this.valid = obj;
        this.loadSpace();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .reson{padding: 3px 10px; border: 1px solid #1CB394;border-radius: 10px;color: #1CB394;}
  .borderContent .spaceM_border_bottom_position {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    border-bottom: 3px solid #1CB394;
  }

  .right_item_api {
    margin-left: 20px;
  }

  .ciclr_img img {
    vertical-align: middle;
    width: 30px;
    margin-right: 10px;
  }

  .spacemanner .ciclr img {
    width: 40px;
    border-radius: 50%;
    height: 40px
  }

  .right_item {
    background: #fff;
    border-bottom: 1px solid #DEDEDE;
    height: 50px;
  }

  .left_item span {
    margin-right: 5px;
    font-size: 25px;
    vertical-align: bottom
  }

  .textarea_reson {
    width: 100%;
    border: 1px solid #F1F1F1;
    border-radius: 8px;
    padding: 10px;
  }

  .Spacemanage_one_choolse {
    margin-right: 10px;
    padding: 4px 10px;
    border-radius: 18px;
    border: 1px solid #DDDEE1;
    background: #fff;
  }

  .Spacemanage_one_choolse i {
    margin-right: 5px;
    vertical-align: middle
  }

  .apimage_hidden {
    line-height: 30px;
  }

  .Spacemanage_one_input {
    position: relative;
  }

  .Spacemanage_one_input input {
    width: 45%;
    height: 30px;
    padding: 3px 30px 3px 10px;
    border-radius: 18px;
    border: 1px solid #DDDEE1;
  }

  .Spacemanage_one_input i {
    position: absolute;
    right: 8px;
    color: #808080;
    z-index: 100
  }

  .Spacemanage_one {
    background: #FCFCFC;
    padding: 10px;
    padding-left: 20px;
  }

  .apiManage {
    padding: 10px;
  }

  .apiManage_two {
    vertical-align: middle;
    background: #fff;
    padding: 20px;
    border-bottom: 1px solid #eee;
  }
  .apiManageContainer {
    width: 100%;
    height: 93%;
    background-color: #fff;
  }

  .test {
    border-bottom: 0;
    margin-bottom: 40px;
  }

  .spacemanner .ivu-checkbox-wrapper.ivu-checkbox-group-item span:last-child {
    display: none;
  }
</style>

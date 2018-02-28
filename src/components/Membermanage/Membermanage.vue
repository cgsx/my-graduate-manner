<template>
  <Row >
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">成员管理

      </span>
      </Col>
      <Col span="1" offset="17" class=" cursor" v-bind:class="{ borderContent: all }"  >
      <span  v-on:click=" contentHeader ('all')">全部</span>
      <span class="border_bottom_position" style="width: 80%;"></span>
      </Col>
      <Col span="1" class=" cursor" v-bind:class="{ borderContent: Disable }">
      <span v-on:click=" contentHeader ('Disable')">已禁用</span>
      <span class="border_bottom_position" style="width: 80%;"></span>
      </Col>
   </Row>
    <Row class="apiManage" style="top: 0;bottom: 0;left: 0;right:0;overflow: auto;">
      <div class="apiManageContainer">
        <Row class="Membermanage_one">
          <Col span="1"  class=" cursor user" v-bind:class="{ changeUser: frontUser }"  >
          <span  v-on:click=" changeUser ('frontUser')">前台用户</span>
          </Col>
          <Col span="1" class=" cursor user" v-bind:class="{ changeUser: backUser }">
          <span v-on:click=" changeUser ('backUser')">后台用户</span>
          </Col>
          <Col span="5"   v-if="postUuid.length">
          <Checkbox @on-change="checkAll" v-model="isCheckAll" >已选择{{postUuid.length}}项</Checkbox>

          </Col>

          <Col span="9" class="text-right fr" offset="1">
          <span class="Membermanage_one_choolse cursor" @click="modal2 = true" v-if="valid==''&&postUuid.length">
               <i class="iconfont icon-shezhi"></i>设置
          </span>

          <span class="Membermanage_one_choolse cursor" @click="modal1 = true;isValid='N'" v-if="valid==''&&postUuid.length">
               <i class="iconfont icon-chahao"></i>禁用
          </span>
          <span class="Membermanage_one_choolse cursor" @click="modal3 = true;isValid='Y'" v-if="valid=='N'&&postUuid.length">
               <i class="iconfont icon-1"></i>恢复
          </span>
          <span class="Membermanage_one_input">
              <i class="iconfont icon-fangdajing1" style="top: .5px"></i>
              <input type="text" placeholder="请输入关键字" v-model="key">
          </span>
          </Col>
        </Row>
        <div class="apiManaeListContainer">
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-for="item in memberList" :key="item.uuid">
            <Col span="2">
            <CheckboxGroup @on-change="check" v-model="postUuid" :value="item.uuid">
              <Checkbox :label="item.uid"></Checkbox>
            </CheckboxGroup>
            </Col>
            <Col span="4">
            <span class="circl">
              <span class="circle">{{item.realname}}</span><span>{{item.realname}}</span>
            </span>
            </Col>
            <Col span="7" class="color_aaa">{{item.username}}</Col>
            <Col span="5" class="color_aaa">{{item.email}}</Col>
            <Col span="2" class="color_aaa">
            <i-switch v-model="item.switch" class="switchOpen" @on-change="repeatOne(item.uid,$event)">
            </i-switch>
            </Col>
            <Col span="3" class="color_aaa text-right cursor" v-if="valid==''">
            <Dropdown class="jiaoSe">
            <a href="javascript:void(0)">
             超级管理员
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>管理员</DropdownItem>
              <DropdownItem>普通成员</DropdownItem>
            </DropdownMenu>
          </Dropdown></Col>
          </Row>
          <Row class="apiManage_two code-row-bg " style="border-bottom: 0" type="flex" justify="center" align="middle" v-if="memberList==false">
            <Col span="24" class="text-center" >
            暂无数据列表
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg test" type="flex" justify="center" align="middle" >
            <Col span="24" class="text-center">
            <Page :total="PageTotal" :page-size='pagesize' @on-change="change" show-elevator></Page>
            </Col>
          </Row>
        </div>
      </div>
    </Row>

    <!--设置角色模态框-->
    <Modal
      v-model="modal2"
      title="设置角色"
      @on-ok="ok"
      @on-cancel="cancel">
      <Row>
        <Col span="11" class="fontWeight">
        <p style="color: #23D7BC">角色</p>
        <Tree :data="data1" class="box"></Tree>
        </Col>
        <Col span="11" offset="2" class="fontWeight">
        <p style="color: #23D7BC">已选角色</p>
        <div class="box">
          <ul>
            <li class=" choolseList">所有者 <i class="cursor color_aaa pull-right iconfont icon-cha1"></i></li>
            <li class=" choolseList">所有者 <i class="cursor color_aaa pull-right iconfont icon-cha1"></i></li>
            <li class=" choolseList">所有者 <i class="cursor color_aaa pull-right iconfont icon-cha1"></i></li>
          </ul>
        </div>
        </Col>
      </Row>
    </Modal>
    <!--禁用-->
    <Modal
      v-model="modal1"
      title="禁用用户设置">
      <p class="fontWeight">
        确定禁用所选用户？
      </p>
      <p slot="footer">
        <Button @click="postUuid=[];modal1=false" type="text">取消</Button>
        <Button @click="disabledMember" type="primary">确定</Button>
      </p>
    </Modal>
    <Modal
      v-model="modal3"
      title="恢复用户设置"
     >
      <p class="fontWeight">
        确定恢复所选用户？
      </p>
      <p slot="footer">
        <Button @click="postUuid=[];modal3=false" type="text">取消</Button>
        <Button @click="disabledMember" type="primary">确定</Button>
      </p>
    </Modal>

  </Row>
</template>

<script>
  export default {
    name: 'APImanagement',
    data () {
      return {
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          }
        ],
        model2: '',
        model3: '',
        modal1: false,
        modal2: false,
        modal3:false,
        all: true,
        Disable: false,
        frontUser:true,//切换用过户样式
        backUser:false,//后台用户样式
        data1: [
          {
            title: '管理组',
            expand: true,
            children: [
              {
                title: '所有者',
                expand: true
              },
              {
                title: '部门主管',
                expand: true
              },
              {
                title: '管理员',
                expand: true
              }
            ]
          },
          {
            title: '管理组',
            expand: true,
            children: [
              {
                title: '部门主管',
                expand: true
              },
              {
                title: '管理员',
                expand: true
              }
            ]
          }
        ],
        key: '',//搜索框名字
        currentPage: 1,//当前页码
        PageTotal: 0,//总条数
        pagesize: 0,//每页条数
        valid:'',//禁用或未禁用，更具不同的值获得不同的列表
        isValid:'',//状态的改变
        memberList:[],//会员列表
        postUuid: [],//选中的
        isCheckAll: false,//是否选中
        showDel: false,//显示强制关闭按钮
        userIds:'',//恢复的用户Id
      }
    },
    watch: {
      key: function (old, cur) {
        var self = this;
        setTimeout(function () {
          if (self.key != old) {
            return false;
          }
          self.loadMember();
        }, 500)
      },
      postUuid:function(){
        if(!this.postUuid.length){
          this.showDel = false;
          this.isCheckAll = false;
        }
      }
    },
    mounted(){
        this.loadMember();
    },
    methods: {
        //恢复一个
      repeatOne(){
          var self=this;
          console.log(arguments[1]);
        self.userIds=arguments[0];
        if(arguments[1]==true){
            self.modal3=true;
            self.isValid='Y';
          }else{
          self.modal1=true;
          self.isValid='N';
        }

      },
        //恢复
      repeatMember(){
        var self = this;
        if(self.postUuid.length>=1){
          self.userIds = self.postUuid.join(',');
        }
        if(self.userIds==''){
            self.$Message.error("未选中成员");
        }else{
          self.$http.get('/user/deleteUser?userIds='+self.userIds+'&valid=Y').then((m) => {
            if (m.data.code != 100) {
              self.$Message.error(m.data.msg);
              return false;
            }
            self.$Message.info({
              content: m.data.msg,
              onClose: function () {
                self.modal3 = false;
                self.loadMember();
                self.postUuid=[];
              }
            })
          }).catch(function () {
            self.$Message.error('请求失败！');
          })
        }

      },
        //禁用或恢复
      disabledMember(){
          var self = this;
        if(self.postUuid.length>=1){
          self.userIds = self.postUuid.join(',');
        }
        if(self.userIds==''){
          self.$Message.error("未选中成员");
        }else {
          self.$http.get('/user/deleteUser?userIds=' + self.userIds + '&valid='+self.isValid).then((m) => {
            if (m.data.code != 100) {
              self.$Message.error(m.data.msg);
              return false;
            }
            self.$Message.info({
              content: m.data.msg,
              onClose: function () {
                self.modal1 = false;
                self.modal3 = false;
                self.loadMember();
                self.postUuid = [];
              }
            })
          }).catch(function () {
            self.$Message.error('请求失败！');
          })
        }
        },
      check: function () {//单选
        if (this.postUuid.length < 1) {
          this.showDel = false;
        } else {
          this.showDel = true;
        }
        if (this.postUuid.length == this.memberList.length) {
          this.isCheckAll = true;
        } else {
          this.isCheckAll = false;
        }
      },
      checkAll: function () {//全选
        let self = this;
        self.postUuid = [];
        if (self.isCheckAll) {
          self.memberList.forEach(function (value, index) {
            self.postUuid.push(value.uid);
          });
          self.showDel = self.postUuid.length == 0 ? false : true;
        } else {
          self.showDel = false;
        }
      },
      change: function (page) {
        var self = this;
        self.currentPage = page;
        self.loadMember();
      },
      ok () {
        this.$Message.info('成功')
      },
      cancel () {
        this.$Message.info('取消成功')
      },
      //加载所有成员
      loadMember(){
        var self=this;
          self.$http.get("/user/findAllMember?currentPage=" + self.currentPage + '&key=' + self.key+'&valid='+self.valid).then((m) => {
            if (m.data.code != 100) {
              self.$Message.error(m.data.msg);
              return false;
            }
            self.memberList = m.data.data.list;
            self.postUuid = [];

            self.memberList.forEach(function (value,index,) {
              console.log(value)
              if(value.valid=='Y'){
                  self.$set(value,"switch",true);
              }else{
                self.$set(value,"switch",false);

              }
            });
            console.log(self.memberList)
            self.PageTotal = m.data.data.total;
            self.pagesize = m.data.data.pageSize;
          })
      },
      contentHeader (obj){
        switch (obj) {
          case 'all':
            this.all = true;
            this.valid='';
            this.currentPage=1;
            this.loadMember();
            this.postUuid=[];
            this.Disable = false;
            break
          case 'Disable':
            this.all = false;
            this.valid='N';
            this.currentPage=1;
            this.postUuid=[];
            this.loadMember();
            this.Disable = true;
            break
        }
      },
      changeUser (obj){
        switch (obj) {
          case 'frontUser':
            this.frontUser = true;
            this.backUser = false;
            break
          case 'backUser':
            this.frontUser = false;
            this.backUser = true;
            break
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .jiaoSe .ivu-dropdown-rel a{
color: #333;
  }
  .switchOpen.ivu-switch-checked{
border-color: #1CB394;
    background-color: #1CB394 ;
  }
.user{
  width: 70px;
text-align: center;
}
.changeUser{
  color: #1CB394;
font-weight: 700;
}

  .choolseList{padding: 5px;}
  .choolseList:hover{background: #eee;}
  .box{height:280px;overflow:auto;border: 1px solid #eee;border-radius: 5px;padding: 8px;width: 100%;margin-top: 10px;}
  .circle{display: inline-block;width: 30px;height:30px;overflow: hidden;border-radius: 50%;background: #00c1de;vertical-align: middle;color: #fff;line-height: 30px;text-align: center;margin-right: 10px;}
  .borderContent .border_bottom_position{width:60%;position:absolute;bottom:0;left:0;display: inline-block;border-bottom: 3px solid #1CB394;}
  .right_item_api{margin-left: 20px;}
  .ciclr_img img{vertical-align: middle;width: 30px;margin-right: 10px;}
  .ciclr img{width: 30px;}
  .right_item{background: #fff;border-bottom: 1px solid #DEDEDE;height:50px;}
  .left_item span{margin-right: 5px;font-size: 25px;vertical-align: bottom}
  .textarea_reson{width: 100%;border: 1px solid #F1F1F1;border-radius: 8px;padding: 10px;}
  .Membermanage_one_choolse{margin-right:10px;padding: 4px 10px;border-radius: 18px;border: 1px solid #DDDEE1;background: #fff;}
  .Membermanage_one_choolse i{margin-right: 5px;vertical-align: middle}
  .apimage_hidden{line-height:30px;}
  .Membermanage_one_input{position: relative;}
  .Membermanage_one_input input{width: 45%;height:30px;padding: 3px 30px 3px 10px;border-radius: 18px;border: 1px solid #DDDEE1;}
  .Membermanage_one_input i{position: absolute;right:8px;color: #808080;z-index: 100}
  .Membermanage_one{background: #FCFCFC;padding: 10px;padding-left: 20px;}
  /*.apiManage{padding: 10px;}*/
  .apiManage_two{vertical-align:middle;background: #fff;padding:20px;border-bottom: 1px solid #eee;}
  /*.apiManage {*/
    /*padding: 10px;*/
    /*bottom: 0px;*/
    /*right: 0px;*/
    /*position: fixed;*/
    /*width: 82.5%;*/
    /*left: 16.5% !important;*/
    /*top: 103px !important;*/
    /*height: 100% !important;*/
    /*overflow: auto;*/
  /*}*/
  .apiManageContainer{
    width: 100%;
    height: 93%;
    background-color:#fff ;
  }
  .test{
    margin-bottom: 100px;
  }
</style>

<template>
  <div id="app" >
    <div>
      <Row >
        <Col span="4" class="left_item text-center">
        <span class="fontWeight">T</span>乐彩云后台管理系统
        </Col>
        <Col span="20" class="right_item">
        <Row>
          <Col class="center"  span="3" offset="21"  v-show="!login">
          <span class="ciclr_img">
                  <img src="./assets/image/tx.png" alt="">
               </span>
          <Dropdown class="cursor">
            <span class="ciclr_text full-right">{{realname}}</span>
            <Icon type="arrow-down-b"></Icon>
            <DropdownMenu slot="list" >
              <DropdownItem @click.native="doLogout()">退出</DropdownItem>
              <DropdownItem>
                <router-link to="/resetPassword" style="color: black">
                  修改密码
                </router-link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </Col>
        </Row>
        </Col>
      </Row>
      <Row type="flex" justify="center" align="top" class="code-row-bg"
           style="position:absolute;top:50px;bottom:0;left:0;right:0;overflow:hidden;align-items:stretch">
        <Col span="4" class="left_item_content "  v-show="!login">
        <Menu :theme="theme3" :active-name="activeName" style="width: 100%;" @on-select="Jump" class="minMenu">
          <MenuItem name="product">
            <i class="iconfont icon-xiangmu"></i>
            产品管理
          </MenuItem>
          <!--<MenuItem name="Solution">-->
            <!--<i class="iconfont icon-jiejuefangan"></i>-->
            <!--解决方案管理-->
          <!--</MenuItem>-->
          <MenuItem name="solution">
            <i class="iconfont icon-xiangmuguanli"></i>
            解决方案管理
          </MenuItem>
          <MenuItem name="example">
            <i class="iconfont icon-kongjianguanli"></i>
            案例管理
          </MenuItem>
          <MenuItem name="datareport">
            <i class="iconfont icon-guanggaoguanli"></i>
            数据报告管理
          </MenuItem>
          <MenuItem name="sendmsg">
            <i class="iconfont icon-yonghuguanli"></i>
            留言管理
          </MenuItem>
          <Submenu name="3">
            <template slot="title">
              <Icon type="stats-bars"></Icon>
              关于我们管理
            </template>
              <MenuItem name="aboutus">企业信息管理</MenuItem>
              <MenuItem name="team">团队管理</MenuItem>
              <MenuItem name="commit">委员会管理</MenuItem>
              <MenuItem name="dynamics">动态管理</MenuItem>
              <MenuItem name="joinus">加入我们管理</MenuItem>
              <MenuItem name="contach">联系我们管理</MenuItem>

          </Submenu>
        </Menu>
        </Col>
        <Col :span="login?24:20">
        <Row type="flex" class="router code-row-bg" justify="center" align="top"
             style="position:absolute;top:0px;bottom:-30px;left:0;right:0;overflow:auto;align-items:stretch">
          <router-view v-on:login="loginFun" v-show='true'/>
        </Row>
        </Col>
      </Row>
    </div>
    <div >
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'app',
    data () {
      return {
        theme3: 'dark',
        activeName: 'product',
        login: false,
        realname:'',
      }
    },
    mounted: function () {
      var self = this;
      this.$nextTick(function () {
        Vue.prototype.msg = this.$Message;
        Vue.prototype.spin = this.$Spin;
        let router = self.$router.currentRoute;
        self.realname=localStorage.getItem('realname');
        if(router.name == 'login' || router.name == 'register' ||router.name == 'resetPassword' ){
          self.activeName = 'product';
          self.login = true;
        }else{
          self.activeName = router.name =='Newlyadded'?'Advertisinglist': router.name;
          self.login = false;
        }
      })
    },
    updated:function(){
      this.realname=localStorage.getItem('realname');
    },
    methods: {
      loginFun: function (res) {
        this.login = res.login;
        this.activeName = res.one;
      },
      doLogout(){
        let self = this;
//        self.$http.get("/sso/logout").then((m) => {
//          if (m.data.code != 100) {
//            self.$Message.error(m.data.msg);
//            return false;
//          }
//          self.$Message.success({
//            content: m.data.msg,
//            onClose: function () {
//              self.activeName = 'APImanagement';
//              localStorage.clear();
//              location.reload();
//              self.$router.push({path:'/Login'});
//            }
//          });
//        }).catch(function () {
//          self.$Message.error("请求失败！")
//        })
      },
      Jump (name) {
        this.$router.push({name: name});
      }
    }
  }
</script>

<style>
  .router {
    background: #EBEFF2;
  }
  .router>div{
    height:100%;width: 100%;
  }

  .minMenu .ivu-menu-item-active{
    color: #1CB394 !important;
    border-right: 2px solid #1CB394 !important;
  }
 .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
    color: #1CB394 !important;
background: #313645 !important;
  }
  .left_item_content {
    background: #495060;
    overflow: auto;
  }

  .ciclr_img {
    margin-top: 10px;
    display: inline-block;
  }

  .ciclr_img img {
    vertical-align: middle;
    width: 30px;
    margin-right: 10px;
  }

  .ciclr img {
    width: 30px;
  }

  .right_item {
    background: #fff;
    border-bottom: 1px solid #DEDEDE;
    height: 50px;
  }

  .left_item {
    background: #1CB394;
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 16px;
  }
  .ivu-page-item-active{
    background-color:#1CB394 ;
    border-color: #1CB394;
  }
  .ivu-page-item:hover,.ivu-page-prev:hover,.ivu-page-next:hover{
    border-color: #1CB394;
  }

  .left_item span {
    margin-right: 5px;
    font-size: 25px;
    vertical-align: bottom
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .ivu-checkbox-group-item{
    top:-10px;
    position: relative;
  }
  /*去掉多选框的字*/
  .apiManage_two .ivu-checkbox-group-item span:last-child{
    display: none;
  }
/*校验样式*/
 .hidden{
   opacity: 0;
 }
</style>

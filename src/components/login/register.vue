<template>
  <div class="register_warp login">
    <!--<div class="R_header">-->
    <!--<img src="../../assets/image/logo_b.png" class="logo_P">-->
    <!--<span class="f22 c6 ml5">用户云</span>-->
    <!--</div>-->
    <div class="register_box">
      <span class="userLogin f30 c3 t-c disp-b mb30">欢迎注册用户云</span>
      <form class="lb-input">
        <div class="username-box R_username-box mb10">
          <span class="username_title disp-b">用户名</span>
          <input type="text" class="username-inp" placeholder="请输入账号" v-model=" register.username"
                 v-on:blur="checkPhone('username','username')">
          <Tooltip class="tips phoneTest" content="手机号格式不正确" placement="right" :always="true"
                   :class="{hidden:tool.username}"></Tooltip>
        </div>
        <div class="username-box R_username-box mb10">
          <span class="username_title disp-b">密码</span>
          <input type="password" class="username-inp" placeholder="请输入密码" v-model=" register.password"
                 v-on:blur="checkPwd()">
          <Tooltip class="tips nullTest" content="密码长度为6到20位，至少包含英文和数字" placement="right" :always="true"
                   :class="{hidden:tool.password}"></Tooltip>
        </div>
        <div class="username-box R_username-box mb10">
          <span class="username_title disp-b">手机号</span>
          <input type="text" class="username-inp" placeholder="请输入手机号" v-model=" register.tel"
                 v-on:blur="checkPhone('tel','tel')">
          <Tooltip class="tips phoneTest" content="手机号格式不正确" placement="right" :always="true"
                   :class="{hidden:tool.tel}"></Tooltip>
        </div>
        <div class="username-box R_username-box mb10">
          <span class="username_title disp-b">邮箱</span>
          <input type="text" class="username-inp" placeholder="请输入邮箱" v-model=" register.email" @blur=" checkEmail()">
          <Tooltip class="tips phoneTest" content="邮箱格式不正确" placement="right" :always="true"
                   :class="{hidden:tool.email}"></Tooltip>
        </div>
        <Button class="f16" type="primary" style="height:40px;width: 100%;" @click="doRegiste()">注册</Button>
        <div class="t-c f12 mt20">
          <a class="cgray">已有用户云账号，</a>
          <router-link to="/Login">
            <a class="cblue">快捷登录></a>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'register',
    data () {
      return {
        single: false,
        register: {
          type: '1',
          username: '',
          password: '',
          rePassword: '',
          tel: '',
          email: '',

        },
        tool: {
          username: true,
          password: true,
          rePassword: true,
          tel: true,
          email: true,
        },
      }
    },
    mounted: function () {
      var self = this;
      this.$nextTick(function () {
        var router = self.$router.currentRoute;
        if (router.name === 'register') {
          self.$emit('login', {login:true,one:'APImanagement'});
        }
      })
    },
    methods: {
      checkPwd(){
        let self = this;
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (!reg.test(self.register.password)) {
          self.tool['password'] = false;
          return false;
        } else {
          self.tool['password'] = true;
          return true;
        }
      },
      checkEmail(){
        let self = this;
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (!reg.test(self.register.email)) {
          self.tool['email'] = false;
          return false;
        } else {
          self.tool['email'] = true;
          return true;
        }
      },
      checkPhone(test, result){
        let reg = /^1[1-9]\d{9}$/;
        let self = this;
        if (!reg.test(this.register[test])) {
          this.tool[result] = false;
          return false;
        } else {
          this.tool[result] = true;
          return true;
        }
      },
      check(){
        let self = this;
        let ispass = false;
        for (var key in self.register) {
          if (!self.register[key]) {
            self.tool[key] = false;
            ispass = true;
            return false
          } else {
            self.tool[key] = true;
            ispass = false;
          }
        }
        if (self.checkPhone('username', 'username') == false) {
          return false;
        }
        if (self.checkPhone('tel', 'tel') == false) {
          return false;
        }
        if (self.checkPwd() == false) {
          return false;
        }
        if (self.checkEmail() == false) {
          return false;
        }
        if (ispass) {
          return false;
        }
        return true;
      },
      doRegiste(){
        let self = this;
        self.register.rePassword = self.register.password;
        if (this.check()) {
          this.$http.post('/reg/doreg', this.register).then(function (m) {
            if (m.data.code != 100) {
              self.$Message.error(m.data.msg);
              return false;
            }
            self.$Message.success({
              content: m.data.msg + '将跳转登录页面', onClose: function () {
                self.$router.push({path: '/login'});
              }
            });
          }).catch(function () {
            self.$Message.error('请求失败！');
          });
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only  -->
<style scoped>
  .login {
    background: #fcfcfc;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .userLogin {
    height: 38px;
    line-height: 38px;
  }

  .lb-input {
    width: 100%;
  }

  .username-box {
    position: relative;
    display: block;
    width: 100%;
  }

  .username-box i {
    position: absolute;
    left: 3px;
    top: 3px;
    width: 40px;
    height: 50px;
    line-height: 50px;
    color: #c3d0d8;
    text-align: center;
    text-decoration: none;
  }

  .username-box .username-inp {
    background: #fff;
    border: none;
    width: 100%;
    padding: 0px 0 0px 40px;
    color: #333;
    height: 56px;
    line-height: 56px;
    border-bottom: 1px solid #e0e4e5;
  }

  .username-box .username-inp:focus, .username-box-yzm .username-inp:focus {
    border-bottom: 1px solid #c3d3d7;
  }

  .username-box .yzm-img {
    width: 80px;
    height: 34px;
    position: absolute;
    right: 0;
    top: 10px;
    border: #e0e4e5 1px solid;
    border-radius: 5px;
    display: block;
  }

  .register_box {
    width: 330px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4%;
  }

  .R_username-box .username-inp {
    background: #fff;
    width: 100%;
    padding: 0px 0 0px 18px;
    color: #333;
    height: 40px;
    line-height: 40px;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
  }

  .R_username-box .username-inp:focus, .R_username-box-yzm .username-inp:focus {
    border: 1px solid #d1d1d1;
  }

  .username_title {
    height: 30px;
    line-height: 30px;
  }

  .R_username-box .R_yzm_inp {
    width: 208px;
  }

  .tips {
    position: absolute;
    margin-left: 100%;
    margin-top: -10.5%;
  }
</style>

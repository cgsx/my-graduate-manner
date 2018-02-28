<template>
  <div class="register_warp login">
    <!--<div class="R_header">-->
    <!--<img src="../../assets/image/logo_b.png" class="logo_P">-->
    <!--<span class="f22 c6 ml5">用户云</span>-->
    <!--</div>-->
    <div class="register_box">
      <span class="userLogin f30 c3 t-c disp-b mb30">重置密码</span>
      <form class="lb-input">
        <div class="username-box R_username-box mb15">
          <span class="username_title disp-b c6 fb mb10">请重设您的账号密码：</span>
          <input type="text" class="username-inp" placeholder="请输入新密码" v-model="resetPwd.newPwd" @blur=" checkPwd()">
          <Tooltip class="tips nullTest" content="密码长度为6到20位，至少包含英文和数字" placement="right" :always="true"
                   :class="{hidden:tool.newPwd}"></Tooltip>
        </div>
        <div class="username-box R_username-box mb30">
          <input type="text" class="username-inp" placeholder="请确认新密码" v-model="resetPwd.surePwd" @blur="doSurePwd()">
          <Tooltip class="tips nullTest" content="两次输入密码不一样" placement="right" :always="true"
                   :class="{hidden:tool.surePwd}"></Tooltip>
        </div>
        <Button class="f16" type="primary" style="height:40px;width: 100%;" @click=" resetPorsword()">提交</Button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        single: false,
        resetPwd: {
          newPwd: '',
          surePwd: ''
        },
        tool: {
          newPwd: true,
          surePwd: true,
        }
      }
    },
    mounted: function () {
      var self = this;
      this.$nextTick(function () {
        var router = self.$router.currentRoute;
        if (router.name === 'resetPassword') {
          self.$emit('login', {login:true,one:'APImanagement'});
        }
      })
    },
    methods: {
      checkPwd(){
        let self = this;
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (!reg.test(self.resetPwd.newPwd)) {
          self.tool['newPwd'] = false;
          return false;
        } else {
          self.tool['newPwd'] = true;
          return true;
        }
      },
      doSurePwd(){
        if (this.resetPwd.newPwd == this.resetPwd.surePwd) {
          this.tool.surePwd = true;
          return true
        } else {
          this.tool.surePwd = false;
          return false
        }
      },
      resetPorsword: function () {
        var self = this;
        if (this.checkPwd() && this.doSurePwd()) {
          this.$http.post('/sso/resetmanagePassword', self.resetPwd).then(function (data) {
            if (data.data.code != 100) {
              self.$Message.error(data.data.msg);
              return;
            }
            self.$Message.success({
              content: data.data.msg, onClose: function () {
                self.$router.push('/login');
              }
            });
          }).catch(function () {
            self.$Message.error('请求失败!');
          })
        }
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only  -->
<style >
  /*登录*/
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

  /*注册*/
  .register_box {
    width: 330px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 6%;
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
    margin-top: -11%;
  }
</style>

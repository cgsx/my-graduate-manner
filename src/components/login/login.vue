<template>
  <div class="login">
    <div class="content-wrap ">
      <div class="logo text-center">
        <span>T</span>
        <h2>统一受理管理平台</h2>
      </div>
      <form class="lb-input">
        <div class="username-box mb15">
          <input type="text" class="username-inp" placeholder="请输入您的账号" v-model="dologin.username" v-on:blur="checkPhone">
          <i class="iconfont icon-peoplefill"></i>
          <!--<Tooltip class="tips nullTest" content="用户名不能为空" placement="right" :always="true"-->
                   <!--:class="{hidden:tool.username}"></Tooltip>-->
          <Tooltip class="tips phoneTest" content="手机号格式不正确" placement="right" :always="true"
                   :class="{hidden:tool.iphone}"></Tooltip>
        </div>
        <div class="username-box mb15">
          <input type="password" class="username-inp" placeholder="请输入您的密码" v-model="dologin.password" >
          <i class="iconfont icon-mima"></i>
          <Tooltip class="tips nullTest" content="密码不能为空" placement="right" :always="true"
                   :class="{hidden:tool.password}"></Tooltip>
        </div>
        <div class="username-box-yzm mb15" @keyup.enter="doLogin()">
          <input type="text" class="username-inp" placeholder="请输入验证码" v-model="dologin.vcode" @input="check()" >
          <i class="iconfont icon-yanzhengma"></i>
          <span class="yzm-img cursor"><img v-bind:src="imageSrc" @click="imageChange()"> </span>
          <Tooltip class="tips nullTest" content="验证码不能为空" placement="right" :always="true"
                   :class="{hidden:tool.vcode}"></Tooltip>
        </div>
        <div class="clearfix">
          <div class="pull-left ">
            <Checkbox v-model="single">记住密码？</Checkbox>
          </div>
          <router-link to="/resetPassword">
            <div class="pull-right mt5 cursor">忘记密码？</div>
          </router-link>
        </div>

        <Button type="primary" style="width: 100%;margin-top: 10px;height:50px;font-size: 20px;" @click="doLogin()">登录</Button>

      </form>
        <div class="center noregister">没有账号？
          <router-link to="/register">
            <a href="javascript:;" >去注册</a>
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        single: false,
        imageSrc:'',
        dologin: {
          username: '14708053084',
          password: 'c123456',
          target: 'login',
          vcode: '',
        },
        evo:'manager',
        tool: {
          username:true,
          password:true,
          iphone: true,
          vcode: true,
        },
      }
    },
    mounted: function () {
      var self = this;
      this.$nextTick(function () {
        var router = self.$router.currentRoute;
        self.imageChange();
        if (router.name === 'login') {
          self.$emit('login', {login:true,one:'APImanagement'});
        }
      })
    },
    methods:{
      checkPhone(){
        let reg = /^1[1-9]\d{9}$/;
        let self = this;
        if (!reg.test(self.dologin.username)) {
          self.tool.iphone = false;
          return false;
        } else {
          self.tool.iphone = true;
          return true;
        }
      },
      check(){
        let self = this;
        let ispass = false;
        for (var key in self.dologin) {
          if (!self.dologin[key]) {
            self.tool[key] = false;
            ispass = false;
            return false;
          } else {
            self.tool[key] = true;
            ispass = true;

          }
        }
       if(self.checkPhone() == false){return false}
       if (ispass == false){return false};
        return true;
      },
      imageChange(){
        this.imageSrc = 'cnct_im/common/img?target=login&timestamp=' + (new Date()).getTime();
      },
      doLogin(){
        if (this.check()) {
          let self = this;
          self.$http.post("/sso/dologin", this.dologin,this.evo).then((m) => {
            self.imageChange();
            if (m.data.code != 100) {
              self.$Message.error(m.data.msg);
              return false;
            }
            self.$Message.success({
              content: m.data.msg,
              onClose: function () {
                self.$router.push({path: '/'});
                localStorage.setItem('realname', m.data.data.realname);
              }
            });
          }).catch(function () {
            self.imageChange();
            self.$Message.error("请求失败！");
          })
        }
      },
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

  .noregister{
    width: 100%;
    margin: 10px 0;
  }
  .tips {
    position: absolute;
    margin-left: 100%;
    margin-top: -12%;
  }
  .mt5 {
    margin-top: 4px;
  }

  .content-wrap {
    position: absolute;
    top: 9%;
    bottom: 0;
    left: 0;
    right: 0;
    width: 350px;
    margin: auto;
  }

  .logo span {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    color: #fff;
    background: #1bb394;
    font-size: 30px;
    text-align: center;
    display: inline-block;
    line-height: 60px;
    margin-bottom: 20px;
  }

  .logo h2 {
    color: #1bb394
  }

  .lb-input {
    width: 100%;
    margin-top: 40px;
  }

  .username-box, .username-box-yzm {
    position: relative;
    display: block;
    width: 100%;
    margin-bottom: 15px;
  }

  .username-box:focus {
    border: #000 1px solid
  }

  .username-box i, .username-box-yzm i {
    position: absolute;
    left: 3px;
    top: 3px;
    width: 40px;
    height: 45px;
    line-height: 45px;
    color: #bdbdbd;
    text-align: center;
    text-decoration: none;
  }

  .username-box .username-inp {
    background: #fff;
    border: none;
    width: 350px;
    padding: 0px 0 0px 40px;
    color: #333;
    height: 50px;
    line-height: 50px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
  }
  .username-box .username-inp:focus, .username-box-yzm .username-inp:focus {
    border: 1px solid #9d9d9d;
  }

  .username-box-yzm .username-inp {
    padding: 0px 130px 0px 40px;
    color: #333;
    height: 50px;
    line-height: 50px;
    border: 1px solid #e6e6e6;
    width: 350px;
    border-radius: 3px;
  }

  .username-box-yzm .yzm-img {
    width: 125px;
    height: 100%;
    position: absolute;
    right: 0px;
    top: 0px;
    border-left: #e6e6e6 1px solid;
    border-top-right-radius:5px ;
    border-bottom-right-radius:5px ;
  }
</style>

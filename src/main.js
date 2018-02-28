// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/font/iconfont.css'
import './assets/css/common.css'
import './assets/common/reseteAjax'//重写ajax
import promise from 'es6-promise'
promise.polyfill();//axios兼容ie
import axios from 'axios'
Vue.prototype.$http = axios;

Vue.use(iView);
Vue.config.productionTip = false;

//时间格式化
Vue.filter('date', function(input,nummber){
  let oDate = new Date(input);
  let date =  new Date();
  switch (nummber){
    case '1':
      return oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate()+' '+ (oDate.getHours()< 10 ? '0'+oDate.getHours() : oDate.getHours() )+':'+ (oDate.getMinutes()< 10 ? '0'+ oDate.getMinutes() : oDate.getMinutes())+':'+ (oDate.getSeconds()< 10 ? '0'+ oDate.getSeconds() : oDate.getSeconds());
      break;
    case '2':
      return oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate();
      break;
    case '3':
      if(oDate.getFullYear() == date.getFullYear() && (oDate.getMonth()+1) == (date.getMonth()+1)){
        if(oDate.getDate() == date.getDate()){
          return '今天  '+
            (oDate.getHours()<10?'0'+oDate.getHours():oDate.getHours())+
            ':'+(oDate.getMinutes()<10?'0'+oDate.getMinutes():oDate.getMinutes())+
            ':'+(oDate.getSeconds()<10?'0'+oDate.getSeconds():oDate.getSeconds());
        }else if(date.getDate() - oDate.getDate() == 1){
          return '昨天  '+
            (oDate.getHours()<10?'0'+oDate.getHours():oDate.getHours())+
            ':'+(oDate.getMinutes()<10?'0'+oDate.getMinutes():oDate.getMinutes())+
            ':'+(oDate.getSeconds()<10?'0'+oDate.getSeconds():oDate.getSeconds());
        }else if(date.getDate() - oDate.getDate() == 2){
          return '前天  '+
            (oDate.getHours()<10?'0'+oDate.getHours():oDate.getHours())+
            ':'+(oDate.getMinutes()<10?'0'+oDate.getMinutes():oDate.getMinutes())+
            ':'+(oDate.getSeconds()<10?'0'+oDate.getSeconds():oDate.getSeconds());
        }else{
          return oDate.getFullYear()+
            '-'+((oDate.getMonth()+1)<10?'0'+(oDate.getMonth()+1):(oDate.getMonth()+1))+'-'
            +(oDate.getDate()<10?+'0'+oDate.getDate():oDate.getDate())+'  '
            +(oDate.getHours()<10?'0'+oDate.getHours():oDate.getHours())+
            ':'+(oDate.getMinutes()<10?'0'+oDate.getMinutes():oDate.getMinutes())+
            ':'+(oDate.getSeconds()<10?'0'+oDate.getSeconds():oDate.getSeconds());
        }
      }else{
        return dateFarm.getFullYear()+
          '-'+((dateFarm.getMonth()+1)<10?'0'+(dateFarm.getMonth()+1):(dateFarm.getMonth()+1))+'-'
          +(dateFarm.getDate()<10?+'0'+dateFarm.getDate():dateFarm.getDate())+'  '
          +(dateFarm.getHours()<10?'0'+dateFarm.getHours():dateFarm.getHours())+
          ':'+(dateFarm.getMinutes()<10?'0'+dateFarm.getMinutes():dateFarm.getMinutes())+
          ':'+(dateFarm.getSeconds()<10?'0'+dateFarm.getSeconds():dateFarm.getSeconds());
      }
      break;
  }
});
/*vue自动获取input焦点*/
Vue.directive('autofocus', {
  update: function (el, {value}) {
    if (value) {
      el.focus();
      el.style.border = '1px solid red'
    } else {
      el.style.border = '1px solid #eee'
    }
  }
});
//字符串截断
Vue.filter('trunc', function(value,num) {
  if(!value){
    return false;
  }else if(value.length <= num){
    return value;
  }else{
    let return_value = String(value);
    return return_value.substring(0,num)+"...";
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

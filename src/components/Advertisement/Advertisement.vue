<template>
  <Row >
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">广告管理</span>
      </Col>
      <Col span="4" class="text-right" offset="15" v-show="Newlyadded">
        <span  class="backList fontWeight cursor" @click="backList">返回</span>
      </Col>
    </Row>
    <v-Advertisinglist v-on:Advertisinglist="AdvertisinglistFun" v-show="Advertisinglist"></v-Advertisinglist>
    <v-Newlyadded v-show="Newlyadded"  v-on:Newlyadded="NewlyaddedFun"></v-Newlyadded>
  </Row>
</template>

<script>
  import Advertisinglist from './Advertisinglist.vue'
  import Newlyadded from './Newlyadded.vue'
  export default {
    name: 'APImanagement',
    data () {
      return {
        Advertisinglist: true,
        Newlyadded: false
      }
    },
    methods: {
      contentHeader (obj) {
        switch (obj) {
          case 'all':
            this.all = true
            this.Pending = false
            this.Auditpassed = false
            this.Auditnotthrough = false
            this.products = false
            break
          case 'Pending':
            this.all = false
            this.Pending = true
            this.Auditpassed = false
            this.Auditnotthrough = false
            this.products = false
            break
          case 'Auditpassed':
            this.all = false
            this.Pending = false
            this.Auditpassed = true
            this.Auditnotthrough = false
            this.products = false
            break
          case 'Auditnotthrough':
            this.all = false
            this.Pending = false
            this.Auditpassed = false
            this.Auditnotthrough = true
            this.products = false
            break
          case 'products':
            this.all = false
            this.Pending = false
            this.Auditpassed = false
            this.Auditnotthrough = false
            this.products = true
            break
        }
      },
      AdvertisinglistFun (res) {
        this.Advertisinglist = res
        this.Newlyadded = !this.Advertisinglist
      },
      NewlyaddedFun(res){
          console.log(res)
          this.Newlyadded=res;
          this.Advertisinglist= !this.Newlyadded;
      },
      backList () {
        this.Advertisinglist = true
        this.Newlyadded = false
      }
    },
    components: {
      'v-Advertisinglist': Advertisinglist,
      'v-Newlyadded': Newlyadded
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .backList{padding: 5px 25px;border: 1px solid #1CB394;background: #fff;color:#1CB394;}
  .borderContent .border_bottom_position{width:35%;position:absolute;bottom:0;left:0;display: inline-block;border-bottom: 3px solid #1CB394;}
  .right_item_api{margin-left: 20px;}
  .ciclr_img img{vertical-align: middle;width: 30px;margin-right: 10px;}
  .ciclr img{width: 30px;}
  .right_item{background: #fff;border-bottom: 1px solid #DEDEDE;height:50px;}
  .left_item span{margin-right: 5px;font-size: 25px;vertical-align: bottom}
  .apiManage_one_choolse i{margin-right: 5px;vertical-align: middle}
  .apiManage_one_input input{width: 45%;height:30px;padding: 3px 30px 3px 10px;border-radius: 18px;border: 1px solid #DDDEE1;}
  .apiManage_one_input i{position: absolute;top:-3px;right:8px;color: #808080}
</style>

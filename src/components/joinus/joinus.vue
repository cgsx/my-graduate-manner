<template>
  <div>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">留言管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="height:100%">

      <div class="apiManageContainer">
        <Row class="apiManage_one">

          <i-col span="4">用户名</i-col>
          <i-col span="5">联系方式</i-col>
          <i-col span="5">企业信息</i-col>
          <i-col span="5">邮箱</i-col>
          <i-col span="5">需求</i-col>

        </Row>
        <div class="apiManaeListContainer advert">
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-for="item in advertList" :key="item.uuid">
            <i-col span="4">{{item.uname}}</i-col>
            <i-col span="5">{{item.phone}}</i-col>
            <i-col span="5">{{item.company_name}}</i-col>
            <i-col span="5">{{item.email}}</i-col>
            <i-col span="5">
              <Tooltip  class="tool" :content="item.des">
                {{item.des|trunc(8)}}
              </Tooltip></i-col>
          </Row>
          <Row class="apiManage_two code-row-bg " type="flex" justify="center" align="middle" v-if="advertList==false">
            <Col span="24" class="text-center">
            暂无数据列表
            </Col>
          </Row>
        </div>
      </div>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'APImanagement',
    data () {
      return {
        modal1: false,
        advertList: [],//广告列表列表

      }
    },
    mounted(){
      this.loadData();
    },
    methods: {

      loadData () {
        var self=this;
        self.$http.post("mg_zx/mg_word.php").then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.advertList=m.data.data;
        })
      },
      newFunction () {

      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

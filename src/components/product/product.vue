<template>
  <div>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">产品管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="height:100%">

      <div class="apiManageContainer">
        <Row class="apiManage_one">
          <Col span="10" offset="14" class="text-right">
          <span class="newAdd cursor" @click="newFunction">新增广告</span>
          <span class="apiManage_one_input">
              <i class="iconfont icon-fangdajing1" style="top: .5px"></i>
              <input type="text" placeholder="请输入关键字" v-model="advertName">
          </span>
          </Col>
        </Row>
        <div class="apiManaeListContainer advert">
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-for="item in advertList" :key="item.uuid">
            <Col span="2">
            <span class="ciclr ">
                       <img  :src="'cnct_im/common/showImage?fileId='+item.upLoadId" v-show="item.upLoadId!=null">
            <img src="../../assets/image/yzmpic.jpg" alt="" v-show="item.upLoadId==null">
            </span>
            </Col>
            <Col span="17">
            <p class="fontWeight ml20 vc">广告名称：{{item.name}}</p>
            <p>
              <span class="mar_right ml20 vc">所属栏目：{{item.column}}</span>
            </p>
            </Col>
            <Col span="4" class=" text-right cursor">
            <span class="mr10" @click="jumpToUpdate(JSON.stringify(item))">更改</span>
            <span @click="delAdvert(item.uuid)">删除</span>
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg " type="flex" justify="center" align="middle" v-if="advertList==false">
            <Col span="24" class="text-center">
            暂无数据列表
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg test" v-if="PageTotal/pageSize>1" type="flex" justify="center"
               align="middle">
            <Col span="24" class="text-center">
            <Page :total="PageTotal" show-elevator show-total :page-size='pageSize' @on-change="change"></Page>
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
        advertName: '',//搜索框名字
        currentPage: 1,//当前页码
        PageTotal: 0,//总条数
        pageSize: 0,//每页条数
      }
    },
    watch: {
      advertName: function (old, cur) {//搜索广告名
        var self = this;
        setTimeout(function () {
          if (self.advertName != old) {
            return false;
          }
          self.loadAdvert();
        }, 500)
      }
    },
    mounted(){
    },
    methods: {



      change: function (page) {
        var self = this;
        self.currentPage = page;
        self.loadAdvert();
      },
      newFunction () {
        sessionStorage.setItem("data", '');
        this.$router.push({name: 'Newlyadded'});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .newAdd {
    background: #23D7BC;
    color: #fff;
    border-radius: 20px;
    padding: 7px 17px;
  }

  .borderContent .border_bottom_position {
    width: 57%;
    position: absolute;
    bottom: 0;
    left: 22%;
    display: inline-block;
    border-bottom: 3px solid #1CB394;
  }

  .right_item_api {
    margin-left: 20px;
  }

  .advert  .ciclr {
    display: inline-block;
    width: 100px;
    height: 60px;
    overflow: auto;
  }

  .advert .ciclr img {
    width: 100%;
    height: 100%;
    transition: all 0.6s;
  }

  .advert .ciclr img:hover {
    transform: scale(1.4);
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

  .apiManage_one_choolse i {
    margin-right: 5px;
    vertical-align: middle
  }

  .apiManage_one_input {
    position: relative;
  }

  .apiManage_one_input input {
    width: 45%;
    height: 30px;
    padding: 3px 30px 3px 10px;
    border-radius: 18px;
    border: 1px solid #DDDEE1;
  }

  .apiManage_one_input i {
    position: absolute;
    right: 8px;
    color: #808080
  }

  .apiManage_one {
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
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
  }

  .apiManageContainer {
    width: 100%;
    height: 93%;
    background-color: #fff;

  }

  .test {
    margin-bottom: 40px;
    border-bottom: 0;
  }
</style>

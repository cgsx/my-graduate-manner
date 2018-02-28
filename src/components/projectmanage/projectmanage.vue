<template>
  <Row>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">项目管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="height:100%">
      <div class="apiManageContainer">
        <Row class="apiManage_one">
          <Col span="14" class="fontWeight apimage_hidden">
          共{{PageTotal}}个项目
          </Col>
          <Col span="9" offset="1" class="text-right">
          <span class="apiManage_one_input">
              <i class="iconfont icon-fangdajing1" style="top: -1.5px"></i>
              <input type="text" placeholder="请输入关键字" v-model="projectName">
          </span>
          </Col>
        </Row>
        <div class="apiManaeListContainer">
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-for="item in projectList"
               :key="item.createTime">
            <Col span="3">
            <span class="ciclr">
              <img src="../../assets/image/banner1.jpg" alt="" v-show="item.url==null">
              <img :src="'/cnct_im/common/showImage?fileId=' + item.url" alt="" v-show="item.url!=null">
            </span>
            </Col>
            <Col span="17">
            <p class="fontWeight">{{item.projectName}}</p>
            <p>
              <span class="mar_right  color_aaa">来源：{{item.spaceName}}</span>
            </p>
            </Col>
            <Col span="2" class="color_aaa">
            {{item.realname}}</Col>
            <Col span="2" class="color_aaa text-right">
            {{item.createTime | date('2')}}</Col>
          </Row>
          <Row class="apiManage_two code-row-bg " style="border-bottom: 0" type="flex" justify="center" align="middle"
               v-if="!projectList.length">
            <Col span="24" class="text-center">
            暂无数据列表
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg test" v-if="PageTotal/pagesize > 1 " type="flex" justify="center"
               align="middle">
            <Col span="24" class="text-center" style=" margin-bottom: 60px;">
            <Page :total="PageTotal" show-elevator show-total :page-size='pagesize' @on-change="change"></Page>
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
        projectList: [],//项目列表
        projectName: '',//搜索框名字
        currentPage: 1,//当前页码
        PageTotal: 0,//总条数
        pagesize: 0,//每页条数
      }
    },
    mounted: function () {
      this.$emit('login', {login:false,one:'projectmanage'});
      this.loadProject();
    },
    watch: {
      projectName: function (old, cur) {
        var self = this;
        setTimeout(function () {
          if (self.projectName != old) {
            return false;
          }
          self.loadProject();
        }, 500)
      }
    },
    methods: {
      loadProject(){     //加载项目管理列表
        var self = this;
        self.$http.get("/project/Managelist?currentPage=" + self.currentPage + '&name=' + self.projectName).then((m) => {
          if (m.data.code != 100) {
            self.$Message.error(m.data.msg);
            return false;
          }
          self.projectList = m.data.data.list;
          self.PageTotal = m.data.data.total;
          self.pagesize = m.data.data.pageSize;
        }).catch(function () {
          self.$Message.error('请求失败！');
        })
      },
      change: function (page) {
        var self = this;
        self.currentPage = page;
        self.loadProject();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .borderContent .border_bottom_position {
    width: 35%;
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

  .ciclr {
    display: inline-block;
    width: 100px;
    height:60px;
    overflow: auto;
  }

  .apiManaeListContainer .ciclr img {
    width: 100%;
    height: 100%;
    transition: all 0.6s;
  }

  .apiManaeListContainer .ciclr img:hover {
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

  .textarea_reson {
    width: 100%;
    border: 1px solid #F1F1F1;
    border-radius: 8px;
    padding: 10px;
  }

  .apiManage_one_choolse {
    margin-right: 10px;
    padding: 4px 10px;
    border-radius: 10px;
    border: 1px solid #DDDEE1;
    background: #fff;
  }

  .apiManage_one_choolse i {
    margin-right: 5px;
    vertical-align: middle
  }

  .apimage_hidden {
    line-height: 30px;
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
    color: #808080;
    z-index: 100
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
  .apiManageContainer {
    width: 100%;
    height: 93%;
    background-color: #fff;
  }

  div.test {
    border-bottom: 0;
  }
</style>

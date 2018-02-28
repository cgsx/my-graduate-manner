<template>
  <Row >
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">解决方案管理</span>
      </Col>
      <Col span="2" offset="8" class=" cursor"  v-bind:class="{ borderContent: all }"  >
      <span  v-on:click=" contentHeader ('all')">全部<span v-if="all">({{total}})</span></span>
      <span class="border_bottom_position"></span>
      </Col>
      <Col span="2" class=" cursor" v-bind:class="{ borderContent: Pending }">
      <span v-on:click=" contentHeader ('Pending')">待审<span v-if="Pending">({{total}})</span></span>
      <span class="border_bottom_position" style="width: 55%;"></span>
      </Col>
      <Col span="2" class=" cursor" v-bind:class="{ borderContent: Auditpassed }">
      <span v-on:click=" contentHeader ('Auditpassed')">审核通过<span v-if="Auditpassed ">({{total}})</span></span>
      <span class="border_bottom_position" style="width: 60%;"></span>
      </Col>
      <Col span="2" class="cursor" v-bind:class="{ borderContent: Auditnotthrough }">
      <span v-on:click=" contentHeader ('Auditnotthrough')">审核不通过<span v-if="Auditnotthrough ">({{total}})</span></span>
      <span class="border_bottom_position" style="width: 75%;"></span>
      </Col>
      <Col span="3" class="cursor lastMenu" v-bind:class="{ borderContent: products }" >
      <span v-on:click=" contentHeader ('products')">已强制下架产品<span v-if="products">({{total}})</span></span>
      <span class="border_bottom_position" style="width: 70%;"></span>
      </Col>
    </Row>
    <Row class="apiManage" style="top: 0;bottom: 0;left: 0;right:0;">
      <div class="apiManageContainer">
        <Row class="solution_one">
          <Col span="14" class="apimage_hidden" v-if="Auditpassed">
          <Checkbox >已选择1项</Checkbox>
          <span class="solution_one_choolse cursor " @click="modal1 = true">
                   <i class="iconfont icon-chahao"></i>强制下架
              </span>
          <Modal
            v-model="modal1"
            title="下架原因"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>
              <textarea class="textarea_reson" name="" cols="30" rows="10" placeholder="请填写下架原因"></textarea>
            </p>
          </Modal>
          </Col>
          <Col span="14"  style="height: 1px" v-if="!Auditpassed"></Col>
          <Col span="9" offset="1">
          <Select v-model="apiFirst" style="width:24%" placeholder="大类选择" @on-change="changeClassfy">
            <Option v-for="(item,key) in  firstClassifyIdList" :value="item.uuid" :key="key">{{ item.classify }}</Option>
          </Select>
          <Select v-model="apiSecond" style="width:24%;" placeholder="小类选择" @on-change="changeClassfy">
            <Option v-for="item in  secondClassifyIdList" :value="item.uuid" :key="item.uuid">{{ item.classify }}</Option>
          </Select>
          <span class="solution_one_input">
             <input type="text" placeholder="请输入关键字" v-model="searchKey">
             <i class="iconfont icon-fangdajing1 slution" style="top: -1px"></i>
          </span>
          </Col>
        </Row>
        <div class="apiManaeListContainer">
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" >
            <Col span="2">
            <CheckboxGroup v-model="disabledGroup">
              <Checkbox label=""></Checkbox>
            </CheckboxGroup>
            </Col>
            <Col span="2">
            <span class="circl">
              <img src="../../assets/image/tx.png" alt="">
            </span>
            </Col>
            <Col span="8">
            <p class="fontWeight">短信服务</p>
            <p >
              <span class="mar_right  color_aaa">来源：贝贝空间站</span>
              <span class="solution_one_choolse  mar_right">生活</span>
              <span class="solution_one_choolse  mar_right">服务</span>
            </p>
            </Col>
            <Col span="2" class="color_aaa">发布者姓名</Col>
            <Col span="2" class="color_aaa">2017/12/4</Col>
            <Col span="4" class="color_aaa text-right">待审核</Col>
            <Col span="4" class="color_aaa text-right">
            <span class="reson cursor" @click="modal2 = true"> 原因查看</span>
            <Modal
              v-model="modal2"
              title="下架原因"
            >
              <p>
                <textarea class="textarea_reson" name="" readonly id="" cols="30" rows="10" value="">请填写下架原因</textarea>
              </p>
              <div slot="footer">
              </div>
            </Modal>
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" >
            <Col span="2">
            <CheckboxGroup v-model="disabledGroup">
              <Checkbox label=""></Checkbox>
            </CheckboxGroup>
            </Col>
            <Col span="2">
            <span class="circl">
              <img src="../../assets/image/tx.png" alt="">
            </span>
            </Col>
            <Col span="8">
            <p class="fontWeight">短信服务</p>
            <p >
              <span class="mar_right  color_aaa">来源：贝贝空间站</span>
              <span class="solution_one_choolse  mar_right">生活</span>
              <span class="solution_one_choolse  mar_right">服务</span>
            </p>
            </Col>
            <Col span="4" class="color_aaa">发布者姓名</Col>
            <Col span="4" class="color_aaa">2017/12/4</Col>
            <Col span="4" class="color_aaa text-right">待审核</Col>
          </Row>
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" >
            <Col span="2">
            <CheckboxGroup v-model="disabledGroup">
              <Checkbox label=""></Checkbox>
            </CheckboxGroup>
            </Col>
            <Col span="2">
            <span class="circl">
              <img src="../../assets/image/tx.png" alt="">
            </span>
            </Col>
            <Col span="8">
            <p class="fontWeight">短信服务</p>
            <p >
              <span class="mar_right  color_aaa">来源：贝贝空间站</span>
              <span class="solution_one_choolse  mar_right">生活</span>
              <span class="solution_one_choolse  mar_right">服务</span>
            </p>
            </Col>
            <Col span="4" class="color_aaa">发布者姓名</Col>
            <Col span="4" class="color_aaa">2017/12/4</Col>
            <Col span="4" class="color_aaa text-right">待审核</Col>
          </Row>
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" >
            <Col span="2">
            <CheckboxGroup v-model="disabledGroup">
              <Checkbox label=""></Checkbox>
            </CheckboxGroup>
            </Col>
            <Col span="2">
            <span class="circl">
              <img src="../../assets/image/tx.png" alt="">
            </span>
            </Col>
            <Col span="8">
            <p class="fontWeight">短信服务</p>
            <p >
              <span class="mar_right  color_aaa">来源：贝贝空间站</span>
              <span class="solution_one_choolse  mar_right">生活</span>
              <span class="solution_one_choolse  mar_right">服务</span>
            </p>
            </Col>
            <Col span="4" class="color_aaa">发布者姓名</Col>
            <Col span="4" class="color_aaa">2017/12/4</Col>
            <Col span="4" class="color_aaa text-right">待审核</Col>
          </Row>
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" >
            <Col span="2">
            <CheckboxGroup v-model="disabledGroup">
              <Checkbox label=""></Checkbox>
            </CheckboxGroup>
            </Col>
            <Col span="2">
            <span class="circl">
              <img src="../../assets/image/tx.png" alt="">
            </span>
            </Col>
            <Col span="8">
            <p class="fontWeight">短信服务</p>
            <p >
              <span class="mar_right  color_aaa">来源：贝贝空间站</span>
              <span class="solution_one_choolse  mar_right">生活</span>
              <span class="solution_one_choolse  mar_right">服务</span>
            </p>
            </Col>
            <Col span="4" class="color_aaa">发布者姓名</Col>
            <Col span="4" class="color_aaa">2017/12/4</Col>
            <Col span="4" class="color_aaa text-right">待审核</Col>
          </Row>
          <Row class="apiManage_two code-row-bg test" type="flex" justify="center" align="middle" >
            <Col span="24" class="text-center">
            <Page :total="total" :page-size='5' @on-change=""></Page>
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
        model2: '',
        model3: '',
        disabledGroup: ['苹果'],
        modal1: false,
        modal2: false,
        all: true,
        Pending: false,
        Auditpassed: false,
        Auditnotthrough: false,
        products: false,
        postUuid:[],//多选框的值
        total:0,//分页数据总数
        pageSize:5,//记录分页每页展示的条数
        currentPage:1,//记录分页中，当前在第几页
        firstClassifyIdList:[],//api大类的列表
        secondClassifyIdList:[],//api小类的列表
        apiFirst:'',
        apiSecond:'',
        classifyId:'',//api分类选择后的值
        list:[],//页面列表数据
        searchKey:'',//搜索关键字
      }
    },
    created: function () {
      let self = this;
      this.$nextTick(function () {
       // self.loadDefaultProduct();//页面产品初始化列表
        self.$emit('login', false);
      })
    },
    watch:{
      searchKey(cur, old){   //模糊搜索
        let self = this;
        setTimeout(function () {
          self. loadDefaultProduct()
        }, 500);
      },
      apiFirst: function () {//找到分组的下级数据
        let self = this;
        if(self.apiFirst != ''){
          self.secondClassifyIdList = self.firstClassifyIdList[self.apiFirst-1].childrenList;
        }else{
          self.secondClassifyIdList = [{uuid:'',classify:'全部'}]
        }

      },
    },
    methods: {
      check: function () {//单选
        // this.showDel = (this.postUuid.length > 0 ? true : false);
        if (this.postUuid.length == this.list.length) {
          this.isCheckAll = true;
        } else {
          this.isCheckAll = false;
        }
      },
      checkAll: function () {//全选
        let self = this;
        self.postUuid = [];
        if (self.isCheckAll) {
          self.list.forEach(function (value, index) {
            self.postUuid.push(value.uuid)
            console.log(value.uuid)
          });
          self.showDel = self.postUuid.length == 0 ? false : true;
        } else {
          self.showDel = false;
        }
      },
      loadDefaultProduct(){//首页加载五个默认产品
        let self = this;
        self.postUuid=[]; //将选项的清零
        self.total=0;
        self.$http.post('/product/backstageFindProducts',{state:this.state,name:this.searchKey,classifyId:this.classifyId,currentPage:this.currentPage})
          .then(function (res) {
            if (res.data.code != 100) {
              self.$Message.error(res.data.msg);
              return false;
            }
            self.list = res.data.data.pageInfo.list;
            self.total=res.data.data.pageInfo.total
            self.pageSize=res.data.data.pageInfo.pageSize
            self.currentPage=res.data.data.pageInfo.prePage+1
            for(let i=0;i<self.list.length;i++){         //根据后台的状态码转换为对应的中文
              switch (self.list[i]['product_state']){
                case  2:
                  self.list[i]['product_state'] = '待审'
                  break
                case  3:
                  self.list[i]['product_state'] = '审核不通过'
                  break
                case  4:
                  self.list[i]['product_state'] = '审核通过'
                  break
                case  6:
                  self.list[i]['product_state'] = '强制下架'
                  break
              }
            }
            self.firstClassifyIdList = res.data.data.classifies;
            self.firstClassifyIdList.unshift({uuid:'',classify:'全部',childrenList:[]}) //给下拉框添加一个全部分类
            self.secondClassifyIdList = self.firstClassifyIdList[1].childrenList; //给第二个下拉框赋初值
            self.secondClassifyIdList.unshift({uuid:'',classify:'全部'})



          }).catch(function () {
          self.$Message.error('请求失败！');
        })
      },
      changeClassfy(v){
        this.classifyId=v
        this.loadDefaultProduct()
      },
      ok () {
        this.$Message.info('成功')
      },
      cancel () {
        this.$Message.info('取消成功')
      },
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .reson{padding: 3px 10px; border: 1px solid #1CB394;border-radius: 10px;color: #1CB394;}
  .borderContent .border_bottom_position{width:35%;position:absolute;bottom:0;left:0;display: inline-block;border-bottom: 3px solid #1CB394;}
  .right_item_api{margin-left: 20px;}
  .ciclr_img img{vertical-align: middle;width: 30px;margin-right: 10px;}
  .ciclr img{width: 30px;}
  .right_item{background: #fff;border-bottom: 1px solid #DEDEDE;height:50px;}
  .left_item span{margin-right: 5px;font-size: 25px;vertical-align: bottom}
  .textarea_reson{width: 100%;border: 1px solid #F1F1F1;border-radius: 18px;padding: 10px;}
  .solution_one_choolse{margin-right:10px;padding: 4px 10px;border-radius: 18px;border: 1px solid #DDDEE1;background: #fff;}
  .solution_one_choolse i{margin-right: 5px;vertical-align: middle}
  .apimage_hidden{line-height:30px;}
  .solution_one_input{position: relative;margin-left: 5px}
  .solution_one_input input{width: 45%;height:30px;padding: 3px 30px 3px 10px;border-radius: 18px;border: 1px solid #DDDEE1;}
  .lastMenu{
    float: right;
  }
   .slution{
    position: absolute;
     z-index: 100;
    right: 8px;
    color: #808080;
  }
  .solution_one{background: #FCFCFC;padding: 10px;padding-left: 20px;}
  /*.apiManage{*/
    /*padding: 10px;*/
    /*bottom: 0px;*/
    /*right: 0px;*/
    /*position: relative;*/
    /*!* width: 82.5%; *!*/
    /*!* left: 16.5% !important; *!*/
    /*!* top: 103px !important; *!*/
    /*height: 100% !important;*/


  /*}*/
  .solution_one .ivu-select-selection{
    border-radius: 18px;
  }
  .apiManage {
    padding: 10px;
    bottom: 0px;
    right: 0px;
    position: fixed;
    width: 82.5%;
    left: 16.5% !important;
    top: 103px !important;
    height: 100% !important;
    overflow: auto;

  }
  .apiManageContainer{

    width: 100%;
    height: 93%;
    background-color:#fff ;


  }
  .test{
    margin-bottom: 100px;
  }

  .apiManage_two{vertical-align:middle;background: #fff;padding:20px;border-bottom: 1px solid #eee;}
</style>

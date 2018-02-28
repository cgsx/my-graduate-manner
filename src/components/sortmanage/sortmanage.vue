<template>
  <Row>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">分类管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="top: 0;bottom: 0;left: 0;right:0;overflow: auto;">
      <Row type="flex" justify="center" align="middle" class="code-row-bg" style="align-items:stretch;position: fixed;height: 100%;width: 82%;overflow: auto;">
        <Col span="5" style="background: #FCFCFC">
        <p class="text-center">
          <button class="newgrouping cursor" @click="modal1 = true">新建一级分类</button>
        </p>
            <div  class="pd-10">
              <p v-for="(item,index) in resData" v-bind:class="{sotr_menu:state == index }" @click="switchMenu(index)">
                <Tooltip :content=item.classify>
                  {{item.classify |  trunc(6)}}
                </Tooltip>
                <span >
                  <i class="iconfont icon-jia" @click="modal2=true;classifyNama=''"></i>
                  <i class="iconfont icon-pen" @click="modal3=true"></i>
                  <i class="iconfont icon-shanchu1" @click="modal4=true"></i>
                </span>
              </p>
              <p v-if="resData.length == 0">暂无一级分类</p>
            </div>
        </Col>
        <Col span="19" >
        <div class="apiManageContainer">
        <Row class="sortmanage_one" style="line-height: 30px;">
          <Col span="3" class=" cursor text-center" v-bind:class="{ borderContent: Rolemember }">
          <span >分类列表</span>
          <span class="border_bottom_position"></span>
          </Col>
          <Col span="13" offset="7" class="text-right" style="margin-left: 33.3333%;">
          <Checkbox v-model="isCheckAll"  @on-change="checkAll">已选择{{postUuid.length}}项</Checkbox>
          <span class="sortmanage_one_choolse cursor "  v-if="postUuid.length==1" @click="modal6=true;">
                   <i class="iconfont icon-xiugai"></i>修改
                 </span>
          <span class="sortmanage_one_choolse cursor " v-if="postUuid.length>=1" @click="modal5=true">
                   <i class="iconfont icon-shanchu1"  ></i>删除
                 </span>
          <span class="sortmanage_one_input ">
            <input type="text" placeholder="请输入关键字" v-model="searchKey">
            <i class="iconfont icon-fangdajing1" style="top:-5px"></i>
          </span>
          </Col>
        </Row>
          <div class="sortmanageListContainer">
          <div v-show="Rolemember">
            <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-for="(item,index) in list" :key="index">
              <Col span="2">
              <CheckboxGroup @on-change="check" :value="item.uuid" :id="item.uuid" v-model="postUuid">
                <Checkbox :label="item.uuid"></Checkbox>
              </CheckboxGroup>
              </Col>
              <Col span="4">
               <span>
                 {{item.classify }}
               </span>
              </Col>
              <Col span="18" class="color_aaa text-right">
              </Col>
            </Row>
            <Row class="apiManage_two code-row-bg test" type="flex" justify="center" align="middle"
                 v-if="list.length == 0">
              <Col span="24" class="text-center">
              <span>暂无数据</span>
              </Col>
            </Row>
            <Row  v-if="total/pageSize > 1" class="apiManage_two code-row-bg sortmanage_test" type="flex" justify="center" align="middle">
              <Page :total="total" show-elevator show-total :page-size='pageSize' :current="currentPage"
                    @on-change="pagechange"></Page>
            </Row>
          </div>
          </div>
        </div>
        </Col>
      </Row>
    </Row>
    <Modal v-model="modal1" title="新建一级分类">
      <!--<p class="radio">-->
        <!--<label for="type">类型选择</label>-->
        <!--<RadioGroup v-model="button1" name="type" type="button">-->
          <!--<Radio label="产品" ></Radio>-->
          <!--<Radio label="解决方案" class="solutionBtn"></Radio>-->
        <!--</RadioGroup>-->
      <!--</p>-->
      <p class="mt10" style="margin-top: 15px">
        <label for="">一级分类</label>
        <input type="text"  v-model="addClassifyName" class="group" name="" placeholder="请输入一级分类名称">
      </p>
      <p class="validEroor" v-if="valids.modal1">分类名不能为空，且长度不能超过8个字符</p>
      <div slot="footer">
        <Button type="ghost" size="large" @click="cancel('modal1')">取消</Button>
        <Button type="primary" size="large" @click="addFirst('modal1')" >确定</Button>
      </div>
    </Modal>

    <Modal v-model="modal2" title="新建二级分类">
    <p>
      <div class="mt10">
    <label for="" >分类名称</label>
      <input type="text" v-model="addClassifyName" class="group" placeholder="请输入分类名称">
    </div>
      </p>
      <p class="validEroor" v-if="valids.modal2">分类名不能为空，且长度不能超过8个字符</p>
      <div slot="footer">
        <Button type="ghost" size="large" @click="cancel('modal2')">取消</Button>
        <Button type="primary" size="large" @click="addSecond('modal2')" >确定</Button>
      </div>
    </Modal>

    <Modal v-model="modal3" title="修改一级分类">
      <p>
      <div class="mt10">
        <label for="" >分类名称</label>
        <input type="text" v-model="classifyName" class="group" placeholder="请输入分类名称">
      </div>
      </p>
      <p class="validEroor" v-if="valids.modal3">分类名不能为空，且长度不能超过8个字符</p>
      <div slot="footer">
        <Button type="ghost" size="large" @click="cancel('modal3')">取消</Button>
        <Button type="primary" size="large" @click="updateFist('modal3')" >确定</Button>
      </div>
    </Modal>

    <Modal v-model="modal6" title="修改二级分类">
      <p>
      <div class="mt10">
        <label for="" >分类名称</label>
        <input type="text" v-model="upSecondClassifyName" class="group" placeholder="请输入分类名称">
      </div>
      </p>
      <p class="validEroor" v-if="valids.modal6">分类名不能为空，且长度不能超过8个字符</p>
      <div slot="footer">
        <Button type="ghost" size="large" @click="cancel('modal6')">取消</Button>
        <Button type="primary" size="large" @click="updateSecond('modal6')" >确定</Button>
      </div>
    </Modal>

    <Modal v-model="modal4" title="删除一级分类">
      <p>
      <div class="mt10">
      <Icon style="font-size: 20px" type="alert-circled" color="yellow"></Icon>
        <span style="margin-left: 5px">是否删除此一级分类</span>
      </div>
      </p>
      <div slot="footer">
        <Button type="ghost" size="large" @click="cancel('modal4')">取消</Button>
        <Button type="primary" size="large" @click="deleteProduct(1,'modal4')" >确定</Button>
      </div>

    </Modal>
    <Modal v-model="modal5" title="删除分类">
      <p>
      <div class="mt10">
        <Icon style="font-size: 20px" type="alert-circled" color="yellow"></Icon>
        <span style="margin-left: 5px">是否这些分类</span>
      </div>
      </p>
      <div slot="footer">
        <Button type="ghost" size="large" @click="cancel('modal5')">取消</Button>
        <Button type="primary" size="large" @click="deleteProduct(2,'modal5')" >确定</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
  export default {
    name: 'APImanagement',
    data () {
      return {
        pageSize: 5,//记录分页每页展示的条数
        currentPage: 1,//记录分页中，当前在第几页
        total: 0,//分页数据总数
        modal3:false,
        modal4:false,
        modal5:false,
        modal6:false,
        modal1: false,
        valids:{
          modal2:false,
          modal3:false,
          modal6:false,
          modal1: false,
        },
        Rolemember: true,
        permission: false,
        value3: '1',
        button1:"产品",
        modal2:false,
        state:0,    //当前菜单标识
        searchKey:'',  //搜索关键字
        parentId:'',//父类id
        resData:'', //服务器返回的数据
        list:'',// 当前的列表数据
        postUuid:[],
        isCheckAll:false,
        classifyName:'',  //修改分类是保存分类名
        upSecondClassifyName:'',//修改二级分类时保存分类名
        uuid:'',  //暂存item的uuid
        addClassifyName:''//添加分类是保存分类名

      }
    },
    watch:{
      searchKey(cur, old){   //模糊搜索
        this.parentId = this.resData[this.state].uuid
        let self = this;
        setTimeout(function () {
          if (self.searchKey != cur) {
            return false;
          }
          self.loadDefualt2()
        }, 500);
      }
    },
    mounted(){
      this.$emit('login',{login:false,one:'sortmanage'});
        this.lodDefult()
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
            self.postUuid.push(value.uuid);
          });
          self.showDel = self.postUuid.length == 0 ? false : true;
        } else {
          self.showDel = false;
        }
      },
      lodDefult(index){   //  index表明当前加载第几项
        if(!index){
            index = 0
        }
        this.postUuid=[]   //清空选着框
        let self = this
        this.$http.post("/productClassify/list",{parentId:this.parentId,name:this.searchKey,currentPage:this.currentPage})
          .then(function (res) {
             if(res.data.code !== 100){
               self.$Message.error(res.data.msg);
               return false;
             }
             if(res.data.length == 0){
                 return false
             }
               self.initData(self,res,index)
          })
          .catch(function () {
            self.$Message.error('请求失败！');
          })
      },
      loadDefualt2 (){        //当直接返回list数据是调用此方法
        let self = this
        this.parentId = this.resData[this.state].uuid
        this.postUuid=[]   //清空选着框
        this.$http.post("/productClassify/list",{parentId:this.parentId,name:this.searchKey,currentPage:this.currentPage})
          .then(function (res) {
            if(res.data.code !== 100){
              self.$Message.error(res.data.msg);
              return false;
            }
            self.list = res.data.data.list
            self.total = res.data.data.total;                     //取数据总条数
            self.pageSize = res.data.data.pageSize;              //取每页大小
            self.currentPage = res.data.data.prePage + 1;
          })
          .catch(function () {
            self.$Message.error( '请求失败');
          })
      },
      initData(self,res,index){
        self.classifyName = ''
        self.addClassifyName = ''
        self.upSecondClassifyName = ''
        self.resData = res.data.data
        self.state = index
        self.list = res.data.data[index].pageInfo.list
        self.total = res.data.data[index].pageInfo.total;                     //取数据总条数
        self.pageSize = res.data.data[index].pageInfo.pageSize;              //取每页大小
        self.currentPage = res.data.data[index].pageInfo.prePage + 1;
      },
      addProduct(uuid,classify,parentId,valid,modal){
          console.log(classify.length)
          if( (classify.length == 0) || (classify.length>8)){
            this.valids[modal] = true
            return false
          }
          let self = this
          this.$http.post("/productClassify/insertOrUpdate",{uuid:uuid,classify:classify,parentId:parentId,valid:valid})
            .then(function (res) {
              if(res.data.code !== 100){
                self.$Message.error(res.data.msg);
                self[modal] = true
                return false;
              }
              self[modal] = false
              self.initData(self,res,self.state)
            })
            .catch(function () {
              self[modal] = true
              self.postUuid = []
              self.$Message.error('请求失败！');
            })
      },
      addFirst(modal){
        this.addProduct('',this.addClassifyName,'','Y',modal)
      },
      addSecond(modal){
        this.addProduct('',this.addClassifyName,this.uuid,'Y',modal)
      },
      updateFist(modal){
        this.addProduct(this.uuid,this.classifyName,'','Y',modal)
      },
      updateSecond(modal){
        this.addProduct(this.postUuid[0],this.upSecondClassifyName,this.uuid,'Y',modal)
      },
      deleteProduct(delState,modal){
        let self = this
        let id = ''
        if(delState == 1){
          id = this.uuid
        }else if(delState == 2){
          id = this.postUuid.join(',')
        }
        this.$http.get("/productClassify/deleteClassify?classifyId="+ id )
          .then(function (res) {
            if(res.data.code !== 100){
              self.$Message.error(res.data.msg);
              self[modal] = true
              return false;
            }
            self.postUuid = []
            self[modal] = false
            if(self.state == self.resData.length-1 && delState == 1){
                self.state = self.state-1
            }
            self.initData(self,res,self.state)
          })
          .catch(function () {
            self[modal] = true
            self.$Message.error('请求失败！');
          })
      },
      ok () {
        this.$Message.info('成功')
      },
      cancel (modal) {
        this.classifyName = ''
        this.upSecondClassifyName = ''
        this.addClassifyName = ''
        this[modal] = false
        this.valids[modal] = false
      },
      switchMenu(index){
        this.state = index
        this.uuid = this.resData[index].uuid
        this.classifyName = this.resData[index].classify
        this.postUuid = []
        this.isCheckAll = false
        let self = this
        self.list = self.resData[index].pageInfo.list
        self.total = self.resData[index].pageInfo.total;                     //取数据总条数
        self.pageSize = self.resData[index].pageInfo.pageSize;              //取每页大小
        self.currentPage = self.resData[index].pageInfo.prePage + 1;
        self.list = self.resData[index].pageInfo.list
      },
      pagechange: function (page) {
        this.currentPage = page
        this.loadDefualt2()
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .text_area {
    width: 85%;
    border: 1px solid #eee;
    padding: 8px;
    border-radius: 5px;
    height: 100px;
    overflow: auto
  }

  .label {
    width: 12%;
    display: inline-block;
    vertical-align: top;
  }

  .group {
    width: 85%;
    padding: 5px;
    border: 1px solid #eee;
    border-radius: 5px;
  }

  .newgrouping {
    background: #fff;
    border: 1px solid #eee;
    padding: 5px 10px;
    width: 80%;
    border-radius: 20px;
    margin-top: 10px;
  }

  .circle {
    display: inline-block;
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    background: #00c1de;
    vertical-align: middle;
    color: #fff;
    line-height: 30px;
    text-align: center;
    margin-right: 10px;
  }

  .sortmanage_one .borderContent .border_bottom_position {
    width: 70%;
    position: absolute;
    bottom: -11px;
    left: 17%;
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

  .ciclr img {
    width: 30px;
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

  .sortmanage_one_choolse {
    margin-right: 10px;
    padding: 4px 10px;
    border-radius: 18px;
    border: 1px solid #DDDEE1;
    background: #fff;
  }

  .sortmanage_one_choolse i {
    margin-right: 5px;
    vertical-align: middle
  }

  .sortmanage_one_input {
    position: relative;
  }

  .sortmanage_one_input input {
    width: 45%;
    height: 30px;
    padding: 3px 30px 3px 10px;
    border-radius: 18px;
    border: 1px solid #DDDEE1;
  }

  .sortmanage_one_input i {
    position: absolute;
    right: 8px;
    color: #808080;
    z-index: 100
  }
 .sortmanage_one_choolse{
   border-radius: 18px;
 }
 .sortmanage_one {
    background: #fff;
    padding: 10px;
    padding-left: 20px;
    border-bottom: 1px solid #eee;
  }

  .apiManage {
    padding: 10px;
  }

  .apiManage_two {
    vertical-align: middle;
    background: #fff;
    padding: 20px;
    border-bottom: 1px solid #eee;
  }

  .collapse {
    border: 0;
    background-color: rgb(252, 252, 252);
    line-height: 28px;
  }

  .collapse .panel {
    border-top: none;
  }

  .collapse .ivu-collapse-content-box {
    padding-top: 0;
    padding-bottom: 0;
  }

  .collapse .ivu-collapse-content {
    background-color: rgb(252, 252, 252);
  }
  .pd-10{
    margin-top: 10px;
  }

  .pd-10 p {
    padding-left: 2em;
    clear: both;
    height: 49px;
    line-height: 49px;
    padding-right: 7px;
  }

  .pd-10 span {
    visibility: hidden;
    float: right;

  }

  .pd-10 span i {
    margin-left: 3px;
    color: #b0b0b0;
  }

  .pd-10 p:hover {
    background-color: #f2f2f2;
  }

  .pd-10  p:hover span {
    visibility: visible;
  }
.radio .ivu-radio-group-button .ivu-radio-wrapper{
  border-radius: 50px;
  border-color: #efefef;
  box-sizing: border-box;
  width: 100px;
  outline-color: #efefef;
  text-align: center;
  margin-left: 10px;
  }
  .radio .ivu-radio-group-button .ivu-radio-wrapper-checked{
    background-color:#23d7bc ;
    color: #ffffff;
    box-shadow:none;
    border: 1px solid #dddee1;
  }
  .radio .ivu-radio-group .ivu-radio-wrapper:hover{

    background-color:#23d7bc ;
    color: #ffffff;

  }
  .upload{
float: left;
  }
  .pd-10 p:hover{
    cursor: pointer;
  }
  .sortmanage_one .ivu-checkbox-wrapper {
    margin-right: 7px ;
  }
  .up-s button{
    background-color: #fcfcfc;
    width: 100px;
    height: 28px;
    text-align: center;
    border-radius: 50px;
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

  .apiManageContainer{
    width: 100%;
    height: 93%;
    background-color:#fff ;
  }
  .sortmanageListContainer {
    height: 99%;
  }
  .sortmanage_test{
    margin-bottom: 100px;
  }
  .solutionBtn:after{
    display: none !important;
  }
  .solutionBtn:before{
    display: none !important;
  }
  .sotr_menu{
    color: #1CB394 !important;
    border-right: 2px solid #1CB394 !important;

  }
.validEroor{
  margin-top: 10px;
  color: red;
}


</style>

<template>
  <Row style="">
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">API管理</span>
      </Col>

      <Col span="2" offset="8" v-on:click.native=" contentHeader ('')" class="center cursor" v-bind:class="{ borderContent: !state }">
      <span >全部<span v-if="!state">({{total}})</span></span>
      <span class="border_bottom_position"></span>
      </Col>
      <Col span="2" class="center cursor" v-on:click.native=" contentHeader ('2')" v-bind:class="{ borderContent: state== '2' }">
      <span >待审<span v-if="state== '2'">({{total}})</span></span>
      <span class="border_bottom_position" ></span>
      </Col>
      <Col span="2" class="center cursor" v-on:click.native=" contentHeader ('4')" v-bind:class="{ borderContent: state== '4' }">
      <span >审核通过<span v-if="state== '4' ">({{total}})</span></span>
      <span class="border_bottom_position" ></span>
      </Col>
      <Col span="2" class="center cursor" v-on:click.native=" contentHeader ('3')" v-bind:class="{ borderContent: state== '3' }">
      <span >审核不通过<span v-if="state== '3' ">({{total}})</span></span>
      <span class="border_bottom_position" ></span>
      </Col>
      <Col span="3" class="center cursor lastMenu" v-on:click.native=" contentHeader ('6')" v-bind:class="{ borderContent: state== '6' }">
      <span >已强制下架产品<span v-if="state== '6'">({{total}})</span></span>
      <span class="border_bottom_position" ></span>
      </Col>
    </Row>
    <Row class="apiManage" style="height:100%;background: #EBEFF2;padding: 10px;">
      <div class="apiManageContainer">
        <Row class="apiManage_one "  >
          <Col span="14" class="apimage_hidden">
          <div v-if="(state == '2'|| state == '4') && postUuid.length>0" style="display: inline-block">
            <Checkbox @on-change="checkAll" id="checkAll" v-model="isCheckAll">已选择{{postUuid.length}}项</Checkbox>
            <span v-if="state == '2'" class="apiManage_one_choolse cursor " @click=" confirm" >
                 <i class="iconfont icon-gou"></i>审核通过
               </span>
            <span v-if="state == '2'" class="apiManage_one_choolse cursor" @click="modal1 = true"
                 >
                 <i class="iconfont icon-chahao"></i>审核不通过
            </span>
            <span v-if="state == '4'" class="apiManage_one_choolse cursor" @click="modal2= true"
                  >
                 <i class="iconfont icon-chahao"></i>强制下架
            </span>
          </div>
          <span style="opacity: 0;display: inline-block">占位</span>
          </Col>
          <!--<Col span="14"  style="height: 1px" :v-if="activeMenu=='all' || activeMenu=='Auditnotthrough' || activeMenu=='products' "></Col>-->
          <Col span="9" offset="1">
          <Select v-model="apiFirst" style="width:24%" placeholder="大类选择" @on-change="changeClassfy">
            <Option v-for="(item,key) in  firstClassifyIdList" :value="item.uuid" :key="key">{{ item.classify }}
            </Option>
          </Select>
          <Select v-model="apiSecond" style="width:24%;" placeholder="小类选择" @on-change="changeClassfy">
            <Option v-for="item in  secondClassifyIdList" :value="item.uuid" :key="item.uuid">{{ item.classify }}
            </Option>
          </Select>
          <span class="apiManage_one_input">
               <input type="text" placeholder="请输入关键字" v-model="searchKey">
               <i class="iconfont icon-fangdajing1 apiManageSearchIcon" style="top:-1px"></i>
          </span>
          </Col>
        </Row>
        <div class="apiManaeListContainer">
          <Row class="apiManage_two code-row-bg" type="flex" justify="space-between" align="middle"
               v-for="(item,index) in list" :key="index">
            <Col span="1" v-if="(state == '2'|| state == '4')">
            <CheckboxGroup @on-change="check" :value="item.uuid" :id="item.uuid" v-model="postUuid">
              <Checkbox :label="item.uuid"></Checkbox>
            </CheckboxGroup>
            </Col>
            <Col span="2">
            <span class="circl">
              <img src="../../assets/image/tx.png" alt="">
            </span>
            </Col>
            <Col :span="(state == '2'|| state == '4')?11:8">
            <p class="fontWeight">
              <Tooltip :content="item.product_name ">{{item.product_name | trunc(15)}}</Tooltip>
            </p>
            <p>
              <span class="mar_right  color_aaa">来源：暂无</span>
              <span class="apiManage_one_choolse  mar_right">{{item.frist}}</span>
              <span class="apiManage_one_choolse  mar_right">{{item.second}}</span>
            </p>
            </Col>
            <Col :span="state?4:6" class="color_aaa">
            {{item.realname}}</Col>
            <Col :span="state?3:5" class="color_aaa">
            {{item.applyTime | date('2')}}</Col>
            <Col span="3" class="color_aaa text-right">
            {{item.product_state}}</Col>
            <Col span="4" v-if="state == '6' || state == '3'" class="color_aaa text-right">
            <span class="reson cursor" @click="modelRason = true;textReson=item.reason"> 原因查看</span>
            <Modal
              v-model="modelRason"
              :title="state == '6'?'下架原因':'审核不通过原因'"
            >
              <p>
                <textarea class="textarea_reson" name="" readonly id="" cols="30" v-model="textReson" rows="10" value="">请填写下架原因</textarea>
              </p>
              <div slot="footer">
              </div>
            </Modal>
            </Col>

          </Row>
          <Row class="apiManage_two code-row-bg test" type="flex" justify="center" align="middle"
               v-if="list.length == 0">
            <Col span="24" class="text-center">
            <span>暂无数据列表</span>
            </Col>
          </Row>
          <Row v-if="total/pageSize > 1" class="apiManage_two code-row-bg test" type="flex" justify="center"
               align="middle">
            <Col span="24" class="text-center">
            <Page :total="total" show-elevator show-total :page-size='pageSize' :current="currentPage"
                  @on-change="pagechange"></Page>
            </Col>
          </Row>
        </div>
      </div>
      <Modal
        v-model="modal1"
        title="审核不通过"
      >
        <p>
          <textarea class="textarea_reson" cols="30" rows="10" placeholder="请填写不通过原因" v-model="reason"></textarea>
        </p>
        <div slot="footer">
          <Button type="ghost" size="large" @click="cancel('modal1')">取消</Button>
          <Button type="primary" size="large" @click="ok('modal1','3','reason')" :disabled="reason == ''">确定</Button>
        </div>
      </Modal>
      <Modal
        v-model="modal2"
        title="强制下架"

      >
        <p>
          <textarea class="textarea_reson" name="" cols="30" rows="10" placeholder="请填强制下架的原因"
                    v-model="reason2"></textarea>
        </p>
        <div slot="footer">
          <Button type="ghost" size="large" @click="cancel('modal2')">取消</Button>
          <Button type="primary" size="large" @click="ok('modal2','6','reason2')" :disabled="reason2 == ''">确定</Button>
        </div>
      </Modal>
    </Row>
  </Row>
</template>

<script>
  import Tooltip from "../../../node_modules/iview/src/components/tooltip/tooltip";
  export default {
    components: {Tooltip},
    name: 'APImanagement',
    data () {
      return {
        modal2: false,
        modelRason:false,
        pageSize: 5,//记录分页每页展示的条数
        currentPage: 1,//记录分页中，当前在第几页
        total: 0,//分页数据总数
        state: '',//保存正文分类与后台对应的值， 2待审，3审核不通过，4审核通过,6强制下架
        searchKey: '',//搜索关键字
        classifyId: '',//api分类选择后的值
        firstClassifyIdList: [],//api大类的列表
        secondClassifyIdList: [],//api小类的列表
        reason: '',//审核不通过的原因
        reason2: '',//强制下架的原因
        reason_null: false,
        apiFirst: '',
        apiSecond: '',
        isCheckAll: false,
        postUuid: [],//多选框的值
        list: [],//api列表
        modal1: false,
        textReson:''
      }
    },
    mounted: function () {
      let self = this;
      this.$nextTick(function () {
        self.$emit('login', {login:false,one:'APImanagement'});
        self.loadDefaultProduct(this.state,1);//页面产品初始化列表
      })
    },
    updated: function () {
      if (this.modal1 == false) {      //清空输入框
        this.reason = '';
      }
      if (this.modal2 == false) {
        this.reason2 = '';
      }
    },
    watch: {
      searchKey(cur, old){   //模糊搜索
        let self = this;
        setTimeout(function () {
          if (self.searchKey != cur) {
            return false;
          }
          self.loadDefaultProduct(self.state,1)
        }, 500);
      },
      apiFirst: function () {//找到分组的下级数据
        let self = this;
        if (self.apiFirst != '') {
          self.secondClassifyIdList = self.firstClassifyIdList[self.apiFirst - 1].childrenList;
        } else {
          self.secondClassifyIdList = [{uuid: '', classify: '全部'}];
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
            self.postUuid.push(value.uuid);
            console.log(value.uuid)
          });
          self.showDel = self.postUuid.length == 0 ? false : true;
        } else {
          self.showDel = false;
        }
      },
      changeClassfy(v){
        this.classifyId = v;
        this.loadDefaultProduct(this.state,1)
      },
      loadDefaultProduct(state,currentPage){
        let self = this;
        self.postUuid = [];        //将选项的清零
        self.$http.post('/product/backstageFindProducts', {
          state: state,
          name: self.searchKey,
          classifyId: this.classifyId,
          currentPage: currentPage
        })
          .then(function (res) {
            if (res.data.code != 100) {
              self.$Message.error(res.data.msg);
              return false;
            }
            self.list = res.data.data.pageInfo.list;                      //取列表数据
            self.total = res.data.data.pageInfo.total;                     //取数据总条数
            self.pageSize = res.data.data.pageInfo.pageSize;              //取每页大小
            self.currentPage = res.data.data.pageInfo.prePage + 1;         //取当前页数
            for (let i = 0; i < self.list.length; i++) {                         //根据后台的状态码转换为对应的中文
              switch (self.list[i]['product_state']) {
                case  2:
                  self.list[i]['product_state'] = '待审';
                  break;
                case  3:
                  self.list[i]['product_state'] = '审核不通过';
                  break;
                case  4:
                  self.list[i]['product_state'] = '审核通过';
                  break;
                case  6:
                  self.list[i]['product_state'] = '强制下架';
                  break
              }
            }
            self.firstClassifyIdList = res.data.data.classifies;
            self.firstClassifyIdList.unshift({uuid: '', classify: '全部', childrenList: []}) //给下拉框添加一个全部分类
            self.secondClassifyIdList = self.firstClassifyIdList[1].childrenList; //给第二个下拉框赋初值
            self.secondClassifyIdList.unshift({uuid: '', classify: '全部'})
          }).catch(function () {
          self.$Message.error('请求失败！');
        })
      },
      pagechange: function (page) {
        this.currentPage = page;
        this.loadDefaultProduct(this.state,page)
      },
      ok (modal, state, reason) {
        let self = this;
        let productsId = self.postUuid.join(',');
        self.$http.post('/product/updateState', {state: state, productIds: productsId, reason: self[reason]})
          .then((res) => {
            if (res.data.code != 100) {
              self.$Message.error(res.data.msg);
              return false
            }
            self.$Message.success({
              content: res.data.msg,
              onClose: function () {
                self[modal] = false;
                self.loadDefaultProduct(self.state,self.currentPage);
              }
            })

          })
          .catch(function () {
            self.$Message('请求失败')
          })
      },
      cancel (modal) {
        this[modal] = false
        // this.$Message.info('取消成功')
      },
      confirm () {
        let self = this;
        let productsId = self.postUuid.join(',');
        this.$Modal.confirm({
          title: '警告',
          content: '<p style="font-size: 14px">是否确定审核通过</p>',
          onOk: () => {
            self.$http.post('/product/updateState', {state: '4', productIds: productsId, reason: self.reason})
              .then(function (res) {
                if (res.data.code != 100) {
                  self.$Message.error(res.data.msg);
                  return false
                }
                self.$Message.success({
                  content: res.data.msg,
                  onClose: function () {
                    self.modal1 = false;
                    self.loadDefaultProduct(self.state,self.currentPage);
                  }
                })

              })
              .catch(function () {
                self.$Message.error('请求失败')
              })
          },
          onCancel: () => {
            this.$Message.info('取消成功!');
          }
        });
      },
      contentHeader (nummber) {
        this.state = nummber;
        this.loadDefaultProduct(this.state,1);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .reson{padding: 3px 10px; border: 1px solid #1CB394;border-radius: 10px;color: #1CB394;}
  .borderContent .border_bottom_position {
    width: 100%;
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

  .textarea_reson {
    width: 100%;
    border: 1px solid #F1F1F1;
    border-radius: 8px;
    padding: 10px;
  }

  .apiManage_one_choolse {
    margin-right: 10px;
    padding: 4px 10px;
    border-radius: 18px;
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
    margin-left: 5px;
    height: 30px;
  }

  .apiManage_one_input input {
    width: 45%;
    height: 30px;
    padding: 3px 30px 3px 10px;
    border: 1px solid #DDDEE1;
    position: relative;
    border-radius: 18px;
  }

  .apiManage_one_input .apiManageSearchIcon {
    position: absolute;
    z-index: 100;
    right: 8px;
    color: #808080;

  }

  .apiManage_one {
    background: #FCFCFC;
    padding: 10px;
    padding-left: 20px;
  }

  /*.apiManage {*/
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
    background-color: #fff;
    height: 100%;
  }

  div.test {
    border-bottom: 0;
  }

  .apiManageContainer .ivu-select-selection {
    border-radius: 18px;
  }

  /*.apiManaeListContainer{*/
  /*height: 100%;*/
  /*}*/
  .apiManage_two {
    vertical-align: middle;
    background: #fff;
    padding: 20px;
    border-bottom: 1px solid #eee;
  }


</style>

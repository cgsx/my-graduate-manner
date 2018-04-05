<template>
  <div>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">数据报告管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="height:100%">

      <div class="apiManageContainer">
        <Row class="apiManage_one">
          <Col span="10" offset="14" class="text-right">
          <span class="fr" @click="modal3=true"> <Button type="ghost">添加报告</Button></span>
          </Col>
        </Row>
        <div class="apiManaeListContainer advert">
          <Row>
            <i-col span="4" class="fontWeight text-center vc ">报告图</i-col>
            <i-col span="4" class="fontWeight text-center vc ">标题</i-col>
            <i-col span="4" class="fontWeight text-center vc ">简介</i-col>
            <i-col span="4" class="fontWeight text-center vc ">数据来源</i-col>
            <i-col span="4" class="fontWeight text-center vc ">目录</i-col>
            <i-col span="4" class="fontWeight text-center vc ">修改</i-col>
          </Row>
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-for="item in dataList" :key="item.uuid">
            <Col span="4">
            <p class=" ml20 vc imgs" ><img src="../../assets/image/banner1.jpg" /></p>
            </Col>
            <Col span="4">
            <p class=" ml20 vc">
              <Tooltip class="tool" :content="item.title">
                {{item.title|trunc(8)}}
              </Tooltip>

            </p>
            </Col>
            <Col span="4">
            <p class=" ml20 vc">
              <Tooltip  class="tool" :content="item.description">
                {{item.description|trunc(8)}}
              </Tooltip>
            </p>
            </Col>
            <Col span="4">
            <p class=" ml20 vc">
              <Tooltip  class="tool" :content="item.data_cata">
                {{item.data_cata|trunc(8)}}
              </Tooltip>
              </p>
            </Col>
            <Col span="4">
            <p class=" ml20 vc">
              <Tooltip  class="tool" :content="item.data_study">
                {{item.data_study|trunc(8)}}
              </Tooltip>

            </p>
            </Col>
            <Col span="4" class=" text-right cursor">
            <span class="mr10" @click="openUpdate(item)">更改</span>
            <span @click="delOne(item.uuid)">删除</span>
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg " type="flex" justify="center" align="middle" v-if="dataList==false">
            <Col span="24" class="text-center">
            暂无数据列表
            </Col>
          </Row>
        </div>
      </div>
    </Row>
    <Modal
      v-model="modal1"
      title="修改"
      @on-visible-change="closeModal"
    >
      <p>
      <Form :model="formItem" :label-width="80">
        <FormItem label="标题">
          <Input v-model="formItem.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="formItem.des" type="textarea" placeholder="请输入描述"></Input>
        </FormItem>
        <FormItem label="数据来源">
          <Input v-model="formItem.datacata" type="textarea" placeholder="请输入数据来源"></Input>
        </FormItem>
        <FormItem label="目录">
          <Input v-model="formItem.datastudy"  type="textarea" placeholder="目录"></Input>
        </FormItem>
      </Form>
      </p>
      <p slot="footer">
        <Button type="primary" @click="updateOne">确定</Button>
        <Button type="ghost" @click="modal1=false">取消</Button>
      </p>
    </Modal>
    <Modal
      v-model="modal3"
      title="新增"
      @on-visible-change="closeModal"
    >
      <p>
      <Form :model="insertList" :label-width="80">
        <FormItem label="标题">
          <Input v-model="insertList.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="insertList.des"  type="textarea" placeholder="请输入描述"></Input>
        </FormItem>
        <FormItem label="数据来源">
          <Input v-model="insertList.datacata"  type="textarea" placeholder="请输入数据来源"></Input>
        </FormItem>
        <FormItem label="目录">
          <Input v-model="insertList.datastudy"  type="textarea" placeholder="目录"></Input>
        </FormItem>
      </Form>
      </p>
      <p slot="footer">
        <Button type="primary" @click="insertOne">确定</Button>
        <Button type="ghost" @click="modal3=false">取消</Button>
      </p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'APImanagement',
    data () {
      return {
        modal1: false,
        modal3:false,
        dataList:[],
        formItem:{
          title:'',
          des:'',
          datacata:'',
          datastudy:'',
        },
        insertList:{
          title:'',
          des:'',
          datacata:'',
          datastudy:'',
        }
      }
    },

    mounted(){
        this.loadData();
    },
    methods: {
      openUpdate(item){
          this.modal1=true;
       this.formItem={
           uuid:item.uuid,
          title:item.title,
            des:item.description,
            datacata:item.data_cata,
            datastudy:item.data_study,
        };
      },
      updateOne(){
        var self=this;
        self.$http.post("mg_data/mg_data_update.php",self.formItem).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.$Message.info(m.data.msg);
          self.loadData();
self.modal1=false;
        })
      },
      insertOne(){
        var self=this;
        self.$http.post("mg_data/mg_data_insert.php",self.insertList).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.$Message.info(m.data.msg);

          self.modal3=false;
    self.loadData();

        })
      },
      delOne(item){
        var self=this;
        self.$Modal.confirm({title:'删除','content':"是否确认删除？删除之后产品不可恢复哦",okText:'确定删除',cancelText:'取消',onOk(){
          self.$http.post("mg_data/mg_data_del.php",{uuid:item}).then((m)=>{
            if(m.data.code!=100){
              self.$Message.info(m.data.msg);
              return false;
            }
            self.$Message.info(m.data.msg);
            self.loadData();

          }).catch(function () {
            self.$Message.info("请求失败！");
          })
        },onCancel(){
          self.$Message.info("取消！");
        }})
      },
    closeModal(flag){
      var self=this;
      if(!flag){
      }
    },
      loadData () {
          var self=this;
        self.$http.post("mg_data/mg_data.php").then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.dataList=m.data.data;
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .imgs{
    width: 100%;
  }
  .imgs img{
    width: 100%;
  }
  .tool .ivu-tooltip-inner{
    white-space: normal;
  }
</style>

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
          <Col span="24" >
          <span class="cursor titles " :class="{titlesActive:item.active}" @click="showGroup(item.name)" v-for="(item,key) in groupList" :key="item.uid">{{item.name}}</span>
          <span class="fr" @click="modal3=true"> <Button type="ghost">添加案例</Button></span>
          </Col>
        </Row>
        <div class="apiManaeListContainer advert">
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-for="item in proList" :key="item.uuid">
            <!--<Col span="2">-->
            <!--<span class="ciclr ">-->
            <!--<img src="../../assets/image/yzmpic.jpg" alt="" >-->
            <!--</span>-->
            <!--</Col>-->
            <Col span="4">
            <p class="fontWeight ml20 vc">{{item.name}}</p>

            </Col>
            <i-col span="4">
              <Tooltip :content="item.description" class="tool">
                描述
              </Tooltip>

            </i-col>
            <i-col span="4">
              <Tooltip :content="item.back_detail" class="tool">
                {{item.back}}
              </Tooltip>

            </i-col>
            <i-col span="4">

              <Tooltip :content="item.exam_detail" class="tool">
                {{item.exam}}
              </Tooltip>
            </i-col>
            <i-col span="4">
              <Tooltip :content="item.get_detail" class="tool">
                {{item.get}}
              </Tooltip>

            </i-col>

            <Col span="4" class=" text-right cursor">
            <span class="mr10" @click="openUpdate(item)">更改</span>
            <span @click="delOne(item.uuid)">删除</span>
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg " type="flex" justify="center" align="middle" v-if="proList.length==false">
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
      <FormItem label="标志" class="upload">
      <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php'" :data="{uuid:formItem.uuid,type:6}" >
        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
      </Upload>
      <img :src="$store.state.imgcon+'/conmon/showImg.php?uuid='+formItem.uuid+'&type=6'" alt="">
    </FormItem>
        <FormItem label="标题">
          <Input v-model="formItem.name" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="formItem.des" placeholder="请输入简短的描述"></Input>
        </FormItem>
      <FormItem label="项目背景">
          <Input v-model="formItem.backdetail" placeholder="请输入项目背景"></Input>
        </FormItem>
      <FormItem label="解决方案">
          <Input v-model="formItem.examdetail" placeholder="请输入解决方案"></Input>
        </FormItem>
      <FormItem label="客户收益">
          <Input v-model="formItem.get" placeholder="请输入客户收益"></Input>
        </FormItem>
      <FormItem label="分组">
          <Input v-model="formItem.group" placeholder="请输入分组"></Input>
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
      <FormItem label="标志"  >
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php'" :data="{type:6}" :on-success="uploadSucc">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
        <FormItem label="标题">
          <Input v-model="insertList.name" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="insertList.des" placeholder="请输入简短的描述"></Input>
        </FormItem>
        <FormItem label="项目背景">
          <Input v-model="insertList.backdetail" placeholder="请输入项目背景"></Input>
        </FormItem>
        <FormItem label="解决方案">
          <Input v-model="insertList.examdetail" placeholder="请输入解决方案"></Input>
        </FormItem>
        <FormItem label="客户收益">
          <Input v-model="insertList.get" placeholder="请输入客户收益"></Input>
        </FormItem>
        <FormItem label="分组">
          <Input v-model="insertList.group" placeholder="请输入分组"></Input>
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
        proList: [],//产品列表
        proInList:[],
        groupList:[{name:'行业智能决策产品',active:true,uid:1},{name:'智能认知产品',active:false,uid:2},{name:'大数据操作系统',active:false,uid:3}],//分组列表
        advertName: '',//搜索框名字
        group:'',
        formItem:{
            uuid:'',
          name:'',
          des:'',
          backdetail:'',
          examdetail:'',
          get:''
        } , insertList:{
            uuid:'',
          name:'',
          des:'',
          backdetail:'',
          examdetail:'',
          get:'',
          group:''
        }
      }
    },
    mounted(){
      this.loadPro();

    },
    methods: {
      uploadSucc(res,file,fileList){
        this.insertList.imgid=res.data.imgid;
      },
      openUpdate(item){
          var self=this;
        self.modal1=true;
      self.formItem={
          uuid:item.uuid,
            name:item.name,
            des:item.description,
            backdetail:item.back_detail,
            examdetail:item.exam_detail,
            get:item.get_detail,
        group:item.group
        }
      },
      updateOne(){
        var self=this;
        self.$http.post("mg_exam/exam_update.php",self.formItem).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.modal1=false;
          self.loadPro();


        })
      },
      insertOne(){
        var self=this;
        self.$http.post("mg_exam/exam_insert.php",self.insertList).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.modal3=false;
          self.loadPro();


        })
      },
      delOne(item){
        var self=this;
        self.$Modal.confirm({title:'删除','content':"是否确认删除？删除之后产品不可恢复哦",okText:'确定删除',cancelText:'取消',onOk(){
          self.$http.post("mg_exam/exam_del.php",{uuid:item}).then((m)=>{
            if(m.data.code!=100){
              self.$Message.info(m.data.msg);
              return false;
            }
            self.$Message.info(m.data.msg);
            self.loadPro();


          }).catch(function () {
            self.$Message.info("请求失败！");
          })
        },onCancel(){
          self.$Message.info("取消！");
        }})
      },
      showGroup(name){
        var self = this;
        for (var key of self.groupList) {
          key.active = false;
          if (key.name == name) {
            key.active = true;
            self.group=name;
            self.loadOne();
          }
        }
      },
      closeModal(flag){

        var self=this;
        if(!flag){
          self.insertList.name='';
          self.insertList.des='';
          self.insertList.group='';
          self.insertList.title='';
          self.insertList.detailtitle='';
          self.insertList.detail='';
        }


      },
      loadOne(){
        var self=this;
        self.$http.post("mg_exam/examlistone.php",{group:self.group}).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }

          self.proList=m.data.data;


        })
      },
      //加载产品
      loadPro(){
        var self=this;
        self.$http.post("mg_exam/examlist.php").then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }

          self.groupList=[];
          for(var key in m.data.data){
            self.groupList.push({name:key,active:false});
          }
          self.groupList[0].active=true;
          self.group= self.groupList[0].name;
          self.loadOne();
//        self.proInList=self.proList.行业智能决策产品;


        })
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .titles {
    padding: 0 20px;
  }
  .tool .ivu-tooltip-inner{
    white-space: normal;
  }
  .titlesActive{
    color: #00c1de;
  }

</style>

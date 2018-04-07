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
          <span class="cursor titles " :class="{titlesActive:item.active}" @click="showGroup(item.name)" v-for="(item,key) in groupList" :key="item.name">{{item.name}}</span>
          <span class="fr cursor" @click="openInsert"> <Button type="ghost" >添加产品</Button></span>
          </Col>
        </Row>
        <div class="apiManaeListContainer advert">
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-for="item in proList" :key="item.uuid">
            <Col span="2">
            <span class="ciclr ">
            <!--<img src="../../assets/image/yzmpic.jpg" alt="" >-->
              <img :src="$store.state.imgcon+'/conmon/showImg.php?uuid='+item.uuid+'&type=14'" alt="">
            </span>
            </Col>
            <Col span="4">
            <p class="fontWeight ml20 vc">{{item.name}}</p>
            <p>
              <span class="mar_right ml20 vc">{{item.group}}</span>
            </p>
            </Col>
            <i-col span="4">

              <Dropdown>
                <a href="javascript:void(0)">
                  产品概述
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="gs in item.deslist" :key="gs.uuid" @click.native="openUpdateGs(gs)">{{gs.title}}</DropdownItem>

                </DropdownMenu>
              </Dropdown>
              <span class="cursor" @click="openInsertGs(item.uuid)" v-if="item.deslist==0"><i class="iconfont icon-jia"></i></span>
            </i-col>
            <i-col span="4">

              <Dropdown>
                <a href="javascript:void(0)">
                  产品功能
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="gs in item.funlist" @click.native="openUpdateGn(gs)" :key="gs.uuid">{{gs.detailtitle}}</DropdownItem>

                </DropdownMenu>
              </Dropdown>
              <span class="cursor" @click="openInsertGn(item.uuid)" ><i class="iconfont icon-jia"></i></span>
            </i-col>
            <i-col span="4">

              <Dropdown>
                <a href="javascript:void(0)">
                  产品优势
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="gs in item.advenlist"  @click.native="openUpdateYs(gs)" :key="gs.uuid">{{gs.detailtitle}}</DropdownItem>

                </DropdownMenu>
              </Dropdown>
              <span class="cursor" @click="openInsertYs(item.uuid)"><i class="iconfont icon-jia"></i></span>

            </i-col>
            <i-col span="4">

              <Dropdown>
                <a href="javascript:void(0)">
                  应用场景
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="gs in item.applist" @click.native="openUpdateCj(gs)" :key="gs.uuid">{{gs.detailtitle}}</DropdownItem>

                </DropdownMenu>
              </Dropdown>
              <span class="cursor" @click="openInsertCj(item.uuid)"><i class="iconfont icon-jia"></i></span>

            </i-col>
            <Col span="2" class=" text-right cursor">
            <span class="mr10" @click="openUpdate(item)">更改</span>
            <span @click="delPro(item.uuid)">删除</span>
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
    <!--修改产品概述对话框-->
    <Modal
      v-model="modal1"
      @on-visible-change="closeModal"
      title="修改"
    >
  <p>
      <Form :model="formItem" :label-width="80">
        <FormItem label="产品名称"  v-if="formItem.pro_in==null">
          <Input v-model="formItem.name" placeholder="请输入产品名称" ></Input>
        </FormItem>
      <FormItem label="产品描述" v-if="formItem.pro_in==null">
          <Input v-model="formItem.des" type="textarea" placeholder="请输入产品描述"></Input>
        </FormItem>
      <FormItem label="标志"  v-if="formItem.pro_in==null">
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php?uuid='+formItem.id+'&type=14'">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="分组" v-if="formItem.pro_in==null">
        <Input v-model="formItem.group" type="text" placeholder="请输入分组"></Input>
      </FormItem>
      <FormItem label="标题" v-if="formItem.pro_in=='产品概述'">
        <Input v-model="formItem.title" type="text" placeholder="请输入标题" ></Input>
      </FormItem>
      <FormItem label="产品概述" v-if="formItem.pro_in=='产品概述'">
        <Input v-model="formItem.detail" type="textarea" placeholder="请输入产品概述" ></Input>
      </FormItem>
      <FormItem label="标题" v-if="formItem.pro_in=='产品功能'||formItem.pro_in=='产品优势'||formItem.pro_in=='应用场景'">
        <Input v-model="formItem.title" type="text" placeholder="请输入标题" ></Input>
      </FormItem>
      <FormItem label="标志"  v-if="formItem.pro_in=='产品功能'" class="upload">
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php?uuid='+formItem.id+'&type=2'">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        <img :src="$store.state.imgcon+'/conmon/showImg.php?uuid='+formItem.id+'&type=2'" alt="">
      </FormItem>
      <FormItem label="标志"  v-if="formItem.pro_in=='产品优势'" class="upload">
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php?uuid='+formItem.id+'&type=3'">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        <img :src="$store.state.imgcon+'/conmon/showImg.php?uuid='+formItem.id+'&type=3'" alt="">
      </FormItem>
      <FormItem label="副标题" v-if="formItem.pro_in=='产品功能'||formItem.pro_in=='产品优势'||formItem.pro_in=='应用场景'">
        <Input v-model="formItem.detailtitle" type="text" placeholder="请输入副标题" ></Input>
        <img src="" alt="">
      </FormItem>
      <FormItem label="详细内容" v-if="formItem.pro_in=='产品功能'||formItem.pro_in=='产品优势'||formItem.pro_in=='应用场景'">
        <Input v-model="formItem.detail" type="text" placeholder="请输入详细内容" ></Input>
      </FormItem>
    </Form>
  </p>
      <p slot="footer">
        <Button type="ghost" @click="modal1=false">取消</Button>
        <Button type="primary" @click="updatePro">确定</Button>
      </p>
    </Modal>
    <!--添加产品-->
    <Modal
      v-model="modal3"
      @on-visible-change="closeModal"
      title="添加"
    >
      <p>
      <Form :model="insertList" ref="insertList" :rules="insertvalidata" :label-width="80">
        <FormItem label="产品名称" prop="name"  v-if="insertList.pro_in==''">
          <Input v-model="insertList.name" placeholder="请输入产品名称" ></Input>
        </FormItem>
        <FormItem label="产品描述"  prop="des" v-if="insertList.pro_in==''">
          <Input v-model="insertList.des" type="textarea" placeholder="请输入产品描述"></Input>
        </FormItem>
        <FormItem label="分组"  prop="group" v-if="insertList.pro_in==''">
          <Input v-model="insertList.group" type="text" placeholder="请输入分组"></Input>
        </FormItem>
      <FormItem label="标志"   v-if="insertList.pro_in==''">
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php'" :data="{type:14}" :on-success="uploadSucc">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
        <FormItem label="标题"  prop="title" v-if="insertList.pro_in=='产品概述'">
          <Input v-model="insertList.title" type="text" placeholder="请输入标题" disabled></Input>
        </FormItem>
        <FormItem label="产品概述"  prop="detail" v-if="insertList.pro_in=='产品概述'">
          <Input v-model="insertList.detail" type="textarea" placeholder="请输入产品概述" ></Input>
        </FormItem>
        <FormItem label="标题"  prop="title" v-if="insertList.pro_in=='产品功能'||insertList.pro_in=='产品优势'||insertList.pro_in=='应用场景'">
          <Input v-model="insertList.title" type="text" placeholder="请输入标题" disabled></Input>
        </FormItem>
        <FormItem label="标志"  v-if="insertList.pro_in=='产品功能'">
          <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php'" :data="{type:2}" :on-success="uploadSucc">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </FormItem>
      <FormItem label="标志"  v-if="insertList.pro_in=='产品优势'">
          <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php'" :data="{type:3}" :on-success="uploadSucc">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </FormItem>
        <FormItem label="副标题"  prop="detailtitle" v-if="insertList.pro_in=='产品功能'||insertList.pro_in=='产品优势'||insertList.pro_in=='应用场景'">
          <Input v-model="insertList.detailtitle" type="text" placeholder="请输入副标题" ></Input>
        </FormItem>
        <FormItem label="详细内容"  prop="detail" v-if="insertList.pro_in=='产品功能'||insertList.pro_in=='产品优势'||insertList.pro_in=='应用场景'">
          <Input v-model="insertList.detail" type="text" placeholder="请输入详细内容" ></Input>
        </FormItem>
      </Form>
      </p>
      <p slot="footer">
        <Button type="ghost" @click="modal3=false">取消</Button>
        <Button type="primary" @click="insertPro">确定</Button>
      </p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'APImanagement',
    data () {
      return {
        modal1: false,//产品概述
        modal2:false,
        modal3:false,//添加产品
        proList: [],//产品列表
        proInList:[],
        groupList:[{name:'行业智能决策产品',active:true,uid:1},{name:'智能认知产品',active:false,uid:2},{name:'大数据操作系统',active:false,uid:3}],//分组列表
        advertName: '',//搜索框名字
        group:'行业智能决策产品',
        formItem:{
            uuid:'',
            name:'',
          des:'',
          group:'',
          pro_in:''
        },
        insertList:{
          uuid:'',
          name:'',
          des:'',
          group:'',
          pro_in:''
        },
        insertvalidata:{
          name:[{required:true,message:'不能为空'}],
          des:[{required:true,message:'不能为空'}],
          title:[{required:true,message:'不能为空'}],
          detail:[{required:true,message:'不能为空'}],

          detailtitle:[{required:true,message:'不能为空'}],

          group:[{required:true,message:'不能为空'}],
        }
      }
    },
    mounted(){
        this.loadPro();
        this.loadGroup();
    },
    methods: {
      uploadSucc(res,file,fileList){
          this.insertList.imgid=res.data.imgid;
      },
      delPro(item){
          var self=this;
          self.$Modal.confirm({title:'删除','content':"是否确认删除？删除之后产品不可恢复哦",okText:'确定删除',cancelText:'取消',onOk(){
            self.$http.post("mg_pro/mg_pro_del.php",{uuid:item}).then((m)=>{
              if(m.data.code!=100){
                self.$Message.info(m.data.msg);
                return false;
              }
              self.$Message.info(m.data.msg);
              self.loadPro();
              self.loadGroup();

            }).catch(function () {
              self.$Message.info("请求失败！");
            })
          },onCancel(){
            self.$Message.info("取消！");
          }})
      },
      openUpdateGn(item){
        var self=this;
        self.formItem.pro_in='产品功能';

        self.modal1=true;
        self.formItem={
          title:item.title,
          detailtitle:item.detailtitle,
          detail:item.detail,
          id:item.uuid,
          pro_in:'产品功能'
        };
      },
      openUpdateCj(item){
        var self=this;
        self.formItem.pro_in='应用场景';
        self.modal1=true;
        self.formItem={
          title:item.title,
          detailtitle:item.detailtitle,
          detail:item.detail,
          id:item.uuid,
          pro_in:'应用场景'
        };
      },
      openUpdateYs(item){
        var self=this;
        self.formItem.pro_in='产品优势';
        self.modal1=true;
        self.formItem={
          title:item.title,
          detailtitle:item.detailtitle,
          detail:item.detail,
          id:item.uuid,
          pro_in:'产品优势'
        };
      },
//        打开产品概述对话框
      openUpdateGs(item){
          var self=this;
          self.formItem.pro_in='产品概述';
        self.modal1=true;
        self.formItem={
            title:item.title,
          detail:item.detail,
          id:item.uuid,
          pro_in:'产品概述'
        };

      },
      openInsertGs(uuid){
          var self=this;
          self.insertList.pro_in='产品概述';
        self.insertList.title='产品概述';
self.insertList.uuid=uuid;
        self.modal3=true;
      },
      openInsertGn(uuid){
          var self=this;
          self.insertList.pro_in='产品功能';
        self.insertList.title='产品功能';
        self.modal3=true;
self.insertList.uuid=uuid;
      },
      openInsertCj(uuid){
          var self=this;
          self.insertList.pro_in='应用场景';
        self.insertList.title='应用场景';
        self.modal3=true;
self.insertList.uuid=uuid;
      },
      openInsertYs(uuid){
          var self=this;
          self.insertList.pro_in='产品优势';
        self.insertList.title='产品优势';
        self.modal3=true;
self.insertList.uuid=uuid;
      },
        //模态框显示关闭函数
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
        //打开修改对话框
      openUpdate(item){

          var self=this;
          self.modal1=true;
          self.formItem={
              uuid:item.uuid,
            name:item.name,
            group:item.group,
            des:item.description
          }

      },
      openInsert(){
          var self=this;
          self.modal3=true;
      },
        //展示分组
      showGroup(name){
        var self = this;
        for (var key of self.groupList) {
          key.active = false;
          if (key.name == name) {
            key.active = true;
            self.group=name;
            self.loadPro();
          }
        }
      },
//      修改产品信息
      updatePro(){
          var self=this;
        self.$http.post("mg_pro/mg_pro_update.php",self.formItem).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.modal1=false;
          self.loadPro();
          self.loadGroup();
          self.$Message.info(m.data.msg);
        }).catch(function () {
          self.$Message.info("请求失败！");
        })
      },
//      添加产品信息
      insertPro(){
          var self=this;
        this.$refs.insertList.validate((valid) => {
          if (valid) {

            if(self.insertList.imgid!=null){
              self.$http.post("mg_pro/mg_pro_insert.php",self.insertList).then((m)=>{
                if(m.data.code!=100){
                  self.$Message.info(m.data.msg);
                  return false;
                }
                self.modal3=false;
                self.loadPro();
                self.loadGroup();
                self.$Message.info(m.data.msg);
              }).catch(function () {
                self.$Message.info("请求失败！");
              })
            }else{
                self.$Message.error("必须上传图片");
            }

          } else {
            this.$Message.error('不通过!');
          }
        })

      },
      //加载产品
  loadPro(){
      var self=this;
    self.$http.post("mg_pro/bg_list.php",{group:self.group}).then((m)=>{
        if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
        }
        self.proList=m.data.data;

    }).catch(function () {
      self.$Message.info("请求失败！");
    });

  },
      loadGroup(){
      var self=this;
        self.$http.post("mg_pro/prolist.php",{group:self.group}).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.proInList=m.data.data;
          self.groupList=[];
          for(var key in self.proInList){
            self.groupList.push({name:key,active:false});
          }
          self.groupList[0].active=true;
        }).catch(function () {
          self.$Message.info("请求失败！");
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.titles {
  padding: 0 20px;
}
  .titlesActive{
    color: #00c1de;
  }
  .upload img{
    width:100%;
    height: 200px;
  }
</style>

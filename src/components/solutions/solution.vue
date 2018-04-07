<template>
  <div>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">解决方案管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="height:100%">

      <div class="apiManageContainer">
        <Row class="apiManage_one">
          <Col span="24" >
          <span class="fr cursor" @click="openInsert"> <Button type="ghost" >添加解决方案</Button></span>
          </Col>
        </Row>
        <div class="apiManaeListContainer advert ">
          <Row class="apiManage_two code-row-bg " type="flex" justify="center" align="middle" v-for="item in proList" :key="item.uuid">
            <!--<Col span="2">-->
            <!--<span class="ciclr ">-->
            <!--<img src="../../assets/image/yzmpic.jpg" alt="" >-->
            <!--</span>-->
            <!--</Col>-->
            <Col span="4">
            <p class="fontWeight ml20 vc">{{item.name}}</p>
            <p>
              <span class="mar_right ml20 vc">{{item.group}}</span>
            </p>
            </Col>
            <i-col span="4">

              <Dropdown>
                <a href="javascript:void(0)">
                  方案概述
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="gs in item.deslist" :key="gs.uuid" @click.native="openUpdateGs(gs)">{{gs.title}}</DropdownItem>

                </DropdownMenu>
              </Dropdown>
              <span class="cursor"  v-if="item.deslist==0" @click="openInsertGs(item.uuid)"><i class="iconfont icon-jia"></i></span>
            </i-col>
            <i-col span="4">

              <Dropdown>
                <a href="javascript:void(0)">
                  方案背景
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="gs in item.funlist" @click.native="openUpdateGn(gs)" :key="gs.uuid">{{gs.title}}</DropdownItem>

                </DropdownMenu>
              </Dropdown>
              <span class="cursor"  v-if="item.funlist==0" @click="openInsertGn(item.uuid)"><i class="iconfont icon-jia"></i></span>
            </i-col>
            <i-col span="4">

              <Dropdown>
                <a href="javascript:void(0)">
                  方案优势
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
            <Col span="4" class=" text-right cursor ">
            <span class="mr10 " @click="openUpdate(item)">更改</span>
            <span @click="delPro(item.uuid)">删除</span>
            </Col>
          </Row>
          <div style="height: 40px"></div>
          <Row class="apiManage_two code-row-bg test" type="flex" justify="center" align="middle" v-if="proList.length==false">
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
        <FormItem label="方案名称"  v-if="formItem.pro_in==null">
          <Input v-model="formItem.group" placeholder="请输入产品名称" ></Input>
        </FormItem>

        <FormItem label="方案描述" v-if="formItem.pro_in==null">
          <Input v-model="formItem.des" type="textarea" placeholder="请输入产品描述"></Input>
        </FormItem>
      <FormItem label="标志"  v-if="formItem.pro_in==null">
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php?uuid='+formItem.id+'&type=13'">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        <img :src="$store.state.imgcon+'/conmon/showImg.php?uuid='+formItem.id+'&type=13'" alt="">
      </FormItem>
        <FormItem label="标题" v-if="formItem.pro_in=='gs'||formItem.pro_in=='bj'">
          <Input v-model="formItem.title" type="text" placeholder="请输入标题" ></Input>
        </FormItem>
        <FormItem label="详细" v-if="formItem.pro_in=='gs'||formItem.pro_in=='bj'">
          <Input v-model="formItem.detail" type="textarea" placeholder="请输入详情" ></Input>
        </FormItem>

        <FormItem label="标题" v-if="formItem.pro_in=='ys'||formItem.pro_in=='cj'">
          <Input v-model="formItem.title" type="text" placeholder="请输入标题" ></Input>
        </FormItem>
      <FormItem label="标志"  v-if="formItem.pro_in=='gs'" class="upload">
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php?uuid='+formItem.id+'&type=4'">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        <img :src="$store.state.imgcon+'/conmon/showImg.php?uuid='+formItem.id+'&type=4'" alt="">
      </FormItem>
      <FormItem label="标志"  v-if="formItem.pro_in=='ys'" class="upload">
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php?uuid='+formItem.id+'&type=5'">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        <img :src="$store.state.imgcon+'/conmon/showImg.php?uuid='+formItem.id+'&type=5'" alt="">
      </FormItem>
        <FormItem label="副标题"v-if="formItem.pro_in=='ys'||formItem.pro_in=='cj'">
          <Input v-model="formItem.detailtitle" type="text" placeholder="请输入副标题" ></Input>
        </FormItem>
        <FormItem label="详细内容" v-if="formItem.pro_in=='ys'||formItem.pro_in=='cj'">
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
      <Form :model="insertList" :label-width="80">
        <FormItem label="方案名称"  v-if="insertList.pro_in==''">
          <Input v-model="insertList.group" placeholder="请输入产品名称" ></Input>
        </FormItem>

        <FormItem label="方案描述" v-if="insertList.pro_in==''">
          <Input v-model="insertList.des" type="textarea" placeholder="请输入产品描述"></Input>
        </FormItem>
      <FormItem label="标志"  v-if="insertList.pro_in==''">
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php'" :data="{type:13}" :on-success="uploadSucc">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
        <FormItem label="标题" v-if="insertList.pro_in=='gs'||insertList.pro_in=='bj'">
          <Input v-model="insertList.title" type="text" placeholder="请输入标题" ></Input>
        </FormItem>
        <FormItem label="详细" v-if="insertList.pro_in=='gs'||insertList.pro_in=='bj'">
          <Input v-model="insertList.detail" type="textarea" placeholder="请输入详情" ></Input>
        </FormItem>
      <FormItem label="标志"  v-if="insertList.pro_in=='gs'">
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php'" :data="{type:4}" :on-success="uploadSucc">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="标志"  v-if="insertList.pro_in=='ys'">
        <Upload :action="$store.state.imgcon+'/conmon/uploadFile.php'" :data="{type:5}" :on-success="uploadSucc">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
        <FormItem label="标题" v-if="insertList.pro_in=='ys'||insertList.pro_in=='cj'">
          <Input v-model="insertList.title" type="text" placeholder="请输入标题" ></Input>
        </FormItem>

        <FormItem label="副标题"v-if="insertList.pro_in=='ys'||insertList.pro_in=='cj'">
          <Input v-model="insertList.detailtitle" type="text" placeholder="请输入副标题" ></Input>
        </FormItem>
        <FormItem label="详细内容" v-if="insertList.pro_in=='ys'||insertList.pro_in=='cj'">
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
        advertName: '',//搜索框名字
        group:'银行',
        formItem:{

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
      delPro(item){
        var self=this;
        self.$Modal.confirm({title:'删除','content':"是否确认删除？删除之后产品不可恢复哦",okText:'确定删除',cancelText:'取消',onOk(){
          self.$http.post("mg_solution/mg_solution_del.php",{uuid:item}).then((m)=>{
            if(m.data.code!=100){
              self.$Message.info(m.data.msg);
              return false;
            }
            self.$Message.info(m.data.msg);
            self.loadPro();
          }).catch(function () {
            self.$Message.info("请求失败！");
          });
        },onCancel(){
          self.$Message.info("取消！");
        }})
      },
      openUpdateGn(item){
        var self=this;
        self.formItem.pro_in='bj';
        self.modal1=true;
        self.formItem={
          title:item.title,
          detail:item.detail,
          id:item.uuid,
          pro_in:'bj'
        };
      },
      openUpdateCj(item){
        var self=this;
        self.formItem.pro_in='cj';
        self.modal1=true;
        self.formItem={
          title:item.title,
          detailtitle:item.detailtitle,
          detail:item.detail,
          id:item.uuid,
          pro_in:'cj'
        };
      },
      openUpdateYs(item){
        var self=this;
        self.formItem.pro_in='ys';
        self.modal1=true;
        self.formItem={
          title:item.title,
          detailtitle:item.detailtitle,
          detail:item.detail,
          id:item.uuid,
          pro_in:'ys'
        };
      },
//        打开产品概述对话框
      openUpdateGs(item){
        var self=this;
        self.formItem.pro_in='gs';
        self.modal1=true;
        self.formItem={
          title:item.title,
          detail:item.detail,
          id:item.uuid,
          pro_in:'gs'
        };

      },
      openInsertGs(uuid){
        var self=this;
        self.insertList.pro_in='gs';
        self.modal3=true;
        self.insertList.uuid=uuid;
      },
      openInsertGn(uuid){
        var self=this;
        self.insertList.pro_in='bj';
        self.modal3=true;
        self.insertList.uuid=uuid;
      },
      openInsertCj(uuid){
        var self=this;
        self.insertList.pro_in='cj';
        self.modal3=true;
        self.insertList.uuid=uuid;
      },
      openInsertYs(uuid){
        var self=this;
        self.insertList.pro_in='ys';
        self.insertList.uuid=uuid;
        self.modal3=true;


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
        self.insertList.pro_in='';
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
        console.log(self.formItem);
        self.$http.post("mg_solution/mg_solution_update.php",self.formItem).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.modal1=false;
          self.loadPro();

          self.$Message.info(m.data.msg);
        }).catch(function () {
          self.$Message.info("请求失败！");
        })
      },
//      添加产品信息
      insertPro(){
        var self=this;
        console.log(self.insertList);
        self.$http.post("mg_solution/mg_solution_insert.php",self.insertList).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.modal3=false;
          self.loadPro();
          self.$Message.info(m.data.msg);
        }).catch(function () {
          self.$Message.info("请求失败！");
        })
      },
      //加载产品
      loadPro(){
        var self=this;
        self.$http.post("mg_solution/bg_list.php").then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.proList=m.data.data;

        }).catch(function () {
          self.$Message.info("请求失败！");
        });

      },


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

<template>
  <div>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">公司动态管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="height:100%">

      <div class="apiManageContainer">
        <Row class="apiManage_one">
          <Col span="10" offset="14" class="text-right">
          <span class="fr cursor" @click="openInsert"> <Button type="ghost" >添加动态</Button></span>
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
            <p class="fontWeight ml20 vc">标题：{{item.title}}</p>
            <p>
              <span class="mar_right ml20 vc">时间：{{item.time}}</span>
            </p>
            </Col>
            <Col span="4" class=" text-right cursor">
            <span class="mr10" @click="openUpdate(item)">更改</span>
            <span @click="delTeam(item.uuid)">删除</span>
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg " type="flex" justify="center" align="middle" v-if="advertList==false">
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
    >
      <p>
      <Form :model="formItem" :label-width="80">
        <FormItem label="标题"  >
          <Input v-model="formItem.title" placeholder="请输入标题" ></Input>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="formItem.des" type="textarea" placeholder="请输入描述" ></Input>
        </FormItem>
      </Form>
      </p>
      <p slot="footer">
        <Button type="ghost" @click="modal1=false">取消</Button>
        <Button type="primary" @click="updateTeam">确定</Button>
      </p>
    </Modal>

    <Modal
      v-model="modal3"

      title="修改"
    >
      <p>
      <Form :model="insertList" :label-width="80">
      <FormItem label="标题"  >
        <Input v-model="insertList.title" placeholder="请输入标题" ></Input>
      </FormItem>
      <FormItem label="描述">
        <Input v-model="insertList.des" type="textarea" placeholder="请输入描述" ></Input>
      </FormItem>
      </Form>
      </p>
      <p slot="footer">
        <Button type="ghost" @click="modal1=false">取消</Button>
        <Button type="primary" @click="insertTeam">确定</Button>
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
        advertList: [],//广告列表列表
        formItem:{},
        insertList:{}
      }
    },

    mounted(){
        this.loadCompany();
    },
    methods: {
      openUpdate(item){
var self=this;
self.modal1=true;
        self.formItem={
          uuid:item.uuid,
          title:item.title,
          des:item.description
        }
      },
      delTeam(item){
        var self=this;
        self.$Modal.confirm({title:'删除','content':"是否确认删除？删除之后产品不可恢复哦",okText:'确定删除',cancelText:'取消',onOk(){
          self.$http.post("mg_trends/mg_trends_del.php",{uuid:item}).then((m)=>{
            if(m.data.code!=100){
              self.$Message.info(m.data.msg);
              return false;
            }
            self.$Message.info(m.data.msg);
            self.loadCompany();

          }).catch(function () {
            self.$Message.info("请求失败！");
          })
        },onCancel(){
          self.$Message.info("取消！");
        }})
      },
      updateTeam(){
        var self=this;
        self.$http.post("mg_trends/mg_trends_update.php",self.formItem).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.$Message.info(m.data.msg);
          self.modal1=false;
          self.loadCompany();
        })
      },
      insertTeam(){
        var self=this;
        self.$http.post("mg_trends/mg_trends_insert.php",self.insertList).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.$Message.info(m.data.msg);
          self.modal3=false;
          self.loadCompany();
        })
      },
      openInsert(){
        var self=this;
        self.modal3=true;
      },
      loadCompany(){
   var self=this;
   self.$http.post("mg_trends/mg_trends.php").then((m)=>{
     if(m.data.code!=100){
       self.$Message.info(m.data.msg);
       return false;
     }
     self.advertList=m.data.data;
   })
 }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

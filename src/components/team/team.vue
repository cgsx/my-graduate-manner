<template>
  <div>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">管理团队管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="height:100%">

      <div class="apiManageContainer">
        <Row class="apiManage_one">
          <Col span="10" offset="14" class="text-right">
          <span class="fr cursor" @click="openInsert"> <Button type="ghost" >添加人员</Button></span>

          </Col>
        </Row>
        <div class="apiManaeListContainer advert">
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-for="item in advertList" :key="item.uuid">
            <Col span="2">
            <span class="ciclr ">
            <img src="../../assets/image/yzmpic.jpg" alt="">
            </span>
            </Col>
            <Col span="7">
            <p class="fontWeight ml20 vc">姓名：{{item.name}}</p>
            <p>
              <span class="mar_right ml20 vc">职务：{{item.dept}}</span>
            </p>
            </Col>
            <i-col span="9">
              <p>
                教育背景：{{item.backdetail}}
              </p>
              <p>

                <Dropdown>
                  <a href="javascript:void(0)">
                    {{item.workhis}}:
                    <Icon type="arrow-down-b"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem v-for="gs in item.workhisList" :key="gs.uuid" >
                      <Tooltip  class="tool" :content="gs.des">
                        {{gs.des|trunc(8)}}
                      </Tooltip>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </p>
            </i-col>

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
        <FormItem label="姓名"  >
          <Input v-model="formItem.name" placeholder="请输入姓名" ></Input>
        </FormItem>
        <FormItem label="职务">
          <Input v-model="formItem.dept" type="textarea" placeholder="请输入职务" ></Input>
        </FormItem>
        <FormItem label="教育背景">
          <Input v-model="formItem.backdetail"type="textarea" placeholder="请输入教育背景" ></Input>
        </FormItem>
        <FormItem label="工作经历">
          <Input v-model="formItem.workdes" type="textarea" placeholder="请输入工作经历，每一条经历用逗号 隔开" ></Input>
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
        <FormItem label="姓名"  >
          <Input v-model="insertList.name" placeholder="请输入姓名" ></Input>
        </FormItem>
        <FormItem label="职务">
          <Input v-model="insertList.dept" type="textarea" placeholder="请输入职务" ></Input>
        </FormItem>
        <FormItem label="教育背景">
          <Input v-model="insertList.backdetail"type="textarea" placeholder="请输入教育背景" ></Input>
        </FormItem>
        <FormItem label="工作经历">
          <Input v-model="insertList.workdes" type="textarea" placeholder="请输入工作经历，每一条经历用逗号 隔开" ></Input>
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
        modal1:false,
        modal3:false,
        advertList:[],//广告列表列表
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
          var workdes=[];
          for(var key of item.workhisList){
              workdes.push(key.des);
          }
          self.modal1=true;

          self.formItem={
              uuid:item.uuid,
              name:item.name,
            dept:item.dept,
            backdetail:item.backdetail,
            workdes:workdes.join(",")
          }
      },
      delTeam(item){
        var self=this;
        self.$Modal.confirm({title:'删除','content':"是否确认删除？删除之后产品不可恢复哦",okText:'确定删除',cancelText:'取消',onOk(){
          self.$http.post("mg_manner/mg_manner_del.php",{uuid:item}).then((m)=>{
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
        self.$http.post("mg_manner/mg_manner_update.php",self.formItem).then((m)=>{
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
        self.$http.post("mg_manner/mg_manner_insert.php",self.insertList).then((m)=>{
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
      loadCompany() {
        var self=this;
        self.$http.post("mg_manner/mg_manner.php").then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.advertList=m.data.data;
        })
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

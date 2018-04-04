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
          <span class="fr"> <Button type="ghost">添加产品</Button></span>
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
                  <DropdownItem v-for="gs in item.deslist" :key="gs.uuid" @click.native="modal1=true;">{{gs.title}}</DropdownItem>

                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span="4">

              <Dropdown>
                <a href="javascript:void(0)">
                  产品功能
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="gs in item.funlist" :key="gs.uuid">{{gs.detailtitle}}</DropdownItem>

                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span="4">

              <Dropdown>
                <a href="javascript:void(0)">
                  产品优势
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="gs in item.advenlist" :key="gs.uuid">{{gs.detailtitle}}</DropdownItem>

                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span="4">

              <Dropdown>
                <a href="javascript:void(0)">
                  应用场景
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="gs in item.applist" :key="gs.uuid">{{gs.detailtitle}}</DropdownItem>

                </DropdownMenu>
              </Dropdown>
            </i-col>
            <Col span="4" class=" text-right cursor">
            <span class="mr10" @click="">更改</span>
            <span @click="">删除</span>
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
    >
      <p>
      <Form :model="formItem" :label-width="80">
        <FormItem label="Input">
          <Input v-model="formItem.title" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="Input">
          <Input v-model="formItem.des" placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
      </p>
      <p slot="footer">
        <Button type="primary">确定</Button>
        <Button type="ghost">取消</Button>
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
        proList: [],//产品列表
        proInList:[],
        groupList:[{name:'行业智能决策产品',active:true,uid:1},{name:'智能认知产品',active:false,uid:2},{name:'大数据操作系统',active:false,uid:3}],//分组列表
        advertName: '',//搜索框名字
        group:'行业智能决策产品',
        formItem:{
          title:'',
          des:''
        }
      }
    },
    mounted(){
      this.loadPro();
    },
    methods: {
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
      //加载产品
      loadPro(){
        var self=this;
        self.$http.post("mg_pro/bg_list.php",{group:self.group}).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.proList=m.data.data;
//        self.proInList=self.proList.行业智能决策产品;


        })
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
</style>

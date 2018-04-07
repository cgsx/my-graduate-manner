<template>
  <div>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">企业信息管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="height:100%">

      <div class="apiManageContainer">
        <Row class="apiManage_one">
          <Col span="10" offset="14" class="text-right">

          </Col>
        </Row>
        <div class="apiManaeListContainer advert">
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" >
          <i-col span="4">
            <Dropdown>
              <a href="javascript:void(0)">
                {{advertList.description}}
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem v-for="gs in advertList.deslist" :key="gs.uuid" >            <Tooltip  class="tool" :content="gs.ner">
                  {{gs.ner|trunc(8)}}
                </Tooltip></DropdownItem>

              </DropdownMenu>
            </Dropdown>

          </i-col>
            <i-col span="4">

              <Dropdown>
                <a href="javascript:void(0)">
                  {{advertList.honer}}
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="gs in advertList.funlist" :key="gs.uuid">

                    <Tooltip  class="tool" :content="gs.ner">
                      {{gs.ner|trunc(8)}}
                    </Tooltip>
                  </DropdownItem>

                </DropdownMenu>
              </Dropdown>
          </i-col>
            <i-col span="4">
              <Dropdown>
                <a href="javascript:void(0)">
                  {{advertList.round}}
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="gs in advertList.advenlist" :key="gs.uuid" >
                    <Tooltip  class="tool" :content="gs.ner">
                      {{gs.ner|trunc(8)}}
                    </Tooltip>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
          </i-col>
            <Col span="4" class=" text-right cursor">
            <span class="mr10" @click="openUpdateGs(advertList)">更改</span>
            </Col>
          </Row>
          <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" v-if="advertList==false">
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
        <FormItem label="标题1"  >
          <Input v-model="formItem.des" placeholder="请输入标题1" ></Input>
        </FormItem>
      <FormItem label="标题1详情1">
      <Input v-model="formItem.content1ner1" type="textarea" placeholder="请输入标题1详情1" ></Input>
    </FormItem>
      <FormItem label="标题1详情2">
        <Input v-model="formItem.content1ner2"type="textarea" placeholder="请输入标题1详情2" ></Input>
      </FormItem>
      <FormItem label="标题1详情3">
        <Input v-model="formItem.content1ner3" type="textarea" placeholder="请输入标题1详情3" ></Input>
      </FormItem>
        <FormItem label="标题2" >
          <Input v-model="formItem.round"  placeholder="请输入标题2"></Input>
        </FormItem>
      <FormItem label="标题2详情">
      <Input v-model="formItem.content2" type="textarea" placeholder="请输入全球布局详情" ></Input>
    </FormItem>
        <FormItem label="标题3">
          <Input v-model="formItem.honer" type="text" placeholder="请输入标题1"></Input>
        </FormItem>


        <FormItem label="标题3详情" >
          <Input v-model="formItem.content3" type="textarea" placeholder="请输入标题3详情" ></Input>
        </FormItem>

      </Form>
      </p>
      <p slot="footer">
        <Button type="ghost" @click="modal1=false">取消</Button>
        <Button type="primary" @click="updatePro">确定</Button>
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
        advertList: [],//广告列表列表
        formItem:{

        }
      }
    },
    mounted(){
        this.loadCompany();
    },
    methods: {
      loadCompany() {
          var self=this;
        self.$http.post("mg_company/mg_company.php").then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.advertList=m.data.data;
        })
      },
      openUpdateGs(item){
          var self=this;
          self.modal1=true;
self.formItem={
  des:item.description,
  round:item.round,
  honer:item.honer,
  content1ner1:item.deslist[0].ner,
  content1ner2:item.deslist[1].ner,
  content1ner3:item.deslist[2].ner,
  content2:item.advenlist[0].ner,
  content3:item.funlist[0].ner,
}
      },
      updatePro(){
        var self=this;
        self.$http.post("mg_company/mg_company_update.php",self.formItem).then((m)=>{
          if(m.data.code!=100){
            self.$Message.info(m.data.msg);
            return false;
          }
          self.$Message.info(m.data.msg);
          self.modal1=false;
          self.loadCompany();
          self.advertList=m.data.data;
        })
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>

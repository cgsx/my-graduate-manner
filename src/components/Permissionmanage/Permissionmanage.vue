<template>
  <Row>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">角色权限管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="top: 0;bottom: 0;left: 0;right:0;overflow: auto;">
      <Row type="flex" justify="center" align="middle" class="code-row-bg" style="align-items:stretch">
        <Col span="5" style="background: #FCFCFC">
         <p class="text-center">
           <button class="newgrouping" @click="modal1 = true">新建分组</button>
              <div class="layout">
              <Row type="flex">
                  <Col span="24" class="layout-menu-left">
                      <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']"   style="background: rgb(252, 252, 252)" class="permissionManage_minMenu">
                        <div class="menu1">
                          <Submenu name="1" >
                             <template slot="title" >
                                   <!-- <Icon class="iconfont icon-arrfill_l2" ></Icon> -->
                                管理组
                              </template>
                            <MenuItem name="1-1" >
                              所有者
                               <p class="tuibiao">

                                    <i class="iconfont icon-pen"></i>
                                    <i class="iconfont icon-shanchu"></i>
                                </p>
                              </MenuItem>
                              <MenuItem name="1-2">管理员
                                 <p class="tuibiao">

                                  <i class="iconfont icon-pen"></i>
                                  <i class="iconfont icon-shanchu"></i>
                                </p>
                              </MenuItem>
                              <MenuItem name="1-3">部门主管
                                <p class="tuibiao" style="margin-left: 15%">

                                <i class="iconfont icon-pen"></i>
                                <i class="iconfont icon-shanchu"></i>
                                </p>
                              </MenuItem>
                          </Submenu>
                        <p class="tuibiao2" >
                          <i class="iconfont icon-jia" @click="modal1 = true"></i>
                          <i class="iconfont icon-pen"></i>
                          <i class="iconfont icon-shanchu"></i>
                        </p>
                      </div>
                   <div class="menu1">
                          <Submenu name="2">
                              <template slot="title">
                                  <!-- <Icon type="ios-keypad"></Icon> -->
                                用户组
                              </template>
                              <MenuItem name="2-1">所有者
                                   <p class="tuibiao">

                                <i class="iconfont icon-pen"></i>
                                <i class="iconfont icon-shanchu"></i>
                              </p>
                              </MenuItem>
                              <MenuItem name="2-2">管理员
                                     <p class="tuibiao">

                                <i class="iconfont icon-pen"></i>
                                <i class="iconfont icon-shanchu"></i>
                              </p>
                               </MenuItem>
                              <MenuItem name="2-3">成员
                                         <p class="tuibiao">

                                <i class="iconfont icon-pen"></i>
                                <i class="iconfont icon-shanchu"></i>
                              </p>
                               </MenuItem>
                          </Submenu>
                       <p class="tuibiao2" >
                         <i class="iconfont icon-jia" @click="modal1 = true" ></i>
                         <i class="iconfont icon-pen"></i>
                         <i class="iconfont icon-shanchu"></i>
                       </p>
                     </div>
                    <div class="menu1">
                          <Submenu name="3">
                              <template slot="title">
                                  <!-- <Icon type="ios-analytics"></Icon> -->

                                  会员组

                              </template>
                              <MenuItem name="3-1">一般会员
                                 <p class="tuibiao">

                                  <i class="iconfont icon-pen"></i>
                                  <i class="iconfont icon-shanchu"></i>
                                </p>
                              </MenuItem>
                              <MenuItem name="3-2">二组会员
                                <p class="tuibiao">

                                  <i class="iconfont icon-pen"></i>
                                  <i class="iconfont icon-shanchu"></i>
                                </p>
                              </MenuItem>
                              <MenuItem name="3-3">VIP会员
                               <p class="tuibiao">

                                <i class="iconfont icon-pen"></i>
                                <i class="iconfont icon-shanchu"></i>
                              </p>
                              </MenuItem>
                          </Submenu>
                          <p class="tuibiao2" >
                            <i class="iconfont icon-jia" @click="modal1 = true"></i>
                            <i class="iconfont icon-pen"></i>
                            <i class="iconfont icon-shanchu"></i>
                          </p>
                      </div>
                      </Menu>
                  </Col>

              </Row>
          </div>
         </p>
        </Col>
        <Col span="19">
      <div class="apiManageContainer">
          <Row class="Permissionmanage_one" style="line-height: 30px;">
            <Col span="2" class=" cursor" v-bind:class="{ borderContent: Rolemember }">
            <span v-on:click=" contentHeader ('Rolemember')">角色成员</span>
            <span class="border_bottom_position"></span>
            </Col>
            <Col span="2" class=" cursor" v-bind:class="{ borderContent: permission }">
            <span v-on:click=" contentHeader ('permission')">功能权限</span>
            <span class="border_bottom_position"></span>
            </Col>
            <Col span="13" offset="7" class="text-right">
            <Checkbox>已选择1项</Checkbox>
            <span class="Permissionmanage_one_choolse cursor ">
                     <i class="iconfont icon-gou"></i>重新分配
                   </span>
            <span class="Permissionmanage_one_input ">
                      <i class="iconfont icon-fangdajing1" style="top:-5px"></i>
                      <input type="text" placeholder="请输入关键字">
                  </span>
            </Col>
          </Row>
          <div class="apiManaeListContainer">
            <div v-show="Rolemember">
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" >
                <Col span="2">
                <CheckboxGroup v-model="disabledGroup">
                  <Checkbox label=""></Checkbox>
                </CheckboxGroup>
                </Col>
                <Col span="4">
                <span class="circl">
                <span class="circle">summer</span><span>summer</span>
              </span>
                </Col>
                <Col span="9" class="color_aaa text-right">18545625478</Col>
                <Col span="9" class="color_aaa text-right">454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" >
                <Col span="2">
                <CheckboxGroup v-model="disabledGroup">
                  <Checkbox label=""></Checkbox>
                </CheckboxGroup>
                </Col>
                <Col span="4">
                <span class="circl">
                <span class="circle">summer</span><span>summer</span>
              </span>
                </Col>
                <Col span="9" class="color_aaa text-right">18545625478</Col>
                <Col span="9" class="color_aaa text-right">454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" >
                <Col span="2">
                <CheckboxGroup v-model="disabledGroup">
                  <Checkbox label=""></Checkbox>
                </CheckboxGroup>
                </Col>
                <Col span="4">
                <span class="circl">
                <span class="circle">summer</span><span>summer</span>
              </span>
                </Col>
                <Col span="9" class="color_aaa text-right">18545625478</Col>
                <Col span="9" class="color_aaa text-right">454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" >
              <Col span="2">
              <CheckboxGroup v-model="disabledGroup">
                <Checkbox label=""></Checkbox>
              </CheckboxGroup>
              </Col>
              <Col span="4">
              <span class="circl">
                <span class="circle">summer</span><span>summer</span>
              </span>
              </Col>
              <Col span="9" class="color_aaa text-right">18545625478</Col>
              <Col span="9" class="color_aaa text-right">454569126@qq.com</Col>
            </Row>
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle" >
                <Col span="2">
                <CheckboxGroup v-model="disabledGroup">
                  <Checkbox label=""></Checkbox>
                </CheckboxGroup>
                </Col>
                <Col span="4">
                <span class="circl">
                <span class="circle">summer</span><span>summer</span>
              </span>
                </Col>
                <Col span="9" class="color_aaa text-right">18545625478</Col>
                <Col span="9" class="color_aaa text-right">454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg test" type="flex" justify="center" align="middle">
                <Col span="24" class="text-center">
                <Page :total="20" :page-size='5' @on-change="change"></Page>
                </Col>
              </Row>
            </div>
            <div v-show="permission" class="permissionContainer">
              <table class="permissionTable test">
                <tr>
                   <td style="width:20%" class="titel">
                     <CheckboxGroup v-model="permissionGroup" size="large">
                       <Checkbox label="" >空间管理</Checkbox>
                     </CheckboxGroup>
                   </td>
                    <td class="rols">
                       <CheckboxGroup v-model="permissionGroup" size="large">
                          <Checkbox label="" >空间新建
                            <Tooltip content="这里是提示文字">
                            <Icon class="info iconfont icon-i1" color="#1CB394"  ></Icon>
                          </Tooltip>
                         </Checkbox>

                          <Checkbox label="" >空间管理</Checkbox>
                          <Checkbox label="">管理项目（删，改）</Checkbox>
                          <Checkbox label="" >接口管理</Checkbox>
                          <Checkbox label="" >文档管理</Checkbox>
                          <Checkbox label="">日志管理</Checkbox>
                      </CheckboxGroup>
                    </td>
                </tr>
                <tr>
                   <td style="width:20%" class="titel">
                     <CheckboxGroup v-model="permissionGroup" size="large">
                       <Checkbox label="" >空间管理</Checkbox>
                     </CheckboxGroup>
                   </td>
                    <td class="rols">
                       <CheckboxGroup v-model="permissionGroup" size="large">
                          <Checkbox label="" >空间新建</Checkbox>
                          <Checkbox label="" >空间管理</Checkbox>
                          <Checkbox label="">管理项目（删，改）</Checkbox>
                          <Checkbox label="" >接口管理</Checkbox>
                          <Checkbox label="" >文档管理</Checkbox>
                          <Checkbox label="">日志管理</Checkbox>
                      </CheckboxGroup>
                    </td>
                </tr>

                <tr>
                   <td style="width:20%" class="titel">
                     <CheckboxGroup v-model="permissionGroup" size="large">
                       <Checkbox label="" >空间管理</Checkbox>
                     </CheckboxGroup>
                   </td>
                    <td class="rols">
                       <CheckboxGroup v-model="permissionGroup" size="large">
                          <Checkbox label="" >空间新建</Checkbox>
                          <Checkbox label="" >空间管理</Checkbox>
                          <Checkbox label="">管理项目（删，改）</Checkbox>
                          <Checkbox label="" >接口管理</Checkbox>
                          <Checkbox label="" >文档管理</Checkbox>
                          <Checkbox label="">日志管理</Checkbox>
                      </CheckboxGroup>
                    </td>

                </tr>
                <tr>
                  <td style="width:20%" class="titel">
                    <CheckboxGroup v-model="permissionGroup" size="large">
                      <Checkbox label="" >空间管理</Checkbox>
                    </CheckboxGroup>
                  </td>
                  <td class="rols">
                    <CheckboxGroup v-model="permissionGroup" size="large">
                      <Checkbox label="" >空间新建</Checkbox>
                      <Checkbox label="" >空间管理</Checkbox>
                      <Checkbox label="">管理项目（删，改）</Checkbox>
                      <Checkbox label="" >接口管理</Checkbox>
                      <Checkbox label="" >文档管理</Checkbox>
                      <Checkbox label="">日志管理</Checkbox>
                    </CheckboxGroup>
                  </td>

                </tr>
                <tr >
                  <td style="width:20%" class="titel">
                    <CheckboxGroup v-model="permissionGroup" size="large">
                      <Checkbox label="" >空间管理</Checkbox>
                    </CheckboxGroup>
                  </td>
                  <td class="rols">
                    <CheckboxGroup v-model="permissionGroup" size="large">
                      <Checkbox label="" >空间新建</Checkbox>
                      <Checkbox label="" >空间管理</Checkbox>
                      <Checkbox label="">管理项目（删，改）</Checkbox>
                      <Checkbox label="" >接口管理</Checkbox>
                      <Checkbox label="" >文档管理</Checkbox>
                      <Checkbox label="">日志管理</Checkbox>
                    </CheckboxGroup>
                  </td>

                </tr>
              </table>
            </div>
        </div>
      </div>
        </Col>

      </Row>
    </Row>
    <Modal
      v-model="modal1"
      title="新建分组"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>
        <label for="">分组名称</label>
        <input type="text" class="group" placeholder="请输入分组名称">
      </p>
    </Modal>
    <Modal
      v-model="modal1"
      title="新建角色"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>
        <div>
          <label for="" class="label">角色名称</label>
          <input type="text" class="group" placeholder="请输入角色名称">
        </div>
        <div class="mt10">
          <label for=""  class="label">角色组&nbsp;</label>
          <Select v-model="model2" style="width:85%;">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="mt10">
          <label for="" class="label">角色描述</label>
          <textarea name="" class="text_area" id="" cols="30" rows="10" placeholder="请输入角色描述"></textarea>
        </div>
      </p>
    </Modal>
  </Row>
</template>

<script>
  export default {
    name: 'APImanagement',
    data () {
      return {
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          }
        ],
        model2: '',
        model3: '',
        disabledGroup: ['苹果'],
        modal1: false,
        Rolemember: true,
        permission: false,
        iconShow: false,
        permissionGroup: []
      }
    },
    methods: {
      change: function (page) {
        console.log(page)
      },
      test: function () {
        alert(1)
      },
      ok () {
        this.$Message.info('成功')
      },
      cancel () {
        this.$Message.info('取消成功')
      },
      contentHeader (obj) {
        switch (obj) {
          case 'Rolemember':
            this.Rolemember = true
            this.permission = false
            break
          case 'permission':
            this.Rolemember = false
            this.permission = true
            break
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .text_area{width: 85%;border: 1px solid #eee;padding: 8px;border-radius: 5px;height:100px;overflow: auto}
  .label{width: 12%;display: inline-block;vertical-align: top;}
  .group{width:85%;padding: 5px;border: 1px solid #eee;border-radius: 5px;}
  .newgrouping{background: #fff;border: 1px solid #eee;padding: 5px 10px;width: 80%;border-radius: 20px;margin-top: 10px;}
  .circle{display: inline-block;width: 30px;height:30px;overflow: hidden;border-radius: 50%;background: #00c1de;vertical-align: middle;color: #fff;line-height: 30px;text-align: center;margin-right: 10px;}
  .Permissionmanage_one .borderContent .border_bottom_position {
    width: 80%;
    position: absolute;
    bottom: -11px;
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


  .Permissionmanage_one_choolse {
    margin-right: 10px;
    padding: 5px 10px;
    border-radius: 18px;
    border: 1px solid #DDDEE1;
    background: #fff;
  }

  .Permissionmanage_one_choolse i {
    margin-right: 5px;
    vertical-align: middle
  }


  .Permissionmanage_one_input {
    position: relative;
  }

  .Permissionmanage_one_input input {
    width: 45%;
    height: 30px;
    padding: 3px 30px 3px 10px;
    border-radius: 18px;
    border: 1px solid #DDDEE1;
  }

  .Permissionmanage_one_input i {
    position: absolute;
    right: 8px;
    color: #808080;
    z-index: 100;
  }

  .Permissionmanage_one {
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
  .ivu-col-span-19 {

    background-color: white;
  }

    .layout{

        background: #f5f7f9 !important;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
          background: #f5f7f9 !important;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
          background: #f5f7f9 !important;
    }
    .layout-header{
        height: 60px;
          background: #f5f7f9 !important;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
          background: #f5f7f9 !important;
        border-radius: 3px;
        margin: 15px auto;
    }
.ivu-menu-vertical .ivu-menu-submenu-title-icon {
    float: left;
    position: relative;
    top: 4px;

}
.iconfont {

    font-size: 14px;

}
.tuibiao{
 display: inline-block;

  position: relative;
 clear:both;
 float: right;
opacity: 0;

}
.ivu-menu-submenu-title:hover .tuibiao {
  opacity: 1;
}
  .ivu-menu-item:hover .tuibiao {
    opacity: 1;
  }

.tuibiao i{
  margin-left: 7px;
}
.permissionTable{
  cellspacing:0;
  background-color: #fafbfd;
}

.permissionTable td{
  text-align: center;

  border-bottom: .5px solid #eeeeee;
  border-right: .5px solid #eeeeee;
}
  .ivu-checkbox-checked .ivu-checkbox-inner {
    border-color: #1CB394;
    background-color: #1CB394;
  }
  /*.permissionTable>tr>td:nth-child(1){*/
  /*font-weight: bold;*/
  /*}*/
  .ivu-checkbox-wrapper {
    margin-right: 4%;
  }
  .rols{
    text-align: left;
    position: relative;
    padding-left: 3%;
  }
  .checks{
    display:inline-block;
    height: 30px;
    line-height: 30px
  }
  .titel{
    line-height: 80px;
  }
  .clickDiv{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .permissionContainer{
    margin-left: 1%;
    margin-top: 2%;
    background-color: white;
  }
  .layout{
    margin-top: 5%;
  }

  .menu1{
    position: relative;
  }
  .tuibiao2{
    display: inline-block;
    position: absolute;
    top: 14px;
    margin-left: 57.5%;
    opacity: 0;
    z-index: 10;
  }
  .tuibiao2 i{
    margin-left: 7px;
  }
 .menu1:hover  .tuibiao2{
   opacity: 1;
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
  .test{
    margin-bottom: 100px;
  }
  .permissionManage_minMenu .ivu-menu-item-active:not(.ivu-menu-submenu){
    color:#1CB394 !important ;
    border-right: 2px solid #1CB394 !important;
  }
</style>

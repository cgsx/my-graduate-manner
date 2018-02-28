<template>
  <Row>
    <Row class="right_item" style="line-height: 50px;background: #FCFCFC;">
      <Col span="4" class="right_item_api">
      <span class="fontWeight">权限管理</span>
      </Col>
    </Row>
    <Row class="apiManage" style="top: 0;bottom: 0;left: 0;right:0;overflow: auto;">
      <Row type="flex" justify="center" align="middle" class="code-row-bg" style="align-items:stretch;position: fixed;height:100%;width: 82%;overflow: auto">
        <Col span="5" style="background: #FCFCFC">
        <p class="text-center">
          <button class="newgrouping" @click="modal1 = true">新建分组</button>
        </p>
        <Collapse accordion v-model="value3" class="collapse">
          <Panel name="1" class="panel ">
            产品
            <div slot="content" class="pd-10">
              <p >一级分类名称 <span ><i class="iconfont icon-jia "></i><i class="iconfont icon-pen"></i><i class="iconfont icon-shanchu1"></i></span></p>
              <p>一级分类<span ><i class="iconfont icon-jia"></i><i class="iconfont icon-pen"></i><i class="iconfont icon-shanchu1"></i></span></p>
              <p>金融服务 <span ><i class="iconfont icon-jia "></i><i class="iconfont icon-pen"></i><i class="iconfont icon-shanchu1"></i></span> </p>
              <p>通讯服务 <span ><i class="iconfont icon-jia "></i><i class="iconfont icon-pen"></i><i class="iconfont icon-shanchu1"></i></span> </p>
              <p>票务服务 <span><i class="iconfont icon-jia "></i><i class="iconfont icon-pen"></i><i class="iconfont icon-shanchu1"></i></span> </p>
              <p>开发工具 <span><i class="iconfont icon-jia "></i><i class="iconfont icon-pen"></i><i class="iconfont icon-shanchu1"></i></span> </p>
            </div>
          </Panel>
          <Panel name="2" class="panel ">
            解决方案
            <div slot="content" class="pd-10">
              <p class="">解决方案一级方案<span><i class="iconfont icon-jia cursor " @click="modal2 = true"></i><i class="iconfont icon-pen"></i><i
                class="iconfont icon-shanchu1"></i></span></p>
              <p class="">行业解决方案<span><i class="iconfont icon-jia  cursor" @click="modal2 = true"></i><i class="iconfont icon-pen"></i><i
                class="iconfont icon-shanchu1"></i></span></p>
              <p class="">通用解决方案<span><i class="iconfont icon-jia  cursor" @click="modal2 = true"></i><i class="iconfont icon-pen"></i><i
                class="iconfont icon-shanchu1"></i></span></p>
              <p class="">安全解决方案<span><i class="iconfont icon-jia cursor " @click="modal2 = true"></i><i class="iconfont icon-pen"></i><i
                class="iconfont icon-shanchu1"></i></span></p>
            </div>
          </Panel>

        </Collapse>
        </Col>
        <Col span="19" >
        <div class="apiManageContainer">
          <Row class=" Permission_one" style="line-height: 30px;">
            <Col span="3" class=" cursor text-center" v-bind:class="{ borderContent: Rolemember }">
            <span v-on:click=" contentHeader ('Rolemember')">权限列表</span>
            <span class="border_bottom_position"></span>
            </Col>
            <Col span="13" offset="8" class="text-right">
            <Checkbox>已选择1项</Checkbox>
            <span class="Permission_one_choolse cursor ">
                      <i class="iconfont icon-xiugai"></i>修改
                    </span>
            <span class="Permission_one_choolse cursor ">
                      <i class="iconfont icon-shanchu1"></i>删除
                    </span>
            <span class="Permission_on_input ">

              <input type="text" placeholder="请输入关键字">
              <i class="iconfont icon-fangdajing1" style="top:-5px"></i>
            </span>
            </Col>
          </Row>
          <div class="apiManaeListContainer">
            <div v-show="Rolemember">
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle">
                <Col span="2">
                <CheckboxGroup v-model="disabledGroup">
                  <Checkbox label=""></Checkbox>
                </CheckboxGroup>
                </Col>
                <Col span="4">
                <span class="color_aaa">summer</span>
                </Col>
                <Col span="9" class="color_aaa text-right">
                18545625478</Col>
                <Col span="8" class="color_aaa text-right">
                454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle">
                <Col span="2">
                <CheckboxGroup v-model="disabledGroup">
                  <Checkbox label=""></Checkbox>
                </CheckboxGroup>
                </Col>
                <Col span="4">
                <span class="color_aaa">summer</span>
                </Col>
                <Col span="9" class="color_aaa text-right">
                18545625478</Col>
                <Col span="8" class="color_aaa text-right">
                454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle">
                <Col span="2">
                <CheckboxGroup v-model="disabledGroup">
                  <Checkbox label=""></Checkbox>
                </CheckboxGroup>
                </Col>
                <Col span="4">
                <span class="color_aaa">summer</span>
                </Col>
                <Col span="9" class="color_aaa text-right">
                18545625478</Col>
                <Col span="8" class="color_aaa text-right">
                454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg test" type="flex" justify="center" align="middle">
                <Page :total="50"></Page>
              </Row>
            </div>
            <div v-show="permission">
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle">
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
                <Col span="9" class="color_aaa text-right">
                18545625478</Col>
                <Col span="9" class="color_aaa text-right">
                454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg test" type="flex" justify="center" align="middle">
                <Col span="2">
                <CheckboxGroup v-model="disabledGroup">
                  <Checkbox label="香蕉"></Checkbox>
                </CheckboxGroup>
                </Col>
                <Col span="4">
                <span class="circl">
                <span class="circle">summer</span><span>summer</span>
              </span>
                </Col>
                <Col span="9" class="color_aaa text-right">
                18545625478</Col>
                <Col span="9" class="color_aaa text-right">
                454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle">
                <Col span="2">
                <CheckboxGroup v-model="disabledGroup">
                  <Checkbox label="香蕉"></Checkbox>
                </CheckboxGroup>
                </Col>
                <Col span="4">
                <span class="circl">
                <span class="circle">summer</span><span>summer</span>
              </span>
                </Col>
                <Col span="9" class="color_aaa text-right">
                18545625478</Col>
                <Col span="9" class="color_aaa text-right">
                454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle">
                <Col span="2">
                <CheckboxGroup v-model="disabledGroup">
                  <Checkbox label="香蕉"></Checkbox>
                </CheckboxGroup>
                </Col>
                <Col span="4">
                <span class="circl">
                <span class="circle">summer</span><span>summer</span>
              </span>
                </Col>
                <Col span="9" class="color_aaa text-right">
                18545625478</Col>
                <Col span="9" class="color_aaa text-right">
                454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle">
                <Col span="2">
                <CheckboxGroup v-model="disabledGroup">
                  <Checkbox label="香蕉"></Checkbox>
                </CheckboxGroup>
                </Col>
                <Col span="4">
                <span class="circl">
                <span class="circle">summer</span><span>summer</span>
              </span>
                </Col>
                <Col span="9" class="color_aaa text-right">
                18545625478</Col>
                <Col span="9" class="color_aaa text-right">
                454569126@qq.com</Col>
              </Row>
              <Row class="apiManage_two code-row-bg" type="flex" justify="center" align="middle">
                <Col span="24" class="text-center">
                   <Page :total="20" :page-size='5' @on-change="change"></Page>
                </Col>
              </Row>
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
      v-model="modal4"
      title="新建角色"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>
      <div>
        <label for="" class="label">角色名称</label>
        <input type="text" class="group" placeholder="请输入角色名称">
      </div>
      <div class="mt10">
        <label for="" class="label">上级权限</label>
        <input type="text" class="group" placeholder="空间管理">
      </div>
      <div class="mt10">
        <label for="" class="label">权限代码</label>
        <input type="text" class="group" placeholder="请输入权限代码">
      </div>
      <div class="mt10">
        <label for="" class="label">权限路径</label>
        <input type="text" class="group" placeholder="请输入权限路径">
      </div>
      <div class="mt10">
        <label for="" class="label">权限说明</label>
        <input type="text" class="group" placeholder="请输入权限说明">
      </div>
      <div class="mt10">
        <label for="" class="label">角色组&nbsp;</label>
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
    name: "APImanagement",
    data() {
      return {
        cityList: [
          {
            value: "New York",
            label: "New York"
          },
          {
            value: "London",
            label: "London"
          }
        ],
        model2: "",
        model3: "",
        disabledGroup: ["苹果"],
        modal1: false,
        Rolemember: true,
        permission: false,
        modal4: false
      };
    },
    methods: {
      change: function (page) {
        console.log(page)
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
  .Permission_one .borderContent .border_bottom_position {
    width: 65%;
    position: absolute;
    bottom: -11px;
    left: 17%;
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
  .collapse {
    border: 0;
    background-color: rgb(252, 252, 252);
    line-height: 28px;
  }

  .collapse .panel {
    border-top: none;
  }

  .collapse .ivu-collapse-content-box {
    padding-top: 0;
    padding-bottom: 0;
  }

  .collapse .ivu-collapse-content {
    background-color: rgb(252, 252, 252);
  }


  .Permission_one_choolse {
    margin-right: 10px;
    padding: 4px 10px;
    border-radius: 18px;
    border: 1px solid #DDDEE1;
    background: #fff;
  }

  .Permission_one_choolse i {
    margin-right: 5px;
    vertical-align: middle
  }


  .Permission_on_input {
    position: relative;
  }

  .Permission_on_input input {
    width: 45%;
    height: 30px;
    padding: 3px 30px 3px 10px;
    border-radius: 18px;
    border: 1px solid #DDDEE1;
  }

  .Permission_on_input i {
    position: absolute;
    right: 8px;
    color: #808080;
    z-index: 100
  }
  .pd-10 p:hover{
    cursor: pointer;
  }
  .Permission_one {
    background: #fff;
    padding: 10px;
    padding-left: 20px;
    border-bottom: 1px solid #eee;
  }
  .Permission_one .ivu-checkbox-wrapper {
    margin-right: 7px ;
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
</style>

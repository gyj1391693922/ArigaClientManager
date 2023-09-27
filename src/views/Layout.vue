<template>
    <div>
      <!--头部栏header-->
      <div style="height: 60px; line-height: 60px; background-color: white; margin-bottom: 3px;display: flex">
        <div>
          <span style="margin-left: 30px; font-size: 24px;">ariga后台</span>
        </div>
        <div style="flex: 1;text-align: right;padding-right: 35px;">
          <el-dropdown size="medium" trigger="hover">
          <span class="el-dropdown-link">
            管理员<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown" style="width: 120px;margin-top:-5px" >
              <el-dropdown-item  ><div @click="login">退出登录</div></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
  
      <!--侧边栏和主体-->
      <div style="display: flex;">
        <!--侧边栏导航-->
        <div style="width: 200px;min-height: calc(100vh - 63px); overflow: hidden; margin-right: 2px; background-color: white;">
            <el-container style="height: 100%; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1','1-1','2','3']" :default-active="$route.path" router lazy> 
      <el-submenu index="1">
        <template slot="title"><i></i>影片管理</template>
        <el-submenu index="1-1">
            <template slot="title">
                <span style="margin-left: 20%;">影片详情</span>
            </template>
            <el-menu-item index="/videoList">
                <span style="margin-left: 20%;">电影详情</span>
            </el-menu-item>
        </el-submenu>
        <el-menu-item index="/movList">
                <span style="margin-left: 24%;">电影管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i></i>订单管理</template>
        <el-menu-item index="2-1">
                <span style="margin-left: 24%;">订单详情</span>
        </el-menu-item>
        <el-menu-item index="2-2">
                <span style="margin-left: 24%;">充值信息</span>
        </el-menu-item>
        <el-menu-item index="2-3">
                <span style="margin-left: 24%;">提现管理</span>
        </el-menu-item>
        <el-menu-item index="2-3">
                <span style="margin-left: 24%;">信息统计</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i></i>系统管理</template>
        <el-menu-item index="3-1">
                <span style="margin-left: 24%;">用户管理</span>
        </el-menu-item>
        <el-menu-item index="3-2">
                <span style="margin-left: 24%;">up主管理</span>
        </el-menu-item>
        <el-menu-item index="3-3">
                <span style="margin-left: 24%;">系统通知</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  </el-container>
        </div>
        <!--主体数据-->
        <div style="flex: 1;background-color: white;">
          <router-view />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Layout",
    methods:{
      login(){
        this.$router.push('login')
      }
    }
  }
  </script>
  
  <style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
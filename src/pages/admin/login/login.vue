<!--viwe 用来组建元素-->
<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">快鸟数据管理中心</h3>
      </div>

      <el-form-item prop="UserName">
        <span class="svg-container">
          <i class="el-icon-edit"></i>
        </span>
        <el-input
          v-model="loginForm.UserName"
          placeholder="请输入登录名"
          name="UserName"
          type="text"
          auto-complete="on"
           @keyup.enter.native="loginHandler"
        />
      </el-form-item>

      <el-form-item prop="Pwd">
        <span class="svg-container">
          <i class="el-icon-message"></i>
        </span>
        <el-input
          :type="PwdType"
          v-model="loginForm.Pwd"
          placeholder="请输入密码"
          name="Pwd"
          auto-complete="off"
          @keyup.enter.native="loginHandler"
        />
        <span class="show-pwd" title="显示密码" @click="showPwd">
          <i class="el-icon-view"></i>
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="loginHandler"
      >登录</el-button>
    </el-form>

    <el-dialog class="dialog-check-code" title="请输入动态口令：" :visible.sync="showDialog" @open="onShowDialogDynamicHandler" append-to-body>
      
      <el-input placeholder="请输入内容" v-model="loginForm.CheckCode" clearable @keyup.enter.native="loginByDynamicCodeHandler"></el-input>
      <br>
       <br>
        <el-button
        :loading="diaLoading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="loginByDynamicCodeHandler" >确定</el-button>
     
    
     
    </el-dialog>
  </div>
</template>
<style scoped>
@import "./login.css";
</style>
<!--依赖的控制器js-->
<script src="./login.js"></script>
 
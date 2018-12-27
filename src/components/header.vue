<template>
  <el-header style=" background-color: #303242">
    <el-menu
      :default-active="$route.path"
      router
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#303242"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/login">后台登录</el-menu-item>
      <el-menu-item index="/payment">支付包付费集成</el-menu-item>
      <el-menu-item index="/payrecords">付费记录查询</el-menu-item>
    </el-menu>
  </el-header>
</template>
<style>
.el-menu-demo .is-active {
  font-weight: bold;
  font-size: 15px;
}
</style>
<script>


export default {
  //f3f18e
  data() {
    return {
      activeIndex: ""
    };
  },
  props: ["title"],
  methods: {
    goback() {
      this.$router.go(-1);
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      //  console.log("key:" + key);
      // console.log(keyPath);
      /*     this.$router.push({
      path: key
        }); */
    }

    
  },
  //-------vue生命周期函数-begin------------
  /*创建前*/
  beforeCreate: function() {
    //console.log("beforeCreate");
  },
  /*创建后*/
  created: function() {

  },
  /*载入前*/
  beforeMount: function() {
    //console.log("beforeMount");
  },
  /*载入后*/
  mounted: function() {
   
  },
  /*更新前*/
  beforeUpdate: function() {},
  /*更新后*/
  updated: function() {},
  /*销毁前*/
  beforeDestroy: function() {},
  /*销毁后*/
  destroyed: function() {},

  //-------vue生命周期函数-end------------
};
</script>

<template>
  <div id="app">
    <!--span>{{this.$route.meta.notShowHeader}}</span>-->
    <el-container direction="vertical">
      <transition name="el-fade-in-linear" mode="out-in">
        <router-view/>
      </transition>
    </el-container>
  </div>
</template>
<style>
body {
  margin: 0px;
}
</style>

<script>
 
export default {
  name: "App",

  data() {
    return {
      data: true
    };
  },
  

  components: {
  
  }
};
</script>

 

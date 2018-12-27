<!--viwe 用来组建元素-->
<template>
 <el-row class="content">
  
   <el-col :span="4" class="content-left">
    <el-scrollbar style="height:100%;">
      <NavbarOfAdmin ref="navbar" class="navbar" v-on:invokemenuchangd="invokeNavMenuChangdAtParent"></NavbarOfAdmin>
    </el-scrollbar>
    
   </el-col>

    <el-col :span="20">

    <div class="content-right">
      <el-row>
        <el-col  :span="2" class="right-header float_r">
            <el-button
            type="primary"
            size="small"
            @click="logoutHandler"
          >安全退出</el-button>

        </el-col>
      </el-row>
      <hr>
      <el-tabs class="tab-container" v-model="editableTabsValue" type="card"  addable  @tab-remove="removeTabHandler" :before-leave="beforeLeaveTabHandler">
          <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              :closable="item.close"
            >
             <!-- 失活的组件将会被缓存！-->
            <keep-alive>
              <component v-bind:is="item.component"></component>
            </keep-alive>
            </el-tab-pane>
     </el-tabs>
   </div>

  </el-col>

</el-row>

</template>

<style scoped>
@import "./admin.css";
</style>
<!--依赖的控制器js-->
<script src="./admin.js"></script>
 
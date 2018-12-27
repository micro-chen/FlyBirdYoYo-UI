<!--使用子组件的目录或者父组件的名称不要使用太短的字符串比如：tools 跟VUE里的Pros 重叠了！！！-->
<template>
  <el-menu
    background-color="rgb(48, 65, 86)"
    :default-active="currentSelectMenuIndex"
    active-text-color="rgb(191, 203, 217)">
    
    <el-menu-item
      v-for="item in menuList"
      :key="item.index"
      :index="item.index"
      v-on:click="onMenuSelectHandler">
      <i :class="item.class"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      currentSelectMenuIndex: "1", //当前选中的菜单索引
      menuList: [
        {
          index: "1",
          label: "学生管理",
          class: "el-icon-goods",
          page: "studentManage",
          selected: true
        },
        {
          index: "2",
          label: "其他",
          class: "iconfont icon-guanlianshebei",
          page: "others"
        },
         
      ]
    };
  },
  methods: {
    /*档选中菜单点击的时候事件*/
    onMenuSelectHandler: function(e) {
      console.log("onMenuSelectHandler");
      var index = e.index;
      this.sendToParentTabHandler(index);
    },
    /*从父组件传递的事件*/
    fromParentTabHandleClick(activeName, oldActiveName) {
      console.log(activeName);
      var that = this;
      if (appCore.isNullOrEmpty(activeName)) {
        console.log("error:not null activeName");
        return;
      }

      var menuItem = that.menuList.find(x => x.page == activeName);
      if (appCore.isNullOrUndefined(menuItem)) {
        console.log("error:not find menuItem by activeName");
        return;
      }

      that.currentSelectMenuIndex = menuItem.index;
    },
    /*发送消息到父亲事件*/
    sendToParentTabHandler: function(index) {
      //debugger;
      console.log("sendToParentTabHandler");

      var that = this;
      if (appCore.isNullOrEmpty(index)) {
        console.log("error sendToParentTabHandler");
        return;
      }
      //找到菜单项
      var menuItem = that.menuList.find(function(x) {
        if (x.index == index) {
          return true;
        }
      });

      if (appCore.isNullOrUndefined(menuItem)) {
        appCore.MessageBox.error("未找到指定的菜单项！");
        return;
      }
      //向父亲发送消息和数据
      this.$emit("invokemenuchangd", menuItem);
    }
  }
};
</script>
<style scoped>
.el-menu-item {
    color: rgb(191, 203, 217);
}
.el-menu {

  border-right: none;
  background-color: rgb(48, 65, 86);
}
.el-menu-item.is-active{
 color:rgb(64, 158, 255) !important;
}
.el-menu-item:focus, .el-menu-item:hover {
  outline: 0;
  background-color: rgb(38, 52, 69) !important;
}
</style>

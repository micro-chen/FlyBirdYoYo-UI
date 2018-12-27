<template>


  <div>
    <Header></Header>

    <button v-on:click="handlerCounterClick">点我+1</button>

    <p>The button above has been clicked {{ counter }} times.</p>

    <br>
    <router-link to="/payment">支付续费</router-link>

    <router-link to="/payrecords">充值记录</router-link>

    <br>
    <router-link to="/login" target="_blank">管理后台登录</router-link>
    <br>

    <footerinfo></footerinfo>
    
  </div>
</template>

<script>
import Header from "@/components/header";

import footerinfo from "@/components/footer";

import { debug } from "util";

export default {
  /*为何在大型项目中data需要使用return返回数据呢？
  
  曰：不使用return包裹的数据会在项目的全局可见，会造成变量污染
  
  使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件。*/

  data() {
    return {
      pagetitle: "首页",

      counter: 0

      //handlerCounterClick: function () {

      //  this.counter += 1;

      //}
    };
  },

  // 在 `methods` 对象中定义方法

  methods: {
    handlerCounterClick: function(event) {
      var that = this; // `this` 在方法里指向当前 Vue 实例

      //debugger---进入调试断点

      alert("Hello " + that.counter + "!");

      // `event` 是原生 DOM 事件

      if (event) {
        alert(event.target.tagName);
      }

      this.counter += 1;
    }
  },

  components: {
    Header: Header,

    footerinfo: footerinfo
  }
};
</script>

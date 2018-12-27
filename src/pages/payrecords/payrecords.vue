<!--viwe 用来组建元素-->
<template>
  <div id="contentOrder" class="content">
    <h3 class="order-title">服务充值记录</h3>

    <el-row id="filterHeader">
      <el-col :span="14">
        <el-col :span="3" class="label-title">
          <span>充值时间：</span>
        </el-col>
        <el-col :span="20">
          <el-date-picker
            v-model="dateRange"
            @change="timeRangChangeHandler"
            :default-time= "['00:00:00', '23:59:59']"
            type="datetimerange"
            :picker-options="pickerOptions2"
            
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          ></el-date-picker>
        </el-col>
      </el-col>
      <el-col :span="8">
        <el-col :span="8" class="label-title">
          <span>交易单号(可选)：</span>
        </el-col>
        <el-col :span="12">
          <el-input v-model="conditonModel.orderId" size="mini" placeholder="请输入交易单号"></el-input>
        </el-col>
      </el-col>

      <el-col :span="2">
        <el-button class="float_r search" type="warning" @click="loadUserPayRecordsHandler">查询</el-button>
      </el-col>
    </el-row>

    <table class="order-list">
      <tr>
        <th>交易单号</th>
        <th>下单时间</th>
        <th>订购周期</th>
        <th>到期时间</th>
        <th>实付(元)</th>
        <th>交易状态</th>
        <th>付款时间</th>
        <th>支付方式</th>
      </tr>
       <tr v-for="item in orderList" :key="item.OrderId">
          
          <td>{{item.OrderId}}</td>
          <td>{{item.OperatingTime}}</td>
          <td>{{item.CycleDescption}}</td>
          <td>{{item.ExpiresTime}}</td>
          <td>{{item.Money}}</td>
          <td>{{item.OrderStatus}}</td>
          <td>{{item.PayTime}}</td>
          <td>{{item.PayWay}}</td>
       </tr>
    </table>

    <div id="pager-zone" class="order-total pager">
        <el-pagination id="pager"
        background
         @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="conditonModel.pageNumber"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="conditonModel.total">
        </el-pagination>

    </div>
  </div>
</template>

<style scoped>
@import "./payrecords.css";
</style>
<!--依赖的控制器js-->
<script src="./payrecords.js"></script>
 
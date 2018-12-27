<!--viwe 用来组建元素-->
<template>
  <div class="app-container">
    <el-row id="filterHeader" class="filterHeader">
      <el-col :span="6">
        <el-col :span="6" class="label-title">
          <span>所在平台：</span>
        </el-col>
        <el-col :span="15">
          <el-select v-model="conditonModel.platform" size="mini"  placeholder="请选择">
            <el-option
              v-for="item in listPlatforms"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="8">
        <el-col :span="8" class="label-title">
          <span>店铺名称：</span>
        </el-col>
        <el-col :span="12">
          <el-input v-model="conditonModel.keyWord" size="mini" placeholder="请输入店铺名称"></el-input>
        </el-col>
      </el-col>

      <el-col :span="2">
        <el-button class="float_r search" type="warning" @click="loadShopListHandler">查询</el-button>
      </el-col>
    </el-row>

    <el-table :data="listShops" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="Id" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.Id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="归属平台">
        <template slot-scope="scope">
          <span>{{ scope.row.PlatformName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="店铺名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.ShopName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="登录次数">
        <template slot-scope="scope">
          <span>{{ scope.row.LoginCount }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="最后一次登录" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.LastLoginTime }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="服务过期时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.ExpireTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="enterShopHandler(scope.row.EnterShopUrl)"
          >进入</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div id="pager-zone" class="order-total pager float_r" v-if="conditonModel.total>0">
      <el-pagination
        id="pager"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="conditonModel.pageNumber"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="conditonModel.total"
      ></el-pagination>
    </div>
  </div>
</template>

<style scoped>
@import "./studentManage.css";
</style>
<!--依赖的控制器js-->
<script src="./studentManage.js"></script>
 
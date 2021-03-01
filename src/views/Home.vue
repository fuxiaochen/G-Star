<template>
  <div class="home">
    <div class="sidebar"></div>
    <div class="content">
      <el-row>
        <el-col :span="12" style="width:100%; text-align: left">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#171f2b"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <template slot="title">
                <i class="el-icon-receiving"></i>
                <span>全部</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2">
              <template slot="title">
                <i class="el-icon-star-off"></i>
                <span>未标签</span>
              </template>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-price-tag"></i>
                <span>标签</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-key"></i>
                <span>语言</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="details">
      <div class="top">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input2"
          clearable
          style="width:35%"
        ></el-input>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input2"
          clearable
          style="width:35%"
        ></el-input>
      </div>
      <div class="card">
        <div class="left"></div>
        <div class="right">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">{{'列表内容' + o }}</div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .sidebar {
    width: 0.5%;
    height: 100%;
    background-color: #23334c;
  }
  .content {
    width: 14.5%;
    height: 100%;
    background-color: #171f2b;
    .texts {
      color: #b8c2cc;
    }
  }
  .details {
    width: 85%;
    height: 100%;
    background-color: #ffffff;
    .top {
      width: 100%;
      height: 5%;
      display: flex;
      justify-content: space-between;
      align-items:center
    }
    .card {
      display: flex;
      justify-content: space-between;
      .left {
        width: 20%;
        height: 95%;
      }
      .right {
        width: 80%;
        height: 95%;
      }
    }
  }
}
</style>

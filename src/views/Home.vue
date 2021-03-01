<template>
  <div class="home">
    <div class="sidebar"></div>
    <div class="content">
      <el-row>
        <el-col :span="12">
          <h5>自定义颜色</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <div class="texts">全部</div>
      <div class="texts">未标签</div>
      <div class="texts">标签</div>
      <div class="texts">语言</div>
    </div>
    <div class="details"></div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .sidebar {
    width: 3%;
    height: 100%;
    border-radius: 5px;
    background-color: #23334c;
  }
  .content {
    width: 12%;
    height: 100%;
    border-radius: 5px;
    background-color: #171f2b;
    .texts {
      color: #b8c2cc;
    }
  }
  .details {
    width: 85%;
    height: 100%;
    background-color: #ffffff;
  }
}
</style>

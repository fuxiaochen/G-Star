<template>
  <div class="home">
    <div class="sidebar"></div>
    <div class="content">
      <el-row>
        <el-col :span="12" style="width:100%; text-align: left">
          <el-menu
            default-active="2"
            @open="handleOpen"
            @close="handleClose"
            class="el-menu-vertical-demo"
            background-color="#171f2b"
            text-color="#fff"
            active-text-color="#ffd04b">
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
          placeholder="开发者|仓库名"
          v-model="input1"
          clearable
          style="width:30%; margin-left:15px">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <div class="user">
          <img src="../assets/img/头像.png" alt="头像" class="avatar">
          <div class="name">name</div>
          <div class="user-content">
          <div class="c-item"><router-link :to="'/system/baseInfo'"><i class="el-icon-tickets"></i> GitHUb</router-link></div>
          <div class="c-item"><router-link :to="'/system/logMnt'"><i class="el-icon-reading"></i> 关注</router-link></div>
          <div class="c-item"><router-link :to="'/system'"><i class="el-icon-setting"></i> 设置</router-link></div>
          <div class="logout" @click="logoutEvent()"><i class="el-icon-switch-button"></i> 退出</div>
        </div>
        </div>
      </div>
      <div class="card">
        <div class="left">
          <div v-for ="i in 10"  class="box-card" :key="i">
            <div class="title">{{'标题内容 ' + i }}</div>
            <span class="text">{{'内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容 ' + i }}</span>
            <div class="bottom">
              <div class="left-star">121</div>
              <div class="left-use">32</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-content">
            <div class="header">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="ma()">操作按钮</el-button>
            </div>
            <div class="body">
              <div v-for ="i in 50" :key="i">卡片名称</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      input1: '',
      input2: ''
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    GetQueryString(name) {
      var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)return  unescape(r[2]); return null;
    },
    GetUserString () {
      let code = this.GetQueryString('code')
      console.log('code ',code);
      this.axios.post('https://github.com/login/oauth/access_toke',
        {
          code: code,
          client_id: 'ae10725ce19a73189b43',
          client_secret: '9d80cefff974746c0b9e37da5d765414da85e447',
        }).then(res => {
          console.log('res',res);
        if (res.code === 200) {
          console.log('dddd');
        }
      }).catch(error => {
        console.error('asd' + error)
      })
    },
    ma () {
      console.log(this.GetQueryString('code')); 
    }
  },
  created () {
    this.GetUserString()
  }
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
      height: 6%;
      display: flex;
      justify-content: space-between;
      align-items:center;
      .user {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          padding: 0 10px;
        }
        .name {
          cursor: pointer;
          padding-right: 30px;
          font-size: 22px;
          color: #0d7cfc;
        }
        &:hover {
          .user-content {
            display: block;
          }
        }
        .user-content {
          display: none;
          position: absolute;
          right: 20px;
          top: 56px;
          background-color: #ffffff;
          border: 1px solid #ffffff;
          border-radius: 4px;
          box-sizing: border-box;
          min-width: 120px;
          box-shadow: 0px 0px 8px 0px #5f86d4;
          div{
            padding: 10px 0 0;
            cursor: pointer;
            text-align: center;
            font-size: 15px;
            &:hover{
              color: #07bed6;
            }
          }
          a{
            color: #46515a;
            text-decoration: none;
            padding: 10px 0;
            &:hover{
              color: #07bed6;
            }
          }
          .c-item{
            padding: 10px 0 0;
          }
          .logout{
            padding-bottom: 10px;
          }
        }
      }
    }
    .card {
      width: 100%;
      height: 94%;
      display: flex; 
      justify-content: space-between;
      .left {
        width: 20%;
        height: 99%;
        text-align: left;
        overflow: auto;
        .box-card {
          border: 1px solid #EBEEF5;
          padding: 10px;
          margin: 0 5px;
        }
        .title {                             
          color: #72c2f7;
          font-size: 18px;
          padding-bottom: 10px;
          text-align: left;
        }
        .bottom{
          display: flex;
          padding-top: 10px;
          justify-content: space-between;
          align-items: center;
          .left-star{
            color: #7effd8;
          }
        }
      }
      .left::-webkit-scrollbar{//滚动条整体样式
        width: 10px;
        height: 10px;
      }
      .left::-webkit-scrollbar-thumb{//滚动条小方块样式
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(255, 250, 250, 0.2);
        background: #B5BECB;
      }
      .left::-webkit-scrollbar-track{//滚动条滚动轴样式
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #ededed00;
      }
      .right {
        width: 80%;
        height: 100%;
        padding: 0 0.5%;
        .right-content {
          height: 98%;
          width: 100%;
          border: 1px solid #EBEEF5;
          border-radius: 4px;
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
          .header {
            height: 2%;
            border-bottom: 1px solid #EBEEF5;
            padding: 20px;
          }
          .body {
            height: 89%;
            padding: 10px;
            overflow: auto;
          }    
          .body::-webkit-scrollbar {
            display: none;
          }
        }
        .right-card {
          height:100%;
          overflow:auto;
        }
      }
    }
  }
}
</style>

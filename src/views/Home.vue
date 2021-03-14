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
          placeholder="开发者|仓库名"
          v-model="input1"
          clearable
          style="width:30%; margin-left:15px"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <div class="user">
          <img :src="user.avatar_url" alt="头像" class="avatar" />
          <div class="name">{{user.name}}</div>
          <div class="user-content">
            <div class="c-item">
              <a :href="user.html_url">
                <i class="el-icon-tickets"></i> GitHUb
              </a>
            </div>
            <div class="c-item">
              <router-link :to="'/system/logMnt'">
                <i class="el-icon-reading"></i> 关注
              </router-link>
            </div>
            <div class="c-item">
              <router-link :to="'/system'">
                <i class="el-icon-setting"></i> 设置
              </router-link>
            </div>
            <div class="logout" @click="logoutEvent()">
              <i class="el-icon-switch-button"></i> 退出
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="left">
          <div v-for="(i, j) in star" class="box-card" :key="j">
            <div class="title" @click="readme(i)">{{i.full_name}}</div>
            <span class="text">{{i.description }}</span>
            <div class="bottom">
              <div class="left-star">
                <svg
                  data-v-6ce840f0
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-4 stroke-current feather feather-star"
                >
                  <polygon
                    data-v-6ce840f0
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  />
                </svg>
                {{i.watchers }}
              </div>
              <div class="left-use">
                <svg
                  aria-label="fork"
                  class="octicon octicon-repo-forked"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="14"
                  height="14"
                  role="img"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 
                 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 
                 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  />
                </svg>
                {{i.forks }}
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-content" v-show="!tagShow">
            <div class="header">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="ma()">操作按钮</el-button>
            </div>
            <div class="body">
              <div v-for="i in 50" :key="i">卡片名称</div>
            </div>
          </div>
          <el-row id="md" v-show="tagShow">
            <el-row class="top">
              <el-button type="primary" @click="ghome">官网</el-button>
              <el-button @click="modify">添加标签</el-button>
            </el-row>
            <el-col class="spin" v-show="spinShow">
              <span tip="Loading"></span>
            </el-col>
            <el-row class="markdown-body" v-show="!spinShow">
              <div v-html="markdown" v-highlight></div>
            </el-row>
            <!-- <a-modal
              class="modify"
              title="修改"
              :visible="visible"
              @ok="handleOk"
              @cancel="handleCancel"
            >
              <a-form>
                <a-form-item label="作者/库：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
                  <a-input v-model="d.repository"></a-input>
                </a-form-item>
                <a-form-item label="标签：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
                  <a-input v-model="d.tag"></a-input>
                </a-form-item>
                <a-form-item label="官网：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
                  <a-input v-model="d.htmlUrl"></a-input>
                </a-form-item>
                <a-form-item label="MD地址：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
                  <a-input v-model="d.mdUrl"></a-input>
                </a-form-item>
                <a-form-item label="描述：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
                  <a-textarea v-model="d.description" :rows="4" />
                </a-form-item>
              </a-form>
            </a-modal> -->
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
})
export default {
  name: 'Home',
  data() {
    return {
      star: [],
      user: {},
      mdUrl: null,
      tagShow: false,
      markdown: null,
      visible: false,
      spinShow: true,
      input1: '',
      input2: '',
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    modify() {
      console.log('添加标签');
    },
    ghome () {
      console.log('跳转官网');
    },
    // 点击项目展示 readme.md 内容
    readme(item) {
      let i = 0
      let fn = item.full_name
      let db = item.default_branch
      let md = [
        'README.md',
        'readme.md',
        'README.MD',
        'Readme.md',
        'readme.MD',
        'ReadMe.md',
        'ReadMe.Md',
        'ReadMe.MD',
        'README.markdown',
        'readme.markdown',
        'README',
        'readme',
      ]
      let url = 'https://raw.githubusercontent.com/' + fn + '/' + db + '/' + md[i]
      this.axios.get(url)
        .then((e) => {
          if (e.status === 200) {
            this.mdUrl = url
            this.tagShow = true
            let md = marked(e.data)
            this.markdown = md
            this.$nextTick(() => {
              this.changePicSize()
              this.changeALink()
              this.spinShow = false
            })
          }
        })
        .catch(() => {
          this.$message.error('失败，README文件不存在')
          this.btnLoading = 100
        })
    },
    changePicSize() {
      let imgs = document.getElementsByTagName('img')
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.maxWidth = '90%'
      }
    },
    changeALink() {
      let a = document.getElementsByTagName('a')
      for (let i = 0; i < a.length; i++) {
        a[i].target = '_blank'
      }
    },
    // 获取用地址栏参数信息
    GetQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    // 获取用户信息
    async GetUserString() {
      let code = this.GetQueryString('code')
      console.log('code ', code)
      const res = await this.axios({
        method: 'get',
        url: '/githubAccessToken', // 获取用户token地址
        params: {
          code: code,
          // state: 'admin',
          client_id: 'ae10725ce19a73189b43',
          client_secret: '9d80cefff974746c0b9e37da5d765414da85e447',
        },
        headers: {
          Accept: 'application/json', // 设置headers里的Accept为 application/json ，响应的结果就是json格式的
        },
      })
      const access_token = res.data.access_token
      console.log('res.data.access_token', res.data.access_token)
      const github_user = await this.axios({
        method: 'get',
        url: '/githubUserInfo', // 获取用户token地址
        params: {
          access_token: access_token,
        },
        headers: {
          Accept: 'application/json', // 设置headers里的Accept为 application/json ，响应的结果就是json格式的
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `token ${access_token}`,
        },
      })
      this.user = github_user.data
      const star = await this.axios.get(
        `https://api.github.com/users/${github_user.data.login}/starred`
      )
      this.star = star.data
      console.log('ithub_user', github_user.data)
      console.log('star.data', this.star)
    },
    ma() {
      console.log(this.GetQueryString('code'))
    },
  },
  created() {
    this.GetUserString()
  },
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
      align-items: center;
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
          div {
            padding: 10px 0 0;
            cursor: pointer;
            text-align: center;
            font-size: 15px;
            &:hover {
              color: #07bed6;
            }
          }
          a {
            color: #46515a;
            text-decoration: none;
            padding: 10px 0;
            &:hover {
              color: #07bed6;
            }
          }
          .c-item {
            padding: 10px 0 0;
          }
          .logout {
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
          border: 1px solid #ebeef5;
          border-bottom: 0;
          padding: 10px;
          margin: 0 5px;
          .text {
            font-size: 13px;
          }
        }
        .box-card:last-child {
          border-bottom: 1px solid #ebeef5;
        }
        .title {
          cursor: pointer;
          color: #72c2f7;
          font-size: 18px;
          padding-bottom: 10px;
          text-align: left;
        }
        .bottom {
          display: flex;
          padding-top: 10px;
          justify-content: space-between;
          align-items: center;
          .left-star {
            color: #7effd8;
          }
        }
      }
      .left::-webkit-scrollbar {
        //滚动条整体样式
        width: 10px;
        height: 10px;
      }
      .left::-webkit-scrollbar-thumb {
        //滚动条小方块样式
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(255, 250, 250, 0.2);
        background: #b5becb;
      }
      .left::-webkit-scrollbar-track {
        //滚动条滚动轴样式
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed00;
      }
      .right {
        width: 80%;
        height: 100%;
        padding: 0 0.5%;
        .right-content {
          height: 98%;
          width: 100%;
          border: 1px solid #ebeef5;
          border-radius: 4px;
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
          .header {
            height: 2%;
            border-bottom: 1px solid #ebeef5;
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
        #md {
          flex: 1;
          overflow-y: scroll;
          width: 100%;
          height: 99.8%;
          border: 1px solid #ebeef5;border-radius: 4px;
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
          &::-webkit-scrollbar {
            width: 1px;
            height: 0;
          }
          .top {
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
            button {
              margin: 10px 20px 10px 0;
            }
          }
          .modify {
            .min {
              margin-top: 10px;
            }
          }
          .markdown-body {
            padding: 20px;
            height: 100%;
            overflow: auto;
            img {
              max-width: 80%;
            }
          }
          .markdown-body::-webkit-scrollbar { width: 0 !important }
          #components-back-top-demo-custom .ant-back-top {
            bottom: 100px;
          }
          #components-back-top-demo-custom .ant-back-top-inner {
            height: 40px;
            width: 40px;
            line-height: 40px;
            border-radius: 4px;
            background-color: #1088e9;
            color: #fff;
            text-align: center;
            font-size: 20px;
          }
          .spin {
            margin-top: 20px;
            text-align: center;
          }
        }
        .right-card {
          height: 100%;
          overflow: auto;
        }
      }
    }
  }
}
</style>

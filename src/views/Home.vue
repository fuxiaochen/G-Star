<template>
  <div class="home">
    <div class="sidebar"></div>
    <div class="content">
      <el-row>
        <el-col :span="12" style="width:100%; text-align: left">
          <el-menu
            default-active="1"
            @open="handleOpen"
            @close="handleClose"
            style="border-right: none"
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
              <el-menu-item-group v-for="(i,j) of itemlist" :key="j">
                <el-menu-item>{{i}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-key"></i>
                <span>语言</span>
              </template>
              <el-menu-item-group v-for="(i,j) of languagelist" :key="j">
                <el-menu-item>{{i}}</el-menu-item>
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
            <li
              class="text-xs text-white bg-brand hover:bg-brand-dark transition-bg rounded-full py-1 px-2 mr-2 mb-2"
            >{{i.language }}</li>
            <div class="bottom">
              <div class="left-star">
                <svg
                  data-v-6ce840f0
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
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
                  width="12"
                  height="12"
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
          <el-row class="right-content" v-show="!tagShow">
            <el-col class="search">
              <el-input placeholder="请输入搜索内容" v-model="input">
                <i class="el-icon-search el-input__icon" slot="suffix" @click="onSearch"></i>
              </el-input>
            </el-col>
            <el-col v-show="!loading">
              <span style="padding:20px;">搜索结果最多显示前30个，建议精确搜索</span>
            </el-col>
            <el-col class="spin" v-show="spinShow">
              <span tip="Loading"></span>
            </el-col>
            <el-col v-show="loading" class="body">
              <el-table
                :data="data"
                height="100%"
                style="width: 100%"
                stripe
                :header-cell-style="{fontWeight: 700}"
              >
                <el-table-column prop="full_name" label="作者/库" width="200"></el-table-column>
                <el-table-column prop="stargazers_count" label="Star" width="120"></el-table-column>
                <el-table-column prop="watchers_count" label="Watch" width="120"></el-table-column>
                <el-table-column prop="description" label="描述" width="640"></el-table-column>
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button @click="checkAdd(scope.row)" type="text">
                      <i class="el-icon-mouse" title="添加">添加标签</i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <!-- <el-col>
              <el-modal title="请选择标签" :visible="tagShow" @ok="handleOk" @cancel="handleCancel">
                <el-auto-complete
                  :dataSource="tag"
                  style="width: 100%"
                  v-model="selectedItem"
                  :filterOption="filterOption"
                  placeholder="input here"
                />
              </el-modal>
            </el-col>-->
          </el-row>
          <el-row id="md" v-show="tagShow">
            <el-row class="top">
              <el-button type="primary" @click="ghome()">官网</el-button>
              <el-button @click="modify">添加标签</el-button>
            </el-row>
            <el-dialog title="添加标签" :visible.sync="expressionShow" >
              <el-row class="demo-autocomplete">
                <el-col :span="26" style="width:80%">
                  <el-autocomplete
                    class="inline-input"
                    v-model="state1"
                    :fetch-suggestions="querySearch"
                    placeholder="请选择标签或新建标签"
                    @select="handleSelect"
                  ></el-autocomplete>
                </el-col>
              </el-row>
              <div slot="footer" class="dialog-footer">
                <el-button @click="expressionShow = false">取 消</el-button>
                <el-button type="primary" @click="addexpression">确 定</el-button>
              </div>
            </el-dialog>

            <el-col class="spin" v-show="spinShow">
              <span tip="Loading"></span>
            </el-col>
            <el-row class="markdown-body" v-show="!spinShow">
              <div v-html="markdown" v-highlight></div>
            </el-row>
            <!-- <el-modal
              class="modify"
              title="修改"
              :visible="visible"
              @ok="handleOk"
              @cancel="handleCancel"
            >
              <el-form>
                <el-form-item label="作者/库：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
                  <el-input v-model="d.repository"></el-input>
                </eform-item>
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
            </a-modal>-->
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
      star: [], // star内容地址
      user: {}, //用户信息
      mdUrl: null,
      homeUrl: null,
      state1: '',
      formLabelWidth: '120px',
      tagShow: false, //显示readme内容信息
      expressionShow: false, //显示readme内容信息
      markdown: null,
      visible: false,
      spinShow: true,
      input1: '',
      input2: '',
      input: '',
      loading: false,
      btnLoading: 100,
      data: [],
      item: null,
      tag: [],
      itemlist: ['标签1', '标签2', '标签3'],
      languagelist: ['vue', 'C++', 'java'],
      selectedItem: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    }
  },
  methods: {
    //搜索github项目方法
    onSearch() {
      if (this.input === '') {
        this.$message.warning('请输入您要搜索的内容')
      } else {
        this.loading = false
        let q = this.input
        this.spinShow = true
        this.$http
          .get('https://api.github.com/search/repositories?q=' + q)
          .then((res) => {
            this.data = res.data.items
            if (this.data.length > 0) {
              this.loading = true
            } else {
              this.loading = false
              this.$message.info('未搜索到相关内容')
            }
            this.spinShow = false
          })
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    handleSelect(item) {
      console.log(item)
    },
    createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号',
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113',
        },
      ]
    },
    // 添加到标签或者star
    checkAdd(id) {
      this.expressionShow = !this.expressionShow
      localStorage.setItem('id', id)
    },
    checkMd() {
      let i = 0
      let _this = this
      let fn = this.item.full_name
      let db = this.item.default_branch
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

      getMd()
      function getMd() {
        let url =
          'https://raw.githubusercontent.com/' + fn + '/' + db + '/' + md[i]
        _this.$http
          .get(url)
          .then((e) => {
            if (e.status === 200) {
              _this.mdUrl = url
              _this.tagShow = !_this.tagShow
              _this.btnLoading = 100
            }
          })
          .catch(() => {
            i++
            if (i < md.length) {
              getMd()
            } else {
              _this.$message.error('添加失败，README文件不存在')
              _this.btnLoading = 100
            }
          })
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      )
    },
    handleOk() {
      if (this.selectedItem === '') {
        this.$message.warning('请选择一个标签，或者输入一个新的标签')
      } else {
        this.addDB()
      }
      this.tagShow = false
    },
    handleCancel() {
      this.tagShow = false
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    modify() {
      this.expressionShow = !this.expressionShow
      console.log('添加标签1', this.state1)
    },
    addexpression() {
      if(this.state1 == '') {
        this.$message.warning('请选择一个标签，或者输入一个新的标签')
      }
    },
    ghome() {
      window.open(this.homeUrl, '_blank')
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
      let url =
        'https://raw.githubusercontent.com/' + fn + '/' + db + '/' + md[i]
      this.axios
        .get(url)
        .then((e) => {
          if (e.status === 200) {
            this.mdUrl = url
            this.homeUrl = item.clone_url
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
      localStorage.setItem('user', this.user)
      const star = await this.axios.get(
        `https://api.github.com/users/${github_user.data.login}/starred`
      )
      this.star = star.data
      localStorage.setItem('star', this.star)
      console.log('ithub_user', github_user.data)
      console.log('star.data', this.star)
    },
    ma() {
      console.log(this.GetQueryString('code'))
    },
  },
  created() {
    this.restaurants = this.loadAll();
    document.onkeydown = () => {
      let key = window.event.keyCode
      if (key == 13) {
        this.onSearch()
      }
    }
    if (localStorage.getItem('star')) {
      this.star = localStorage.getItem('star')
      this.user = localStorage.getItem('user')
      console.log('2w', this.star,this.user );
    }else{
      this.GetUserString()
    }
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
          z-index: 99;
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
          color: #3eacf5;
          font-size: 18px;
          padding-bottom: 10px;
          text-align: left;
        }
        .bottom {
          display: flex;
          padding-top: 8px;
          justify-content: space-between;
          align-items: center;
          .left-star {
            color: #2c2c2c;
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
          .search {
            height: 8%;
            border-bottom: 1px solid #ebeef5;
            padding: 20px;
          }
          .spin {
            margin-top: 20px;
            text-align: center;
          }
          .body {
            height: 91%;
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
          border: 1px solid #ebeef5;
          border-radius: 4px;
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
          .markdown-body::-webkit-scrollbar {
            width: 0 !important;
          }
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

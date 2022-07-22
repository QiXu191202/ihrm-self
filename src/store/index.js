import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import app from './modules/app'
// import settings from './modules/settings'
// import user from './modules/user'

//可以使用 require.context() 方法来创建自己的（模块）上下文，这个方法有 3 个参数：
//要搜索的文件夹目录
//是否还应该搜索它的子目录，
//以及一个匹配文件的正则表达式。

const req = require.context('./modules', false, /\.js$/)
console.log(req);
const keyArr = req.keys().map(item => item.split('./')[1]).map(item => item.split('.js')[0])
const valArr = req.keys().map(req)
const modules = {}
keyArr.forEach((item, index) => {
  modules[item] = valArr[index].default
})
// console.dir(modules)

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  // 注册模块
  // modules: {
  //   app,
  //   settings,
  //   user
  // },
  modules
})

export default store

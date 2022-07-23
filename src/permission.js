import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// 白名单
const whiteList = ['/404', '/login']

router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start()
    const token = store.getters.token
    if (token) {
        // 登录了
        // 判断是否去登录页
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
        // 未登录
        // 判断是否在白名单
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
    NProgress.done()
})

router.afterEach(function () {
    NProgress.done()
})
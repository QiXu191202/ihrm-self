import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// 白名单
const whiteList = ['/404', '/login']

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 开启进度条
    NProgress.start()
    const token = store.getters.token
    if (token) {
        // 登录了
        // 判断是否去登录页
        if (to.path === '/login') {
            next('/')
        } else {
            if (!store.getters.userId) {
                let { roles } = await store.dispatch('user/getUserInfo')
                // roles.menus 该用户对应角色的权限标识
                let routes = await store.dispatch("permission/filterRoutes", roles.menus)
                // 添加动态路由映射数组
                router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 动态添加是一个耗时操作,如果直接next() 会出现路由还没有配置好的情况
                // 再执行一次 next(地址) 再次进入导航守卫逻辑
                next(to.path)
            } else {
                next()
            }
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
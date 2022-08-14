import { constantRoutes, asyncRoutes } from '@/router'
export default {
    namespaced: true,
    state() {
        return {
            routes: constantRoutes // 所有人默认拥有静态路由
        }
    },
    getters: {},
    mutations: {
        setRoutes(state, newRoutes) {
            state.routes = [...constantRoutes, ...newRoutes]
        }
    },
    actions: {
        filterRoutes(context, data) {
            // data 是服务器返回的该用户的角色对应的权限标识
            // console.log(data);
            const userRoutes = []
            asyncRoutes.forEach(item => {
                if (data.includes(item.name)) userRoutes.push(item)
            })
            // console.log(userRoutes);
            context.commit("setRoutes", userRoutes)
            return userRoutes
        }
    }
}
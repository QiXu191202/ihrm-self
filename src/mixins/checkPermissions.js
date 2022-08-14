import store from '@/store'
export default {
    methods: {
        checkPermission(str) {
            if (!store.getters.token) return false
            return store.getters.points.includes(str)
        }
    }
}
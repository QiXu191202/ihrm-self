import { loginApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken()
}
const mutations = {
  // 设置token
  setToken(state, data) {
    state.token = data
    setToken(data)
  },

  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  async login(context, data) {
    let res = await loginApi(data)
    // context.commit("")
    context.commit("setToken", res)
  },
  logout(context) {
    context.commit("removeToken")
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
import Cookies from 'js-cookie'

const TokenKey = 'ihrm_self_token'
const loginTimeKey = 'ihrm_self_login'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置用户登录时间戳
export function setTimeStamp() {
  Cookies.set(loginTimeKey, Date.now())
}
export function getTimeStamp() {
  return Cookies.get(loginTimeKey)
}

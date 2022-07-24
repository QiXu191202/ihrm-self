import request from '@/utils/request'

// 登录
export function loginApi(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 获取用户资料
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 获取员工基本信息
export function getUserBaseInfoApi(id) {
  return request({
    url: '/sys/user/' + id
  })
}

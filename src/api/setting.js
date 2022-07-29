import request from '@/utils/request'

// 获取企业信息
export const getcompanyInfoApi = (id) => {
    return request({
        url: '/company/' + id,
    })
}
// 获取角色列表
export const getRoleListApi = (params) => {
    return request({
        url: '/sys/role',
        params
    })
}
// 添加角色
export const addRoleApi = (data) => {
    return request({
        url: '/sys/role',
        data,
        method: "post"
    })
}
// 获取角色详情
export const getRoleInfoApi = (id) => {
    return request({
        url: '/sys/role/' + id
    })
}
// 更新角色
export const editRoleApi = (data) => {
    return request({
        url: '/sys/role/' + data.id,
        method: "put",
        data
    })
}
// 删除角色
export const delRoleApi = (id) => {
    return request({
        url: "/sys/role/" + id,
        method: "delete"
    })
}
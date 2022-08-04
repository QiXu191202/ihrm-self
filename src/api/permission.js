import request from '@/utils/request'

// 获取所有权限
export const getAllPermissionApi = () => {
    return request({
        url: '/sys/permission'
    })
}
// 根据ID获取权限详情
export const getPermissionInfoApi = (id) => {
    return request({
        url: `/sys/permission/${id}`
    })
}
// 根据ID更新权限
export const updatePermissionApi = (data) => {
    return request({
        url: `/sys/permission/${data.id}`,
        method: "put",
        data
    })
}
// 根据ID删除权限
export const delPermissionApi = id => {
    return request({
        url: `/sys/permission/${id}`,
        method: "delete"
    })
}
// 添加权限
export const addPermissionApi = data => {
    return request({
        url: '/sys/permission',
        method: "post",
        data
    })
}
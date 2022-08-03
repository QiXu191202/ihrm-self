import request from '@/utils/request'

// 获取员工列表
export const getEmployeeListApi = (params) => {
    return request({
        url: '/sys/user',
        method: 'get',
        params
    })
}
// 获取员工详情
export const getEmployeeInfoApi = (id) => {
    return request({
        url: '/sys/user/' + id,
        method: 'get'
    })
}
// 增加员工详情
export const addEmployeeApi = (data) => {
    return request({
        url: '/sys/user',
        method: 'post',
        data
    })
}
// 修改员工详情
export const editEmployeeApi = (data) => {
    return request({
        url: '/sys/user/' + data.id,
        method: 'put',
        data
    })
}
// 删除员工
export const delEmployeeApi = (id) => {
    return request({
        url: '/sys/user/' + id,
        method: 'delete'
    })
}
// 批量导入员工
export const importEmployeeApi = (arr) => {
    return request({
        url: '/sys/user/batch',
        method: "post",
        data: arr
    })
}
// 获取员工个人信息
export const getEmployeePersonInfoApi = (id) => {
    return request({
        url: `/employees/${id}/personalInfo`
    })
}
// 更新员工个人信息
export const updatePersonalApi = (data) => {
    return request({
        url: `/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    })
}
// 获取员工岗位信息
export const getJobInfoApi = id => {
    return request({
        url: `/employees/${id}/jobs`
    })
}
// 更新员工岗位信息
export const updateJob = (data) => {
    return request({
        url: `/employees/${data.userId}/jobs`,
        method: 'put',
        data
    })
}
import request from '@/utils/request'

export const getEmployeesListApi = () => {
    return request({
        url: '/sys/user/simple'
    })
}
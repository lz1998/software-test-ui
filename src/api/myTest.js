import axios from '@/utils/request.js'
import qs from 'qs'
export function findTest(data) {
    return axios({
        url: '/myTest/findTest',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function saveTest(data) {
    return axios({
        url: '/myTest/saveTest',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function deleteTest(data) {
    return axios({
        url: '/myTest/deleteTest',
        method: 'post',
        data: qs.stringify(data)
    })
}

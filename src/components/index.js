// import Vue from 'vue'
// import PageTools from './PageTools'

// Vue.component('PageTools', PageTools)

import PageTools from './pageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
export default {
    install(_Vue) {
        // 注册组件
        _Vue.component('PageTools', PageTools)
        _Vue.component('UploadExcel', UploadExcel)
        _Vue.component('ImageUpload', ImageUpload)
    }
}
// 负责所有全局自定义组件的注册
import PageTools from './PageTools/index.vue'
import UploadExcel from './UploadExcel/index.vue'
export default {
  install(Vue) {
    // 组件的注册
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}


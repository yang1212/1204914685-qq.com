import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// 按需引入echarts
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
// 引入提示框、title等组件
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
.use(ElementPlus)
.use(store)
.use(router)
.mount('#app')

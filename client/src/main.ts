import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Delete, CirclePlus, ArrowDown } from '@element-plus/icons'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.component('Delete', Delete)
app.component('CirclePlus', CirclePlus)
app.component('ArrowDown', ArrowDown)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')

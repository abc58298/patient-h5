import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
//vant在main之前引入,后面main覆盖
import "vant/lib/index.css"
import "./style//main.scss"
//导入svg地图
import "virtual:svg-icons-register"
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

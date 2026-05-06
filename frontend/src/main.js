import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// 导入路由配置（根据你的实际路由文件路径调整）
import router from './router/index.js'

// 创建应用实例并挂载路由
const app = createApp(App)
app.use(router) // 关键：启用路由功能
app.mount('#app')

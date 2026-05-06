import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import Detect from '../views/Detect.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/login', component: Login ,meta: { isPublic: true }},
  { path: '/register', component: Register ,meta: { isPublic: true }},
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/detect', component: Detect, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/login' } // 未匹配路由重定向到登录页
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫：验证登录状态
// 路由守卫：验证登录状态 + 背景样式切换
router.beforeEach((to, from, next) => {
  // 1. 登录状态验证逻辑（原有功能保留）
  const requiresAuth = to.meta.requiresAuth;
  const token = localStorage.getItem('token');
  
  if (requiresAuth && !token) {
    next('/login'); 
  } else {
    // 2. 背景样式切换逻辑（新增）
    const appElement = document.getElementById('app');
    if (appElement) {
      // 判断是否为公共页面（登录/注册）
      if (to.meta.isPublic) {
        // 公共页面：白色背景
        appElement.classList.add('white-bg');
        appElement.classList.remove('tech-bg');
      } else {
        // 登录后页面：科技深色背景
        appElement.classList.add('tech-bg');
        appElement.classList.remove('white-bg');
      }
    }
    next(); 
  }
});

export default router;
<template>
  <div id="app">
    <!-- 导航栏：科技风格，依赖登录状态 -->
    <nav class="navbar" v-if="isLoggedIn">
      <div class="nav-links">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/profile" class="nav-link">个人信息</router-link>
        <router-link to="/detect" class="nav-link">识别系统</router-link>
      </div>
      <button @click="logout" class="logout-btn">退出登录</button>
    </nav>
    
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 存储登录状态（初始值从localStorage读取）
const isLoggedIn = ref(!!localStorage.getItem('token'));

// 监听路由变化：每次跳转后重新检查登录状态
watch(
  () => route.path,
  () => {
    const hasToken = !!localStorage.getItem('token');
    isLoggedIn.value = hasToken;
  },
  { immediate: true }
);

// 退出登录逻辑
const logout = () => {
  // 清除本地存储
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  
  // 更新状态
  isLoggedIn.value = false;
  
  // 跳转到登录页
  router.push('/login');
};
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 导航栏：科技风格设计 */
.navbar {
  padding: 1rem 2rem;
  background: rgba(15, 23, 42, 0.95); /* 深色半透明背景 */
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
  border-bottom: 1px solid rgba(66, 185, 131, 0.2); /* 科技绿边框 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  box-shadow: 0 2px 15px rgba(33, 150, 243, 0.1); /* 科技感阴影 */
}

/* 导航链接容器 */
.nav-links {
  display: flex;
  gap: 2rem; /* 链接间距 */
}

/* 导航链接样式 */
.nav-link {
  text-decoration: none;
  color: #e2e8f0; /* 浅灰文字 */
  font-size: 16px;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

/* 链接hover效果 */
.nav-link:hover {
  color: #42b983; /* 科技绿 */
}

/* 链接下划线动画 */
.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #42b983;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%; /* hover时显示下划线 */
}

/* 退出按钮样式 */
.logout-btn {
  padding: 0.5rem 1.2rem;
  background-color: rgba(244, 67, 54, 0.8); /* 半透明红色 */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(244, 67, 54, 0.2);
}

.logout-btn:hover {
  background-color: #f44336;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(244, 67, 54, 0.3);
}

.logout-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(244, 67, 54, 0.2);
}

/* 主内容区域样式 */
.content {
  padding: 2rem;
  min-height: 100vh;
  margin-top: 60px; /* 给固定导航栏预留空间 */
}

/* 响应式适配 */
@media (max-width: 768px) {
  .navbar {
    padding: 0.8rem 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .content {
    padding: 1rem;
  }
}
</style>
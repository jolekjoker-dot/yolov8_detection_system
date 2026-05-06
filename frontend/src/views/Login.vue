<template>
  <div class="page-container">
    <!-- 装饰性背景元素 -->
    <div class="bg-decoration"></div>
    <!-- 登录卡片 -->
    <div class="profile-container">
      <h2 class="profile-title">用户登录</h2>
      <form @submit.prevent="login" class="profile-form">
        <div class="form-group">
          <label class="form-label">用户名：</label>
          <input v-model="username" type="text" class="form-input" required />
        </div>
        <div class="form-group">
          <label class="form-label">密码：</label>
          <input v-model="password" type="password" class="form-input" required />
        </div>
        <!-- 登录按钮 -->
        <button type="submit" class="submit-btn">登录</button>
      </form>
      <!-- 注册按钮区域（与登录按钮同宽且上下排列） -->
      <div class="login-link">
        <button @click="goToRegister" class="submit-btn register-btn">注册</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from '../api/axios.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const { data } = await axios.post('/users/login', {
      username: username.value,
      password: password.value,
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    router.push('/');
  } catch (error) {
    alert(error.response.data.message || '登录失败');
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
/* 页面容器：精致渐变背景 */
.page-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: 
    radial-gradient(circle at 10% 20%, rgba(66, 185, 131, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 90% 70%, rgba(33, 150, 243, 0.08) 0%, transparent 30%),
    radial-gradient(circle at 30% 50%, rgba(66, 185, 131, 0.06) 0%, transparent 25%),
    radial-gradient(circle at 70% 30%, rgba(33, 150, 243, 0.07) 0%, transparent 20%),
    linear-gradient(135deg, #f0f4f8 0%, #e9edf2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
}

/* 装饰性背景元素 */
.bg-decoration {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(66, 185, 131, 0.07) 0%, rgba(33, 150, 243, 0.05) 100%);
  top: -300px;
  right: -200px;
  z-index: 0;
}

/* 登录卡片 */
.profile-container {
  position: relative;
  z-index: 1;
  max-width: 600px;
  width: 100%;
  padding: 40px 30px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.7);
}

/* 顶部装饰条 */
.profile-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #42b983 0%, #2196F3 100%);
  border-radius: 16px 16px 0 0;
}

/* 标题样式 */
.profile-title {
  text-align: center;
  font-size: 26px;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

/* 表单样式 */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 10px;
}

.form-label {
  width: 80px;
  font-size: 16px;
  color: #4a5568;
  font-weight: 500;
}

/* 输入框优化 */
.form-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.8);
}

.form-input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.15);
  background-color: #fff;
}

/* 按钮样式（核心修改：同宽且居中） */
.submit-btn {
  /* 关键：设置宽度为输入框同等宽度（减去标签宽度后的值） */
  width: calc(100% - 150px);
  padding: 12px 0; /* 左右内边距改为0，用宽度控制整体大小 */
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  margin-left: 95px; /* 与输入框左对齐 */
  box-shadow: 0 2px 5px rgba(66, 185, 131, 0.2);
  text-align: center; /* 文字居中 */
}

.submit-btn:hover {
  background-color: #359e6d;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(66, 185, 131, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(66, 185, 131, 0.2);
}

/* 注册按钮：保持与登录按钮同宽，上下排列 */
.register-btn {
  background-color: #2196F3;
  margin-top: 15px; /* 与登录按钮保持间距，实现上下排列 */
  box-shadow: 0 2px 5px rgba(33, 150, 243, 0.2);
}

.register-btn:hover {
  background-color: #0b7dda;
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
}

/* 登录链接区域：移除居中，保持按钮自然排列 */
.login-link {
  margin-top: 0; /* 取消额外间距，通过按钮margin-top控制 */
}
</style>
<template>
  <div class="page-container">
    <!-- 装饰性背景元素 -->
    <div class="bg-decoration"></div>
    <!-- 注册卡片 -->
    <div class="profile-container">
      <h2 class="profile-title">用户注册</h2>
      <!-- 表单：支持文件上传 -->
      <form @submit.prevent="register" enctype="multipart/form-data" class="profile-form">
        <div class="form-group">
          <label class="form-label">用户名：</label>
          <input v-model="username" type="text" class="form-input" required />
        </div>
        <div class="form-group">
          <label class="form-label">密码：</label>
          <input v-model="password" type="password" class="form-input" required />
        </div>
        <div class="form-group">
          <label class="form-label">邮箱：</label>
          <input v-model="email" type="email" class="form-input" required />
        </div>
        <!-- 头像上传 + 预览 -->
        <div class="form-group avatar-group">
          <label class="form-label">头像：</label>
          <input 
            type="file" 
            accept="image/*" 
            @change="handleAvatarSelect" 
            class="avatar-input"
            required 
          />
          <div class="avatar-preview-container" v-if="avatarPreview">
            <img 
              :src="avatarPreview" 
              alt="头像预览" 
              class="avatar-preview" 
            />
          </div>
        </div>
        <!-- 注册按钮 -->
        <button type="submit" class="submit-btn">注册</button>
      </form>
      
      <!-- 登录跳转区域 -->
      <div class="login-link">
        <button @click="goToLogin" class="submit-btn login-btn">已有账号？去登录</button>
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
const email = ref('');
const router = useRouter();

// 头像上传相关变量
const avatarFile = ref(null); 
const avatarPreview = ref(''); 

// 处理头像选择（生成预览 + 保存文件）
const handleAvatarSelect = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  avatarFile.value = file;
  const reader = new FileReader();
  reader.onload = (event) => {
    avatarPreview.value = event.target.result;
  };
  reader.readAsDataURL(file);
};

// 注册逻辑（提交FormData）
const register = async () => {
  try {
    const formData = new FormData();
    formData.append('username', username.value);
    formData.append('password', password.value);
    formData.append('email', email.value);
    if (avatarFile.value) {
      formData.append('avatar', avatarFile.value);
    }

    await axios.post('/users/register', formData);
    alert('注册成功，请登录');
    router.push('/login');
  } catch (error) {
    alert(error.response?.data?.message || '注册失败');
  }
};

// 跳转到登录页
const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
/* 页面容器：与登录页一致的背景样式 */
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

/* 装饰性背景元素：与登录页保持一致 */
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

/* 注册卡片：与登录卡片风格统一 */
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

/* 顶部装饰条：与登录页一致的渐变 */
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

/* 标题样式：统一字号和间距 */
.profile-title {
  text-align: center;
  font-size: 26px;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

/* 表单布局：保持垂直间距 */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* 表单项：标签与输入框对齐 */
.form-group {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 10px;
}

/* 头像上传组：单独处理换行布局 */
.avatar-group {
  align-items: flex-start; /* 头像预览换行显示 */
  padding-top: 12px; /* 与输入框对齐 */
}

/* 标签样式：固定宽度 */
.form-label {
  width: 80px;
  font-size: 16px;
  color: #4a5568;
  font-weight: 500;
}

/* 输入框样式：与登录页统一 */
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

/* 头像选择器：模拟输入框样式 */
.avatar-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.avatar-input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.15);
}

/* 头像预览容器：调整间距 */
.avatar-preview-container {
  margin-top: 10px;
  margin-left: 95px; /* 与输入框左对齐 */
}

/* 头像预览：圆形 + hover 效果 */
.avatar-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #eee;
  transition: transform 0.3s ease;
}

.avatar-preview:hover {
  transform: scale(1.05);
}

/* 按钮样式：与登录页同宽且上下排列 */
.submit-btn {
  width: calc(100% - 95px); /* 与输入框同宽 */
  padding: 12px 0;
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
  text-align: center;
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

/* 登录按钮：保持样式统一 */
.login-btn {
  background-color: #2196F3;
  margin-top: 15px; /* 与注册按钮形成上下排列 */
  box-shadow: 0 2px 5px rgba(33, 150, 243, 0.2);
}

.login-btn:hover {
  background-color: #0b7dda;
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
}

/* 登录链接区域：移除额外间距 */
.login-link {
  margin-top: 0;
}
</style>
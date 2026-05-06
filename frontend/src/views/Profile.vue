<template>
  <div class="tech-bg">
    <div class="profile-container">
      <div class="title-glow">
        <h2 class="profile-title">个人信息</h2>
      </div>
      <!-- 头像容器：包含图片 + 隐藏的文件选择器 -->
      <div class="avatar-container">
        <img 
          :src="tempAvatarPreview || `http://localhost:5000${avatar}`"  
          alt="用户头像" 
          class="avatar-preview" 
          @click="triggerAvatarUpload"
        />
        <!-- 隐藏的文件选择器 -->
        <input 
          type="file" 
          accept="image/*" 
          ref="avatarInput" 
          @change="handleAvatarChange" 
          class="avatar-input"
        />
      </div>
      
      <form @submit.prevent="updateProfile" class="profile-form">
        <div class="form-group">
          <label class="form-label">用户名：</label>
          <input v-model="username" type="text" class="form-input" required />
        </div>
        <div class="form-group">
          <label class="form-label">邮箱：</label>
          <input v-model="email" type="email" class="form-input" required />
        </div>
        <button type="submit" class="submit-btn">保存修改</button>
      </form>
      
      <!-- 科技装饰元素 -->
      <div class="tech-decor top-left"></div>
      <div class="tech-decor bottom-right"></div>
    </div>
  </div>
</template>

<script setup>
import axios from '../api/axios.js';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const email = ref('');
const avatar = ref(''); 
let userId = null;

// 新增：头像上传相关变量
const avatarInput = ref(null); // 文件输入框的引用
const newAvatarFile = ref(null); // 选中的新头像文件
const tempAvatarPreview = ref(''); // 本地选择后的临时预览图

onMounted(async () => {
  userId = localStorage.getItem('userId');
  
  if (!userId) {
    alert('请先登录');
    router.push('/login');
    return;
  }

  try {
    const { data } = await axios.get(`/users/${userId}`);
    username.value = data.username;
    email.value = data.email;
    avatar.value = data.avatar; 
    console.log('初始头像路径：', avatar.value); 
  } catch (error) {
    alert(error.response?.data?.message || '获取个人信息失败');
  }
});

// 点击头像时，触发文件选择框
const triggerAvatarUpload = () => {
  avatarInput.value.click();
};

// 选择新头像后，生成预览并保存文件
const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  newAvatarFile.value = file;
  // 读取文件生成base64预览图
  const reader = new FileReader();
  reader.onload = (event) => {
    tempAvatarPreview.value = event.target.result;
  };
  reader.readAsDataURL(file);
};

// 保存修改（含头像上传）
const updateProfile = async () => {
  try {
    const formData = new FormData();
    formData.append('username', username.value);
    formData.append('email', email.value);
    // 若有新头像，追加到FormData
    if (newAvatarFile.value) {
      formData.append('avatar', newAvatarFile.value);
    }

    // 发送带文件的请求（需指定multipart/form-data头）
    const response = await axios.put(`/users/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // 若后端返回新头像路径，更新显示
    if (response.data.avatar) {
      avatar.value = response.data.avatar;
      tempAvatarPreview.value = ''; // 清空临时预览
      newAvatarFile.value = null; // 清空文件引用
    }

    alert('修改成功');
  } catch (error) {
    alert(error.response?.data?.message || '修改失败');
  }
};
</script>

<style scoped>
/* 科技风格背景 */
.tech-bg {
  min-height: 100vh;
  background: 
    radial-gradient(circle at 20% 30%, rgba(33, 150, 243, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(66, 185, 131, 0.05) 0%, transparent 40%),
    #0f172a; /* 深色科技底 */
  padding: 40px 20px;
}

/* 个人信息卡片：科技感玻璃效果 */
.profile-container {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 30px;
  background-color: rgba(15, 23, 42, 0.7);
  border-radius: 16px;
  box-shadow: 
    0 0 30px rgba(33, 150, 243, 0.15),
    0 1px 3px rgba(255, 255, 255, 0.05) inset;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(66, 185, 131, 0.2);
  position: relative;
  overflow: hidden;
}

/* 标题发光效果 */
.title-glow {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.profile-title {
  font-size: 28px;
  color: #42b983;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 
    0 0 10px rgba(66, 185, 131, 0.5),
    0 0 20px rgba(66, 185, 131, 0.3);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 头像容器：居中显示，增加底部间距 */
.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

/* 头像：放大尺寸、添加边框和 hover 动画 + 可点击指针 */
.avatar-preview {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid rgba(66, 185, 131, 0.3);
  transition: transform 0.3s ease, border-color 0.3s ease;
  cursor: pointer; /* 提示可点击 */
}

.avatar-preview:hover {
  transform: scale(1.05); /* hover 时轻微放大 */
  border-color: rgba(66, 185, 131, 0.7);
}

/* 隐藏文件选择框 */
.avatar-input {
  display: none;
}

/* 表单：flex 布局优化间距 */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
  position: relative;
  z-index: 1;
}

/* 表单项组：横向对齐标签与输入框 */
.form-group {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 10px;
}

/* 标签：固定宽度，优化字体 */
.form-label {
  width: 80px;
  font-size: 16px;
  color: #e2e8f0;
  font-weight: 500;
}

/* 输入框：圆角、边框、焦点动画 */
.form-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #2d3748;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
}

.form-input:focus {
  outline: none;
  border-color: #42b983; /* 焦点时边框变主题色 */
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.15); /* 焦点时添加浅色阴影 */
  background-color: rgba(255, 255, 255, 0.1);
}

/* 提交按钮：主题色、hover 动画、点击反馈 */
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
  background-color: #359e6d; /* hover 时加深颜色 */
  transform: translateY(-2px); /* hover 时轻微上浮 */
  box-shadow: 0 5px 15px rgba(66, 185, 131, 0.3);
}

.submit-btn:active {
  transform: translateY(0); /* 点击时恢复位置 */
  box-shadow: 0 2px 5px rgba(66, 185, 131, 0.2);
}

/* 科技装饰元素 */
.tech-decor {
  position: absolute;
  width: 150px;
  height: 150px;
  opacity: 0.1;
  background: linear-gradient(135deg, #2196F3, #42b983);
  border-radius: 50%;
  z-index: 0;
}

.top-left {
  top: -50px;
  left: -50px;
}

.bottom-right {
  bottom: -80px;
  right: -50px;
  filter: blur(40px);
}
</style>
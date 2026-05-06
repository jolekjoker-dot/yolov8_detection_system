<template>
  <div class="tech-bg">
    <div class="profile-container">
      <div class="title-glow">
        <h2 class="profile-title">YOLOv8 识别系统</h2>
      </div>
      
      <!-- 图片选择区域 -->
      <div class="form-group">
        <label class="form-label">选择图片：</label>
        <input 
          type="file" 
          @change="uploadImage" 
          accept="image/*" 
          class="form-input"
        />
      </div>
      
      <!-- 图片预览区域：左右排列 -->
      <div class="preview-container">
        <!-- 原图预览 -->
        <div class="image-preview-box">
          <div class="preview-label">原图</div>
          <img v-if="originalImage" :src="originalImage" alt="Original" class="preview-image" />
        </div>
        
        <!-- 结果预览 -->
        <div class="result-preview-box">
          <div class="preview-label">识别结果</div>
          <img v-if="resultImage" :src="resultImage" alt="Result" class="preview-image" />
        </div>
      </div>
      
      <!-- 按钮放在两个框的正下方 -->
      <div class="button-container">
        <button @click="detect" class="submit-btn">开始识别</button>
      </div>
      
      <!-- 科技装饰元素 -->
      <div class="tech-decor top-left"></div>
      <div class="tech-decor bottom-right"></div>
    </div>
  </div>
</template>

<script setup>
import axios from '../api/axios.js';
import { ref } from 'vue';

const originalImage = ref('');
const resultImage = ref('');
const file = ref(null);

const uploadImage = (e) => {
  file.value = e.target.files[0];
  originalImage.value = URL.createObjectURL(file.value); // 预览原图
};

const detect = async () => {
  try {
    const formData = new FormData();
    formData.append('image', file.value);
    
    // 调用后端识别接口
    const { data } = await axios.post('/detect', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    resultImage.value = data.resultUrl; // 显示识别结果图
  } catch (error) {
    alert('识别失败：' + (error.response?.data?.message || '服务器错误'));
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
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 识别系统卡片：保持居中 */
.profile-container {
  width: 100%;
  max-width: 1200px; /* 加宽容器以容纳左右布局 */
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

/* 表单项组：标签与输入框对齐 */
.form-group {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding: 0 10px;
  position: relative;
  z-index: 1;
}

/* 标签样式 */
.form-label {
  width: 100px;
  font-size: 16px;
  color: #e2e8f0;
  font-weight: 500;
}

/* 文件输入框样式 */
.form-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #2d3748;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.15);
  background-color: rgba(255, 255, 255, 0.1);
}

/* 预览容器：左右排列核心布局 */
.preview-container {
  display: flex;
  gap: 20px; /* 两个框之间的间距 */
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 0 10px;
  margin-bottom: 30px; /* 与下方按钮保持距离 */
}

/* 图片预览框：左右两个框保持相同尺寸 */
.image-preview-box, .result-preview-box {
  flex: 1; /* 两个框平分宽度 */
  height: 400px;
  border: 1px solid rgba(66, 185, 131, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.03);
}

/* 预览图标签 */
.preview-label {
  color: #42b983;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  text-shadow: 0 0 5px rgba(66, 185, 131, 0.3);
}

/* 预览图片样式 */
.preview-image {
  max-width: 100%;
  max-height: 85%; /* 留空间给标签 */
  object-fit: contain;
}

/* 按钮容器：放在两个框的正下方 */
.button-container {
  display: flex;
  justify-content: center; /* 按钮水平居中 */
  padding: 0 10px;
  position: relative;
  z-index: 1;
}

/* 按钮样式 */
.submit-btn {
  width: 200px;
  padding: 12px 0;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
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

/* 响应式调整：小屏幕自动改为上下布局 */
@media (max-width: 900px) {
  .preview-container {
    flex-direction: column;
  }
  
  .image-preview-box, .result-preview-box {
    width: 100%;
    height: 300px;
  }
}
</style>
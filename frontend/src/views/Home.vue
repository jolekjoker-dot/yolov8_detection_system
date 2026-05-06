<template>
  <div class="tech-bg">
    <div class="profile-container">
      <div class="title-glow">
        <h2 class="profile-title">YOLOv8 目标识别系统</h2>
      </div>
      <div class="intro">
        <p class="system-desc">本系统基于<span class="highlight">YOLOv8算法</span>实现图像目标识别，支持多种常见物体的实时检测。</p>
        <p class="feature-title">核心功能：</p>
        <ul class="feature-list">
          <li class="feature-item">
            <span class="tech-icon">⟪</span>
            上传图片进行目标识别
          </li>
          <li class="feature-item">
            <span class="tech-icon">⟪</span>
            实时显示识别结果与置信度
          </li>
          <li class="feature-item">
            <span class="tech-icon">⟪</span>
            个人信息管理与数据追踪
          </li>
        </ul>
        
        <!-- 科技风格装饰元素 -->
        <div class="tech-decor top-left"></div>
        <div class="tech-decor bottom-right"></div>
      </div>
    </div>
  </div>
</template>

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

/* 卡片容器：科技感玻璃效果 */
.profile-container {
  max-width: 800px;
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

/* 介绍文本样式 */
.intro {
  color: #e2e8f0;
  line-height: 1.8;
  position: relative;
  z-index: 1;
}

.system-desc {
  font-size: 17px;
  margin-bottom: 25px;
  padding-left: 5px;
  border-left: 3px solid #2196F3;
}

/* 突出重点文字 */
.highlight {
  color: #42b983;
  font-weight: 600;
  border-bottom: 1px dotted #42b983;
  padding: 0 3px;
}

/* 功能标题 */
.feature-title {
  font-size: 20px;
  color: #2196F3;
  font-weight: 600;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.feature-title::before {
  content: '//';
  margin-right: 10px;
  color: rgba(66, 185, 131, 0.5);
}

/* 功能列表 */
.feature-list {
  margin-left: 25px;
  padding-left: 10px;
}

.feature-item {
  margin-bottom: 12px;
  font-size: 16px;
  position: relative;
  padding-left: 10px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateX(5px);
  color: #42b983;
}

/* 科技风格图标 */
.tech-icon {
  color: rgba(66, 185, 131, 0.7);
  margin-right: 8px;
  font-size: 14px;
}

/* 装饰元素 */
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
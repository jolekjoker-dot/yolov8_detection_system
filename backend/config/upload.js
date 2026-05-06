const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../uploads/avatars');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置存储规则
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // 头像保存路径
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名（避免重复）
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// 创建上传中间件
const upload = multer({ storage: storage });

module.exports = upload;
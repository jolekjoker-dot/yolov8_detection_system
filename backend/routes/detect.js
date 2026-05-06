const express = require('express');
const router = express.Router();
const multer = require('multer');
const { exec } = require('child_process'); // 用于执行 Python 脚本
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth.js');

// 1. 配置图片上传（保存到临时目录）
const uploadDir = path.join(__dirname, '../tmp'); // 临时图片目录（需手动创建）
const outputDir = path.join(__dirname, '../output'); // 识别结果目录（需手动创建）

// 确保目录存在
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// 配置 multer 存储上传的图片
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, uniqueName); // 避免文件名含空格导致的问题
  }
});
const upload = multer({ storage });

// 2. 识别接口：调用 Python 脚本处理图片
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    // 获取上传的图片路径
    const inputImagePath = req.file.path;
    // 定义识别结果图片的保存路径
    const outputImageName = `result-${Date.now()}.jpg`;
    const outputImagePath = path.join(outputDir, outputImageName);

    // 3. 调用本地 Python 脚本（替换为你的脚本路径和参数）
    // 假设 Python 脚本接收两个参数：输入图片路径、输出图片路径
    const pythonScriptPath = path.join(__dirname, '../scripts/detect.py'); // 你的 Python 脚本路径
    const command = `python ${pythonScriptPath} "${inputImagePath}" "${outputImagePath}"`;

    // 执行命令
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Python 脚本执行失败:', error.message);
        return res.status(500).json({ message: '识别失败', error: error.message });
      }
      if (stderr) {
        console.error('Python 脚本错误输出:', stderr);
        return res.status(500).json({ message: '识别脚本出错', error: stderr });
      }

      // 4. 读取 Python 脚本生成的结果图片，转为 Base64 返回给前端
      if (!fs.existsSync(outputImagePath)) {
        return res.status(500).json({ message: '识别结果图片未生成' });
      }

      const imageBuffer = fs.readFileSync(outputImagePath);
      const resultBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

      // 5. 返回结果（可选：删除临时文件释放空间）
      fs.unlinkSync(inputImagePath); // 删除上传的原图
      // fs.unlinkSync(outputImagePath); // 如需保留结果图可注释此行

      res.json({
        message: '识别成功',
        resultUrl: resultBase64 // 前端直接用此 Base64 显示图片
      });
    });

  } catch (error) {
    console.error('接口错误:', error);
    res.status(500).json({ message: '识别接口异常', error: error.message });
  }
});

module.exports = router;
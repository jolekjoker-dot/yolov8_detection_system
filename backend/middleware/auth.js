// backend/middleware/auth.js
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  
  // 简单校验 Token（实际用 JWT 验证）
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未授权' });
  }
  
  // 解析 Token（示例：提取 userId）
  const userId = token.split(' ')[1].split('-')[0];
  req.userId = userId; // 挂载到请求对象
  next();
};
const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
const bcrypt = require('bcryptjs'); // 注意：这里安装的是bcryptjs，导入名需一致
const upload = require('../config/upload.js'); // 导入multer配置

//登录接口
// backend/routes/users.js
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 查询用户
    const [rows] = await db.execute(
      'SELECT id, password FROM users WHERE username = ?',
      [username]
    );
    
    // 处理用户不存在
    if (rows.length === 0) {
      return res.status(401).json({ message: '用户不存在' });
    }
    
    // 验证密码（使用 bcryptjs 解密）
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: '密码错误' });
    }
    
    // 生成 Token（推荐用 JWT，这里简化演示）
    const token = `Bearer ${rows[0].id}-${Date.now()}`; // 实际项目用 jsonwebtoken 库
    res.json({ message: '登录成功', token, userId: rows[0].id });
  } catch (error) {
    res.status(500).json({ message: '登录失败', error: error.message });
  }
});

// 1. 注册接口
router.post('/register', upload.single('avatar'), async (req, res) => {
  try {
    const { username, password, email, avatar } = req.body;

    const avatarPath = req.file ? '/uploads/avatars/' + req.file.filename : null;
    
    // 密码加密（使用bcryptjs的正确方法）
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 插入数据库
    const [result] = await db.execute(
      'INSERT INTO users (username, password, email, avatar) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, email, avatarPath]
    );
    
    res.status(201).json({ 
      message: '注册成功', 
      userId: result.insertId 
    });
  } catch (error) {
    console.log('注册接口错误:', error); // 新增日志
    res.status(500).json({ message: '注册失败', error: error.message });
  }
});

// 2. 获取用户信息接口（新增）
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('查询用户ID:', id); // 新增日志
    
    // 查询数据库
    const [rows] = await db.execute(
      'SELECT id, username, email, avatar, created_at FROM users WHERE id = ?',
      [id]
    );
    
    // 处理用户不存在的情况
    if (rows.length === 0) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    // 返回用户信息（不含密码）
    res.json(rows[0]);
  } catch (error) {
    console.log('获取用户信息错误:', error); // 新增日志
    res.status(500).json({ message: '获取用户信息失败', error: error.message });
  }
});

// 3. 修改用户信息接口
router.put('/:id',upload.single('avatar'), async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, avatar } = req.body;
    console.log('修改用户ID:', id, '数据:', { username, email, avatar }); // 新增日志
    
    // 先检查用户是否存在
    const [user] = await db.execute('SELECT id FROM users WHERE id = ?', [id]);
    if (user.length === 0) {
      return res.status(404).json({ message: '用户不存在' });
    }
    // 处理头像更新
    let avatarPath = user[0].avatar; // 默认保留原有头像
    if (req.file) {
      avatarPath = '/uploads/avatars/' + req.file.filename;
      // （可选）这里可以添加删除旧头像文件的逻辑
    }
    // 执行更新
    await db.execute(
      'UPDATE users SET username = ?, email = ?, avatar = ? WHERE id = ?',
      [username, email, avatarPath, id]
    );
    
    res.json({ 
      message: '信息修改成功',
      // 返回新的头像路径，方便前端更新显示
      avatar: avatarPath 
    });
  } catch (error) {
    console.log('修改用户信息错误:', error); // 新增日志
    res.status(500).json({ message: '修改失败', error: error.message });
  }
});

module.exports = router;

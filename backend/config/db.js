const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

// 加载 .env 文件（从 config 文件夹上一级查找）
const envPath = path.join(__dirname, '..', '.env');
const result = dotenv.config({ path: envPath });

// 打印解析结果，方便排查
if (result.error) {
  console.error('dotenv 解析错误：', result.error);
} else {
  console.log('解析到的环境变量：', result.parsed);
}

// 数据库配置（使用 DB_ 前缀，与 .env 保持一致）
const pool = mysql.createPool({
  host: process.env.DB_HOST,      // 对应 .env 中的 DB_HOST
  user: process.env.DB_USER,      // 对应 .env 中的 DB_USER
  password: process.env.DB_PASSWORD,  // 对应 .env 中的 DB_PASSWORD
  database: process.env.DB_NAME,  // 对应 .env 中的 DB_NAME
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
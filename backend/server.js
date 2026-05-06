const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.js');
const detectRouter = require('./routes/detect.js'); // ① 引入 detect 路由

const app = express();
const path = require('path');
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', usersRouter);
app.use('/api/detect', detectRouter); // ② 注册 /api/detect 路由
app.use('/users', require('./routes/users'));
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
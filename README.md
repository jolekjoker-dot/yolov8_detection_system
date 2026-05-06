# YOLOv8 智能目标检测系统 (Vue3 + Node.js + Python)

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat&logo=vuedotjs)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=nodedotjs)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat&logo=python)
![YOLOv8](https://img.shields.io/badge/YOLO-v8-FF9900?style=flat)

本项目是一个基于前后端分离架构的 Web 目标检测应用。下面将手把手教你如何在本地成功把这个项目跑起来，以及如果有自定义需求（例如更换模型、修改数据库）时，你需要去修改哪些文件。

---

## 1. 环境准备

在开始之前，请确保你的电脑已经安装了以下环境：
1. **Node.js** (推荐 v18+)：用于运行前端和后端服务。
2. **Python** (推荐 v3.9+)：用于运行 YOLO 目标检测脚本。
3. **MySQL**：用于存储用户数据（支持 v5.7 或 v8.0）。

---

## 2. 数据库配置与导入 (关键步)

项目需要通过数据库来进行账号的注册与登录。

1. **创建数据库与表**：打开你本地的 MySQL 客户端（如 Navicat/DataGrip），新建一个用来存储本项目数据的数据库，并在里面执行以下 SQL 建表语句：
   ```sql
   CREATE DATABASE IF NOT EXISTS yolo DEFAULT CHARSET utf8mb4;
   USE yolo;
   CREATE TABLE `users` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `username` varchar(50) NOT NULL,
     `password` varchar(100) NOT NULL,
     `email` varchar(50) NOT NULL,
     `avatar` varchar(255) DEFAULT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `username` (`username`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
   ```
2. **修改配置文件**：去到项目的 `backend` 目录下，找到 `.env.example` 文件。
   - 将其**拷贝并重命名为 `.env`**。
   - 使用代码编辑器打开 `.env` 文件，把 `DB_USER` 和 `DB_PASSWORD` 修改为你本机的 MySQL 账号和密码。
   - 如果你的数据库名不是 `yolo`，请同步修改 `DB_NAME` 的值。

---

## 3. 运行后端服务 (Node.js)

后端提供了 API 接口及图片上传处理服务。
```bash
cd backend
npm install
# 启动后台服务
node server.js
```
启动成功后会提示 `服务器运行在 http://localhost:5000`。

---

## 4. 运行前端服务 (Vue3)

前端是用户可视化交互界面。请在 VS Code 里打开一个**全新的终端**：
```bash
cd frontend
npm install
# 启动前端页面
npm run dev
```
启动后会在终端显示一个本地访问地址（例如 `http://localhost:5173`），按住 Ctrl 键点击链接即可在浏览器中打开系统。

---

## 5. Python 目标检测环境与模型修改

当你在前端点击“开始识别”按钮时，后端的 Node.js 会去后台调用 Python 脚本。为了不报错，你需要准备好 Python 识别环境：

1. **安装依赖**：
   打开终端，执行以下命令安装 YOLO 推理所需的库：
   ```bash
   pip install ultralytics opencv-python
   ```
2. **如何替换你自己的模型？**
   项目默认读取的模型路径位于项目根目录的 `yolo-model/best.pt`。
   **如果你想换成你自己训练的模型**：
   - **推荐操作**：直接把你训练好的模型重命名为 `best.pt`，直接覆盖替换掉 `yolo-model` 文件夹下的旧文件，**这样代码一字不用改**。
   - **修改代码操作**：如果你不想改模型文件名，只需打开 `backend/scripts/detect.py`，把代码第 13 行的 `../../yolo-model/best.pt` 换成你新模型的相对路径或绝对路径即可。

---

## 总结：快速排错与需要修改的文件清单

如果在你或别人电脑上运行报错，直接去改这几个核心文件：

* **修改 MySQL 密码/数据库** -> 找 `backend/.env`
* **修改 YOLO 预训练模型加载路径** -> 找 `backend/scripts/detect.py`
* **修改 后端提供的运行端口** -> 找 `backend/.env` 中的 `PORT`，同时修改 `backend/server.js` 中是否有被写死的端口。
* **修改 前端请求后端的地址** -> 找 `frontend/src/api/axios.js` (若后端端口不是 5000，必须进这里把 `baseURL` 的 5000 改掉)。
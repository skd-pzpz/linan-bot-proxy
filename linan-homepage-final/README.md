# 林安个人主页 - 数字分身版

## 项目结构

```
linan-homepage/
├── index.html              # 个人主页前端（可直接用浏览器打开）
├── server.js               # 本地代理服务器（Node.js + Express）
├── cf_worker_proxy.js      # Cloudflare Workers 代理代码
├── package.json            # 项目依赖
└── README.md               # 说明文档
```

## 快速开始

### 方式一：本地测试（推荐先验证）

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动代理服务器：
   ```bash
   npm start
   ```

3. 用浏览器打开 `index.html`

4. 在聊天区测试数字分身

### 方式二：部署到线上

#### 方案 A：Cloudflare Workers（免费）
1. 访问 https://workers.cloudflare.com
2. 创建新 Worker，粘贴 `cf_worker_proxy.js` 代码
3. 保存部署，获取 Worker URL
4. 修改 `index.html` 中的 `PROXY_URL` 为 Worker URL
5. 把 `index.html` 部署到任何静态托管（GitHub Pages / Vercel / Netlify）

#### 方案 B：腾讯云 CloudBase
1. 创建 CloudBase 环境（免费体验版）
2. 新建云函数，上传 `server.js`
3. 获取云函数触发器 URL
4. 修改 `index.html` 中的 `PROXY_URL`

## 配置说明

### 修改 API Key（如需更换）

在 `server.js` 和 `cf_worker_proxy.js` 中修改：
```javascript
const GLM_API_KEY = '你的智谱 API Key';
```

### 修改前端代理地址

在 `index.html` 中修改：
```javascript
const PROXY_URL = '你的代理地址';
```

## 功能特性

- ✅ 个人主页展示（头像、介绍、标签）
- ✅ 信息卡片（当前状态、擅长方向）
- ✅ 作品展示区
- ✅ 联系方式区（邮箱复制 + 聊天引导）
- ✅ 数字分身聊天区（接入智谱 GLM 真实大模型）
- ✅ 快捷问题按钮
- ✅ 响应式设计（适配手机）
- ✅ 深蓝 + 白色清爽风格

## 技术栈

- 前端：纯 HTML + CSS + JavaScript
- 代理：Node.js + Express / Cloudflare Workers
- AI 模型：智谱 GLM-4-Flash（免费）

## 注意事项

- API Key 不要提交到公开仓库
- 本地测试时前后端都需在运行
- 线上部署需要配置 CORS

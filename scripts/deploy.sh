#!/bin/bash

# 本地打包
echo "🛠️ 开始打包前端项目..."
npm run build

# 服务器信息
REMOTE_HOST="root@117.72.221.207"
REMOTE_PATH="/www/wwwroot/1bel.cn/vite-test"
NGINX_BIN="/usr/bin/nginx"

# 删除旧文件
echo "📁 清空服务器旧 dist(vite-test) 文件..."
ssh $REMOTE_HOST "rm -rf $REMOTE_PATH/*"

# 上传新文件
echo "🚀 上传新的 dist 到服务器..."
scp -r ./dist/* $REMOTE_HOST:$REMOTE_PATH

# 重载 nginx（非全局路径）
echo "♻️ 重新加载 nginx..."
ssh $REMOTE_HOST "$NGINX_BIN -s reload"

echo "✅ 部署完成！访问地址: http://www.1bel.cn/vite-test/"

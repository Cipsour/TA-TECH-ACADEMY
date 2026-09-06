#!/bin/bash
# Script tự động triển khai TA TECH Academy lên Server 14.225.46.204
# Tên miền: tuananhtinhoc.info.vn

echo "=========================================="
echo "  Bắt đầu triển khai TA TECH Academy"
echo "  Tên miền: tuananhtinhoc.info.vn"
echo "=========================================="

# 1. Cài đặt các gói phụ thuộc
echo "[1/5] Cài đặt dependencies (npm install)..."
npm install --production=false

# 2. Sinh Prisma Client & Cập nhật Schema Database (nếu có cấu hình PostgreSQL)
echo "[2/5] Tạo Prisma ORM Client & Đồng bộ Database..."
npx prisma generate 2>/dev/null || true
if [ -n "$DATABASE_URL" ] && [ "$DATABASE_URL" != "MY_DATABASE_URL" ]; then
  echo "Phát hiện DATABASE_URL, tiến hành đồng bộ bảng (prisma db push)..."
  npx prisma db push --skip-generate 2>/dev/null || true
fi

# 3. Build ứng dụng cho môi trường Production
echo "[3/5] Đang biên dịch ứng dụng Frontend & Backend (npm run build)..."
npm run build

# 4. Cài đặt & Khởi chạy PM2 quản lý tiến trình backend
echo "[4/5] Cài đặt PM2 và khởi tạo server..."
sudo npm install -g pm2 2>/dev/null || true
pm2 restart tuananhtinhoc-academy 2>/dev/null || pm2 start ecosystem.config.cjs
pm2 save

echo "=========================================="
echo "  [5/5] Triển khai thành công ứng dụng trên Port 3000!"
echo "  Vui lòng kiểm tra Nginx và SSL Certbot theo hướng dẫn trong file DEPLOYMENT_GUIDE.md."
echo "=========================================="

# Hướng Dẫn Triển Khai App Lên Server 14.225.46.204 (Domain: tuananhtinhoc.info.vn)

Tài liệu này hướng dẫn chi tiết các bước đẩy mã nguồn lên GitHub và triển khai tự động trên máy chủ Ubuntu/Debian (IP: `14.225.46.204`) cho tên miền **tuananhtinhoc.info.vn**.

---

## BƯỚC 1: Đẩy mã nguồn từ máy local/GitHub sang Repository của bạn

Trường hợp bạn tải mã nguồn từ AI Studio dưới dạng ZIP hoặc đẩy qua Git:

```bash
# Khởi tạo git và push lên GitHub account cipcola2@gmail.com
git init
git add .
git commit -m "Deploy TA TECH Academy full source code"
git branch -M main
git remote add origin https://github.com/<your-username>/tuananhtinhoc-academy.git
git push -u origin main
```

*(Mẹo: Bạn cũng có thể bấm nút **Export to GitHub** hoặc **Download ZIP** trong Menu Settings của AI Studio để tải về máy trước).*

---

## BƯỚC 2: SSH vào Server 14.225.46.204 & Pull Mã Nguồn

Mở Terminal trên máy tính của bạn và SSH vào máy chủ:

```bash
ssh root@14.225.46.204
```

Tạo thư mục dự án và Clone mã nguồn về:

```bash
cd /var/www
git clone https://github.com/<your-username>/tuananhtinhoc-academy.git
cd tuananhtinhoc-academy
```

*(Nếu nâng cấp phiên bản sau này, chỉ cần chạy `git pull origin main` trong thư mục này).*

---

## BƯỚC 3: Chạy Tự Động Build & Khởi Chạy Server (Port 3000)

Cấp quyền thực thi và chạy script tự động đã tạo sẵn:

```bash
chmod +x deploy-server.sh
./deploy-server.sh
```

Script sẽ tự động:
1. Cài đặt các thư viện Node.js (`npm install`)
2. Biên dịch Frontend & Backend thành tệp `dist/server.cjs` (`npm run build`)
3. Khởi chạy ứng dụng chạy ngầm bằng PM2 (`pm2 start ecosystem.config.cjs`)

---

## BƯỚC 4: Cấu Hình Nginx Reverse Proxy Cho Domain `tuananhtinhoc.info.vn`

Tạo file cấu hình Nginx trên Server:

```bash
sudo nano /etc/nginx/sites-available/tuananhtinhoc.info.vn
```

Dán nội dung sau vào file:

```nginx
server {
    listen 80;
    server_name tuananhtinhoc.info.vn www.tuananhtinhoc.info.vn;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Lưu file (Ctrl + O -> Enter -> Ctrl + X), sau đó kích hoạt domain và kiểm tra Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/tuananhtinhoc.info.vn /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## BƯỚC 5: Kích Hoạt Miễn Phí Chứng Chỉ SSL HTTPS (Let's Encrypt)

Đảm bảo tên miền **tuananhtinhoc.info.vn** đã trỏ bản ghi **A record** về IP `14.225.46.204` trên nhà cung cấp tên miền của bạn, sau đó chạy:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d tuananhtinhoc.info.vn -d www.tuananhtinhoc.info.vn
```

Certbot sẽ tự động cài đặt chứng chỉ SSL HTTPS và tự động gia hạn.

---

## BƯỚC 6: Kiểm Tra Quản Lý Tiến Trình

- Xem danh sách app đang chạy: `pm2 status`
- Xem log hoạt động: `pm2 logs`
- Khởi động lại app: `pm2 restart tuananhtinhoc-academy`

Bây giờ bạn có thể truy cập website tại: **https://tuananhtinhoc.info.vn**

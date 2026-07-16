# 🐾 Hệ Thống Quản Lý Phòng Khám Thú Y — PetCare

Dự án PetCare là hệ thống quản lý phòng khám thú y được xây dựng với kiến trúc tách biệt hoàn toàn giữa **Frontend (Vue 3)** và **Backend (Laravel API)**. 

---

## 📊 Trạng Thái Hệ Thống (CI/CD)

* **GitHub Actions**: Tích hợp quy trình kiểm tra build tự động.
* **SonarCloud Quality Gate**: Tự động phân tích chất lượng code, lỗi bảo mật và code smells.

---

## 🗂️ Cấu Trúc Thư Mục Dự Án

Dự án được phân chia thành 2 phần độc lập:
```
📂 PetCare/                              ← Mã nguồn Frontend (Vue 3 + Vite)
📂 Be-PetCare--feature-develop/          ← Mã nguồn Backend (Laravel 12 + MySQL)
```

---

## ⚙️ Yêu Cầu Cài Đặt Hệ Thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
* **Node.js**: Phiên bản `18.x` hoặc `>= 22.x`
* **PHP**: Phiên bản `>= 8.2` (Khuyên dùng PHP 8.4)
* **Composer**: Phiên bản `>= 2.x`
* **MySQL**: Phiên bản `>= 8.x` (Hoặc dùng MySQL tích hợp sẵn trong XAMPP / Homebrew)

---

## 🖥️ PHẦN 1: HƯỚNG DẪN CÀI ĐẶT BACKEND (Laravel)

Di chuyển vào thư mục backend và thực hiện các bước cấu hình:

### 1. Di chuyển vào thư mục Backend
```bash
cd Be-PetCare--feature-develop
```

### 2. Cài đặt các thư viện PHP
```bash
composer install
```

### 3. Tạo file cấu hình môi trường `.env`
Tạo file `.env` từ file mẫu `.env.example`:
```bash
cp .env.example .env
```

### 4. Tạo mã khóa ứng dụng (Application Key)
```bash
php artisan key:generate
```

### 5. Tạo Database và cấu hình kết nối
Mở phần mềm quản lý Database (phpMyAdmin, MySQL Workbench) và tạo một database mới có tên:
```sql
CREATE DATABASE PetCare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Cập nhật thông tin kết nối database trong file `.env` của bạn:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=PetCare
DB_USERNAME=root
DB_PASSWORD=
```

### 6. Khởi tạo bảng dữ liệu và nạp dữ liệu mẫu (Seed)
Chạy lệnh migrations để tự động tạo cấu trúc bảng và seeder dữ liệu mẫu cho hệ thống:
```bash
php artisan migrate --seed
```

### 7. Tạo liên kết thư mục chứa ảnh (Storage Link)
```bash
php artisan storage:link
```

### 8. Khởi chạy Server API Backend
Chạy server Laravel API tại cổng mặc định `8000`:
```bash
php artisan serve
```
👉 Server Backend sẽ chạy tại địa chỉ: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## 🌐 PHẦN 2: HƯỚNG DẪN CÀI ĐẶT FRONTEND (Vue 3 + Vite)

### 1. Di chuyển vào thư mục Frontend
```bash
cd PetCare
```

### 2. Cài đặt các gói thư viện Node.js
```bash
npm install
```

### 3. Cấu hình IP API kết nối tới Backend
Mở và kiểm tra IP API trong các file cấu hình sau để đảm bảo kết nối tới localhost:
* **Admin API**: `src/core/baseRequestAdmin.js` -> `const apiUrl = "http://127.0.0.1:8000/api/";`
* **Bác sĩ API**: `src/core/baseRequestBacsi.js` -> `const apiUrl = "http://127.0.0.1:8000/api/";`
* **Lễ tân API**: `src/core/baseRequestLeTan.js` -> `const apiUrl = "http://127.0.0.1:8000/api/";`

### 4. Khởi chạy Server Frontend
Khởi chạy môi trường phát triển local (Vite dev server):
```bash
npm run dev
```
👉 Truy cập giao diện ứng dụng tại địa chỉ: **[http://localhost:5173](http://localhost:5173)**

---

## 🔑 THÔNG TIN TÀI KHOẢN ĐĂNG NHẬP MẪU

Sau khi chạy lệnh `php artisan db:seed`, hệ thống sẽ tự động nạp các tài khoản thử nghiệm sau:

| Vai trò | Đường dẫn đăng nhập | Email mẫu | Mật khẩu mặc định |
| :--- | :--- | :--- | :--- |
| **Admin** | `http://localhost:5173/admin/login` | `admin@gmail.com` | `123456` |
| **Lễ tân** | `http://localhost:5173/login` | `letan@gmail.com` | `123456` |
| **Bác sĩ** | `http://localhost:5173/bac-si/login` | `bacsi@gmail.com` | `123456` |

---

## 👥 Nhóm Công Nghệ Sử Dụng

* **Frontend**:
  * Vue 3 (Composition API / Options API)
  * Vite (Công cụ build siêu tốc)
  * TypeScript / JavaScript
  * Vue Router (Quản lý định tuyến)
  * Axios (Gửi HTTP Requests)
  * Chart.js & Vue-ChartJS (Vẽ biểu đồ thống kê)
* **Backend**:
  * Laravel framework
  * MySQL (Hệ quản trị cơ sở dữ liệu)
  * Laravel Sanctum (Xác thực API bằng Token)

---

## 🛠️ Khắc Phục Lỗi Thường Gặp (Troubleshooting)

### 1. Lỗi CORS khi gọi API
Nếu trình duyệt báo lỗi CORS, mở file `config/cors.php` trong Laravel Backend và cấu hình cho phép nguồn nhận từ Frontend:
```php
'allowed_origins' => ['http://localhost:5173'],
```

### 2. Thiếu quyền thực thi lệnh npm (macOS)
Nếu gặp lỗi `Permission denied` khi chạy `npm run dev`, thực hiện cấp quyền thực thi cho các file binary trong thư mục node_modules:
```bash
chmod +x node_modules/.bin/*
```

---
*📅 Tài liệu được cập nhật ngày: 16/07/2026 bởi Antigravity*

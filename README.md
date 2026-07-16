# 🐾 PetCare — Hướng Dẫn Cài Đặt & Chạy Dự Án

## 📌 Giới thiệu

**PetCare** là hệ thống quản lý phòng khám thú y gồm 3 vai trò:
- 🧑‍💼 **Admin** — Quản lý bác sĩ, chuyên khoa, phòng khám, phân quyền, thống kê
- 👨‍⚕️ **Bác sĩ** — Xem lịch hẹn, lịch cá nhân, quản lý hồ sơ
- 🧑‍💻 **Lễ tân / Khách** — Đặt khám, xem bác sĩ, chuyên khoa, tin tức

---

## 🗂️ Cấu trúc dự án

```
PetCare/          ← Frontend (Vue 3 + Vite)
PetCare-BE/       ← Backend  (Laravel + MySQL)
```

---

## ⚙️ Yêu cầu hệ thống

| Công cụ | Phiên bản |
|---------|-----------|
| Node.js | >= 22.x   |
| npm     | >= 10.x   |
| PHP     | >= 8.x    |
| Composer| >= 2.x    |
| MySQL   | >= 8.x    |
| XAMPP   | Bất kỳ (có MySQL) |

---

## 🖥️ PHẦN 1 — BACKEND (Laravel)

### Bước 1: Vào thư mục Backend

```bash
cd PetCare-BE
```

### Bước 2: Cài đặt dependencies PHP

```bash
composer install
```

### Bước 3: Tạo file `.env`

```bash
cp .env.example .env
```

### Bước 4: Cấu hình file `.env`

Mở file `.env` và chỉnh sửa các thông tin sau:

```env
APP_NAME=PetCare
APP_ENV=local
APP_URL=http://<IP_CUA_BAN>:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=PetCare
DB_USERNAME=root
DB_PASSWORD=
```

> 💡 **Thay `<IP_CUA_BAN>`** bằng địa chỉ IPv4 của máy bạn (xem bằng `ipconfig` trên Windows hoặc `ifconfig` trên Mac).  
> Ví dụ: `APP_URL=http://192.168.88.105:8000`

### Bước 5: Tạo Application Key

```bash
php artisan key:generate
```

### Bước 6: Tạo database

Mở **phpMyAdmin** (XAMPP) hoặc MySQL Workbench, tạo database tên:

```
PetCare
```

### Bước 7: Chạy Migration & Seeder

```bash
# Tạo bảng
php artisan migrate

# Nhập dữ liệu mẫu
php artisan db:seed
```

> ⚠️ Nếu muốn reset toàn bộ dữ liệu:
> ```bash
> php artisan migrate:fresh --seed
> ```

### Bước 8: Tạo link storage (ảnh đại diện)

```bash
php artisan storage:link
```

### Bước 9: Chạy Backend Server

```bash
# Chạy trên localhost (chỉ dùng nội bộ máy)
php artisan serve

# Chạy trên IP để máy khác kết nối được (cùng WiFi)
php artisan serve --host=<IP_CUA_BAN> --port=8000
```

> Ví dụ: `php artisan serve --host=192.168.88.105 --port=8000`

✅ Backend đang chạy tại: `http://<IP_CUA_BAN>:8000`

---

## 🌐 PHẦN 2 — FRONTEND (Vue 3 + Vite)

### Bước 1: Vào thư mục Frontend

```bash
cd PetCare
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Cấu hình IP Backend

Mở **6 file** sau và thay `<IP_BACKEND>:8000` bằng IP máy chạy Backend:

| File | Đường dẫn |
|------|-----------|
| `baseRequestAdmin.js` | `src/core/baseRequestAdmin.js` |
| `baseRequestBacsi.js` | `src/core/baseRequestBacsi.js` |
| `baseRequestLeTan.js` | `src/core/baseRequestLeTan.js` |
| `checkAdmin.js` | `src/router/checkAdmin.js` |
| `checkBacSi.js` | `src/router/checkBacSi.js` |
| `checkLeTan.js` | `src/router/checkLeTan.js` |

**Ví dụ trong `baseRequestAdmin.js`:**

```js
// Trước
const apiUrl = "http://10.220.9.53:8000/api/";

// Sau (thay bằng IP của máy chạy BE)
const apiUrl = "http://192.168.88.105:8000/api/";
```

> 💡 **Nếu BE chạy cùng máy với FE** → dùng `http://localhost:8000/api/` hoặc `http://127.0.0.1:8000/api/`

### Bước 4: Chạy Frontend

```bash
npm run dev
```

✅ Frontend đang chạy tại: **http://localhost:5173**

---

## 🔗 PHẦN 3 — KẾT NỐI HAI MÁY KHÁC NHAU

Nếu **FE và BE chạy trên 2 máy khác nhau**, cần đảm bảo:

| Điều kiện | Mô tả |
|-----------|-------|
| ✅ Cùng WiFi | Cả 2 máy kết nối cùng 1 mạng |
| ✅ IP đúng | IP trong FE phải là IP máy chạy BE |
| ✅ BE đang chạy | `php artisan serve --host=<IP> --port=8000` |
| ✅ Firewall tắt | Tắt tường lửa trên máy BE (Windows Defender) |

### Cách lấy IP trên từng hệ điều hành

**Windows:**
```
ipconfig
→ Tìm dòng: IPv4 Address . . . . . : 192.168.x.x
```

**macOS / Linux:**
```
ifconfig | grep "inet "
→ Tìm dòng không phải 127.0.0.1
```

---

## 🌍 PHẦN 4 — DÙNG NGROK (Không cùng WiFi)

Nếu hai máy **không cùng mạng**, dùng ngrok để tạo URL public:

### Trên máy chạy Backend:

```bash
# Cài ngrok (nếu chưa có): https://ngrok.com/download
ngrok http 8000
```

→ Ngrok tạo ra URL dạng: `https://abc123.ngrok-free.app`

### Trên máy Frontend:

Thay IP trong 6 file cấu hình bằng URL ngrok:

```js
const apiUrl = "https://abc123.ngrok-free.app/api/";
```

---

## 📱 Tài khoản mặc định (sau khi seed)

> *(Kiểm tra file `database/seeders/` trong BE để xem tài khoản mặc định)*

| Vai trò | Email | Mật khẩu |
|---------|-------|-----------|
| Admin | admin@petcare.com | 123456 |
| Bác sĩ | bacsi@petcare.com | 123456 |
| Lễ tân | letan@petcare.com | 123456 |

---

## 🛠️ Các lệnh thường dùng

```bash
# ===== BACKEND =====
composer install          # Cài dependencies
php artisan key:generate  # Tạo app key
php artisan migrate       # Chạy migration
php artisan db:seed       # Nhập dữ liệu mẫu
php artisan migrate:fresh --seed  # Reset toàn bộ DB
php artisan storage:link  # Tạo link ảnh
php artisan serve --host=<IP> --port=8000  # Chạy server

# ===== FRONTEND =====
npm install               # Cài dependencies
npm run dev               # Chạy dev server
npm run build             # Build production
```

---

## ❗ Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `CORS error` | BE chưa cấu hình CORS | Kiểm tra `config/cors.php` trong Laravel |
| `Connection refused` | BE chưa chạy hoặc sai IP | Kiểm tra lại `php artisan serve` |
| `401 Unauthorized` | Token hết hạn | Đăng xuất và đăng nhập lại |
| `404 Not Found` | Sai đường dẫn API | Kiểm tra route trong BE |
| `npm error: Permission denied` | Thiếu quyền thực thi | Chạy `chmod +x node_modules/.bin/*` |
| `Cannot find native binding` | node_modules lỗi | Xóa và chạy lại `npm install` |

---

## 👥 Công nghệ sử dụng

**Frontend:**
- Vue 3 + Vite + TypeScript
- Vue Router 4
- Axios
- Chart.js + Vue-ChartJS
- Vue Easy Lightbox

**Backend:**
- Laravel (PHP)
- MySQL
- Laravel Sanctum (Authentication)

---

*📅 Cập nhật: 16/07/2026*

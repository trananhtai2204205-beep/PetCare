# PetCare Backend API

## 🚀 Bắt đầu nhanh

### 1. Cấu hình database
Mở file `.env` và chỉnh sửa thông tin MySQL:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=petcare_db
DB_USER=root
DB_PASSWORD=your_password
```

### 2. Tạo database MySQL
```sql
CREATE DATABASE petcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Cài dependencies
```bash
npm install
```

### 4. Tạo dữ liệu mẫu
```bash
npm run seed
```

### 5. Chạy server
```bash
# Development (hot reload)
npm run dev

# Production
npm start
```

Server chạy tại: `http://localhost:3000`

---

## 📋 Tài khoản mẫu (sau khi seed)

### Bác sĩ
| Email | Mật khẩu |
|---|---|
| dr.khoa@petcare.vn | 123456 |
| dr.mai@petcare.vn | 123456 |
| dr.hung@petcare.vn | 123456 |

### Khách hàng
| Email | Mật khẩu |
|---|---|
| lan.nguyen@gmail.com | 123456 |
| mai@gmail.com | 123456 |
| hung@gmail.com | 123456 |

---

## 🔗 API Endpoints

### Auth
- `POST /api/auth/doctor/login` - Đăng nhập bác sĩ
- `POST /api/auth/customer/login` - Đăng nhập khách hàng
- `POST /api/auth/customer/register` - Đăng ký khách hàng
- `POST /api/auth/refresh-token` - Làm mới token

### Doctors
- `GET /api/doctors` - Danh sách bác sĩ
- `GET /api/doctors/me` - Thông tin bác sĩ đăng nhập
- `PUT /api/doctors/me` - Cập nhật profile
- `GET /api/doctors/dashboard-stats` - Thống kê

### Pets
- `GET /api/pets` - Danh sách thú cưng
- `POST /api/pets` - Thêm thú cưng
- `GET /api/pets/:id` - Chi tiết
- `PUT /api/pets/:id` - Cập nhật
- `DELETE /api/pets/:id` - Xóa

### Appointments
- `GET /api/appointments` - Danh sách lịch hẹn
- `GET /api/appointments/today` - Lịch hẹn hôm nay
- `POST /api/appointments` - Tạo lịch hẹn
- `PATCH /api/appointments/:id/status` - Cập nhật trạng thái

### Medical Records
- `GET /api/medical-records` - Danh sách hồ sơ
- `POST /api/medical-records` - Lưu hồ sơ
- `GET /api/medical-records/pet/:petId` - Hồ sơ theo thú cưng

### Vaccines & Vaccination
- `GET /api/vaccines` - Danh sách vaccine
- `GET /api/vaccinations` - Lịch tiêm
- `GET /api/vaccinations/upcoming` - Sắp đến hạn

---

## 🛠 Tech Stack
- Node.js + Express.js
- MySQL + Sequelize ORM
- JWT Authentication
- bcryptjs (mã hóa mật khẩu)
- Multer (upload ảnh)

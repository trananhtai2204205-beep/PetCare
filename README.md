# 🐾 Hệ Thống Quản Lý Phòng Khám Thú Y — PetCare

<div align="center">
  <img src="src/assets/images/logo_letan.png" alt="PetCare Logo" width="200" style="border-radius: 10px; margin-bottom: 20px;" />
  <p><em>Hệ thống quản lý thông minh, toàn diện dành cho phòng khám thú y hiện đại</em></p>

  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=trananhtai2204205-beep_PetCare&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=trananhtai2204205-beep_PetCare)
  [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=trananhtai2204205-beep_PetCare&metric=bugs)](https://sonarcloud.io/summary/new_code?id=trananhtai2204205-beep_PetCare)
  [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=trananhtai2204205-beep_PetCare&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=trananhtai2204205-beep_PetCare)
  [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=trananhtai2204205-beep_PetCare&metric=coverage)](https://sonarcloud.io/summary/new_code?id=trananhtai2204205-beep_PetCare)
  [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=trananhtai2204205-beep_PetCare&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=trananhtai2204205-beep_PetCare)
</div>

---

## 📌 1. Sơ Đồ Quy Trình Nghiệp Vụ Tích Hợp (ETVX / SDLC Workflow)

Dưới đây là sơ đồ quy trình hoạt động nghiệp vụ tích hợp (ETVX: Entry - Task - Verification - Exit) của hệ thống PetCare:

```mermaid
flowchart TD
    %% Định nghĩa phong cách
    classDef process fill:#e3faffc,stroke:#15aabf,stroke-width:2px;
    classDef actor fill:#f8f9fa,stroke:#495057,stroke-dasharray: 5 5;
    classDef start_end fill:#fff3bf,stroke:#fab005,stroke-width:2px;

    subgraph Entry [1. Đăng Ký & Đặt Khám - Entry]
        A([Bắt đầu]) --> B[Khách hàng Đăng nhập/Đăng ký tài khoản]
        B --> C[Lễ tân/Khách đặt lịch hẹn khám]
        C --> D[Chọn chuyên khoa, Bác sĩ & Khung giờ]
    end

    subgraph Task [2. Xác Nhận & Điều Phối - Task]
        D --> E[Lịch hẹn ở trạng thái: Chờ xác nhận]
        E --> F[Admin/Lễ tân kiểm tra thông tin lịch hẹn]
        F --> G{Xác nhận lịch?}
        G -- Không duyệt --> H[Hủy lịch & Thông báo khách hàng]
        G -- Phê duyệt --> I[Xếp lịch hẹn vào hàng chờ khám của Bác sĩ]
    end

    subgraph Verification [3. Khám Lâm Sàng & Điều Trị - Verification]
        I --> J[Bác sĩ kiểm tra danh sách ca bệnh chờ]
        J --> K[Tiến hành khám lâm sàng cho thú cưng]
        K --> L[Kê đơn thuốc & Cập nhật Hồ sơ bệnh án]
    end

    subgraph Exit [4. Thanh Toán & Hoàn Tất - Exit]
        L --> M[Lễ tân xác nhận ca khám hoàn tất]
        M --> N[Khách hàng tiến hành thanh toán hóa đơn]
        N --> O([Kết thúc ca khám])
    end

    %% Áp dụng Class
    class A,O start_end;
    class B,C,D,E,F,H,I,J,K,L,M,N process;
```

---

## 📖 2. Tài Liệu API Chi Tiết (Detailed API Reference)

> [!NOTE]  
> Hệ thống API Backend sử dụng xác thực qua **Laravel Sanctum**. Mọi request gửi đi yêu cầu đính kèm Header: `Authorization: Bearer <TOKEN>`.

### ➡️ Phân hệ Lễ tân (Khách hàng)

* **Đăng nhập hệ thống**
  * `POST` `/api/le-tan/login`
  * **Request Body (JSON)**:
    ```json
    {
      "email": "letan@gmail.com",
      "password": "password123"
    }
    ```
  * **Response (Success - 200)**:
    ```json
    {
      "status": true,
      "message": "Đăng nhập thành công!",
      "token": "1|abcdef123456...",
      "ho_ten": "Lễ Tân A"
    }
    ```

* **Đặt lịch khám thú cưng**
  * `POST` `/api/le-tan/dat-lich`
  * **Request Body (JSON)**:
    ```json
    {
      "id_bac_si": 3,
      "id_chuyen_khoa": 1,
      "ngay_dat": "2026-07-20",
      "khung_gio": "09:00 - 10:00",
      "ten_thu_cung": "Miu Miu",
      "trieu_chung": "Mệt mỏi, bỏ ăn"
    }
    ```

### ➡️ Phân hệ Bác sĩ

* **Xem danh sách lịch hẹn được phân công**
  * `GET` `/api/bac-si/lich-hen`
  * **Response (Success - 200)**:
    ```json
    {
      "status": true,
      "data": [
        {
          "id": 1,
          "ten_thu_cung": "Miu Miu",
          "ngay_dat": "2026-07-20",
          "khung_gio": "09:00 - 10:00",
          "trieu_chung": "Mệt mỏi, bỏ ăn",
          "trang_thai": "Đã duyệt"
        }
      ]
    }
    ```

* **Cập nhật hồ sơ bệnh án & kê đơn**
  * `POST` `/api/bac-si/quan-ly-pet-care/store`
  * **Request Body (JSON)**:
    ```json
    {
      "id_lich_hen": 1,
      "chuan_doan": "Cảm cúm thông thường ở mèo",
      "don_thuoc": "Paracetamol 500mg, Vitamin C",
      "ghi_chu": "Cho uống nước ấm, tái khám sau 3 ngày"
    }
    ```

---

## 🗂️ 3. Cấu Trúc Thư Mục Dự Án

| Thư mục | Vai trò | Công nghệ chính |
| :--- | :--- | :--- |
| `📂 PetCare/` | Frontend Client & Admin | Vue 3, Vite, Axios, Bootstrap |
| `📂 Be-PetCare--feature-develop/` | Backend RESTful API | Laravel 12, MySQL, Sanctum |

---

## 🖥️ 4. Hướng Dẫn Cài Đặt Nhanh (Quick Start)

### 4.1 Cấu hình Backend (Laravel)

```bash
# 1. Di chuyển vào thư mục Backend
cd Be-PetCare--feature-develop

# 2. Cài đặt các thư viện PHP
composer install

# 3. Tạo file cấu hình môi trường
cp .env.example .env

# 4. Tạo mã khóa ứng dụng
php artisan key:generate
```

> [!IMPORTANT]  
> Tạo cơ sở dữ liệu mới trong MySQL với tên `PetCare`. Sau đó cập nhật cấu hình kết nối trong file `.env`:
> ```env
> DB_DATABASE=PetCare
> DB_USERNAME=root
> DB_PASSWORD=
> ```

```bash
# 5. Khởi tạo bảng dữ liệu và nạp dữ liệu mẫu
php artisan migrate --seed

# 6. Tạo liên kết thư mục storage
php artisan storage:link

# 7. Khởi chạy Server Backend
php artisan serve
```
👉 Server API chạy tại: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

### 4.2 Cấu hình Frontend (Vue 3)

```bash
# 1. Di chuyển vào thư mục Frontend
cd PetCare

# 2. Cài đặt các thư viện Node.js
npm install

# 3. Khởi chạy môi trường Local
npm run dev
```
👉 Giao diện ứng dụng chạy tại: **[http://localhost:5173](http://localhost:5173)**

---

## 🔑 5. Tài Khoản Đăng Nhập Thử Nghiệm

Dưới đây là danh sách tài khoản được tạo tự động sau khi chạy lệnh nạp dữ liệu (seed):

| Vai trò | Đường dẫn đăng nhập | Email mẫu | Mật khẩu mặc định |
| :--- | :--- | :--- | :--- |
| **🧑‍💼 Quản trị viên (Admin)** | `/admin/login` | `admin@gmail.com` | `123456` |
| **🧑‍💻 Nhân viên Lễ tân** | `/login` | `letan@gmail.com` | `123456` |
| **👨‍⚕️ Bác sĩ thú y** | `/bac-si/login` | `bacsi@gmail.com` | `123456` |

---

## 🛠️ 6. Khắc Phục Lỗi Thường Gặp (Troubleshooting)

> [!TIP]  
> **Lỗi CORS (Cross-Origin Resource Sharing)**  
> Mở file `config/cors.php` trong Laravel Backend và cập nhật để cho phép kết nối từ Frontend:
> ```php
> 'allowed_origins' => ['http://localhost:5173'],
> ```

> [!WARNING]  
> **Lỗi Xác Thực 401 Unauthorized**  
> Nếu gặp lỗi 401 khi gọi API sau một khoảng thời gian không thao tác, hãy đăng xuất tài khoản và đăng nhập lại để làm mới mã Token trong LocalStorage.

---
*📅 Tài liệu được cập nhật và tối ưu thẩm mỹ ngày: 16/07/2026 bởi Antigravity*

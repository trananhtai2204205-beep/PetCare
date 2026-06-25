<template>
  <div class="hoso-page">
    <section class="hoso-hero position-relative overflow-hidden">
      <div class="hero-overlay"></div>
      <div class="container py-5">
        <div class="row align-items-center gy-4">
          <div class="col-lg-7 text-white">
            <div class="hero-badge mb-3">Liên hệ</div>
            <h1 class="display-5 fw-bold">
              Bệnh viện thú y 24h Đà Nẵng<br />My Pet's Animal Hospital
            </h1>
            <p class="lead text-white-75 mt-3">
              Bệnh viện thú y 24h Đà Nẵng My Pet's Animal Hospital cung cấp dịch vụ cấp cứu cho thú cưng 24/7, chăm sóc y tế
              chuyên nghiệp, chuẩn mực và tận tâm.
            </p>
          </div>
          <div class="col-lg-5">
            <div class="hero-card p-4 rounded-4 shadow-lg bg-dark bg-opacity-75">
              <div class="text-end text-white-50 mb-3">
                <small>Số hotline</small>
                <div class="fs-4 fw-semibold">0771 666 666</div>
              </div>
              <div class="hero-card-info text-white">
                <div class="d-flex align-items-center mb-3">
                  <i class="fas fa-clock me-3 text-warning"></i>
                  <div>
                    <div>Giờ mở cửa</div>
                    <small>Thứ 2 - Thứ 6: 8:00 - 19:00</small>
                  </div>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <i class="fas fa-ambulance me-3 text-danger"></i>
                  <div>
                    <div>Khám cấp cứu</div>
                    <small>24/7 dành cho mọi thú cưng</small>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <i class="fas fa-location-dot me-3 text-info"></i>
                  <div>
                    <div>Địa chỉ</div>
                    <small>55 Lý Thái Tổ, Thanh Khê, Đà Nẵng</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hoso-form-section py-5">
      <div class="container">
        <div class="row gx-5 gy-4">
          <div class="col-lg-5">
            <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
              <h2 class="h4 fw-bold mb-4">Đặt lịch hẹn</h2>
              <div class="info-item mb-4">
                <h5 class="fw-semibold">Giờ mở cửa</h5>
                <p class="mb-1">Thứ 2 - Thứ 6: 8:00 - 19:00</p>
                <p class="mb-0">Thứ 7: 8:00 - 18:00 | Chủ nhật: 8:00 - 12:00</p>
              </div>
              <div class="info-item mb-4">
                <h5 class="fw-semibold">Nhận thẻ cứng lưu chuông</h5>
                <p class="mb-0">Cung cấp thẻ cứng để ghi nhớ thông tin lịch khám và lịch sử điều trị.</p>
              </div>
              <div class="info-item mb-4">
                <h5 class="fw-semibold">Địa chỉ phòng khám</h5>
                <p class="mb-0">55 Lý Thái Tổ, Thanh Khê, Đà Nẵng</p>
              </div>
              <div class="info-item">
                <h5 class="fw-semibold">Hỗ trợ</h5>
                <p class="mb-0">Nếu cần hỗ trợ ngay, vui lòng gọi hotline hoặc đến trực tiếp phòng khám.</p>
              </div>
            </div>
          </div>

          <div class="col-lg-7">
            <div class="card border-0 shadow rounded-4 overflow-hidden">
              <div class="card-body p-4 p-lg-5">
                <h2 class="h4 fw-bold mb-4">Thông tin đặt lịch khám</h2>
                <form @submit.prevent="submitForm">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">Tên</label>
                      <input type="text" class="form-control" v-model="form.name" placeholder="Nhập tên của bạn" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Họ</label>
                      <input type="text" class="form-control" v-model="form.surname" placeholder="Nhập họ" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Địa chỉ</label>
                      <input type="text" class="form-control" v-model="form.address" placeholder="Địa chỉ liên hệ" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">E-mail</label>
                      <input type="email" class="form-control" v-model="form.email" placeholder="email@example.com" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Số điện thoại</label>
                      <input type="tel" class="form-control" v-model="form.phone" placeholder="0987 654 321" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Chọn ngày</label>
                      <input type="date" class="form-control" v-model="form.date" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Chọn giờ</label>
                      <select class="form-select" v-model="form.time">
                        <option value="">Chọn giờ</option>
                        <option value="08:00">08:00</option>
                        <option value="10:00">10:00</option>
                        <option value="13:00">13:00</option>
                        <option value="15:00">15:00</option>
                        <option value="17:00">17:00</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Khám bệnh</label>
                      <select class="form-select" v-model="form.service">
                        <option value="">Chọn dịch vụ</option>
                        <option value="kham-tong-quat">Khám tổng quát</option>
                        <option value="kham-cuu">Khám cấp cứu</option>
                        <option value="kham-rang">Khám răng hàm mặt</option>
                        <option value="kham-ve-sinh">Khám vệ sinh và tiêm phòng</option>
                      </select>
                    </div>
                    <div class="col-12">
                      <label class="form-label">Ghi chú</label>
                      <textarea class="form-control" rows="4" v-model="form.note" placeholder="Ghi chú thêm về tình trạng thú cưng"></textarea>
                    </div>
                  </div>
                  <div class="mt-4 d-flex flex-column flex-sm-row gap-3 align-items-center">
                    <button type="submit" class="btn btn-primary px-5 py-2">Gửi</button>
                    <div class="text-muted small">Chúng tôi sẽ liên hệ lại sớm nhất sau khi nhận yêu cầu.</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  surname: '',
  address: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  service: '',
  note: ''
})

function submitForm() {
  console.log('Đặt lịch khám:', { ...form })
  // TODO: Gửi dữ liệu đến API hoặc xử lý tiếp theo
}
</script>

<style scoped>
.hoso-page {
  background: #eef3fa;
  color: #152238;
}
.hoso-hero {
  min-height: 420px;
  background-image: linear-gradient(135deg, rgba(5, 41, 94, 0.98), rgba(11, 30, 58, 0.98)),
    url('/src/assets/images/clinic-banner.jpg');
  background-size: cover;
  background-position: center;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(2, 35, 80, 0.70), rgba(7, 19, 49, 0.92));
}
.hoso-hero .container,
.hoso-hero .row {
  position: relative;
  z-index: 1;
}
.hoso-hero .text-white,
.hoso-hero .display-5,
.hoso-hero .lead {
  color: #ffffff !important;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  background: rgba(19, 104, 255, 0.18);
  border: 1px solid rgba(19, 104, 255, 0.35);
  color: #f8fbff;
  font-weight: 600;
}
.hero-card {
  background: rgba(12, 34, 72, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(32, 89, 172, 0.65);
}
.hero-card-info div {
  color: #f7fbff;
}
.hero-card .text-end,
.hero-card-info .d-flex > div > div,
.hero-card-info .d-flex > div > small {
  color: #ffffff;
}
.hero-card .fas {
  color: #88b5ff;
}
.hoso-form-section {
  background: #eef3fa;
}
.card.border-0.shadow-sm {
  background: #ffffff;
}
.card.border-0.shadow {
  background: #ffffff;
}
.info-item h5 {
  font-size: 1.05rem;
  color: #1f2f4f;
}
.info-item p {
  color: #4f607c;
}
.form-label {
  color: #22334d;
}
.form-control,
.form-select,
textarea.form-control {
  background: #f8fbff;
  border: 1px solid #cdd7ea;
  color: #152238;
}
.form-control::placeholder,
textarea.form-control::placeholder {
  color: #8a9ab8;
}
.form-control:focus,
.form-select:focus,
textarea.form-control:focus {
  border-color: #1d7ed2;
  box-shadow: 0 0 0 0.15rem rgba(29, 126, 210, 0.18);
}
.btn-primary {
  background: #1d7ed2;
  border-color: #1d7ed2;
}
.btn-primary:hover,
.btn-primary:focus {
  background: #1667bb;
  border-color: #1667bb;
}
.text-white-50 {
  color: rgba(255, 255, 255, 0.8) !important;
}
@media (max-width: 991px) {
  .hoso-hero {
    min-height: 360px;
  }
}
</style>

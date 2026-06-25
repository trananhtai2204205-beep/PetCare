<template>
  <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
          <template v-for="(value, index) in list_slide" :key="index">
              <div class="carousel-item" :class="{ 'active': index === 0 }">
                  <img :src="value.hinh_anh" class="d-block w-100" alt="..."
                      style="height: 450px; object-fit: cover;">
              </div>
          </template>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
      </button>
  </div>
  <div class="mb-5">
      <div class="container">
          <!-- Quick Action Cards -->
          <div class="row mb-3" style="margin-top: -50px;">
              <div class="col-lg-8 mx-auto">
                  <div class="row">
                      <div class="col-lg-6">
                          <div class="card radius-10 border-bottom border-0 border-3 border-info p-2 shadow-sm">
                              <div class="card-body d-flex justify-content-between">
                                  <div class="">
                                      <i class="fa-solid fa-phone-volume fa-4x text-primary"></i>
                                  </div>
                                  <div class="ms-4 pe-5">
                                      <h5 class="text-capitalize fw-bold">Đặt lịch khẩn cấp</h5>
                                      <p class="text-muted mb-2">Liên hệ ngay để được tư vấn</p>
                                      <button class="btn btn-primary px-4 py-2">
                                          <i class="fa-solid fa-calendar-plus me-2"></i>Đặt lịch ngay
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-6">
                          <div class="card bg-primary  p-2  shadow-sm">
                              <div class="card-body d-flex justify-content-between">
                                  <div class="">
                                      <i class="fa-solid fa-envelope-open-text fa-4x text-light"></i>
                                  </div>
                                  <div class="ms-4 pe-5">
                                      <h5 class="text-capitalize text-light fw-bold">Tư vấn trực tuyến</h5>
                                      <p class="text-light mb-2 ">Nhận tư vấn từ chuyên gia</p>
                                      <button class="btn btn-light px-4 py-2">
                                          <i class="fa-solid fa-comments me-2"></i>Chat ngay
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <!-- About Section -->
          <!-- Services Section -->
          <div class="row ">
              <div class="card bg-light-info">
                  <div class="card-body ">
                      <div class="row ">
                          <div class="col-lg-12 d-flex justify-content-between align-items-center my-3">
                              <div>
                                  <h3 class="text-capitalize fw-bold mb-1">Bác sĩ chuyên gia hàng đầu</h3>
                                  <p class="text-muted fs-6 mb-0">Đội ngũ bác sĩ giàu kinh nghiệm, được đào tạo chuyên sâu
                                      tại các bệnh
                                      viện uy tín</p>
                              </div>
                          </div>
                      </div>
                      <hr>
                      <div class="row ">
                          <template >
                              <div class="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex">
                                  <div class="card border-0 shadow-sm h-100 w-100 rounded-4 overflow-hidden bg-white"
                                      style="transition: transform 0.2s;">
                                      <div class="card-body p-4">
                                          <div class="text-center mb-3">
                                              <!-- <img :src="value.hinh_anh" :alt="value.ho_ten"
                                                  class="rounded-circle mb-3" -->
                                                  <!-- style="width: 120px; height: 120px; object-fit: cover;" /> -->
                                              <h5 class="fw-bold mb-1">1</h5>
                                              <div class="text-primary mb-2">
                                                <div class="fw-semibold">2</div>
                                                <div class="small">3</div>
                                              </div>
                                          </div>
                                          <div class="d-flex justify-content-center gap-4 mb-3">
                                              <div class="text-center">
                                                  <div class="fw-bold text-dark">1+</div>
                                                  <div class="text-muted small">Năm KN</div>
                                              </div>
                                              <div class="text-center">
                                                  <div class="fw-bold text-dark">2</div>
                                                  <div class="text-muted small">Nơi công tác</div>
                                              </div>
                                          </div>
                                          <p class="text-muted small mb-0">3.</p>
                                      </div>
                                      <div class="card-footer bg-white border-top pt-3">
                                          <div class="d-grid gap-2">
                                              <!-- <router-link class="btn btn-primary py-2 fw-semibold">
                                                  <i class="fa-regular fa-calendar-check me-2"></i>Đặt lịch khám
                                              </router-link>
                                              <router-link class="btn btn-outline-primary py-2">
                                                  <i class="fa-regular fa-user me-2"></i>Chi tiết
                                              </router-link> -->
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </template>
                      </div>
                  </div>
              </div>

              <hr>
              <!-- Service Cards -->

          </div>
          <div class="row">
              <div class="card">
                  <div class="card-body">
                      <div class="mt-5">
                          <div class="row">
                              <div class="col-lg-12 text-center mb-4">
                                  <h3 class="text-uppercase text-primary fw-bold">Đánh giá từ bệnh nhân </h3>
                              </div>
                          </div>
                          <div class="row">
                              <div class="col-lg-4 mb-4">
                                  <div class="card bg-light-info border-0 shadow-sm h-100">
                                      <div class="card-body p-4 d-flex flex-column">
                                          <div class="d-flex align-items-center mb-3">
                                              <!-- <img src="https://img.freepik.com/free-photo/portrait-young-smiling-woman-looking-camera_23-2147965121.jpg"
                                                  alt="Patient" class="rounded-circle me-3" width="60" height="60"> -->
                                              <div>
                                                  <h5 class="mb-0 fw-bold">Nguyễn Thị Anh</h5>
                                                  <small class="text-muted">Bệnh nhân tim mạch</small>
                                              </div>
                                          </div>
                                          <p class="text-muted">"Tôi rất hài lòng với dịch vụ khám bệnh tại đây. Bác
                                              sĩ rất tận
                                              tâm và
                                              chuyên nghiệp. Quy trình khám bệnh nhanh chóng và thuận tiện."</p>
                                          <div class="text-warning d-flex gap-2 mt-auto mb-3">
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="col-lg-4 mb-4">
                                  <div class="card bg-light-info border-0 shadow-sm h-100">
                                      <div class="card-body p-4 d-flex flex-column">
                                          <div class="d-flex align-items-center mb-3">
                                              <!-- <img src="https://img.freepik.com/free-photo/portrait-young-smiling-woman-looking-camera_23-2147965121.jpg"
                                                  alt="Patient" class="rounded-circle me-3" width="60" height="60"> -->
                                              <div>
                                                  <h5 class="mb-0 fw-bold">Nguyễn Thị Anh</h5>
                                                  <small class="text-muted">Bệnh nhân tim mạch</small>
                                              </div>
                                          </div>
                                          <p class="text-muted">"Tôi rất hài lòng với dịch vụ khám bệnh tại đây. Bác
                                              sĩ rất tận
                                              tâm và
                                              chuyên nghiệp. Quy trình khám bệnh nhanh chóng và thuận tiện."</p>
                                          <div class="text-warning d-flex gap-2 mt-auto mb-3">
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="col-lg-4 mb-4">
                                  <div class="card bg-light-info border-0 shadow-sm h-100">
                                      <div class="card-body p-4 d-flex flex-column">
                                          <div class="d-flex align-items-center mb-3">
                                              <!-- <img src="https://img.freepik.com/free-photo/portrait-young-smiling-woman-looking-camera_23-2147965121.jpg"
                                                  alt="Patient" class="rounded-circle me-3" width="60" height="60"> -->
                                              <div>
                                                  <h5 class="mb-0 fw-bold">Nguyễn Thị Anh</h5>
                                                  <small class="text-muted">Bệnh nhân tim mạch</small>
                                              </div>
                                          </div>
                                          <p class="text-muted">"Tôi rất hài lòng với dịch vụ khám bệnh tại đây. Bác
                                              sĩ rất tận
                                              tâm và
                                              chuyên nghiệp. Quy trình khám bệnh nhanh chóng và thuận tiện."</p>
                                          <div class="text-warning d-flex gap-2 mt-auto mb-3">
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                              <i class="fa-solid fa-star fa-lg"></i>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <!-- FAQ Section -->
      <div class="container mt-5">
      <div class="card">
          <div class="card-body">
                  <div class="row">
                      <div class="col-lg-12 text-center mb-4">
                          <h3 class="text-uppercase text-primary fw-bold">Câu hỏi thường gặp
                          </h3>
                          <p class="text-muted fs-6">Giải đáp thắc mắc của bạn</p>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-lg-8 mx-auto">
                          <div class="accordion" id="faqAccordion">
                              <div class="accordion-item border-0 shadow-sm mb-3">
                                  <h2 class="accordion-header" id="faq1">
                                      <button class="accordion-button collapsed" type="button"
                                          data-bs-toggle="collapse" data-bs-target="#collapse1">
                                          Làm thế nào để đặt lịch khám bệnh?
                                      </button>
                                  </h2>
                                  <div id="collapse1" class="accordion-collapse collapse"
                                      data-bs-parent="#faqAccordion">
                                      <div class="accordion-body">
                                          Bạn có thể đặt lịch khám bệnh qua nhiều cách: gọi điện thoại, đặt lịch trực
                                          tuyến
                                          trên
                                          website, hoặc đến trực tiếp phòng khám. Chúng tôi sẽ sắp xếp lịch hẹn phù
                                          hợp
                                          với
                                          thời
                                          gian của bạn.
                                      </div>
                                  </div>
                              </div>
                              <div class="accordion-item border-0 shadow-sm mb-3">
                                  <h2 class="accordion-header" id="faq2">
                                      <button class="accordion-button collapsed" type="button"
                                          data-bs-toggle="collapse" data-bs-target="#collapse2">
                                          Chi phí khám bệnh như thế nào?
                                      </button>
                                  </h2>
                                  <div id="collapse2" class="accordion-collapse collapse"
                                      data-bs-parent="#faqAccordion">
                                      <div class="accordion-body">
                                          Chi phí khám bệnh phụ thuộc vào loại dịch vụ và chuyên khoa. Chúng tôi có
                                          bảng
                                          giá
                                          công
                                          khai và minh bạch. Bạn có thể liên hệ để được tư vấn chi tiết về chi phí
                                          trước
                                          khi
                                          đặt
                                          lịch.
                                      </div>
                                  </div>
                              </div>
                              <div class="accordion-item border-0 shadow-sm mb-3">
                                  <h2 class="accordion-header" id="faq3">
                                      <button class="accordion-button collapsed" type="button"
                                          data-bs-toggle="collapse" data-bs-target="#collapse3">
                                          Có dịch vụ khám ngoài giờ không?
                                      </button>
                                  </h2>
                                  <div id="collapse3" class="accordion-collapse collapse"
                                      data-bs-parent="#faqAccordion">
                                      <div class="accordion-body">
                                          Có, chúng tôi cung cấp dịch vụ khám ngoài giờ cho các trường hợp khẩn cấp.
                                          Vui
                                          lòng
                                          liên
                                          hệ số điện thoại khẩn cấp để được hỗ trợ nhanh chóng.
                                      </div>
                                  </div>
                              </div>
                              <div class="accordion-item border-0 shadow-sm mb-3">
                                  <h2 class="accordion-header" id="faq4">
                                      <button class="accordion-button collapsed" type="button"
                                          data-bs-toggle="collapse" data-bs-target="#collapse4">
                                          Có cần mang gì khi đi khám bệnh?
                                      </button>
                                  </h2>
                                  <div id="collapse4" class="accordion-collapse collapse"
                                      data-bs-parent="#faqAccordion">
                                      <div class="accordion-body">
                                          Bạn nên mang theo CMND/CCCD, sổ khám bệnh (nếu có), các kết quả xét nghiệm
                                          gần
                                          đây,
                                          và
                                          danh sách thuốc đang sử dụng. Điều này sẽ giúp bác sĩ có thông tin đầy đủ để
                                          chẩn
                                          đoán
                                          chính xác.
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script setup>
import banner0 from '@/assets/images/banner0.jpg'
import banner1 from '@/assets/images/banner1.jpg'
import banner2 from '@/assets/images/banner2.jpg'
import banner3 from '@/assets/images/banner3.jpg'

const list_slide = [
  {
    hinh_anh: banner0
  },
  {
    hinh_anh: banner1
  },
  {
    hinh_anh: banner2
  },
  {
    hinh_anh: banner3
  }
]
// import axios from 'axios';
// export default {
//   data() {
//       return {
//           list_bac_si: [],
//           list_slide: []
//       }
//   },
//   mounted() {
//       this.loadData();
//   },
//   methods: {
//       loadData() {
//           axios
//               .get("http://127.0.0.1:8000/api/client/bac-si/data")
//               .then((res) => {
//                   this.list_bac_si = res.data.data;
//                   this.list_slide = res.data.data_slide;

//               });
//       },
//   },
// }
</script>
<style></style>
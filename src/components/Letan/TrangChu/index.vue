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
            <div class="row mb-5" style="margin-top: -50px;">
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
            <div class="row bg-white border-0 radius-10 shadow-sm mb-5">
                <div class="col-lg-6 ps-0">
                    <img src="https://img.freepik.com/free-photo/doctor-nurses-special-equipment_23-2148980723.jpg"
                        alt="Medical Team" class="img-fluid border-0 radius-10"
                        style="height: 500px; object-fit: cover;">
                </div>
                <div class="col-lg-6 py-4 px-3">
                    <h5 class="text-uppercase text-primary fw-bold my-3">
                        <i class="fa-solid fa-notes-medical fa-lg me-2"></i>Giới thiệu
                    </h5>
                    <h3 class="text-capitalize fw-bold mb-4">Chăm sóc sức khỏe toàn diện với công nghệ tiên tiến</h3>
                    <p class="fs-6 text-muted mb-4">
                        Với hơn 20 năm kinh nghiệm trong lĩnh vực y tế, chúng tôi tự hào là địa chỉ tin cậy cho việc
                        chăm
                        sóc sức khỏe của bạn và gia đình. Đội ngũ bác sĩ chuyên môn cao, trang thiết bị hiện đại và quy
                        trình khám chữa bệnh chuẩn quốc tế.
                    </p>
                    <hr class="border border-primary border-2 opacity-75 w-75 mb-4">
                    <div class="row">
                        <div class="col-lg-6">
                            <ul class="list-unstyled">
                                <li class="text-secondary mb-3 fs-6">
                                    <i class="fa-solid fa-heart-pulse text-primary me-2"></i>
                                    <strong>50+ Bác sĩ chuyên khoa</strong>
                                </li>
                                <li class="text-secondary mb-3 fs-6">
                                    <i class="fa-solid fa-microscope text-primary me-2"></i>
                                    <strong>Thiết bị y tế hiện đại</strong>
                                </li>
                                <li class="text-secondary mb-3 fs-6">
                                    <i class="fa-solid fa-certificate text-primary me-2"></i>
                                    <strong>Chứng nhận JCI</strong>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <ul class="list-unstyled">
                                <li class="text-secondary mb-3 fs-6">
                                    <i class="fa-solid fa-clock text-primary me-2"></i>
                                    <strong>Khám 24/7</strong>
                                </li>
                                <li class="text-secondary mb-3 fs-6">
                                    <i class="fa-solid fa-shield-alt text-primary me-2"></i>
                                    <strong>Bảo hiểm y tế</strong>
                                </li>
                                <li class="text-secondary mb-3 fs-6">
                                    <i class="fa-solid fa-ambulance text-primary me-2"></i>
                                    <strong>Cấp cứu khẩn cấp</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button class="btn btn-primary px-4 py-2 fw-bold">
                        <i class="fa-solid fa-arrow-right me-2"></i>Khám phá thêm
                    </button>
                </div>
            </div>

            <!-- Services Section -->
            <div class="row ">
                <div class="card bg-light-info">
                    <div class="card-body ">
                        <div class="row ">
                            <div class="col-lg-12 d-flex justify-content-between align-items-center my-3">
                                <div>
                                    <h3 class="text-capitalize fw-bold mb-1">Chuyên khoa đa dạng, chất lượng cao</h3>
                                    <p class="text-muted fs-6 mb-0">Chúng tôi cung cấp đầy đủ các dịch vụ y tế từ cơ bản
                                        đến chuyên sâu</p>
                                </div>
                                <button class="btn btn-primary">Xem thêm</button>
                            </div>
                        </div>
                        <hr>
                        <div class="row ">
                            <template >
                                <div class="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex">
                                    <div class="card border-primary border-top border-start border-3 border-0 shadow-sm h-100 w-100"
                                        style="border-radius: 18px; transition: transform 0.2s;">
                                        <div class="card-body d-flex flex-column p-4">
                                            <div class="d-flex align-items-center mb-3">
                                                <img  alt="avatar" width="100" height="100"
                                                    class="rounded-circle p-1 border border-dark me-3" />
                                                <div>
                                                    <h5 class="fw-bold mb-1">tai beu </h5>
                                                </div>
                                            </div>
                                            <div class="mb-2">
                                                <span class="badge bg-info bg-opacity-10 text-info px-3 py-2 fs-6">
                                                    <i class="fa-solid fa-heart-pulse me-1"></i> taubeu N <span class="ai-cut"></span>
                                                </span>
                                            </div>
                                            <p class="flex-grow-1 mb-3">Mô tả dịch vụ...</p>
                                            <!-- <router-link 
                                                class="btn btn-outline-primary w-100 mt-auto fw-semibold">Liên hệ tư
                                                vấn</router-link> -->
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

            <!-- Doctors Section -->
            <div class="row d-flex">
                <div class="card">
                    <div class="card-body">
                        <div class="row  product-grid">
                            <div class="col-lg-12 d-flex justify-content-between align-items-center my-3">
                                <div class="">

                                    <h3 class="text-capitalize fw-bold">Bác sĩ chuyên gia hàng đầu</h3>
                                    <p class="text-muted fs-6">Đội ngũ bác sĩ giàu kinh nghiệm, được đào tạo chuyên sâu
                                        tại các bệnh
                                        viện uy tín</p>
                                </div>
                                <button class="btn btn-primary">Xem thêm</button>
                            </div>
                            <template >
                                <div class="col-lg-4 col-md-6 mb-2 flex-fill">
                                    <div class="card   border-primary border-top border-start  border-end border-bottom border-3 border-0"
                                        style="border-radius: 16px; ">
                                        <div class="d-flex flex-column align-items-center p-3">
                                            <img  alt="avatar" width="150" height="150"
                                                class="rounded-circle p-1 border border-dark" />
                                        </div>
                                        <div class="bg-light-info px-3 py-2">
                                            <div>
                                                <span class="fw-semibold text-muted">Chuyên khoa : </span>
                                                <span class="fw-bold text-info">Tai Mũi Họng</span>
                                            </div>
                                            <div>
                                                <span class="fw-semibold"> 5 năm kinh
                                                    nghiệm</span>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <h5><i class="fa-solid fa-user-doctor"></i> TRUONG PHONG MAI DAM  <b>
                                                tAI DIEN
                                                    </b></h5>
                                            <hr>
                                            <b><i class="fa-solid fa-people-group"></i> HELLO</b>
                                            <hr>
                                            <b><i class="fa-solid fa-certificate"></i> <span>VIET NAM </span></b>
                                            <button class="btn bg-gradient-scooter w-100 mt-3 text-light">Đặt khám
                                                ngay</button>
                                        </div>

                                    </div>
                                </div>
                            </template>

                        </div>
                    </div>
                </div>





            </div>
            <!-- Appointment & Contact Section -->
            <div class="row">
                <div class="card bg-light-info">
                    <div class="card-body">
                        <div class="row mt-5 product-grid">
                            <div class="col-lg-12 text-center mb-4 ">
                                <h3 class="text-uppercase fw-bold mt-3">Đặt lịch khám bệnh</h3>
                            </div>
                            <div class="col-md-4 mb-4">
                                <div class="card p-4 rounded-4  h-100">
                                    <h4 class="fw-bold mb-3 ">
                                        <i class="fa-solid fa-clock me-3"></i>Giờ làm việc
                                    </h4>
                                    <p class="mb-4">Chúng tôi phục vụ bệnh nhân với thời gian linh hoạt</p>
                                    <div class="border-top border-white-50 py-3">
                                        <span class="fw-semibold">Thứ 2 - Thứ 6:</span>
                                        <span class="float-end">7:30 - 18:00</span>
                                    </div>
                                    <div class="border-top border-white-50 py-3">
                                        <span class="fw-semibold">Thứ 7:</span>
                                        <span class="float-end">7:30 - 17:00</span>
                                    </div>
                                    <div class="border-top border-white-50 py-3">
                                        <span class="fw-semibold">Chủ nhật:</span>
                                        <span class="float-end text-primary fw-semibold">8:00 - 12:00</span>
                                    </div>
                                    <div class="border-top border-white-50 py-3">
                                        <span class="fw-semibold">Cấp cứu:</span>
                                        <span class="float-end text-primary fw-semibold">24/7</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <div class="bg-white p-4 rounded-4 shadow-sm h-100">
                                    <h4 class="fw-bold mb-4">
                                        <i class="fa-solid fa-calendar-plus me-3 text-primary"></i>Đặt lịch khám
                                    </h4>
                                    <div class="mb-3">
                                        <select class="form-select bg-light border-0">
                                            <option value="">Chọn chuyên khoa</option>
                                            <option >
                                                Tam than
                                            </option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <select class="form-select bg-light border-0">
                                            <option value="">Chọn bác sĩ</option>
                                            <option >
                                                TRUONG PHONG MAI DAM
                                            </option>
                                        </select>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-12">
                                            <input type="text" class="form-control bg-light border-0"
                                                
                                                placeholder="Đơn giá khám" readonly>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-12">
                                            <select class="form-select bg-light border-0"
                                                >
                                                <option value="">Chọn ngày</option>
                                                <option>2023-10-15</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-12">
                                            <select class="form-select bg-light border-0 mt-2"
                                                
                                                >
                                                <option value="">Chọn thời gian bắt đầu</option>
                                                <option >
                                                    22/12 - 08:00 - 09:00
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <textarea class="form-control bg-light border-0" rows="2"
                                           placeholder="Lý do khám"></textarea>
                                    </div>
                                    <button class="btn btn-primary w-100 fw-bold py-3" >
                                        <i class="fa-solid fa-calendar-check me-2"></i>ĐẶT LỊCH NGAY
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <img src="https://img.freepik.com/free-photo/group-doctors-standing-together_23-2148980721.jpg"
                                    class="img-fluid rounded-4 shadow-sm" alt="Medical Team"
                                    style="height: 450px; object-fit: cover;">
                            </div>
                        </div>

                    </div>
                </div>
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
                                                <img src="https://img.freepik.com/free-photo/portrait-young-smiling-woman-looking-camera_23-2147965121.jpg"
                                                    alt="Patient" class="rounded-circle me-3" width="60" height="60">
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
                                                <img src="https://img.freepik.com/free-photo/portrait-young-smiling-woman-looking-camera_23-2147965121.jpg"
                                                    alt="Patient" class="rounded-circle me-3" width="60" height="60">
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
                                                <img src="https://img.freepik.com/free-photo/portrait-young-smiling-woman-looking-camera_23-2147965121.jpg"
                                                    alt="Patient" class="rounded-circle me-3" width="60" height="60">
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
//     // data() {
//     //     return {
//             // list: [],
//             // list_chuyen_khoa: [],
//             // list_chuyen_khoa_client: [],
//             // list_slide: [],
//             // list_bac_si_by_chuyen_khoa: [],
//             // dangKyLichKhamForm: {
//             //     id_chuyen_khoa: '',
//             //     id_bac_si: '',
//             //     ngay_dat_hen: '',
//             //     thoi_gian_bat_dau: '',
//             //     thoi_gian_ket_thuc: '',
//             //     ly_do_kham: ''
//             // },
//             // availableDates: [],
//             // availableTimes: [],

//     //     }
//     // },
//     // mounted() {
//     //     this.loadData();
//     //     this.loadChuyenKhoa();
//     // },
//     // methods: {
//     //     loadChuyenKhoa() {
//     //         axios
//     //             .get("http://127.0.0.1:8000/api/client/chuyen-khoa/data")
//     //             .then((res) => {
//     //                 this.list_chuyen_khoa_client = res.data.data;
//     //             }).catch((err) => {
//     //                 const listErr = err.response.data.errors;
//     //                 Object.values(listErr).forEach((error) => {
//     //                     this.$toast.error(error[0]);
//     //                 });
//     //             });
//     //     },
//         // loadData() {
//         //     axios
//         //         .get("http://127.0.0.1:8000/api/home-page/data")
//         //         .then((res) => {
//         //             this.list = res.data.data.slice(0, 6);
//         //             this.list_chuyen_khoa = res.data.data_chuyen_khoa.slice(0, 4);
//         //             this.list_slide = res.data.data_slide;
//         //         });
//         // },
//     //     loadBSTheoChuyenKhoa() {
//     //         const today = new Date();
//     //         const to = new Date(today);
//     //         to.setDate(today.getDate() + 14);

//     //         const payload = {
//     //             id_chuyen_khoa: this.dangKyLichKhamForm.id_chuyen_khoa,
//     //             from_date: today.toISOString().split('T')[0],
//     //             to_date: to.toISOString().split('T')[0],
//     //         };

//     //         axios.post("http://127.0.0.1:8000/api/benh-nhan/bac-si/by-chuyen-khoa", payload, {
//     //             headers: {
//     //                 Authorization: "Bearer " + localStorage.getItem("token_benh_nhan")
//     //             }
//     //         }
//     //         ).then(res => {
//     //             if(res.data.status) {
//     //                 this.list_bac_si_by_chuyen_khoa = res.data.data;
//     //             } else {
//     //                 this.$toast.error(res.data.message);
//     //             }
//     //         }).catch((err) => {
//     //             const listErr = err.response.data.errors;
//     //             Object.values(listErr).forEach((error) => {
//     //                 this.$toast.error(error[0]);
//     //             });
//     //         });
//     //     },
//     //     DangKyLichKham() {
//     //         axios
//     //             .post("http://127.0.0.1:8000/api/benh-nhan/dat-lich-kham", this.dangKyLichKhamForm, {
//     //                 headers: {
//     //                     Authorization: "Bearer " + localStorage.getItem("token_benh_nhan"),
//     //                 }
//     //             })
//     //             .then((res) => {
//     //                 if(res.data.status) {
//     //                     this.$toast.success(res.data.message);
//     //                     this.dangKyLichKhamForm = {
//     //                     };
//     //                     this.$router.push('/lich-hen-cua-toi');
//     //                 } else {
//     //                     this.$toast.error(res.data.message);
//     //                 }
//     //             })
//     //             .catch((err) => {
//     //                 if (err.response && err.response.data) {
//     //                     if (err.response.data.message) {
//     //                         this.$toast.error(err.response.data.message);
//     //                     } else if (err.response.data.errors) {
//     //                         const listErr = err.response.data.errors;
//     //                         Object.values(listErr).forEach((error) => {
//     //                             this.$toast.error(error[0]);
//     //                         });
//     //                     }
//     //                 } else {
//     //                     this.$toast.error('Có lỗi xảy ra, vui lòng thử lại');
//     //                 }
//     //             });
//     //     },  
//     //      onDoctorChange() {
//     //         this.availableDates = [];
//     //         this.availableTimes = [];
//     //         this.dangKyLichKhamForm.ngay_dat_hen = '';
//     //         this.dangKyLichKhamForm.thoi_gian_bat_dau = '';
//     //         this.dangKyLichKhamForm.thoi_gian_ket_thuc = '';

//     //         const bs = this.list_bac_si_by_chuyen_khoa.find(b => b.id === this.dangKyLichKhamForm.id_bac_si);
//     //          if (!bs) return;
//     //          const lich = Array.isArray(bs.lich_lam_viec) ? bs.lich_lam_viec : (Array.isArray(bs.lich_con_trong) ? bs.lich_con_trong : []);
//     //          if (!Array.isArray(lich) || lich.length === 0) return;
//     //          const uniqueDates = [...new Set(lich.map(x => x.ngay_lam_viec))].sort();
//     //         this.availableDates = uniqueDates;
//     //         if (uniqueDates.length > 0) {
//     //             this.dangKyLichKhamForm.ngay_dat_hen = uniqueDates[0];
//     //             this.onDateChange();
//     //         }
//     //     },
//     //      onDateChange() {
//     //          const bs = this.list_bac_si_by_chuyen_khoa.find(b => b.id === this.dangKyLichKhamForm.id_bac_si);
//     //          if (!bs) return;
//     //          const lich = Array.isArray(bs.lich_lam_viec) ? bs.lich_lam_viec : (Array.isArray(bs.lich_con_trong) ? bs.lich_con_trong : []);
//     //          const slots = lich.filter(x => x.ngay_lam_viec === this.dangKyLichKhamForm.ngay_dat_hen);

//     //         this.availableTimes = slots.sort((a, b) => a.thoi_gian_bat_dau.localeCompare(b.thoi_gian_bat_dau));

//     //         this.dangKyLichKhamForm.thoi_gian_bat_dau = '';
//     //         this.dangKyLichKhamForm.thoi_gian_ket_thuc = '';
//     //         if (this.availableTimes.length > 0) {
//     //             this.dangKyLichKhamForm.thoi_gian_bat_dau = this.availableTimes[0].thoi_gian_bat_dau;
//     //             this.dangKyLichKhamForm.thoi_gian_ket_thuc = this.availableTimes[0].thoi_gian_ket_thuc;
//     //         }
//     //     },
//     //     onTimeStartChange() {
//     //         const sel = this.availableTimes.find(t => t.thoi_gian_bat_dau === this.dangKyLichKhamForm.thoi_gian_bat_dau);
//     //         this.dangKyLichKhamForm.thoi_gian_ket_thuc = sel ? sel.thoi_gian_ket_thuc : '';
//     //     },
//     // },
// }

</script>
<style></style>
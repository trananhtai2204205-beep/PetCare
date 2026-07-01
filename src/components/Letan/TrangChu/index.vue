<template>
    <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
            <template v-for="(value, index) in list_slide" :key="index">
                <div class="carousel-item" :class="{ 'active': index === 0 }">
                    <img :src="value.hinh_anh" class="d-block w-100 " alt="..."
                        style="height: 485px; object-fit: cover;">
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
                                        <h5 class="text-capitalize fw-bold">Đặt Lịch Khẩn Cấp</h5>
                                        <p class="text-muted mb-2">Đặt lịch ưu tiên để thú cưng được chăm sóc kịp thời
                                        </p>
                                        <button class="btn btn-danger px-4 py-2" @click="datLichKhanCap">
                                            <i class="fa-solid fa-bolt me-2"></i>
                                            Đặt Lịch Khẩn Cấp
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
                                        <h5 class="text-capitalize text-light fw-bold">Lịch Hẹn Thú Cưng</h5>
                                        <p class="text-light mb-2">Theo dõi các lịch khám và dịch vụ đã đặt</p>
                                        <button class="btn btn-light px-4 py-2" @click="xemLichSu">
                                            <i class="fa-solid fa-calendar-days me-2"></i>
                                            Xem lịch sử đặt lịch
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
                    <h3 class="text-capitalize fw-bold mb-4">Chăm sóc thú cưng toàn diện với hệ thống quản lý PetCare
                        hiện
                        đại</h3>
                    <p class="fs-6 text-muted mb-4">
                        PetCare là nền tảng hỗ trợ quản lý phòng khám và dịch vụ chăm sóc thú cưng một cách chuyên
                        nghiệp,
                        giúp kết nối chủ nuôi với đội ngũ bác sĩ thú y. Hệ thống cung cấp đầy đủ các chức năng như đặt
                        lịch
                        khám trực tuyến, quản lý hồ sơ thú cưng, theo dõi lịch sử khám chữa bệnh và quản lý dịch vụ
                        nhanh
                        chóng, mang đến trải nghiệm thuận tiện và hiệu quả.
                    </p>
                    <hr class="border border-primary border-2 opacity-75 w-75 mb-4">
                    <div class="row">
                        <div class="col-lg-6">
                            <ul class="list-unstyled">
                                <li class="text-secondary mb-3 fs-6">
                                    <i class="fa-solid fa-heart-pulse text-primary me-2"></i>
                                    <strong>Đội ngũ bác sĩ thú y chuyên nghiệp</strong>
                                </li>
                                <li class="text-secondary mb-3 fs-6">
                                    <i class="fa-solid fa-microscope text-primary me-2"></i>
                                    <strong>Đặt lịch khám nhanh chóng</strong>
                                </li>
                                <li class="text-secondary mb-3 fs-6">
                                    <i class="fa-solid fa-certificate text-primary me-2"></i>
                                    <strong>Theo dõi lịch sử khám chữa bệnh</strong>
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
                                    <strong>Quản lý dịch vụ chăm sóc</strong>
                                </li>
                                <li class="text-secondary mb-3 fs-6">
                                    <i class="fa-solid fa-ambulance text-primary me-2"></i>
                                    <strong>Cấp cứu khẩn cấp</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Services Section -->
            <div class="row ">
                <div class="card bg-light-info">
                    <div class="card-body ">
                        <div class="row ">
                            <div class="col-lg-12 d-flex justify-content-between align-items-center my-3">
                                <div>
                                    <h3 class="text-capitalize fw-bold mb-1">Dịch vụ đa dạng, chăm sóc toàn diện</h3>
                                    <p class="text-muted fs-6 mb-0">Chúng tôi cung cấp đầy đủ các dịch vụ chăm sóc thú
                                        cưng
                                        từ khám sức khỏe, tiêm phòng, điều trị, spa đến tư vấn dinh dưỡng, đáp ứng mọi
                                        nhu
                                        cầu của thú cưng trong từng giai đoạn phát triển.</p>
                                </div>
                                <button class="btn btn-primary">Xem thêm</button>
                            </div>
                        </div>
                        <hr>
                        <div class="row ">
                            <template>
                                <div class="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex">
                                    <div class="card border-primary border-top border-start border-3 border-0 shadow-sm h-100 w-100"
                                        style="border-radius: 18px; transition: transform 0.2s;">
                                        <div class="card-body d-flex flex-column p-4">
                                            <div class="d-flex align-items-center mb-3">
                                                <img alt="avatar" width="100" height="100"
                                                    class="rounded-circle p-1 border border-dark me-3" />
                                                <div>
                                                    <h5 class="fw-bold mb-1">tai beu </h5>
                                                </div>
                                            </div>
                                            <div class="mb-2">
                                                <span class="badge bg-info bg-opacity-10 text-info px-3 py-2 fs-6">
                                                    <i class="fa-solid fa-heart-pulse me-1"></i> taubeu N <span
                                                        class="ai-cut"></span>
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

                                    <h3 class="text-capitalize fw-bold">Đội ngũ bác sĩ thú y giàu kinh nghiệm</h3>
                                    <p class="text-muted fs-6">Đội ngũ bác sĩ thú y và nhân viên chăm sóc được đào tạo
                                        chuyên môn, tận tâm và giàu kinh nghiệm, luôn sẵn sàng mang đến dịch vụ chất
                                        lượng
                                        cao và giải pháp chăm sóc sức khỏe tốt nhất cho thú cưng của bạn.</p>
                                </div>
                                <button class="btn btn-primary">Xem thêm</button>
                            </div>
                            <template>
                                <div class="col-lg-4 col-md-6 mb-2 flex-fill">
                                    <div class="card   border-primary border-top border-start  border-end border-bottom border-3 border-0"
                                        style="border-radius: 16px; ">
                                        <div class="d-flex flex-column align-items-center p-3">
                                            <img alt="avatar" width="150" height="150"
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
                                            <h5><i class="fa-solid fa-user-doctor"></i> TRUONG PHONG MAI DAM <b>
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
                                <h3 class="text-uppercase fw-bold mt-3">Đặt lịch chăm sóc thú cưng</h3>
                            </div>
                            <div class="col-md-4 mb-4">
                                <div class="card p-4 rounded-4  h-100">
                                    <h4 class="fw-bold mb-3 ">
                                        <i class="fa-solid fa-clock me-3"></i>Giờ làm việc
                                    </h4>
                                    <p class="mb-4">Chúng tôi luôn sẵn sàng phục vụ và chăm sóc thú cưng với thời gian
                                        linh
                                        hoạt, giúp khách hàng dễ dàng đặt lịch theo nhu cầu.</p>
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
                                        <span class="float-end ">8:00 - 12:00</span>
                                    </div>
                                    <div class="border-top border-white-50 py-3">
                                        <span class="fw-semibold">Cấp cứu khẩn cấp:</span>
                                        <span class="float-end text-primary fw-semibold">24/7</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <div class="bg-white p-4 rounded-4 shadow-sm h-100">
                                    <h4 class="fw-bold mb-4">
                                        <i class="fa-solid fa-calendar-plus me-3 text-primary"></i>Đặt lịch chăm sóc thú
                                        cưng
                                    </h4>
                                    <div class="mb-3">
                                        <select class="form-select bg-light border-0">
                                            <option value="">Chọn dịch vụ</option>
                                            <option>Khám tổng quát</option>
                                            <option>Tư vấn & Điều trị</option>
                                            <option>Xét nghiệm máu</option>
                                            <option>Xét nghiệm ký sinh trùng máu</option>
                                            <option>Siêu âm</option>
                                            <option>Kháng sinh đồ</option>
                                            <option>Chẩn đoán hình ảnh (X-Quang)</option>
                                            <option>Phẫu thuật</option>
                                            <option>Tiêm ngừa</option>
                                            <option>Spa & Grooming</option>
                                            <option>Tắm & Cắt tỉa lông</option>
                                            <option>Pet Shop</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <select class="form-select bg-light border-0">
                                            <option value="">Chọn bác sĩ thú y</option>
                                            <option>
                                                BS. Nguyễn Văn A
                                            </option>
                                        </select>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-12">
                                            <input type="text" class="form-control bg-light border-0"
                                                placeholder="Chi phí dịch vụ" readonly>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-12">
                                            <select class="form-select bg-light border-0">
                                                <option value="">Chọn ngày hẹn</option>
                                                <option>2023-10-15</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-12">
                                            <select class="form-select bg-light border-0 mt-2">
                                                <option value="">Chọn khung giờ</option>
                                                <option>
                                                    22/12 - 08:00 - 09:00
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <textarea class="form-control bg-light border-0" rows="2"
                                            placeholder="Mô tả tình trạng thú cưng hoặc ghi chú"></textarea>
                                    </div>
                                    <button class="btn btn-primary w-100 fw-bold py-3">
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
                                    <h3 class="text-uppercase text-primary fw-bold">Đánh giá từ khách hàng</h3>
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
                                                    <h5 class="mb-0 fw-bold">Nguyễn Văn Minh</h5>
                                                    <small class="text-muted">Chủ nuôi chó Golden Retriever</small>
                                                </div>
                                            </div>
                                            <p class="text-muted">"Tôi rất hài lòng với dịch vụ tại PetCare. Bác sĩ tư vấn tận tình, quy trình đặt lịch nhanh chóng và thú cưng của tôi được chăm sóc rất chu đáo."</p>
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
                                                    <small class="text-muted">Chủ nuôi mèo Anh Lông Ngắn</small>
                                                </div>
                                            </div>
                                            <p class="text-muted">"Đội ngũ bác sĩ rất thân thiện và chuyên nghiệp. Hồ sơ khám bệnh của thú cưng được lưu trữ đầy đủ, giúp tôi dễ dàng theo dõi sức khỏe của bé."</p>
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
                                                    <h5 class="mb-0 fw-bold">Lê Hoàng Nam</h5>
                                                    <small class="text-muted">Chủ nuôi chó Poodle</small>
                                                </div>
                                            </div>
                                            <p class="text-muted">"Dịch vụ tiêm phòng và spa rất chất lượng. Nhân viên nhiệt tình, môi trường sạch sẽ và tôi sẽ tiếp tục sử dụng dịch vụ của PetCare trong thời gian tới."</p>
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
                            <p class="text-muted fs-6">Những câu hỏi phổ biến khi sử dụng dịch vụ tại PetCare</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="accordion" id="faqAccordion">
                                <div class="accordion-item border-0 shadow-sm mb-3">
                                    <h2 class="accordion-header" id="faq1">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapse1">
                                            1. Làm thế nào để đặt lịch cho thú cưng?
                                        </button>
                                    </h2>
                                    <div id="collapse1" class="accordion-collapse collapse"
                                        data-bs-parent="#faqAccordion">
                                        <div class="accordion-body">
                                            Bạn có thể đặt lịch trực tiếp trên website bằng cách chọn dịch vụ, bác sĩ thú y, ngày và khung giờ mong muốn. Sau khi xác nhận, hệ thống sẽ lưu lịch hẹn và gửi thông tin đến bạn.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item border-0 shadow-sm mb-3">
                                    <h2 class="accordion-header" id="faq2">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapse2">
                                            2. PetCare cung cấp những dịch vụ nào?
                                        </button>
                                    </h2>
                                    <div id="collapse2" class="accordion-collapse collapse"
                                        data-bs-parent="#faqAccordion">
                                        <div class="accordion-body">
                                            PetCare cung cấp nhiều dịch vụ như khám tổng quát, tư vấn và điều trị, xét nghiệm máu, xét nghiệm ký sinh trùng máu, siêu âm, tiêm ngừa, phẫu thuật, chăm sóc thú cưng và các sản phẩm từ Pet Shop.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item border-0 shadow-sm mb-3">
                                    <h2 class="accordion-header" id="faq3">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapse3">
                                            3. Làm sao để theo dõi lịch sử khám của thú cưng?
                                        </button>
                                    </h2>
                                    <div id="collapse3" class="accordion-collapse collapse"
                                        data-bs-parent="#faqAccordion">
                                        <div class="accordion-body">
                                            Sau khi đăng nhập, bạn có thể xem toàn bộ lịch sử khám, kết quả xét nghiệm, lịch tiêm phòng và các dịch vụ đã sử dụng trong hồ sơ của thú cưng.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item border-0 shadow-sm mb-3">
                                    <h2 class="accordion-header" id="faq4">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapse4">
                                            4. Cần chuẩn bị gì khi đưa thú cưng đến phòng khám?
                                        </button>
                                    </h2>
                                    <div id="collapse4" class="accordion-collapse collapse"
                                        data-bs-parent="#faqAccordion">
                                        <div class="accordion-body">
                                            Bạn nên mang theo sổ tiêm phòng hoặc hồ sơ khám trước đó (nếu có), đồng thời cung cấp thông tin về tình trạng sức khỏe, chế độ ăn uống và các biểu hiện bất thường của thú cưng để bác sĩ đánh giá chính xác hơn.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item border-0 shadow-sm mb-3">
                                    <h2 class="accordion-header" id="faq5">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapse5">
                                            5. Tôi có thể hủy hoặc thay đổi lịch hẹn không?
                                        </button>
                                    </h2>
                                    <div id="collapse5" class="accordion-collapse collapse"
                                        data-bs-parent="#faqAccordion">
                                        <div class="accordion-body">
                                            Có. Bạn có thể thay đổi hoặc hủy lịch hẹn trước thời gian khám thông qua tài khoản cá nhân hoặc liên hệ trực tiếp với PetCare để được hỗ trợ nhanh chóng.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item border-0 shadow-sm mb-3">
                                    <h2 class="accordion-header" id="faq6">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapse6">
                                            6. PetCare có hỗ trợ cấp cứu cho thú cưng không?
                                        </button>
                                    </h2>
                                    <div id="collapse6" class="accordion-collapse collapse"
                                        data-bs-parent="#faqAccordion">
                                        <div class="accordion-body">
                                            Có. PetCare luôn sẵn sàng tiếp nhận các trường hợp khẩn cấp trong giờ làm việc và hỗ trợ tư vấn nhanh qua hotline để đảm bảo thú cưng được chăm sóc kịp thời.
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
import bia1 from '@/assets/images/bia1.png'
import bia2 from '@/assets/images/bia2.png'
import bia3 from '@/assets/images/bia3.png'
import bia4 from '@/assets/images/bia4.jpg'
import { useRouter } from 'vue-router'
const router = useRouter()

const datLichKhanCap = () => {
    router.push('/dat-kham')

}
const xemLichSu = () => {
    router.push('/lich-hen')
}

const list_slide = [
    {
        hinh_anh: bia1
    },
    {
        hinh_anh: bia2
    },
    {
        hinh_anh: bia3
    },
    {
        hinh_anh: bia4
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
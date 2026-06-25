<template>
    <div class="row p-4">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="container">
                        <!-- Progress Steps -->
                        <div class="row">
                            <div class="col-12 mb-4">
                                <div class="position-relative m-4 ">
                                    <div class="progress" style="height: 4px;">
                                        <div class="progress-bar bg-primary" role="progressbar"
                                            ></div>
                                    </div>
                                    <div >
                                        <i ></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="card border-0 shadow-sm">
                                    <div class="card-body p-4">
                                        <!-- Step 1: Choose Department & Doctor -->
                                        <div v-show="currentStep === 1">
                                            <h4 class="fw-bold mb-4">
                                                <i class="fa-solid fa-stethoscope text-primary me-2"></i>
                                                Bước 1: Chọn chuyên khoa và bác sĩ
                                            </h4>

                                            <div class="mb-4">
                                                <label class="form-label fw-semibold">
                                                    Chọn chuyên khoa <span class="text-danger">*</span>
                                                </label>
                                                <select class="form-select form-select-lg"
                                                    >
                                                    <option value="">-- Chọn chuyên khoa --</option>
                                                    <option >
                                                        3
                                                    </option>
                                                </select>
                                            </div>

                                            <div class="mb-4" >
                                                <label class="form-label fw-semibold">
                                                    Chọn bác sĩ <span class="text-danger">*</span>
                                                </label>
                                                <div class="row">
                                                    <div class="col-md-6 mb-3" >
                                                        <div class="card h-100 shadow-sm"
                                                            
                                                            style="cursor: pointer; transition: all 0.2s;">
                                                            <div class="card-body p-3">
                                                                <div class="d-flex align-items-center">
                                                                    <div class="flex-shrink-0">
                                                                        <div img-src="doctor.avatar"
                                                                            class="rounded-circle bg-light d-flex align-items-center justify-content-center"
                                                                            style="width: 60px; height: 60px;">
                                                                            <i
                                                                                class="fas fa-user-md text-primary fs-4"></i>
                                                                        </div>
                                                                    </div>
                                                                    <div class="ms-3">
                                                                        <h6 class="fw-bold mb-1">1</h6>
                                                                        <p class="text-muted small mb-1">2</p>
                                                                        <small class="text-success">
                                                                            <i class="fas fa-star me-1"></i>3/5
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                                <div class="mt-2" >
                                                                    <small class="text-primary">
                                                                        <i class="fas fa-check-circle me-1"></i>Đã chọn
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Step 2: Choose Date & Time -->
                                        <div v-show="currentStep === 2">
                                            <h4 class="fw-bold mb-4">
                                                <i class="fas fa-calendar-alt text-primary me-2"></i>
                                                Bước 2: Chọn ngày và giờ khám
                                            </h4>

                                            <div class="row">
                                                <div class="col-md-6 mb-4">
                                                    <label class="form-label fw-semibold">
                                                        Chọn ngày khám <span class="text-danger">*</span>
                                                    </label>
                                                    <input type="date" class="form-control form-control-lg"
                                                        >
                                                </div>

                                                <div class="col-md-6 mb-4">
                                                    <label class="form-label fw-semibold">
                                                        Chọn giờ khám <span class="text-danger">*</span>
                                                    </label>
                                                    <div class="d-flex flex-wrap gap-2 mt-2">
                                                        <button >
                                                            2
                                                            <small class="d-block" >
                                                                (Đã đầy)
                                                            </small>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="alert alert-info" >
                                                <i class="fas fa-info-circle me-2"></i>
                                                <strong>Bác sĩ đã chọn:</strong> 1
                                            </div>
                                        </div>

                                        <!-- Step 3: Patient Information -->
                                        <div v-show="currentStep === 3">
                                            <h4 class="fw-bold mb-4">
                                                <i class="fas fa-clipboard-list text-primary me-2"></i>
                                                Bước 3: Thông tin bệnh nhân
                                            </h4>

                                            <div class="row">
                                                <div class="col-md-6 mb-3">
                                                    <label class="form-label fw-semibold">
                                                        Họ và tên <span class="text-danger">*</span>
                                                    </label>
                                                    <input type="text" class="form-control"
                                                       
                                                        placeholder="Nhập họ và tên đầy đủ">
                                                </div>

                                                <div class="col-md-6 mb-3">
                                                    <label class="form-label fw-semibold">
                                                        Số điện thoại <span class="text-danger">*</span>
                                                    </label>
                                                    <input type="tel" class="form-control" 
                                                        placeholder="0987654321">
                                                </div>

                                                <div class="col-md-6 mb-3">
                                                    <label class="form-label fw-semibold">Email</label>
                                                    <input type="email" class="form-control" 
                                                        placeholder="email@example.com">
                                                </div>

                                                <div class="col-md-6 mb-3">
                                                    <label class="form-label fw-semibold">Ngày sinh</label>
                                                    <input type="date" class="form-control" >
                                                </div>

                                                <div class="col-12 mb-3">
                                                    <label class="form-label fw-semibold">Địa chỉ</label>
                                                    <input type="text" class="form-control" 
                                                        placeholder="Nhập địa chỉ đầy đủ">
                                                </div>

                                                <div class="col-12 mb-3">
                                                    <label class="form-label fw-semibold">
                                                        Lý do khám <span class="text-danger">*</span>
                                                    </label>
                                                    <textarea class="form-control" rows="4" 
                                                        placeholder="Mô tả chi tiết triệu chứng và lý do khám bệnh"></textarea>
                                                </div>

                                                <div class="col-12 mb-3">
                                                    <label class="form-label fw-semibold">Số thẻ bảo hiểm y tế</label>
                                                    <input type="text" class="form-control"
                                                       
                                                        placeholder="Nhập số thẻ BHYT (nếu có)">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Step 4: Confirmation -->
                                        <div v-show="currentStep === 4">
                                            <h4 class="fw-bold mb-4">
                                                <i class="fas fa-check-circle text-primary me-2"></i>
                                                Bước 4: Xác nhận thông tin
                                            </h4>
                                            <div class="card bg-light mb-4">
                                                <div class="card-header bg-primary text-white">
                                                    <h5 class="mb-0 text-white">
                                                        <i class="fas fa-calendar-check me-2"></i>
                                                        Thông tin lịch khám
                                                    </h5>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Chuyên khoa:</strong>
                                                            <div class="text-primary">2
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Bác sĩ:</strong>
                                                            <div class="text-primary">3</div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Ngày khám:</strong>
                                                            <div class="text-primary">2
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Giờ khám:</strong>
                                                            <div class="text-primary">1</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Patient Info -->
                                            <div class="card bg-light">
                                                <div class="card-header bg-info text-white">
                                                    <h5 class="mb-0 text-white">
                                                        <i class="fas fa-user me-2"></i>
                                                        Thông tin bệnh nhân
                                                    </h5>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Họ và tên:</strong>
                                                            <div>2</div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Số điện thoại:</strong>
                                                            <div>3</div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Email:</strong>
                                                            <div>2</div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Ngày sinh:</strong>
                                                            <div>1</div>
                                                        </div>
                                                        <div class="col-12 mb-2">
                                                            <strong>Địa chỉ:</strong>
                                                            <div>1</div>
                                                        </div>
                                                        <div class="col-12 mb-2">
                                                            <strong>Lý do khám:</strong>
                                                            <div class="text-break">2</div>
                                                        </div>
                                                        <div class="col-12">
                                                            <strong>Số BHYT:</strong>
                                                            <div>3</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <!-- Navigation Buttons -->
                                        <div class="d-flex justify-content-between mt-4">
                                            <button type="button" class="btn btn-outline-secondary" @click="prevStep"
                                                >
                                                <i class="fas fa-arrow-left me-2"></i>Quay lại
                                            </button>

                                            <button type="button" class="btn btn-primary ms-auto" @click="nextStep"
                                                >
                                                Tiếp tục<i class="fas fa-arrow-right ms-2"></i>
                                            </button>

                                            <button type="button" class="btn btn-success ms-auto" @click="submitBooking"
                                                >
                                                <i class="fas fa-check me-2"></i>
                                                <span >Đang xử lý...</span>
                                                <span >Xác nhận đặt lịch</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <!-- Hướng dẫn đặt lịch -->
                                <div class="card border-0 shadow-sm mb-4">
                                    <div class="card-body p-4">
                                        <h5 class="fw-bold mb-4 border-bottom pb-2 d-flex align-items-center gap-2">
                                            <span
                                                class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10"
                                                style="width: 38px; height: 38px;">
                                                <i class="fa-solid fa-thumbtack text-white fs-4"></i>
                                            </span>
                                            <span class="ms-1">Hướng dẫn đặt lịch</span>
                                        </h5>
                                        <ul class="list-group list-group-flush">
                                            <li
                                                class="list-group-item border-0 px-0 py-3 bg-transparent d-flex align-items-start">
                                                <div class="me-3 mt-1">
                                                    <span
                                                        class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10"
                                                        style="width: 40px; height: 40px;">
                                                        <i class="fa-solid fa-user-doctor text-white fs-4"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <div class="fw-semibold">Bước 1: Chọn chuyên khoa và bác sĩ</div>
                                                    <div class="text-muted small">Chọn chuyên khoa phù hợp với nhu cầu
                                                        khám và bác sĩ
                                                        mong muốn</div>
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item border-0 px-0 py-3 bg-transparent d-flex align-items-start">
                                                <div class="me-3 mt-1">
                                                    <span
                                                        class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10"
                                                        style="width: 40px; height: 40px;">
                                                        <i class="fa-solid fa-calendar-days text-white fs-4"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <div class="fw-semibold">Bước 2: Chọn thời gian</div>
                                                    <div class="text-muted small">Chọn ngày và giờ khám phù hợp với lịch
                                                        của bạn</div>
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item border-0 px-0 py-3 bg-transparent d-flex align-items-start">
                                                <div class="me-3 mt-1">
                                                    <span
                                                        class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10"
                                                        style="width: 40px; height: 40px;">
                                                        <i class="fa-solid fa-clipboard-list text-white fs-4"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <div class="fw-semibold">Bước 3: Điền thông tin</div>
                                                    <div class="text-muted small">Cung cấp thông tin cá nhân và lý do
                                                        khám</div>
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item border-0 px-0 py-3 bg-transparent d-flex align-items-start">
                                                <div class="me-3 mt-1">
                                                    <span
                                                        class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10"
                                                        style="width: 40px; height: 40px;">
                                                        <i class="fa-solid fa-circle-check text-white fs-4"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <div class="fw-semibold">Bước 4: Xác nhận</div>
                                                    <div class="text-muted small">Kiểm tra và xác nhận thông tin đặt
                                                        lịch</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                                <!-- Lưu ý quan trọng -->
                                <div class="card border-0 shadow-sm">
                                    <div class="card-body p-4">
                                        <h5 class="fw-bold mb-4 border-bottom pb-2 d-flex align-items-center gap-2">
                                            <span
                                                class="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-10"
                                                style="width: 38px; height: 38px;">
                                                <i class="fa-solid fa-triangle-exclamation text-warning fs-4"></i>
                                            </span>
                                            <span class="ms-1">Lưu ý quan trọng</span>
                                        </h5>
                                        <ul class="list-group list-group-flush">
                                            <li
                                                class="list-group-item border-0 px-0 py-3 bg-transparent d-flex align-items-center">
                                                <div class="me-3">
                                                    <span
                                                        class="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-10"
                                                        style="width: 40px; height: 40px;">
                                                        <i class="fa-solid fa-calendar-alt text-warning fs-4"></i>
                                                    </span>
                                                </div>
                                                <div class="text-muted small">Đến trước giờ hẹn 15-30 phút để làm thủ
                                                    tục</div>
                                            </li>
                                            <li
                                                class="list-group-item border-0 px-0 py-3 bg-transparent d-flex align-items-center">
                                                <div class="me-3">
                                                    <span
                                                        class="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-10"
                                                        style="width: 40px; height: 40px;">
                                                        <i class="fa-solid fa-id-badge text-warning fs-4"></i>
                                                    </span>
                                                </div>
                                                <div class="text-muted small">Mang theo CMND/CCCD và thẻ BHYT (nếu có)
                                                </div>
                                            </li>
                                            <li
                                                class="list-group-item border-0 px-0 py-3 bg-transparent d-flex align-items-center">
                                                <div class="me-3">
                                                    <span
                                                        class="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-10"
                                                        style="width: 40px; height: 40px;">
                                                        <i class="fa-solid fa-notes-medical text-warning fs-4"></i>
                                                    </span>
                                                </div>
                                                <div class="text-muted small">Mang theo các kết quả xét nghiệm, chẩn
                                                    đoán trước đây (nếu
                                                    có)</div>
                                            </li>
                                            <li
                                                class="list-group-item border-0 px-0 py-3 bg-transparent d-flex align-items-center">
                                                <div class="me-3">
                                                    <span
                                                        class="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-10"
                                                        style="width: 40px; height: 40px;">
                                                        <i class="fa-solid fa-edit text-warning fs-4"></i>
                                                    </span>
                                                </div>
                                                <div class="text-muted small">Có thể thay đổi lịch hẹn trước 24 giờ
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-check-circle me-2"></i>
                        Đặt lịch thành công!
                    </h5>
                </div>
                <div class="modal-body text-center">
                    <div class="mb-3">
                        <i class="fas fa-calendar-check text-success" style="font-size: 4rem;"></i>
                    </div>
                    <h4 class="text-success mb-3">Lịch khám đã được xác nhận</h4>
                    <p class="mb-3">
                        Chúng tôi đã ghi nhận lịch khám của bạn và sẽ gửi thông tin xác nhận
                        qua SMS và email trong vòng 5 phút.
                    </p>
                    <div class="alert alert-info">
                        <strong>Mã đặt lịch:</strong> #
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="resetForm">
                        Đặt lịch mới
                    </button>
                    <button type="button" class="btn btn-primary" @click="goHome">
                        Về trang chủ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// export default {
//     data() {
//         return {
//             currentStep: 1,
//             isSubmitting: false,
//             bookingCode: '',
//             booking: {
//                 departmentId: '',
//                 doctorId: '',
//                 date: '',
//                 time: '',
//                 patientName: '',
//                 phone: '',
//                 email: '',
//                 birthDate: '',
//                 address: '',
//                 reason: '',
//                 insuranceNumber: ''
//             },
//             steps: [
//                 {
//                     icon: 'fa-solid fa-stethoscope',
//                     title: 'Bước 1: Chọn chuyên khoa và bác sĩ',
//                     description: 'Chọn chuyên khoa phù hợp với nhu cầu khám và bác sĩ mong muốn'
//                 },
//                 {
//                     icon: 'fas fa-calendar-alt',
//                     title: 'Bước 2: Chọn thời gian',
//                     description: 'Chọn ngày và giờ khám phù hợp với lịch của bạn'
//                 },
//                 {
//                     icon: 'fas fa-clipboard-list',
//                     title: 'Bước 3: Điền thông tin',
//                     description: 'Cung cấp thông tin cá nhân và lý do khám'
//                 },
//                 {
//                     icon: 'fas fa-check',
//                     title: 'Bước 4: Xác nhận',
//                     description: 'Kiểm tra và xác nhận thông tin đặt lịch'
//                 }
//             ],
//             departments: [
//                 { id: 1, name: 'Khoa Tim mạch' },
//                 { id: 2, name: 'Khoa Nội tổng quát' },
//                 { id: 3, name: 'Khoa Nhi' },
//                 { id: 4, name: 'Khoa Sản phụ khoa' },
//                 { id: 5, name: 'Khoa Ngoại tổng quát' },
//                 { id: 6, name: 'Khoa Da liễu' }
//             ],
//             doctors: [],
//             timeSlots: [
//                 { time: '08:00', available: true },
//                 { time: '08:30', available: true },
//                 { time: '09:00', available: false },
//                 { time: '09:30', available: true },
//                 { time: '10:00', available: true },
//                 { time: '10:30', available: false },
//                 { time: '14:00', available: true },
//                 { time: '14:30', available: true },
//                 { time: '15:00', available: true },
//                 { time: '15:30', available: false },
//                 { time: '16:00', available: true },
//                 { time: '16:30', available: true }
//             ],
//             importantNotes: [
//                 {
//                     id: 1,
//                     icon: 'fas fa-clock',
//                     text: 'Đến trước giờ hẹn 15-30 phút để làm thủ tục'
//                 },
//                 {
//                     id: 2,
//                     icon: 'fas fa-id-card',
//                     text: 'Mang theo CMND/CCCD và thẻ BHYT (nếu có)'
//                 },
//                 {
//                     id: 3,
//                     icon: 'fas fa-file-medical',
//                     text: 'Mang theo các kết quả xét nghiệm, chẩn đoán trước đây (nếu có)'
//                 },
//                 {
//                     id: 4,
//                     icon: 'fas fa-edit',
//                     text: 'Có thể thay đổi lịch hẹn trước 24 giờ'
//                 }
//             ]
//         }
//     },
//     computed: {
//         progressWidth() {
//             return ((this.currentStep - 1) / 3) * 100;
//         },
//         minDate() {
//             const today = new Date();
//             return today.toISOString().split('T')[0];
//         },
//         selectedDepartment() {
//             return this.departments.find(d => d.id === this.booking.departmentId);
//         },
//         selectedDoctor() {
//             return this.doctors.find(d => d.id === this.booking.doctorId);
//         },
//         canProceed() {
//             switch (this.currentStep) {
//                 case 1:
//                     return this.booking.departmentId && this.booking.doctorId;
//                 case 2:
//                     return this.booking.date && this.booking.time;
//                 case 3:
//                     return this.booking.patientName &&
//                         this.booking.phone &&
//                         this.booking.reason;
//                 default:
//                     return true;
//             }
//         }
//     },
//     methods: {
//         getStepClass(step) {
//             return {
//                 'bg-primary text-white': step <= this.currentStep,
//                 'bg-light text-muted': step > this.currentStep
//             };
//         },
//         getTimeSlotClass(slot) {
//             if (!slot.available) {
//                 return 'btn-secondary';
//             }
//             return this.booking.time === slot.time ? 'btn-primary' : 'btn-outline-primary';
//         },
//         loadDoctors() {
//             // Simulate API call
//             const doctorsByDept = {
//                 1: [ // Tim mạch
//                     { id: 1, name: 'BS. Nguyễn Văn An', position: 'Trưởng khoa Tim mạch', rating: 4.8 },
//                     { id: 2, name: 'BS. Trần Thị Bình', position: 'Bác sĩ chuyên khoa I', rating: 4.7 }
//                 ],
//                 2: [ // Nội tổng quát
//                     { id: 3, name: 'BS. Lê Minh Châu', position: 'Phó trưởng khoa', rating: 4.9 },
//                     { id: 4, name: 'BS. Phạm Văn Dũng', position: 'Bác sĩ chuyên khoa II', rating: 4.6 }
//                 ],
//                 3: [ // Nhi
//                     { id: 5, name: 'BS. Hoàng Thị Ê', position: 'Trưởng khoa Nhi', rating: 4.9 },
//                     { id: 6, name: 'BS. Nguyễn Văn Phú', position: 'Bác sĩ chuyên khoa I', rating: 4.5 }
//                 ]
//             };

//             this.doctors = doctorsByDept[this.booking.departmentId] || [];
//             this.booking.doctorId = ''; // Reset doctor selection
//         },
//         selectDoctor(doctor) {
//             this.booking.doctorId = doctor.id;
//         },
//         loadTimeSlots() {
//             // Simulate API call to get available time slots for selected date
//             console.log('Loading time slots for:', this.booking.date);
//             // In real app, this would filter timeSlots based on date and doctor availability
//         },
//         selectTimeSlot(time) {
//             this.booking.time = time;
//         },
//         formatDate(dateString) {
//             if (!dateString) return '';
//             const options = {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             };
//             return new Date(dateString).toLocaleDateString('vi-VN', options);
//         },
//         prevStep() {
//             if (this.currentStep > 1) {
//                 this.currentStep--;
//             }
//         },
//         nextStep() {
//             if (this.currentStep < 4 && this.canProceed) {
//                 this.currentStep++;
//             }
//         },
//         async submitBooking() {
//             this.isSubmitting = true;

//             try {
//                 // Simulate API call
//                 await new Promise(resolve => setTimeout(resolve, 2000));

//                 // Generate booking code
//                 this.bookingCode = 'BK' + Date.now().toString().slice(-6);

//                 // Show success modal
//                 const modal = new bootstrap.Modal(document.getElementById('successModal'));
//                 modal.show();

//             } catch (error) {
//                 alert('Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại sau.');
//             } finally {
//                 this.isSubmitting = false;
//             }
//         },
//         resetForm() {
//             this.currentStep = 1;
//             this.booking = {
//                 departmentId: '',
//                 doctorId: '',
//                 date: '',
//                 time: '',
//                 patientName: '',
//                 phone: '',
//                 email: '',
//                 birthDate: '',
//                 address: '',
//                 reason: '',
//                 insuranceNumber: ''
//             };
//             this.doctors = [];

//             const modal = bootstrap.Modal.getInstance(document.getElementById('successModal'));
//             modal.hide();
//         },
//         goHome() {
//             window.location.href = '/';
//         }
//     }
// }
</script>
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
                                            :style="{ width: progressWidth + '%' }" aria-valuemin="0"
                                            aria-valuemax="100"></div>
                                    </div>
                                    <div v-for="(step, index) in steps" :key="index"
                                        class="position-absolute top-0 translate-middle d-flex align-items-center justify-content-center rounded-circle border border-3 border-white"
                                        :class="getStepClass(index + 1)"
                                        :style="{ left: (index * 33.33) + '%', width: '50px', height: '50px' }">
                                        <i :class="step.icon"></i>
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
                                                    v-model="booking.departmentId" @change="loadDoctors">
                                                    <option value="">-- Chọn chuyên khoa --</option>
                                                    <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                                                        {{ dept.ten_chuyen_khoa }}
                                                    </option>
                                                </select>
                                            </div>

                                            <div class="mb-4" v-if="booking.departmentId && filteredDoctors.length > 0">
                                                <label class="form-label fw-semibold">
                                                    Chọn bác sĩ <span class="text-danger">*</span>
                                                </label>
                                                <div class="row">
                                                    <div class="col-md-6 mb-3" v-for="doctor in filteredDoctors"
                                                        :key="doctor.id">
                                                        <div class="card h-100 shadow-sm"
                                                            :class="{ 'border-primary border-3': booking.doctorId === doctor.id }"
                                                            @click="selectDoctor(doctor)"
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
                                                                        <h6 class="fw-bold mb-1">{{ doctor.ho_ten }}
                                                                        </h6>
                                                                        <p class="text-muted small mb-1">{{
                                                                            doctor.chuc_danh }}</p>
                                                                        <small class="text-success">
                                                                            <i class="fas fa-star me-1"></i>{{
                                                                                doctor.so_nam_kinh_nghiem }} năm kinh nghiệm
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                                <div class="mt-2" v-if="booking.doctorId === doctor.id">
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
                                                        v-model="booking.date" @change="loadTimeSlots" :min="minDate">
                                                </div>

                                                <div class="col-md-6 mb-4" v-if="booking.date">
                                                    <label class="form-label fw-semibold">
                                                        Chọn giờ khám <span class="text-danger">*</span>
                                                    </label>
                                                    <div class="d-flex flex-wrap gap-2 mt-2">
                                                        <button v-for="slot in timeSlots" :key="slot.time" type="button"
                                                            class="btn btn-sm" :class="getTimeSlotClass(slot)"
                                                            :disabled="!slot.available"
                                                            @click="selectTimeSlot(slot.time)">
                                                            {{ slot.time }}
                                                            <small class="d-block" v-if="!slot.available">
                                                                (Đã đầy)
                                                            </small>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="alert alert-info" v-if="selectedDoctor">
                                                <i class="fas fa-info-circle me-2"></i>
                                                <strong>Bác sĩ đã chọn:</strong> {{ selectedDoctor.ho_ten }} - {{
                                                    selectedDepartment.ten_chuyen_khoa
                                                }}
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
                                                        v-model="booking.patientName"
                                                        placeholder="Nhập họ và tên đầy đủ">
                                                </div>

                                                <div class="col-md-6 mb-3">
                                                    <label class="form-label fw-semibold">
                                                        Số điện thoại <span class="text-danger">*</span>
                                                    </label>
                                                    <input type="tel" class="form-control" v-model="booking.phone"
                                                        placeholder="0987654321">
                                                </div>

                                                <div class="col-md-6 mb-3">
                                                    <label class="form-label fw-semibold">Email</label>
                                                    <input type="email" class="form-control" v-model="booking.email"
                                                        placeholder="email@example.com">
                                                </div>

                                                <div class="col-md-6 mb-3">
                                                    <label class="form-label fw-semibold">Ngày sinh</label>
                                                    <input type="date" class="form-control" v-model="booking.birthDate">
                                                </div>

                                                <div class="col-12 mb-3">
                                                    <label class="form-label fw-semibold">Địa chỉ</label>
                                                    <input type="text" class="form-control" v-model="booking.address"
                                                        placeholder="Nhập địa chỉ đầy đủ">
                                                </div>

                                                <div class="col-12 mb-3">
                                                    <label class="form-label fw-semibold">
                                                        Lý do khám <span class="text-danger">*</span>
                                                    </label>
                                                    <textarea class="form-control" rows="4" v-model="booking.reason"
                                                        placeholder="Mô tả chi tiết triệu chứng và lý do khám bệnh"></textarea>
                                                </div>

                                                <div class="col-12 mb-3">
                                                    <label class="form-label fw-semibold">Số thẻ bảo hiểm y tế</label>
                                                    <input type="text" class="form-control"
                                                        v-model="booking.insuranceNumber"
                                                        placeholder="Nhập số thẻ BHYT (nếu có)">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Step 4: Confirmation -->
                                        <!-- <div v-show="currentStep === 4">
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
                                                            <div class="text-primary">{{ selectedDepartment?.ten_chuyen_khoa  }}
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Bác sĩ:</strong>
                                                            <div class="text-primary">{{ selectedDoctor?.ho_ten  }}</div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Ngày khám:</strong>
                                                            <div class="text-primary">{{ formatDate(booking.ngay_sinh) }}
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Giờ khám:</strong>
                                                            <div class="text-primary">{{ booking.time }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> -->

                                        <!-- Patient Info -->
                                        <!-- <div class="card bg-light">
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
                                                            <div>{{ booking.patientName }}</div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Số điện thoại:</strong>
                                                            <div>{{ booking.phone }}</div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Email:</strong>
                                                            <div>{{ booking.email || 'Không có' }}</div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <strong>Ngày sinh:</strong>
                                                            <div>{{ formatDate(booking.birthDate) || 'Không có' }}</div>
                                                        </div>
                                                        <div class="col-12 mb-2">
                                                            <strong>Địa chỉ:</strong>
                                                            <div>{{ booking.address || 'Không có' }}</div>
                                                        </div>
                                                        <div class="col-12 mb-2">
                                                            <strong>Lý do khám:</strong>
                                                            <div class="text-break">{{ booking.reason }}</div>
                                                        </div>
                                                        <div class="col-12">
                                                            <strong>Số BHYT:</strong>
                                                            <div>{{ booking.insuranceNumber || 'Không có' }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->


                                        <!-- Navigation Buttons -->
                                        <div class="d-flex justify-content-between mt-4">
                                            <button type="button" class="btn btn-outline-secondary" @click="prevStep"
                                                v-if="currentStep > 1">
                                                <i class="fas fa-arrow-left me-2"></i>Quay lại
                                            </button>

                                            <button type="button" class="btn btn-primary ms-auto" @click="nextStep"
                                                v-if="currentStep < 4" :disabled="!canProceed">
                                                Tiếp tục<i class="fas fa-arrow-right ms-2"></i>
                                            </button>

                                            <button type="button" class="btn btn-success ms-auto" @click="submitBooking"
                                                v-if="currentStep === 4" :disabled="isSubmitting">
                                                <i class="fas fa-check me-2"></i>
                                                <span v-if="isSubmitting">Đang xử lý...</span>
                                                <span v-else>Xác nhận đặt lịch</span>
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
                        <strong>Mã đặt lịch:</strong> #{{ bookingCode }}
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
import baseRequestLeTan from '../../../core/baseRequestLeTan';
export default {
    data() {
        return {
            currentStep: 1,
            isSubmitting: false,
            bookingCode: "",

            booking: {
                departmentId: "",
                doctorId: "",
                date: "",
                time: "",
                patientName: "",
                phone: "",
                email: "",
                birthDate: "",
                address: "",
                reason: "",
                insuranceNumber: ""
            },
            timeSlots: [],
            departments: [],
            doctors: [],
            services: [],
            petTypes: [],
            filteredDoctors: [],
            selectedDoctor: null,
            selectedDepartment: null
        }
    },
    mounted() {
        this.loadData();
        this.loadDoctors();
    },
    computed: {
        progressWidth() {
            return ((this.currentStep - 1) / 3) * 100;
        },
        minDate() {
            const today = new Date();
            return today.toISOString().split('T')[0];
        },
        selectedDepartment() {
            return this.departments.find(d => d.id === this.booking.departmentId);
        },
        selectedDoctor() {
            return this.doctors.find(d => d.id === this.booking.doctorId);
        },
        canProceed() {
            switch (this.currentStep) {
                case 1:
                    return this.booking.departmentId && this.booking.doctorId;
                case 2:
                    return this.booking.date && this.booking.time;
                case 3:
                    return this.booking.patientName &&
                        this.booking.phone &&
                        this.booking.reason;
                default:
                    return true;
            }
        }
    },
    methods: {
        loadData() {
            baseRequestLeTan.get('le-tan/infomation/data')
                .then((res) => {
                    console.log(res.data);
                    this.departments = res.data.data.chuyen_khoa;
                    this.doctors = res.data.data.bac_si;
                    this.services = res.data.data.dich_vu;
                    this.petTypes = res.data.data.loai_thu_cung;
                    console.log(this.departments);
                    console.log(this.doctors);
                })
                .catch((err) => {
                    console.log(err);

                    if (err.response && err.response.data.errors) {
                        const listErr = err.response.data.errors;
                        Object.values(listErr).forEach((error) => {
                            this.$toast.error(error[0]);
                        });
                    } else {
                        this.$toast.error("Có lỗi xảy ra!");
                    }
                });
        },
        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },
        nextStep() {
            if (this.currentStep < 4 && this.canProceed) {
                this.currentStep++;
            }
        },
        getTimeSlotClass(slot) {
            if (!slot.available) {
                return "btn-outline-secondary";
            }

            return this.booking.time === slot.time
                ? "btn-primary"
                : "btn-outline-primary";
        },
        loadTimeSlots() {
            if (!this.booking.doctorId || !this.booking.date) {
                return;
            }

            baseRequestLeTan
                .get(
                    `le-tan/lich-lam/data?id_bac_si=${this.booking.doctorId}&ngay=${this.booking.date}`
                )
                .then((res) => {
                    console.log(res.data);

                    // Chuyển dữ liệu API thành danh sách giờ
                    this.timeSlots = [];

                    res.data.data.forEach(item => {

                        let start = item.thoi_gian_bat_dau.substring(0, 5);
                        let end = item.thoi_gian_ket_thuc.substring(0, 5);

                        let current = start;

                        while (current < end) {

                            this.timeSlots.push({
                                time: current,
                                available: true
                            });

                            let h = parseInt(current.split(":")[0]);
                            let m = parseInt(current.split(":")[1]);

                            m += 30;

                            if (m >= 60) {
                                h++;
                                m = 0;
                            }

                            current =
                                String(h).padStart(2, "0") +
                                ":" +
                                String(m).padStart(2, "0");
                        }
                    });

                    console.log(this.timeSlots);
                })
                .catch((err) => {
                    console.log(err);
                    this.timeSlots = [];
                });
        },
        selectTimeSlot(time) {
            this.booking.time = time;
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            return new Date(dateString).toLocaleDateString('vi-VN', options);
        },
        loadDoctors() {
            this.booking.doctorId = "";
            this.filteredDoctors = [];

            console.log("Chuyên khoa:", this.booking.departmentId);

            const config = {
                params: {
                    id_chuyen_khoa: this.booking.departmentId
                }
            };

            console.log("Config gửi đi:", config);

            baseRequestLeTan
                .get(`le-tan/infomation/data?id_chuyen_khoa=${this.booking.departmentId}`)
                .then((res) => {
                    console.log("Response:", res);

                    console.log("Danh sách bác sĩ:", res.data.data.bac_si);

                    this.filteredDoctors = res.data.data.bac_si;
                    this.selectedDepartment = this.departments.find(
                        item => item.id == this.booking.departmentId
                    );


                    console.log("filteredDoctors:", this.filteredDoctors);
                })
                .catch((err) => {
                    console.error(err);

                    if (err.response) {
                        console.log(err.response.data);
                    }
                });
        },
        selectDoctor(doctor) {
            this.booking.doctorId = doctor.id;
            this.selectedDoctor = doctor;

            if (this.booking.date) {
                this.loadTimeSlots();
            }
        }



    }
}
</script>
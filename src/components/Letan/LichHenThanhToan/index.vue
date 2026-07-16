<template>
    <div class="container my-5">
        <div class="row g-4">
            <div class="col-lg-4" >
                <div class="card h-100 border-0 shadow">
                    <div class="card-header border-0">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex flex-column">
                                <h6 class="mb-0 fw-bold">TÊN BÁC SĨ</h6>
                                <span class="fw-bold">SĐT</span>
                            </div>
                            <span 
                                class="badge bg-warning text-dark px-3 py-2 fs-6 fw-semibold">Chờ xác nhận</span>
                            <span 
                                class="badge bg-info text-dark px-3 py-2 fs-6 fw-semibold">Đã xác nhận</span>
                            <span 
                                class="badge bg-danger px-3 py-2 fs-6 fw-semibold">Đã hủy</span>
                            <span 
                                class="badge bg-success px-3 py-2 fs-6 fw-semibold">Đã hoàn thành</span>
                        </div>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="d-flex align-items-center p-3 bg-light rounded">
                                    <i class="fa-solid fa-calendar-days text-primary fs-4 me-3"></i>
                                    <div>
                                        <div class="fw-semibold text-muted small">NGÀY HẸN</div>
                                        <div class="fw-bold text-primary">NGÀY ĐẶT HẸN</div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="d-flex align-items-center p-3 bg-light rounded">
                                    <i class="fa-solid fa-clock text-info fs-4 me-3"></i>
                                    <div>
                                        <div class="fw-semibold text-muted small">THỜI GIAN</div>
                                        <div class="fw-bold text-info">TGBĐ</div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="d-flex align-items-center p-3 bg-light rounded">
                                    <i class="fa-solid fa-money-bill-wave text-success fs-4 me-3"></i>
                                    <div>
                                        <div class="fw-semibold text-muted small">ĐƠN GIÁ KHÁM</div>
                                        <div class="fw-bold text-danger fs-5">TỔNG TIỀN
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-light border-0">
                        <div class="d-grid gap-2">
                            <button @click="Object.assign(chi_tiet_lich_hen, item)" data-bs-toggle="modal" data-bs-target="#thanhToanModal" class="btn btn-success"
                                >
                                <i class="fa-solid fa-credit-card me-2"></i>Thanh toán lịch hẹn
                            </button>
                            <button class="btn btn-outline-success">
                                <i class="fa-solid fa-check me-2"></i>Đã thanh toán lịch hẹn
                            </button>
                            <button @click="HuyLichHen(item.id)" class="btn btn-outline-danger"
                                >
                                <i class="fa-solid fa-times me-2"></i>Hủy lịch hẹn lịch hẹn
                            </button>
                            <button data-bs-toggle="modal" data-bs-target="#chiTietModal"
                                @click="Object.assign(chi_tiet_lich_hen, item)" class="btn btn-outline-primary"
                                >
                                <i class="fa-solid fa-eye me-2"></i>Xem chi tiết lịch hẹn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Chi Tiết Lịch Hẹn -->
    <div class="modal fade" id="chiTietModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <div class="d-flex align-items-center justify-content-between w-100">
                        <div>
                            <h4 class="modal-title text-white mb-1">
                                <i class="fa-solid fa-calendar-check me-2"></i>
                                Chi Tiết Lịch Hẹn Khám Bệnh
                            </h4>
                            <h5 class="modal-title text-white mb-0">
                                TEN PHONG KHAM
                            </h5>
                        </div>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body p-4 bg-light">
                    <div class="row g-4">
                        <!-- Thông tin bác sĩ -->
                        <div class="col-12 col-lg-6">
                            <div class="card h-100 border-primary">
                                <div class="card-header bg-primary text-white">
                                    <h5 class="card-title mb-0">
                                        <i class="fa-solid fa-user-doctor me-2"></i>
                                        Thông tin bác sĩ
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="mb-3">
                                        <div class="d-flex align-items-center">
                                            <div class="me-3">
                                                <!-- <img :src="chi_tiet_lich_hen.hinh_anh" alt="Ảnh bác sĩ"
                                                    class="rounded-circle border border-primary" -->
                                                    style="width: 80px; height: 80px; object-fit: cover;">
                                            </div>
                                            <div class="flex-grow-1">
                                                <small class="text-muted fw-bold d-block mb-1">BÁC SĨ PHỤ TRÁCH</small>
                                                <h5 class="fw-bold text-primary mb-1">TEN BAC SI
                                                </h5>
                                                <small class="text-muted">TEN CHUYEN KHOA</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <div class="alert alert-info mb-0">
                                            <i class="fa-solid fa-phone me-2"></i>
                                            <strong>Số điện thoại:</strong> SĐT
                                        </div>
                                    </div>

                                    <div class="border rounded p-3 bg-white">
                                        <small class="text-muted fw-bold">LÝ DO KHÁM</small>
                                        <p class="mb-0 fw-semibold">LÝ DO KHÁM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="card h-100 border-success">
                                <div class="card-header bg-success text-white">
                                    <h5 class="card-title mb-0">
                                        <i class="fa-solid fa-calendar-alt me-2"></i>
                                        Thông tin lịch hẹn
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <div class="alert alert-success mb-0">
                                                <div class="d-flex align-items-center">
                                                    <i class="fa-solid fa-money-bill-wave fs-4 me-3"></i>
                                                    <div>
                                                        <small class="fw-bold">ĐƠN GIÁ KHÁM</small>
                                                        <div class="fw-bold fs-5">
                                                            CHI TIẾT
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="alert alert-warning mb-0">
                                                <div class="d-flex align-items-center">
                                                    <i class="fa-solid fa-calendar-plus fs-4 me-3"></i>
                                                    <div>
                                                        <small class="fw-bold">NGÀY ĐẶT HẸN</small>
                                                        <div class="fw-bold">
                                                           CTLH
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="alert alert-danger mb-0">
                                                <div class="d-flex align-items-center">
                                                    <i class="fa-solid fa-clock fs-4 me-3"></i>
                                                    <div>
                                                        <small class="fw-bold">THỜI GIAN BẮT ĐẦU</small>
                                                        <div class="fw-bold fs-5">
                                                            TGBĐ
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
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Thanh Toán Lịch Hẹn -->
    <div class="modal fade" id="thanhToanModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title text-white">
                        <i class="fa-solid fa-credit-card me-2"></i>
                        Thanh Toán Lịch Hẹn
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <!-- Thông tin lịch hẹn -->
                        <div class="col-md-6">
                            <div class="card border-0 bg-light">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0 text-white">
                                        <i class="fa-solid fa-info-circle me-2"></i>
                                        Thông Tin Lịch Hẹn
                                    </h6>
                                </div>
                                <div class="card-body">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold text-muted">Bác sĩ:</label>
                                        <div class="fw-bold">TÊN BS</div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label fw-bold text-muted">Phòng khám:</label>
                                        <div>TÊN PK</div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label fw-bold text-muted">Ngày khám:</label>
                                        <div>NĐHD</div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label fw-bold text-muted">Thời gian khám:</label>
                                        <div>TGBĐ</div>
                                    </div>
                                    <div class="alert alert-success">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span class="fw-bold">Tổng tiền:</span>
                                            <span class="fw-bold fs-5 text-success">
                                               TỔNG TIỀN
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Phương thức thanh toán -->
                        <div class="col-md-6">
                            <div class="card border-0 bg-light">
                                <div class="card-header bg-success text-white">
                                    <h6 class="mb-0 text-white">
                                        <i class="fa-solid fa-qrcode me-2"></i>
                                        Thanh Toán QR Code
                                    </h6>
                                </div>
                                <div class="card-body text-center">
                                    <!-- QR Code -->
                                    <div class="mb-3">
                                        <div class="border rounded p-3 bg-white d-inline-block">
                                            <!-- <img :src="`https://img.vietqr.io/image/mbbank-1910061030119-qr_only.jpg?amount=${chi_tiet_lich_hen.tong_tien}&addInfo=TTKB${chi_tiet_lich_hen.id}`"
                                                alt="QR Code thanh toán" class="img-fluid" style="width: 200px; height: 200px;" > -->
                                        </div>
                                    </div>

                                    <!-- Thông tin chuyển khoản -->
                                    <div class="alert alert-info">
                                        <div class="text-start">
                                            <div class="mb-2">
                                                <strong>Ngân hàng:</strong> MB BANK
                                            </div>
                                            <div class="mb-2">
                                                <strong>Số tài khoản:</strong> 1910061030119
                                            </div>
                                            <div class="mb-2">
                                                <strong>Chủ tài khoản:</strong> LE THANH TRUONG
                                            </div>
                                            <div class="mb-2">
                                                <strong>Số tiền:</strong> CHI TIẾT - TT
                                            </div>
                                            <div>
                                                <strong>Nội dung:</strong> TTKBCT - LỊCH HẸN
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Hướng dẫn -->
                                    <div class="alert alert-warning">
                                        <small>
                                            <i class="fa-solid fa-lightbulb me-1"></i>
                                            Quét mã QR bằng ứng dụng ngân hàng hoặc chuyển khoản theo thông tin trên
                                        </small>
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
<script>
// import baseRequestBenhNhan from '../../../core/baseRequestBenhNhan';
// export default {
//     data() {
//         return {
//             list_lich_hen: [],
//             chi_tiet_lich_hen: {},
//         };
//     },
//     mounted() {
//         this.loadData();
//     },
//     methods: {
//         loadData() {
//             baseRequestBenhNhan.get('benh-nhan/lich-hen/data', {
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("token_benh_nhan"),
//                 },
//             })
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_lich_hen = res.data.data;
//                     }
//                 })
//                 .catch((err) => {
//                     const listErr = err.response.data.errors;
//                     Object.values(listErr).forEach((error) => {
//                         this.$toast.error(error[0]);
//                     });
//                 });
//         },
//         formatDate(dateString) {
//             try {
//                 if (!dateString) return '-';
//                 const date = new Date(dateString);
//                 const day = date.getDate().toString().padStart(2, '0');
//                 const month = (date.getMonth() + 1).toString().padStart(2, '0');
//                 const year = date.getFullYear();
//                 return `${day}/${month}/${year}`;
//             } catch (e) {
//                 return '-';
//             }
//         },
//         formatMoney(amount) {
//             if (!amount) return '0 VNĐ';
//             return new Intl.NumberFormat('vi-VN', {
//                 style: 'currency',
//                 currency: 'VND'
//             }).format(amount);
//         },
//         HuyLichHen(id) {
//             const payload = { id };
//             baseRequestBenhNhan.post('benh-nhan/huy-lich-kham', payload, {
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("token_benh_nhan"),
//                 },
//             })
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.loadData();
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((err) => {
//                     const listErr = err.response.data.errors;
//                     Object.values(listErr).forEach((error) => {
//                         this.$toast.error(error[0]);
//                     });
//                 });
//         }
//     },
// }
</script>
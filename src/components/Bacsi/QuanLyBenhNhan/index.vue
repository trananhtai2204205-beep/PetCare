<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="mt-2">Danh Sách Bệnh Nhân</h4>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-lg-12">
                            <div class="position-relative search-bar-box input-group w-100">
                                <input type="text" class="form-control search-control"
                                    placeholder="Tìm kiếm theo tên, số điện thoại..." >
                                <span class="position-absolute top-50 search-show translate-middle-y">
                                    <i class='bx bx-search'></i>
                                </span>
                                <button class="btn btn-primary" v-on:click="timKiem()">
                                    <i class='bx bx-search me-1'></i>Tìm Kiếm
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-bordered text-nowrap table-hover">
                            <thead>
                                <tr class="text-center bg-primary text-white">
                                    <th>#</th>
                                    <th>Họ Tên</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Ngày Đặt Hẹn</th>
                                    <th>Email</th>
                                    <th>Ngày Sinh</th>
                                    <th>Giới Tính</th>
                                    <th>Tình Trạng</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  class="align-middle">
                                    <td class="text-center">1</td>
                                    <td>TÊN</td>
                                    <td class="text-center">SĐT</td>
                                    <td class="text-center">NĐH</td>
                                    <td class="align-middle">EMAIL</td>
                                    <td class="text-center">NS</td>
                                    <td class="">
                                        <span >Nam</span>
                                        <span >Nữ</span>
                                    </td>
                                    <td class="text-center">
                                        <button>aaaaaaaa</button>
                                        <!-- <button v-if="value.tinh_trang === 0" class="btn btn-warning w-100">Chờ xác
                                            nhận</button>
                                        <button v-else-if="value.tinh_trang === 1" class="btn btn-info w-100">Đã xác
                                            nhận</button>
                                        <button v-else-if="value.tinh_trang === 2" class="btn btn-danger w-100">Đã
                                            hủy</button>
                                        <button v-else-if="value.tinh_trang === 3" class="btn btn-success w-100">Đã hoàn
                                            thành</button> -->
                                    </td>
                                    <td class="text-center">
                                        <button
                                            class="btn btn-primary me-2" data-bs-toggle="modal"
                                            data-bs-target="#hoSoBenhAnModal">
                                            <i class="bx bx-user"></i> Hồ sơ
                                        </button>
                                        <button  class="btn btn-secondary"
                                            data-bs-toggle="modal" data-bs-target="#lichSuKhamModal">
                                            <i class="bx bx-history"></i> Lịch sử
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Hồ Sơ Bệnh Án -->
    <div class="modal fade" id="hoSoBenhAnModal" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header bg-primary text-white border-0">
                    <h5 class="modal-title text-white"><i class="bx bx-user-circle me-2"></i>Hồ Sơ Bệnh Án</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4">
                    <!-- Avatar & Basic Info -->
                    <div class="text-center mb-4">
                        <div class="position-relative d-inline-block">
                            <!-- <img src="/src/assets/images/avatars/avatar-1.png" alt="avatar"
                                class="rounded-circle shadow" width="80" height="80"> -->
                            <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-success"
                                style="width: 20px; height: 20px;"></span>
                        </div>
                        <h4 class="mt-3 mb-1 text-dark">TEN BN</h4>
                        <p class="text-muted mb-0">SDT - EMAIL</p>
                    </div>

                    <!-- Personal Info Card -->
                    <div class="card border-0 shadow-sm mb-3">
                        <div class="card-header bg-light border-0">
                            <h6 class="mb-0 text-primary"><i class="bx bx-info-circle me-2"></i>Thông tin cá nhân</h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-calendar text-muted me-2"></i>
                                        <div>
                                            <small class="text-muted d-block">Ngày Sinh</small>
                                            <span class="fw-semibold">NSS</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-male-female text-muted me-2"></i>
                                        <div>
                                            <small class="text-muted d-block">Giới Tính</small>
                                            <span class="fw-semibold">
                                                <span >Nam</span>
                                                <span>Nữ</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="d-flex align-items-start">
                                        <i class="bx bx-map text-muted me-2 mt-1"></i>
                                        <div>
                                            <small class="text-muted d-block">Địa Chỉ</small>
                                            <span class="fw-semibold">ĐC</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Medical Info Card -->
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-light border-0">
                            <h6 class="mb-0 text-success"><i class="bx bx-heart me-2"></i>Thông tin khám</h6>
                        </div>
                        <div class="card-body">
                            <div class="d-flex align-items-start">
                                <i class="bx bx-clipboard text-muted me-2 mt-1"></i>
                                <div>
                                    <small class="text-muted d-block">Lý Do Khám</small>
                                    <span class="fw-semibold">LDK</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0 bg-light">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="bx bx-x me-1"></i>Đóng
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Lịch Sử Khám -->
    <div class="modal fade" id="lichSuKhamModal" tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header bg-info text-white border-0">
                    <h5 class="modal-title text-white"><i class="bx bx-history me-2"></i>Lịch Sử Khám Bệnh</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4">
                    <!-- Patient Info Header -->
                    <div class="card border-0 shadow-sm mb-4">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-auto">
                                    <!-- <img src="/src/assets/images/avatars/avatar-1.png" alt="avatar"
                                        class="rounded-circle shadow" width="60" height="60"> -->
                                </div>
                                <div class="col">
                                    <h5 class="mb-1 text-dark">TÊN</h5>
                                    <div class="d-flex flex-wrap gap-3 text-muted small">
                                        <span><i class="bx bx-phone me-1"></i>SĐT</span>
                                        <span><i class="bx bx-envelope me-1"></i>EMAIL</span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <span class="btn btn-primary rounded-pill">LDK lần
                                        khám</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Medical History Table -->
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-light border-0">
                            <h6 class="mb-0 text-info"><i class="bx bx-clipboard me-2"></i>Danh sách lần khám</h6>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-hover mb-0 table-bordered text-nowrap">
                                    <thead class="table-light">
                                        <tr>
                                            <th class="text-center align-middle" style="width: 60px;">#</th>
                                            <th class="text-center align-middle" style="width: 120px;">Ngày Khám</th>
                                            <th class="text-center align-middle">Triệu Chứng</th>
                                            <th class="text-center align-middle">Chẩn Đoán</th>
                                            <th class="text-center align-middle">Đơn Thuốc</th>
                                            <th class="text-center align-middle">Lời Dặn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td colspan="6" class="text-center py-4 text-muted">
                                                <i class="bx bx-inbox fs-1 d-block mb-2"></i>
                                                Chưa có lịch sử khám bệnh
                                            </td>
                                        </tr>
                                        <tr 
                                            class="align-middle">
                                            <td class="text-center align-middle">
                                                <span class="badge bg-primary rounded-pill">1</span>
                                            </td>
                                            <td class="text-center align-middle">
                                                <div class="fw-semibold text-primary">NĐH</div>
                                            </td>
                                            <td class="align-middle">
                                                <div class="text-truncate">
                                                   TT
                                                </div>
                                            </td>
                                            <td class="align-middle">
                                                <div class="text-truncate">
                                                    CHẨN ĐÓA
                                                </div>
                                            </td>
                                            <td class="align-middle">
                                                <div class="text-truncate">
                                                    ĐƠN THUỐC
                                                </div>
                                            </td>
                                            <td class="align-middle">
                                                <div class="text-truncate">
                                                   LỜI DẶN
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0 bg-light">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="bx bx-x me-1"></i>Đóng
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import baseRequestBacsi from '../../../core/baseRequestBacsi';
// export default {
//     data() {
//         return {
//             list_benh_nhan: [],
//             view_benh_nhan: {},
//             view_lich_su_kham: {},
//             list_lich_su_kham: [],
//             tim_kiem: {},
//         }
//     },
//     mounted() {
//         this.loadData();
//     },
//     methods: {
//         loadData() {
//             var token = localStorage.getItem("token_bac_si");
//             baseRequestBacsi.get('bac-si/benh-nhan/data', {
//                 headers: {
//                     Authorization: "Bearer " + token,
//                 },
//             })
//                 .then(res => {
//                     this.list_benh_nhan = res.data.data;
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         loadLichSuKham(value) {
//             this.view_lich_su_kham = value;
//             var payload = {
//                 id_benh_nhan: value.id
//             }
//             var token = localStorage.getItem("token_bac_si");
//             baseRequestBacsi.post('bac-si/benh-nhan/lich-su-kham', payload, {
//                 headers: {
//                     Authorization: "Bearer " + token,
//                 }
//             })
//                 .then(res => {
//                     this.list_lich_su_kham = res.data.data;
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         timKiem() {
//             baseRequestBacsi.post('bac-si/benh-nhan/tim-kiem', this.tim_kiem)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_benh_nhan = res.data.data;
//                     }
//                 })
//                 .catch((err) => {
//                     const listErr = err.response.data.errors;
//                     Object.values(listErr).forEach((error) => {
//                         this.$toast.error(error[0]);
//                     });
//                 });
//         },
//     }
// }
</script>

<style></style>
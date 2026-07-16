<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="mt-2">Danh Sách Bác Sĩ</h4>
                    <div>
                        <button class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#themmoiKhachhangModal">Thêm Mới</button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row mb-2 mt-2">
                        <div class="col-lg-12">
                            <div class="position-relative search-bar-box input-group" style="width: 100%;">
                                <input  type="text"
                                    class="form-control search-control" placeholder="Tìm kiếm theo tên bác sĩ...">
                                <span class="position-absolute top-50 search-show translate-middle-y"><i
                                        class='bx bx-search'></i></span>
                                <span class="position-absolute top-50 search-close translate-middle-y"><i
                                        class='bx bx-x'></i></span>
                                <button class="btn btn-primary">Tìm Kiếm</button>
                            </div>
                        </div>
                    </div>
                    <table class="table table-bordered mb-0">
                        <thead>
                            <tr class="text-center align-middle text-nowrap text-light bg-primary">
                                <th>#</th>
                                <th>Họ Tên</th>
                                <th>Email</th>
                                <th>Số Điện Thoại</th>
                                <th>Chuyên Khoa</th>
                                <th>Ngày Sinh</th>
                                <th>Phòng Khám</th>
                                <th>Tình Trạng</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <th class="text-center">1</th>
                                <td>TEN</td>
                                <td>EMAIL</td>
                                <td class="text-center">SĐT</td>
                                <td class="">CK</td>
                                <td class="text-center">NS</td>
                                <td >TEN PK</td>
                                <td class="text-center" style="width: 200px;" >
                                    <button class="btn btn-success me-1 w-100" >Hoạt
                                        Động</button>
                                    <button class="btn btn-danger me-1 w-100" >Tạm Tắt</button>
                                </td>
                                <td class="text-center" style="width: 300px;">
                                    <button class="btn btn-info me-1"
                                       
                                        data-bs-toggle="modal" data-bs-target="#viewBacSiModal"
                                        title="Xem">
                                        <i class="bx bx-show"></i>
                                    </button>
                                    <button class="btn btn-primary me-1" 
                                        data-bs-toggle="modal" data-bs-target="#capNhatKhachhangModal"
                                        
                                        title="Cập Nhật">
                                        <i class="bx bx-edit"></i>
                                    </button>
                                    <button class="btn btn-danger"  data-bs-toggle="modal"
                                        data-bs-target="#xoaKhachhangModal"
                                        
                                        title="Xóa">
                                        <i class="bx bx-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="themmoiKhachhangModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl ">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Thêm Mới Bác Sĩ</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 mb-2">
                            <label>Họ Tên</label>
                            <input type="text" class="form-control" equired>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Email</label>
                            <input type="email" class="form-control" quired>
                        </div>
                       
                        <div class="col-md-6 mb-2">
                            <label>Số Điện Thoại</label>
                            <input type="text" class="form-control"  required>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Ngày sinh</label>
                            <input type="date" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Giới Tính</label>
                            <select class="form-select"  required>
                                <option :value="1">Nam</option>
                                <option :value="0">Nữ</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Phòng Khám</label>
                            <select class="form-select"  >
                                <option value="">-- Chọn phòng khám --</option>
                                <option >TEN PK</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Chuyên Khoa</label>
                            <select class="form-select" multiple  >
                                <option >TEN</option>
                            </select>
                            <small class="text-muted">Giữ phím Ctrl (Windows) hoặc Command (Mac) để chọn nhiều chuyên khoa</small>
                        </div>
                        <div class="col-md-3 mb-2">
                            <label>Chức Danh</label>
                            <input type="text" class="form-control" >
                        </div>
                        <div class="col-md-3 mb-2">
                            <label>Số Năm Kinh Nghiệm</label>
                            <input type="number" class="form-control" >
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Mô Tả</label>
                            <textarea class="form-control" rows="3" textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Kinh Nghiệm Làm Việc</label>
                            <textarea class="form-control" rows="3" em_lam_viec></textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Quá Trình Đào Tạo</label>
                            <textarea class="form-control" rows="3" ></textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Chứng Chỉ</label>
                            <textarea class="form-control" rows="3" ></textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Thành Tựu</label>
                            <textarea class="form-control" rows="3" ></textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Thành Viên Tổ Chức</label>
                            <textarea class="form-control" rows="3" ></textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Tình Trạng</label>
                            <select class="form-select" >
                                <option :value="1">Hoạt Động</option>
                                <option :value="0">Tạm Tắt</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Hình Ảnh</label>
                            <input type="text" class="form-control"  placeholder="Nhập đường dẫn ảnh">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="themMoiBacSi">Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="capNhatKhachhangModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cập Nhật Bác Sĩ</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 mb-2">
                            <label>Họ Tên</label>
                            <input type="text" class="form-control" equired>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Email</label>
                            <input type="email" class="form-control" quired>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Số Điện Thoại</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Ngày sinh</label>
                            <input type="date" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Giới Tính</label>
                            <select class="form-select"  required>
                                <option >Nam</option>
                                <option >Nữ</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Phòng Khám</label>
                            <select class="form-select"  required>
                                <option value="">-- Chọn phòng khám --</option>
                                <option >
                                    TEN PK
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Chuyên Khoa</label>
                            <select class="form-select" multiple >
                                <option >
                                    CK
                                </option>
                            </select>
                            <small class="text-muted">Giữ phím Ctrl (Windows) hoặc Command (Mac) để chọn nhiều chuyên khoa</small>
                        </div>
                        <div class="col-md-3 mb-2">
                            <label>Chức Danh</label>
                            <input type="text" class="form-control" >
                        </div>
                        <div class="col-md-3 mb-2">
                            <label>Số Năm Kinh Nghiệm</label>
                            <input type="number" class="form-control" >
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Mô Tả</label>
                            <textarea class="form-control" rows="3" textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Kinh Nghiệm Làm Việc</label>
                            <textarea class="form-control" rows="3" em_lam_viec></textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Quá Trình Đào Tạo</label>
                            <textarea class="form-control" rows="3"></textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Chứng Chỉ</label>
                            <textarea class="form-control" rows="3" ></textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Thành Tựu</label>
                            <textarea class="form-control" rows="3" ></textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Thành Viên Tổ Chức</label>
                            <textarea class="form-control" rows="3" ></textarea>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Tình Trạng</label>
                            <select class="form-select" >
                                <option :value="1">Hoạt Động</option>
                                <option :value="0">Tạm Tắt</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Hình Ảnh</label>
                            <input type="text" class="form-control"  
                                placeholder="Nhập đường dẫn ảnh">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" >
                        Xác Nhận
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="xoaKhachhangModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Xóa Bác Sĩ</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i></div>
                            <div class="ms-3">
                                <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                                <div class="text-white">Bạn có chắc chắn xóa bác sĩ <b>TEN</b> này không!</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="xoaBacSi()">
                        Xác Nhận
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Add View Modal -->
    <div class="modal fade" id="viewBacSiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <i class='bx bx-user-circle me-2'></i>
                        Thông Tin Chi Tiết Bác Sĩ
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 text-center mb-4">
                            
                                 width="150" height="150">
                            <h4 class="mb-1">TÊN</h4>
                            <p class="text-muted mb-2">
                                Chuyên khoa: CK
                            </p>
                            <p class="text-primary mb-0">
                                <i class='bx bx-hospital me-1'></i>
                                TÊN
                            </p>
                        </div>

                        <div class="col-12">
                            <div class="card mb-3">
                                <div class="card-header bg-light">
                                    <h6 class="mb-0"><i class='bx bx-user me-2'></i>Thông Tin Cơ Bản</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <div class="d-flex align-items-center">
                                                <i class='bx bx-envelope text-primary me-2'></i>
                                                <div>
                                                    <small class="text-muted d-block">Email</small>
                                                    <span>EMAIL</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="d-flex align-items-center">
                                                <i class='bx bx-phone text-primary me-2'></i>
                                                <div>
                                                    <small class="text-muted d-block">Số Điện Thoại</small>
                                                    <span>SĐT</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="d-flex align-items-center">
                                                <i class='bx bx-calendar text-primary me-2'></i>
                                                <div>
                                                    <small class="text-muted d-block">Ngày Sinh</small>
                                                    <span>NS</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="d-flex align-items-center">
                                                <i class='bx bx-user-pin text-primary me-2'></i>
                                                <div>
                                                    <small class="text-muted d-block">Giới Tính</small>
                                                    <span>1</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="d-flex align-items-center">
                                                <i class='bx bx-time-five text-primary me-2'></i>
                                                <div>
                                                    <small class="text-muted d-block">Kinh Nghiệm</small>
                                                    <span>NKN năm</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="d-flex align-items-center">
                                                <i class='bx bx-briefcase text-primary me-2'></i>
                                                <div>
                                                    <small class="text-muted d-block">Chức Danh</small>
                                                    <span>CD</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header bg-light">
                                    <h6 class="mb-0"><i class='bx bx-detail me-2'></i>Thông Tin Chi Tiết</h6>
                                </div>
                                <div class="card-body">
                                    <div class="mb-3">
                                        <h6 class="text-primary mb-2">Chuyên Khoa</h6>
                                        <p class="mb-0">CK</p>
                                    </div>
                                    <div class="mb-3">
                                        <h6 class="text-primary mb-2">Kinh Nghiệm Làm Việc</h6>
                                        <p class="mb-0">KNLV</p>
                                    </div>
                                    <div class="mb-3">
                                        <h6 class="text-primary mb-2">Quá Trình Đào Tạo</h6>
                                        <p class="mb-0">QTDT</p>
                                    </div>
                                    <div class="mb-3">
                                        <h6 class="text-primary mb-2">Chứng Chỉ</h6>
                                        <p class="mb-0">CC</p>
                                    </div>
                                    <div class="mb-3">
                                        <h6 class="text-primary mb-2">Thành Tựu</h6>
                                        <p class="mb-0">TT</p>
                                    </div>
                                    <div class="mb-3">
                                        <h6 class="text-primary mb-2">Thành Viên Tổ Chức</h6>
                                        <p class="mb-0">TTTC</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import baseRequestAdmin from '../../../core/baseRequestAdmin';
// export default {
//     data() {
//         return {
//             list_bac_si: [],
//             list_phong_kham: [],
//             list_chuyen_khoa: [],
//             create_bac_si: {
//                 ho_ten: '',
//                 email: '',
//                 so_dien_thoai: '',
//                 ngay_sinh: '',
//                 gioi_tinh: 1,
//                 mo_ta: '',
//                 hinh_anh: '',
//                 chuc_danh: '',
//                 so_nam_kinh_nghiem: '',
//                 kinh_nghiem_lam_viec: '',
//                 qua_trinh_dao_tao: '',
//                 chung_chi: '',
//                 thanh_tuu: '',
//                 thanh_vien_to_chuc: '',
//                 tinh_trang: 1,
//                 id_phong_kham: '',
//                 chuyen_khoa: []
//             },
//             update_bac_si: {
//                 id: '',
//                 ho_ten: '',
//                 email: '',
//                 so_dien_thoai: '',
//                 ngay_sinh: '',
//                 gioi_tinh: 1,
//                 mo_ta: '',
//                 hinh_anh: '',
//                 chuc_danh: '',
//                 so_nam_kinh_nghiem: '',
//                 kinh_nghiem_lam_viec: '',
//                 qua_trinh_dao_tao: '',
//                 chung_chi: '',
//                 thanh_tuu: '',
//                 thanh_vien_to_chuc: '',
//                 tinh_trang: 1,
//                 id_phong_kham: '',
//                 chuyen_khoa: []
//             },
//             del_bac_si: {
//                 id: '',
//             },
//             tim_kiem: {
//                 noi_dung_tim: ''
//             },
//             view_bac_si: {},
//         };
//     },
//     mounted() {
//         this.loadData();
//         this.loadPhongKham();
//         this.loadChuyenKhoa();
//     },
//     methods: {
//         loadChuyenKhoa() {
//             baseRequestAdmin.get('admin/chuyen-khoa/data')
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_chuyen_khoa = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 });
//         },
//         loadData() {
//             baseRequestAdmin.get('admin/bac-si/data')
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_bac_si = res.data.data;
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
//         },
//         loadPhongKham() {
//             baseRequestAdmin.get('admin/phong-kham/data')
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_phong_kham = res.data.data;
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
//         },
//         searchBacSi() {
//             baseRequestAdmin.post('admin/bac-si/search', this.tim_kiem)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_bac_si = res.data.data;
//                         this.$toast.success(res.data.message);
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
//         },
//         themMoiBacSi() {
//             baseRequestAdmin.post('admin/bac-si/create', this.create_bac_si)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.loadData();
//                         this.create_bac_si = {};
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
//         },
//         upDateBacSi() {
//             baseRequestAdmin.post('admin/bac-si/update', this.update_bac_si)
//                 .then((res) => {
//                     if (res.data.status == true) {
//                         this.$toast.success(res.data.message);
//                         this.loadData();
//                         this.update_bac_si = {
//                             id: '',
//                             ho_ten: '',
//                             email: '',
//                             so_dien_thoai: '',
//                             ngay_sinh: '',
//                             gioi_tinh: 1,
//                             mo_ta: '',
//                             hinh_anh: '',
//                             chuc_danh: '',
//                             so_nam_kinh_nghiem: '',
//                             kinh_nghiem_lam_viec: '',
//                             qua_trinh_dao_tao: '',
//                             chung_chi: '',
//                             thanh_tuu: '',
//                             thanh_vien_to_chuc: '',
//                             tinh_trang: 1,
//                             id_phong_kham: '',
//                             chuyen_khoa: []
//                         };
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
//         },
//         xoaBacSi() {
//             baseRequestAdmin.post('admin/bac-si/delete', this.del_bac_si)
//                 .then((res) => {
//                     if (res.data.status == true) {
//                         this.$toast.success(res.data.message);
//                         this.loadData();
//                         this.del_bac_si = {};
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
//         },
//         changeStatusBacSi(value) {
//             baseRequestAdmin.post('admin/bac-si/change-status', value)
//                 .then((res) => {
//                     if (res.data.status == true) {
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
//         },
//     }
// };
</script>


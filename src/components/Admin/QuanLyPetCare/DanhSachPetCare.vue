<template>
    <div class="row">
        <div class="col-12">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="mt-2">Danh Sách Bệnh Nhân</h4>
                    <div>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themMoiModal">
                            <i class='bx bx-plus me-1'></i>Thêm Mới
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row mb-2 mt-2">
                        <div class="col-lg-12">
                            <div class="position-relative search-bar-box input-group" style="width: 100%;">
                                <input @keyup="timKiem()" >
                                <span class="position-absolute top-50 search-show translate-middle-y"><i
                                        class='bx bx-search'></i></span>
                                <span class="position-absolute top-50 search-close translate-middle-y"><i
                                        class='bx bx-x'></i></span>
                                <button >Tìm Kiếm</button>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered mb-0">
                            <thead>
                                <tr class="text-center align-middle text-nowrap text-light bg-primary">
                                    <th>#</th>
                                    <th>Họ Tên</th>
                                    <th>Email</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Ngày Sinh</th>
                                    <th>Giới Tính</th>
                                    <th>Địa Chỉ</th>
                                    <th>Trạng Thái</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  >
                                    <th class="text-center">1</th>
                                    <td>TEN</td>
                                    <td>EMAIL</td>
                                    <td class="text-center">SDT</td>
                                    <td class="text-center">NS</td>
                                    <td>
                                        <span >Nam</span>
                                        <span >Nữ</span>
                                    </td>
                                    <td>DC</td>
                                    <td class="text-center">
                                        <button >
                                            Hoạt Động
                                        </button>
                                        <button >
                                            Tạm Tắt
                                        </button>
                                    </td>
                                    <td class="text-center">
                                        <button >
                                            <i class='bx bx-history'></i>
                                        </button>
                                        <button >
                                            <i class='bx bx-edit'></i>
                                        </button>
                                        <button >
                                            <i class='bx bx-trash'></i>
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

    <!-- Modal Thêm Mới -->
    <div class="modal fade" id="themMoiModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Thêm Mới Bệnh Nhân</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label>Họ Tên</label>
                            <input >
                        </div>
                        <div class="col-md-12 mb-3">
                            <label>Email</label>
                            <input >
                        </div>

                        <div class="col-md-12 mb-3">
                            <label>Số Điện Thoại</label>
                            <input >
                        </div>
                        <div class="col-md-12 mb-3">
                            <label>Ngày Sinh</label>
                            <input >
                        </div>
                        <div class="col-md-12 mb-3">
                            <label>Giới Tính</label>
                            <select>
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                            </select>
                        </div>
                        <div class="col-md-12 mb-3">
                            <label>Địa Chỉ</label>
                            <textarea ></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button >
                        Xác Nhận
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Cập Nhật -->
    <div class="modal fade" id="capNhatModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cập Nhật Bệnh Nhân</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label>Họ Tên</label>
                            <input >
                        </div>
                        <div class="col-md-12 mb-3">
                            <label>Email</label>
                            <input>
                        </div>
                        <div class="col-md-12 mb-3">
                            <label>Số Điện Thoại</label>
                            <input>
                        </div>
                        <div class="col-md-12 mb-3">
                            <label>Ngày Sinh</label>
                            <input >
                        </div>
                        <div class="col-md-12 mb-3">
                            <label>Giới Tính</label>
                            <select >
                                <option>Nam</option>
                                <option>Nữ</option>
                            </select>
                        </div>
                        <div class="col-md-12 mb-3">
                            <label>Địa Chỉ</label>
                            <textarea ></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button >
                        Xác Nhận
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Xóa -->
    <div class="modal fade" id="xoaModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Xóa Bệnh Nhân</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i></div>
                            <div class="ms-3">
                                <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                                <div class="text-white">Bạn có chắc chắn muốn xóa bệnh nhân
                                    <b>TEN</b> này không?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button >
                        Xác Nhận
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Lịch Sử Khám -->
    <div class="modal fade" id="lichSuKhamModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title text-white   ">
                        <i class='bx bx-history me-1'></i>
                        Lịch Sử Khám Bệnh - 
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Thông tin bệnh nhân -->
                    <div class="row mb-3">
                        <div class="col-12">
                            <div class="card bg-light">
                                <div class="card-body">
                                    <h6 class="card-title text-primary mb-3">
                                        <i class='bx bx-user me-2'></i>Thông Tin Bệnh Nhân
                                    </h6>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p><span>Họ Tên:</span> <b>LSK TEN</b></p>
                                            <p><span>Email:</span> <b>EMAIL</b></p>
                                            <p><span>Số Điện Thoại:</span> SDT</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p><span>Ngày Sinh:</span> <b>LSK</b></p>
                                            <p><span>Giới Tính:</span> <b>GT</b></p>
                                            <p><span>Địa Chỉ:</span> <b>DDC</b></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bảng lịch sử khám -->
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr class="text-center bg-light align-middle">
                                    <th>#</th>
                                    <th>Ngày Đặt Hẹn</th>
                                    <th>Thời Gian</th>
                                    <th>Lý Do Khám</th>
                                    <th>Bác Sĩ</th>
                                    <th>Phòng Khám</th>
                                    <th>Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td colspan="6" class="text-center text-muted">
                                        <i class='bx bx-info-circle me-1'></i>
                                        Chưa có lịch sử khám bệnh
                                    </td>
                                </tr>
                                <tr >
                                    <th class="text-center">1</th>
                                    <td class="text-center">NDH</td>
                                    <td class="text-center align-middle">
                                        TG
                                    </td>
                                    <td class="align-middle">LDK</td>
                                    <td class="align-middle">
                                        <span>TBS</span>
                                    </td>
                                    <td class="align-middle">tpk</td>
                                    <td class="text-center">
                                        <button>
                                            Đã Khám
                                        </button>
                                        <button >
                                            Chưa Khám
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
//             list_benh_nhan: [],
//             thong_ke: {
//                 tong_benh_nhan: 0,
//                 benh_nhan_hoat_dong: 0,
//                 benh_nhan_khong_hoat_dong: 0,
//                 benh_nhan_moi_thang_nay: 0
//             },
//             create_benh_nhan: {
//                 ho_ten: '',
//                 email: '',
//                 so_dien_thoai: '',
//                 ngay_sinh: '',
//                 gioi_tinh: 1,
//                 dia_chi: '',
//                 tinh_trang: 1,
//             },
//             delete_benh_nhan: {
//                 ho_ten: '',
//                 email: '',
//                 so_dien_thoai: '',
//                 ngay_sinh: '',
//                 gioi_tinh: 1,
//                 dia_chi: '',
//                 password: '',
//                 tinh_trang: '',
//                 id: '',
//             },
//             update_benh_nhan: {
//                 id: '',
//                 ho_ten: '',
//                 email: '',
//                 so_dien_thoai: '',
//                 ngay_sinh: '',
//                 gioi_tinh: 1,
//                 dia_chi: '',
//                 tinh_trang: 1,
//             },
//             del_benh_nhan: {},
//             tim_kiem: {},
//             lich_su_kham: [],
//             view_lich_su_kham: {}
//         };
//     },
//     mounted() {
//         this.loadData();
//     },
//     methods: {
//         loadData() {
//             baseRequestAdmin.get('admin/benh-nhan/data')
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_benh_nhan = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 });
//         },
//         timKiem() {
//             baseRequestAdmin.post('admin/benh-nhan/search', this.tim_kiem)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_benh_nhan = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 });
//         },
//         ThemMoiBenhNhan() {
//             baseRequestAdmin.post('admin/benh-nhan/create', this.create_benh_nhan)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message)
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
//         xoaBenhNhan() {
//             baseRequestAdmin.post('admin/benh-nhan/delete', this.delete_benh_nhan)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message)
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
//         CapNhatBenhNhan() {
//             baseRequestAdmin.post('admin/benh-nhan/update', this.update_benh_nhan)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message)
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
//         changeStatusBenhNhan(value) {
//             baseRequestAdmin.post('admin/benh-nhan/change-status', value)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message)
//                         this.loadData();
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 }).catch((err) => {
//                     const listErr = err.response.data.errors;
//                     Object.values(listErr).forEach((error) => {
//                         this.$toast.error(error[0]);
//                     });
//                 });
//         },
//         loadLichSuKham() {
//             if (!this.view_lich_su_kham.id) {
//                 this.$toast.error('Vui lòng chọn bệnh nhân để xem lịch sử khám');
//                 return;
//             }
//             baseRequestAdmin.post(`admin/benh-nhan/chi-tiet-lich-su-kham/${this.view_lich_su_kham.id}`)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.lich_su_kham = res.data.data.lich_su_kham_benh;
//                     } else {
//                         this.$toast.error(res.data.message);
//                         this.lich_su_kham = [];
//                     }
//                 }).catch((err) => {
//                     const listErr = err.response.data.errors;
//                     Object.values(listErr).forEach((error) => {
//                         this.$toast.error(error[0]);
//                     });
//                 });
//         },
//         formatDate(dateString) {
//             if (!dateString) return 'Chưa xác định';
//             const date = new Date(dateString);
//             return date.toLocaleDateString('vi-VN');
//         },
//         formatTime(timeString) {
//             if (!timeString) return '--:--';
//             const parts = timeString.split(':');
//             if (parts.length < 2) return '--:--';
//             const hour = parts[0].padStart(2, '0');
//             const minute = parts[1].padStart(2, '0');
//             return `${hour}:${minute}`;
//         }
//     }
// };

</script>

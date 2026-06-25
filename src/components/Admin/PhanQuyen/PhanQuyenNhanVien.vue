<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header d-flex justify-content-between">
                    <h4 class="mt-2"><b>DANH SÁCH NHÂN VIÊN</b></h4>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                        Thêm nhân viên
                    </button>
                </div>
                <div class="row mb-2 mt-2">
                    <div class="col-lg-12">
                        <div class="position-relative search-bar-box input-group" style="width: 100%;">
                            <input @keyup.enter="timKiem()">
                            <span class="position-absolute top-50 search-show translate-middle-y"><i
                                    class='bx bx-search'></i></span>
                            <span class="position-absolute top-50 search-close translate-middle-y"><i
                                    class='bx bx-x'></i></span>
                            <button >Tìm Kiếm</button>
                        </div>
                    </div>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr class="bg-primary text-light text-nowrap">
                                <th class="text-center">#</th>
                                <th class="text-center">Họ Và Tên</th>
                                <th class="text-center">Email</th>
                                <th class="text-center">Số Điện Thoại</th>
                                <th class="text-center">Chức Vụ</th>
                                <th class="text-center">Tình Trạng</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template>
                                <tr class="text-nowrap">
                                    <th class="align-middle text-center">1</th>
                                    <td class="align-middle">TEN</td>
                                    <td class="align-middle">EAMIL</td>
                                    <td class="align-middle text-center">SDT</td>
                                    <td class="align-middle">TEN</td>
                                    <td class="align-middle text-center" v-on:click="changeStatus(value)">
                                        <button>
                                            Hoạt động
                                        </button>
                                        <button >
                                            Tạm tắt
                                        </button>
                                    </td>
                                    <td class="align-middle text-center">
                                        <button>
                                            Cập nhật
                                        </button>
                                        <button >
                                            Xóa
                                        </button>
                                        <button >
                                            Đổi mật khẩu
                                        </button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Thêm Mới -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Thêm Nhân Viên Mới</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Họ Và Tên</label>
                            <inputB/>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Email</label>
                            <input />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Số Điện Thoại</label>
                            <input/>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Chức Vụ</label>
                            <select>
                                <template >
                                    <option >TEN CV</option>
                                </template>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Trạng Thái</label>
                            <select>
                                <option :value="1">Hoạt Động</option>
                                <option :value="0">Tạm Tắt</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button >
                        Thêm mới
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Cập Nhật -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cập Nhật Thông Tin Nhân Viên</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Họ Và Tên</label>
                            <input  />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Email</label>
                            <input  />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Số Điện Thoại</label>
                            <input />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Chức Vụ</label>
                            <select >
                                <template >
                                    <option >TEN CV</option>
                                </template>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Trạng Thái</label>
                            <select>
                                <option :value="1">Hoạt Động</option>
                                <option :value="0">Tạm Tắt</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button >
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Xóa -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Xóa Nhân Viên</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có chắc chắn muốn xóa nhân viên
                        <strong>TEN</strong>?
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Đổi Mật Khẩu -->
    <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Đổi Mật Khẩu Nhân Viên</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Mật Khẩu Mới</label>
                            <input type="password" class="form-control" placeholder="Nhập mật khẩu mới" />
                        </div>
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Xác Nhận Mật Khẩu</label>
                            <input  type="password" class="form-control" placeholder="Xác nhận mật khẩu mới" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button  type="button" class="btn btn-warning" data-bs-dismiss="modal">
                        Đổi mật khẩu
                    </button>
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
//             list_nhan_vien: [],
//             create_nhan_vien: {
//                 ho_ten: "",
//                 email: "",
//                 so_dien_thoai: "",
//                 id_chuc_vu: "",
//                 tinh_trang: 1,
//             },
//             delete_nhan_vien: {
//                 ho_ten: "",
//                 email: "",
//                 so_dien_thoai: "",
//                 id_chuc_vu: "",
//                 id:'',
//                 password:'',
//                 tinh_trang: 1,
//             },
//             update_nhan_vien: {
//                 ho_ten: "",
//                 email: "",
//                 so_dien_thoai: "",
//                 id_chuc_vu: "",
//                 password: "",
//             },
//             del_nhan_vien: {},
//             list_chuc_vu: [],
//             tim_kiem: {
//                 noi_dung_tim: "",
//             },
//         };
//     },
//     mounted() {
//         this.loadData();
//         this.layDataChucVu();
//     },
//     methods: {
//         layDataChucVu() {
//             baseRequestAdmin.get('admin/chuc-vu/data')
//                 .then(response => {
//                     if (response.data.status) {
//                         this.list_chuc_vu = response.data.data;
//                     } else {
//                         this.$toast.error(response.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         loadData() {
//             baseRequestAdmin.get('admin/nhan-vien/data')
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_nhan_vien = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         timKiem() {
//             baseRequestAdmin.post('admin/nhan-vien/search', this.tim_kiem)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_nhan_vien = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((err) => {
//                     console.error('Lỗi tìm kiếm:', err);
//                     this.$toast.error('Không thể tìm kiếm nhân viên');
//                 });
//         },
//         ThemMoiNhanVien() {
//             baseRequestAdmin.post('admin/nhan-vien/create', this.create_nhan_vien)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message)
//                         this.loadData();
//                         this.create_nhan_vien = { ho_ten: "", email: "", so_dien_thoai: "", id_chuc_vu: "", tinh_trang: 1 };
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
//         xoaNhanVien(){
//             baseRequestAdmin.post('admin/nhan-vien/delete', this.delete_nhan_vien)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message)
//                         this.loadData();
//                         this.delete_nhan_vien = { ho_ten: "", email: "", so_dien_thoai: "", id_chuc_vu: "", id:'', password:'', tinh_trang: 1 };
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
//         changeStatus(value) {
//             baseRequestAdmin.post('admin/nhan-vien/change-status', value)
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
//         },
//         CapNhatNhanVien(){
//             baseRequestAdmin.post('admin/nhan-vien/update', this.update_nhan_vien)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message)
//                         this.loadData();
//                         this.update_nhan_vien = { ho_ten: "", email: "", so_dien_thoai: "", id_chuc_vu: "", password: "", id: "", tinh_trang: 1 };
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
        
//     },
// };
</script>

<style scoped></style>

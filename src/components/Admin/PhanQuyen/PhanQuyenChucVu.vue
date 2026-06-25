<template>
    <div class="row">
        <div class="col-lg-5">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Danh Sách Chức Vụ</h5>
                    <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#themMoiModal">Thêm
                        Mới</button>
                </div>
                <div class="card-body">
                    <div class="input-group mb-3">
                        <input >
                        <button @click="timKiem()" class="btn btn-success input-group-text" style="width: 100px;">Tìm
                            kiếm</button>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="text-center align-middle">
                                <tr class="bg-primary text-light">
                                    <th>#</th>
                                    <th>Tên Chức Vụ</th>
                                    <th>Trạng Thái</th>
                                    <th>Cấp Quyền</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template >
                                    <tr class="align-middle">
                                        <th class="text-center">1</th>
                                        <td>TEN</td>
                                        <td class="text-center">
                                            <button 
                                                @click="doiTrangThai({ id: value.id, tinh_trang: 0 })"
                                                class="btn btn-success text-white btn-sm">
                                                Hoạt Động
                                            </button>
                                            <button @click="doiTrangThai({ id: value.id, tinh_trang: 1 })"
                                                class="btn btn-warning text-white btn-sm">
                                                Tạm Dừng
                                            </button>
                                        </td>
                                        <td class="text-center">
                                            <button @click="phanQuyen(value)"
                                                class="btn btn-info text-white btn-sm">Phân Quyền</button>
                                        </td>
                                        <td class="text-center">
                                            <i class="fa-solid fa-square-pen fa-2x text-primary me-2"
                                                data-bs-toggle="modal" data-bs-target="#updateModal"
                                                @click="Object.assign(update_chuc_vu, value)"></i>
                                            <i class="fa-solid fa-trash fa-2x text-danger" data-bs-toggle="modal"
                                                data-bs-target="#delModal"
                                                @click="Object.assign(delete_chuc_vu, value)"></i>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header">
                    <h5 class="mb-0">Danh Sách Chức Năng</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="text-center text-nowrap align-middle bg-primary text-light">
                                        <th>#</th>
                                        <th>Tên Chức Năng</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template >
                                        <tr class="align-middle">
                                            <th class="text-center">1</th>
                                            <td class="text-wrap">CN</td>
                                            <td class="text-center">
                                                <button class="btn btn-success btn-sm" @click="capQuyen(value.id)">Cấp
                                                    Quyền</button>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header">
                    <h5 class="mb-0">Đang Phân Quyền Cho <span class="text-danger">111111</span></h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center text-nowrap align-middle bg-primary text-light">
                                    <th>#</th>
                                    <th>Tên Chức Năng</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template>
                                    <tr class="align-middle">
                                        <td class="text-wrap">1</td>
                                        <td class="text-wrap">TEN CHUC NANG</td>
                                        <td class="text-center">
                                            <button class="btn btn-danger btn-sm" @click="xoaQuyen(value)">Xóa</button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal Thêm Mới Chức Vụ -->
    <div class="modal fade" id="themMoiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Chức Vụ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên Chức Vụ</label>
                        <input type="text" class="form-control mt-1">
                    </div>
                    <div class="mb-2">
                        <label>Trạng Thái</label>
                        <select class="form-select mt-1">
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Dừng</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button @click="taoChucVu()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Tạo
                        Mới</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Cập Nhật Chức Vụ -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Chức Vụ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên Chức Vụ</label>
                        <input type="text" class="form-control mt-1">
                    </div>
                    <div class="mb-2">
                        <label>Trạng Thái</label>
                        <select class="form-select mt-1" >
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Dừng</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button @click="capNhatChucVu()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                        Nhật</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Xóa Chức Vụ -->
    <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Chức Vụ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                            <div class="d-flex align-items-center">
                                <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
                                </div>
                                <div class="ms-3">
                                    <h6 class="mb-0 text-dark">Bạn có chắc chắn muốn xóa chức vụ
                                        <b>ten</b>
                                        này không?
                                    </h6>
                                    <div class="text-dark"><b>Lưu ý: </b>Điều này không thể hoàn tác khi nhấn xác nhận
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button @click="xoaChucVu()" type="button" class="btn btn-danger"
                        data-bs-dismiss="modal">Xóa</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';

// export default {
//     data() {
//         return {
//             list_chuc_nang: [],
//             list_chuc_vu: [],
//             create_chuc_vu: {
//                 'tinh_trang': 1,
//             },
//             update_chuc_vu: {},
//             delete_chuc_vu: {},
//             delete_quyen: {},
//             create_phan_quyen: {
//                 chuc_nang_id: null,
//             },
//             list_phan_quyen: [],
//             tim_kiem: {
//                 noi_dung_tim_kiem: ''
//             },
//             chon_chuc_vu: {},
//         }
//     },
//     mounted() {
//         this.layDataChucVu();
//         this.layDataChucNang();
//     },
//     methods: {
//         timKiem() {
//             axios.post('http://127.0.0.1:8000/api/admin/chuc-vu/search', this.tim_kiem, {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem("token_admin")
//                 }
//             })
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_chuc_vu = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v, i) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         layDataChucVu() {
//             axios.get('http://127.0.0.1:8000/api/admin/chuc-vu/data', {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem("token_admin")
//                 }
//             })
//                 .then(response => {
//                     if (response.data.status) {
//                         this.list_chuc_vu = response.data.data;
//                     } else {
//                         this.$toast.error(response.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v, i) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         layDataChucNang() {
//             axios.get('http://127.0.0.1:8000/api/admin/chuc-nang/data', {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem("token_admin")
//                 }
//             })
//                 .then(response => {
//                     if (response.data.status) {
//                         this.list_chuc_nang = response.data.data;
//                         this.$toast.success(response.data.message);
//                     } else {
//                         this.$toast.error(response.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v, i) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         taoChucVu() {
//             axios.post('http://127.0.0.1:8000/api/admin/chuc-vu/create', this.create_chuc_vu, {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem("token_admin")
//                 }
//             })
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.create_chuc_vu = { 'tinh_trang': 1 };
//                         this.layDataChucVu();
//                         } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 }).catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v, i) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
                
//         },
//         capNhatChucVu() {
//             axios.post('http://127.0.0.1:8000/api/admin/chuc-vu/update', this.update_chuc_vu, {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem("token_admin")
//                 }
//             })
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.layDataChucVu();
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v, i) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         xoaChucVu() {
//             axios.post('http://127.0.0.1:8000/api/admin/chuc-vu/delete', this.delete_chuc_vu, {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem("token_admin")
//                 }
//             })
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.layDataChucVu();
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v, i) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         doiTrangThai(payload) {
//             axios.post('http://127.0.0.1:8000/api/admin/chuc-vu/change-status', payload, {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem("token_admin")
//                 }
//             })
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.layDataChucVu();
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v, i) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         capQuyen(id_chuc_nang) {
//             if (!this.chon_chuc_vu.id) {
//                 this.$toast.error('Vui lòng chọn chức vụ trước khi cấp quyền');
//                 return;
//             }

//             var payload = {
//                 'id_chuc_vu': this.chon_chuc_vu.id,
//                 'id_chuc_nang': id_chuc_nang
//             };

//             axios
//                 .post('http://127.0.0.1:8000/api/admin/phan-quyen/create', payload, {
//                     headers: {
//                         Authorization: 'Bearer ' + localStorage.getItem("token_admin")
//                     }
//                 })
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.phanQuyen(this.chon_chuc_vu);
//                     } else {
//                         this.$toast.error(res.data.message)
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v, i) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         phanQuyen(value) {
//             this.chon_chuc_vu = value;
//             axios
//                 .get('http://127.0.0.1:8000/api/admin/phan-quyen/chi-tiet-data?id_chuc_vu=' + value.id, {
//                     headers: {
//                         Authorization: 'Bearer ' + localStorage.getItem("token_admin")
//                     }
//                 })
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_phan_quyen = res.data.data.filter(item => item.id_chuc_vu === value.id);
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v, i) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         xoaQuyen(value) {
//             axios
//                 .post('http://127.0.0.1:8000/api/admin/phan-quyen/delete', value, {
//                     headers: {
//                         Authorization: 'Bearer ' + localStorage.getItem("token_admin")
//                     }
//                 })
//                 .then((res) => {
//                     if (res.data.status){
//                         this.$toast.success(res.data.message);
//                         this.phanQuyen(this.chon_chuc_vu);
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v, i) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         }
//     }
// }
</script>

<style></style>
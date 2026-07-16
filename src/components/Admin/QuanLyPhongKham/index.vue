<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card radius-10 border-top border-0 border-3 border-info">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="mt-2">Danh Sách Phòng Khám</h4>
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
                <input @keyup.enter="timKiem()" >
                <span class="position-absolute top-50 search-show translate-middle-y"><i
                    class='bx bx-search'></i></span>
                <span class="position-absolute top-50 search-close translate-middle-y"><i class='bx bx-x'></i></span>
                <button >Tìm Kiếm</button>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead>
                <tr class="text-center align-middle text-nowrap text-light bg-primary">
                  <th>#</th>
                  <th>Tên Phòng Khám</th>
                  <th>Email</th>
                  <th>Địa Chỉ</th>
                  <th>Số Điện Thoại</th>
                  <th>Trạng Thái</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <th class="text-center">1</th>
                  <td>TPK</td>
                  <td>EMAIL</td>
                  <td>DC</td>
                  <td class="text-center">SDT</td>
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
                      <i class='bx bx-show'></i>
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
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Thêm Mới Phòng Khám</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label>Tên Phòng Khám</label>
              <input>
            </div>
            <div class="col-md-6 mb-3">
              <label>Email</label>
              <input >
            </div>
            <div class="col-md-6 mb-3">
              <label>Số Điện Thoại</label>
              <input>
            </div>
            <div class="col-md-6 mb-3">
              <label>Trạng Thái</label>
              <select>
                <option :value="1">Hoạt Động</option>
                <option :value="0">Tạm Tắt</option>
              </select>
            </div>
            <div class="col-md-12 mb-3">
              <label>Địa Chỉ</label>
              <textarea ></textarea>
            </div>
            <div class="col-md-12 mb-3">
              <label>Mô Tả</label>
              <textarea ></textarea>
            </div>
            <div class="col-md-12 mb-3">
              <label>Ảnh Banner</label>
              <input>
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
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cập Nhật Phòng Khám</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label>Tên Phòng Khám</label>
              <input >
            </div>
            <div class="col-md-6 mb-3">
              <label>Email</label>
              <input >
            </div>
            <div class="col-md-6 mb-3">
              <label>Số Điện Thoại</label>
              <input >
            </div>
            <div class="col-md-6 mb-3">
              <label>Trạng Thái</label>
              <select >
                <option :value="1">Hoạt Động</option>
                <option :value="0">Tạm Tắt</option>
              </select>
            </div>
            <div class="col-md-12 mb-3">
              <label>Địa Chỉ</label>
              <textarea></textarea>
            </div>
            <div class="col-md-12 mb-3">
              <label>Mô Tả</label>
              <textarea></textarea>
            </div>
            <div class="col-md-12 mb-3">
              <label>Ảnh Banner</label>
              <input >
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

  <!-- Modal Xem Chi Tiết -->
  <div class="modal fade" id="viewModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header text-white">
          <h5 class="modal-title">
            <i class='bx bx-clinic me-1'></i>
            Chi Tiết Phòng Khám
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <div class="row">
            <div class="col-12 mb-4">
              <!-- <img :src="view_phong_kham.anh_banner" class="img-fluid rounded w-100"
                style="max-height: 300px; object-fit: cover;"> -->
            </div>
            <div class="col-12">
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                  <h4 class="text-center mb-4">TEN PK</h4>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="d-flex">
                        <div class="flex-shrink-0">
                          <i class='bx bx-envelope text-info'></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <p class="mb-0 text-muted small">Email</p>
                          <p class="mb-0">EMAIL</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="d-flex">
                        <div class="flex-shrink-0">
                          <i class='bx bx-phone text-info'></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <p class="mb-0 text-muted small">Số Điện Thoại</p>
                          <p class="mb-0">SDT</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="d-flex">
                        <div class="flex-shrink-0">
                          <i class='bx bx-map text-info'></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <p class="mb-0 text-muted small">Địa Chỉ</p>
                          <p class="mb-0">DC</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="d-flex">
                        <div class="flex-shrink-0">
                          <i class='bx bx-check-circle text-info'></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <p class="mb-0 text-muted small">Trạng Thái</p>
                          <p class="mb-0">
                            <span>
                              Đang Hoạt Động
                            </span>
                            <span>
                              Tạm Tắt
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 mt-4">
                      <h6 class="text-info mb-3">Mô Tả</h6>
                      <p class="text-muted mb-0" style="white-space: pre-line">MT</p>
                    </div>
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

  <!-- Modal Xóa -->
  <div class="modal fade" id="xoaModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Xóa Phòng Khám</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
            <div class="d-flex align-items-center">
              <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i></div>
              <div class="ms-3">
                <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                <div class="text-white">Bạn có chắc chắn muốn xóa phòng khám
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
</template>

<script>
// import baseRequestAdmin from '../../../core/baseRequestAdmin';

// export default {
//   data() {
//     return {
//       list_phong_kham: [],
//       create_phong_kham: {
//         ten_phong_kham: '',
//         email: '',
//         dia_chi: '',
//         so_dien_thoai: '',
//         mo_ta: '',
//         anh_banner: '',
//         tinh_trang: 1
//       },
//       delete_phong_kham: {
//         ten_phong_kham: '',
//         email: '',
//         dia_chi: '',
//         so_dien_thoai: '',
//         mo_ta: '',
//         anh_banner: '',
//         tinh_trang: 1,
//         id: ''
//       },
//       update_phong_kham: {
//         ten_phong_kham: '',
//         email: '',
//         dia_chi: '',
//         so_dien_thoai: '',
//         mo_ta: '',
//         anh_banner: '',
//         tinh_trang: 1
//       },
//       view_phong_kham: {},
//       del_phong_kham: {},
//       tim_kiem: {},
//     };
//   },
//   mounted() {
//     this.loadData();
//   },
//   methods: {
//     loadData() {
//       baseRequestAdmin.get('admin/phong-kham/data')
//         .then((res) => {
//           if (res.data.status) {
//             this.list_phong_kham = res.data.data;
//           } else {
//             this.$toast.error(res.data.message);
//           }
//         });
//     },
//     timKiem() {
//       baseRequestAdmin.post('admin/phong-kham/search', this.tim_kiem)
//         .then((res) => {
//           if (res.data.status) {
//             this.list_phong_kham = res.data.data;
//           } else {
//             this.$toast.error(res.data.message);
//           }
//         })
//         .catch((err) => {
//           const listErr = err.response.data.errors;
//           Object.values(listErr).forEach((error) => {
//             this.$toast.error(error[0]);
//           });
//         });
//     },
//     ThemMoiPhongKham() {
//       baseRequestAdmin.post('admin/phong-kham/create', this.create_phong_kham)
//         .then((res) => {
//           if (res.data.status) {
//             this.$toast.success(res.data.message)
//             this.loadData();
//             this.create_phong_kham = { ten_phong_kham: '', email: '', dia_chi: '', so_dien_thoai: '', mo_ta: '', anh_banner: '', tinh_trang: 1 };
//           } else {
//             this.$toast.error(res.data.message);
//           }
//         })
//         .catch((err) => {
//           const listErr = err.response.data.errors;
//           Object.values(listErr).forEach((error) => {
//             this.$toast.error(error[0]);
//           });
//         });
//     },
//     xoaPhongKham() {
//       baseRequestAdmin.post('admin/phong-kham/delete', this.delete_phong_kham)
//         .then((res) => {
//           if (res.data.status) {
//             this.$toast.success(res.data.message)
//             this.loadData();
//             this.delete_phong_kham = { ten_phong_kham: '', email: '', dia_chi: '', so_dien_thoai: '', mo_ta: '', anh_banner: '', tinh_trang: 1, id: '' };
//           } else {
//             this.$toast.error(res.data.message);
//           }
//         })
//         .catch((err) => {
//           const listErr = err.response.data.errors;
//           Object.values(listErr).forEach((error) => {
//             this.$toast.error(error[0]);
//           });
//         });
//     },
//     changeStatusPhongKham(value) {
//       baseRequestAdmin.post('admin/phong-kham/change-status', value)
//         .then((res) => {
//           if (res.data.status) {
//             this.$toast.success(res.data.message);
//             this.loadData();
//           } else {
//             this.$toast.error(res.data.message);
//           }
//         })
//         .catch((err) => {
//           const listErr = err.response.data.errors;
//           Object.values(listErr).forEach((error) => {
//             this.$toast.error(error[0]);
//           });
//         });
//     },
//     CapNhatPhongKham() {
//       baseRequestAdmin.post('admin/phong-kham/update', this.update_phong_kham)
//         .then((res) => {
//           if (res.data.status) {
//             this.$toast.success(res.data.message)
//             this.loadData();
//             this.update_phong_kham = {
//               ten_phong_kham: '',
//               email: '',
//               dia_chi: '',
//               so_dien_thoai: '',
//               mo_ta: '',
//               anh_banner: '',
//               tinh_trang: 1, id: '' };
//           } else {
//             this.$toast.error(res.data.message);
//           }
//         })
//         .catch((err) => {
//           const listErr = err.response.data.errors;
//           Object.values(listErr).forEach((error) => {
//             this.$toast.error(error[0]);
//           });
//         });
//     },
//   }
// };
</script>

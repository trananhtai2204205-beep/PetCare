<template>
  <div class="row">
    <div class="col-lg-4">
      <div class="card radius-10 border-top border-0 border-3 border-info">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="mt-2">Thêm Mới Chuyên Khoa</h4>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-12 mb-3">
              <label>Tên Chuyên Khoa</label>
              <input >
            </div>
            <div class="col-md-12 mb-3">
              <label>Mô Tả</label>
              <textarea ></textarea>
            </div>
            <div class="col-md-12 mb-3">
              <label>Trạng Thái</label>
              <select>
                <option :value="1">Hoạt Động</option>
                <option :value="0">Tạm Tắt</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card-footer text-end">
          <button >Thêm mới</button>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card radius-10 border-top border-0 border-3 border-info">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="mt-2">Danh Sách Chuyên Khoa</h4>
        </div>
        <div class="card-body">
          <div class="row mb-2 mt-2">
            <div class="col-lg-12">
              <div class="position-relative search-bar-box input-group" style="width: 100%;">
                <input @keyup.enter="timKiem()">
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
                  <th>Tên Chuyên Khoa</th>
                  <th>Trạng Thái</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <th class="text-center">1</th>
                  <td>TEN</td>
                  <td class="text-center">
                    <button >
                      Hoạt Động
                    </button>
                    <button>
                      Tạm Tắt
                    </button>
                  </td>
                  <td class="text-center">
                    <button>
                      <i class='bx bx-show'></i>
                    </button>
                    <button >
                      <i class='bx bx-edit'></i>
                    </button>
                    <button>
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


  <!-- Modal Cập Nhật -->
  <div class="modal fade" id="capNhatModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cập Nhật Chuyên Khoa</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12 mb-3">
              <label>Tên Chuyên Khoa</label>
              <input >
            </div>
            <div class="col-md-12 mb-3">
              <label>Mô Tả</label>
              <textarea ></textarea>
            </div>
            <div class="col-md-12 mb-3">
              <label>Trạng Thái</label>
              <select >
                <option :value="1">Hoạt Động</option>
                <option :value="0">Tạm Tắt</option>
              </select>
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
        <div class="modal-header bg-info text-white">
          <h5 class="modal-title text-white">
            <i class='bx bx-detail me-1'></i>
            Chi Tiết Chuyên Khoa
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr class="bg-light">
                  <th class="text-center align-middle">Tên Chuyên Khoa</th>
                  <th class="text-center align-middle">Trạng Thái</th>
                  <th class="text-center align-middle">Mô Tả</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center align-middle">TEN CK</td>
                  <td class="text-center align-middle">
                    <button >
                      Hoạt Động
                    </button>
                    <button>
                      Tạm Tắt
                    </button>
                  </td>
                  <td class="text-center align-middle" style="white-space: pre-line; min-height: 80px;">
                    MT
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

  <!-- Modal Xóa -->
  <div class="modal fade" id="xoaModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Xóa Chuyên Khoa</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
            <div class="d-flex align-items-center">
              <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i></div>
              <div class="ms-3">
                <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                <div class="text-white">Bạn có chắc chắn muốn xóa chuyên khoa
                  <span><b>ck</b></span> này không?
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button>
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
//       list_chuyen_khoa: [],
//       create_chuyen_khoa: {
//         ten_chuyen_khoa: '',
//         mo_ta: '',
//         tinh_trang: 1,
//       },
//       delete_chuyen_khoa: {
//         ten_chuyen_khoa: '',
//         mo_ta: '',
//         id: '',
//         tinh_trang: '',
//       },
//       update_chuyen_khoa: {
//         ten_chuyen_khoa: '',
//         mo_ta: '',
//         id: '',
//         tinh_trang: '',
//       },
//       view_chuyen_khoa: {},
//       del_chuyen_khoa: {},
//       tim_kiem: {},
//     };
//   },
//   mounted() {
//     this.loadData();
//   },
//   methods: {
//     loadData() {
//       baseRequestAdmin.get('admin/chuyen-khoa/data')
//         .then((res) => {
//           if (res.data.status) {
//             this.list_chuyen_khoa = res.data.data;
//           } else {
//             this.$toast.error(res.data.message);
//           }
//         });
//     },
//     timKiem() {
//       baseRequestAdmin.post('admin/chuyen-khoa/search', this.tim_kiem)
//         .then((res) => {
//           if (res.data.status) {
//             this.list_chuyen_khoa = res.data.data;
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
//     ThemMoiChuyenKhoa() {
//       baseRequestAdmin.post('admin/chuyen-khoa/create', this.create_chuyen_khoa)
//         .then((res) => {
//           if (res.data.status) {
//             this.$toast.success(res.data.message)
//             this.loadData();
//             this.create_chuyen_khoa = { ten_chuyen_khoa: '', mo_ta: '', tinh_trang: 1 };
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
//     xoaChuyenKhoa() {
//       baseRequestAdmin.post('admin/chuyen-khoa/delete', this.delete_chuyen_khoa)
//         .then((res) => {
//           if (res.data.status) {
//             this.$toast.success(res.data.message)
//             this.loadData();
//             this.delete_chuyen_khoa = { ten_chuyen_khoa: '', mo_ta: '', id: '', tinh_trang: '' };
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
//     changeStatusChuyenKhoa(value) {
//       baseRequestAdmin.post('admin/chuyen-khoa/change-status', value)
//         .then((res) => {
//           if (res.data.status) {
//             this.$toast.success(res.data.message);
//             this.loadData();
//           } else {
//             this.$toast.error(res.data.message);
//             }
//         })
//         .catch((err) => {
//           const listErr = err.response.data.errors;
//           Object.values(listErr).forEach((error) => {
//             this.$toast.error(error[0]);
//           });
//         });
//     },
//     CapNhatChuyenKhoa() {
//       baseRequestAdmin.post('admin/chuyen-khoa/update', this.update_chuyen_khoa)
//         .then((res) => {
//           if (res.data.status) {
//             this.$toast.success(res.data.message)
//             this.loadData();
//             this.update_chuyen_khoa = {

//             };
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

<style></style>
<template>
  <div class="row justify-content-center">
    <div class="card shadow-sm">
      <div class="card-header text-white">
        <div class="row">
          <div class="col text-center">
            <h5><b>THỐNG KÊ LỊCH LÀM VIỆC THEO PHÒNG KHÁM</b></h5>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-lg-1"></div>
          <div class="col-lg-1 text-end">
            <p class="mt-2">Phòng Khám:</p>
          </div>
          <div class="col-lg-3">
            <select >
              <option value="">-- Chọn phòng khám --</option>
              <option >
                tpk
              </option>
            </select>
          </div>
          <div class="col-lg-1 text-end">
            <p class="mt-2">Từ Ngày:</p>
          </div>
          <div class="col-lg-2">
            <input >
          </div>
          <div class="col-lg-1 text-end">
            <p class="mt-2">Đến Ngày:</p>
          </div>
          <div class="col-lg-2">
            <input >
          </div>
          <div class="col-lg-1">
            <button @click="loadData()" class="btn btn-primary">Thống Kê</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-lg-4">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th class="text-center align-middle">#</th>
                  <th class="text-center align-middle">Phòng Khám</th>
                  <th class="text-center align-middle">Số lượng lịch làm việc</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td colspan="3" class="text-center align-middle py-5 text-muted">
                    <i class="bx bx-info-circle fs-1 mb-3 d-block"></i>
                    <p class="mb-0">Chưa có dữ liệu thống kê</p>
                    <small>Vui lòng chọn phòng khám, khoảng thời gian và nhấn "Thống Kê"</small>
                  </td>
                </tr>
                <tr >
                  <td class="text-center align-middle">1</td>
                  <td class="align-middle">
                    <span>tpk</span>
                  </td>
                  <td class="text-center align-middle">
                    <span class="btn btn-primary w-100 text-center align-middle">
                      llv
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card">
        <div class="card-body">
          <Bar  />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// import { createToaster } from "@meforma/vue-toaster";
// const toaster = createToaster({
//   position: "top-right",
// });
// import { Bar } from 'vue-chartjs'
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
// import baseRequestAdmin from '../../../core/baseRequestAdmin';

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// export default {
//   components: { Bar },
//   data() {
//     return {
//       loaded: false,
//       thong_ke: { 
//         id_phong_kham: '', 
//         begin: '', 
//         end: '' 
//       },
//       danhSachPhongKham: [],
//       lichLamViecData: [],
//       arrayTenPhongKham: [],
//       arrayTongLichLamViec: [],
//       chartData: {
//         labels: [],
//         datasets: [
//           {
//             label: 'Thống Kê Số Lượt Lịch Làm Việc Theo Phòng Khám',
//             backgroundColor: [
//               "#C0392B", "#1ABC9C", "#F1C40F", "#E67E22", "#8E44AD", "#2980B9", "#27AE60",
//               "#E74C3C", "#16A085", "#F39C12", "#D35400", "#9B59B6", "#3498DB", "#2ECC71"
//             ],
//             data: []
//           }
//         ]
//       },
//       chartOptions: {
//         responsive: true,
//         plugins: {
//           legend: {
//             display: false
//           }
//         }
//       }
//     }
//   },
//   async mounted() {
//     this.loaded = false;
//     this.thong_ke.id_phong_kham = '';
//     this.thong_ke.begin = '';
//     this.thong_ke.end = '';
//     this.loadDanhSachPhongKham();
//   },
//   methods: {
//     loadDanhSachPhongKham() {
//       baseRequestAdmin.get('admin/phong-kham/data', {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token_admin"),
//         }
//       })
//         .then(res => {
//           if (res.data.status) {
//             this.danhSachPhongKham = res.data.data;
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
//     loadData() {
//       if (!this.thong_ke.id_phong_kham) {
//         this.$toast.error('Vui lòng chọn phòng khám');
//         return;
//       }
//       if (!this.thong_ke.begin || !this.thong_ke.end) {
//         this.$toast.error('Vui lòng chọn khoảng thời gian');
//         return;
//       }
      
//       this.loaded = false;
//       baseRequestAdmin.post('admin/thong-ke/lich-lam-viec-theo-phong-kham', {
//         id_phong_kham: this.thong_ke.id_phong_kham,
//         begin: this.thong_ke.begin,
//         end: this.thong_ke.end
//       }, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token_admin"),
//         }
//       })
//         .then(res => {
//           if (res.data.status) {
//           this.lichLamViecData = res.data.data;
//           this.arrayTenPhongKham = res.data.array_ten_phong_kham;
//           this.arrayTongLichLamViec = res.data.array_tong_lich_lam_viec;
//           this.chartData.labels = this.arrayTenPhongKham;
//           this.chartData.datasets[0].data = this.arrayTongLichLamViec;
//           this.loaded = true;
//           this.$toast.success(res.data.message);
//           } else {
//             this.$toast.error(res.data.message);
//           }
//         })
//         .catch((err) => {
//           this.loaded = false;
//           const listErr = err.response.data.errors;
//           Object.values(listErr).forEach((error) => {
//             this.$toast.error(error[0]);
//           });
//         });
//     }
//   },
// }

</script>
<style></style>
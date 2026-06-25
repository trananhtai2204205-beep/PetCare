<template>
  <div class="row justify-content-center">
    <div class="card shadow-sm">
      <div class="card-header text-white">
        <div class="row">
          <div class="col text-center">
            <h5><b>THỐNG KÊ BỆNH NHÂN THEO BÁC SĨ</b></h5>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-lg-2">
            <label class="form-label fw-bold">Bác Sĩ:</label>
            <select >
              <option value="">-- Chọn bác sĩ --</option>
              <option >ht
              </option>
            </select>
          </div>
          <div class="col-lg-2">
            <label class="form-label fw-bold">Từ Ngày:</label>
            <input >
          </div>
          <div class="col-lg-2">
            <label class="form-label fw-bold">Đến Ngày:</label>
            <input >
          </div>
          <div class="col-lg-2">
            <button @click="loadData()" class="btn btn-primary w-100">
              <i class="bx bx-bar-chart-alt-2 me-1"></i>
              Thống Kê
            </button>
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
                  <th class="text-center align-middle">Bác Sĩ</th>
                  <th class="text-center align-middle">Số lượng bệnh nhân</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="3" class="text-center align-middle py-5 text-muted">
                    <i class="bx bx-info-circle fs-1 mb-3 d-block"></i>
                    <p class="mb-0">Chưa có dữ liệu thống kê</p>
                    <small>Vui lòng chọn bác sĩ, khoảng thời gian và nhấn "Thống Kê"</small>
                  </td>
                </tr>
                <tr>
                  <td class="text-center align-middle">
                    <span>1</span>
                  </td>
                  <td class="align-middle">
                    <span>bs</span>
                  </td>
                  <td class="text-center align-middle">
                    <span class="btn btn-primary fs-6 px-3 py-2">
                      bệnh nhân
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
          <Bar />
        </div>
      </div>
    </div>
  </div>
  
  <!-- Chi tiết bệnh nhân theo bác sĩ -->
  <div class="row justify-content-center mt-4" > 0">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header text-white">
          <div class="row">
            <div class="col text-center">
              <h5><b>CHI TIẾT BỆNH NHÂN THEO BÁC SĨ</b></h5>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th class="text-center align-middle">#</th>
                  <th class="text-center align-middle">Tên Bệnh Nhân</th>
                  <th class="text-center align-middle">Số Điện Thoại</th>
                  <th class="text-center align-middle">Email</th>
                  <th class="text-center align-middle">Ngày Đặt Hẹn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="text-center align-middle">
                    1
                  </th>
                  <td class="align-middle">
                    <span class="fw-semibold">ten bn</span>
                  </td>
                  <td class="text-center align-middle">
                    sdt
                  </td>
                  <td class="align-middle">
                    email
                  </td>
                  <td class="text-center align-middle">
                     ndh
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
//         id_bac_si: '',
//         begin: '', 
//         end: '' 
//       },
//       danhSachBacSi: [],
//       benhNhanData: [],
//       chiTietData: [],
//       arrayTenBacSi: [],
//       arrayTongBenhNhan: [],
//       chartData: {
//         labels: [],
//         datasets: [
//           {
//             label: 'Thống Kê Số Lượng Bệnh Nhân Theo Bác Sĩ',
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
//     this.thong_ke.id_bac_si = '';
//     this.thong_ke.begin = '';
//     this.thong_ke.end = '';
//     this.loadDanhSachBacSi();
//   },
//   methods: {
//     loadDanhSachBacSi() {
//       baseRequestAdmin.get('admin/bac-si/data', {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token_admin"),
//         }
//       })
//         .then(res => {
//           this.danhSachBacSi = res.data.data;
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     },
//     loadData() {
//       if (!this.thong_ke.id_bac_si) {
//         this.$toast.error('Vui lòng chọn bác sĩ');
//         return;
//       }
//       if (!this.thong_ke.begin || !this.thong_ke.end) {
//         this.$toast.error('Vui lòng chọn khoảng thời gian');
//         return;
//       }
      
//       this.loaded = false;
//       baseRequestAdmin.post('admin/thong-ke/benh-nhan-theo-bac-si', {
//         id_bac_si: this.thong_ke.id_bac_si,
//         begin: this.thong_ke.begin,
//         end: this.thong_ke.end
//       }, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token_admin"),
//         }
//       })
//         .then(res => {
//           if (res.data.status) {
//           this.chiTietData = res.data.data;
//           this.arrayTenBacSi = res.data.array_ten_bac_si;
//           this.arrayTongBenhNhan = res.data.array_tong_benh_nhan;
          
//           // Tạo dữ liệu cho bảng tổng kết
//           this.benhNhanData = [];
//           for (let i = 0; i < this.arrayTenBacSi.length; i++) {
//             this.benhNhanData.push({
//               ten_bac_si: this.arrayTenBacSi[i],
//               tong_benh_nhan: this.arrayTongBenhNhan[i]
//             });
//           }
          
//           this.chartData.labels = this.arrayTenBacSi;
//           this.chartData.datasets[0].data = this.arrayTongBenhNhan;
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
//     },
//     formatDate(dateString) {
//       if (!dateString) return '';
//       const date = new Date(dateString);
//       return date.toLocaleDateString('vi-VN');
//     }
//   },
// }
</script>
<style></style>
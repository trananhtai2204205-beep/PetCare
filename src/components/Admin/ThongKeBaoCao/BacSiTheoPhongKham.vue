<template>
  <div class="row justify-content-center">
    <div class="card shadow-sm">
      <div class="card-header text-white">
        <div class="row">
          <div class="col text-center">
            <h5><b>THỐNG KÊ BÁC SĨ THEO PHÒNG KHÁM</b></h5>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-lg-3">
            <label class="form-label fw-bold">Phòng Khám:</label>
            <select >
              <option value="">-- Chọn phòng khám --</option>
              <option >
                tpk
              </option>
            </select>
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
  <div class="row justify-content-center mt-3">
    <div class="col-lg-4">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered table-hover align-middle">
              <thead>
                <tr>
                  <th class="text-center align-middle">#</th>
                  <th class="text-center align-middle">Phòng Khám</th>
                  <th class="text-center align-middle">Số lượng bác sĩ</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td colspan="3" class="text-center align-middle py-5 text-muted">
                    <i class="bx bx-info-circle fs-1 mb-3 d-block"></i>
                    <p class="mb-0">Chưa có dữ liệu thống kê</p>
                    <small>Vui lòng chọn phòng khám và nhấn "Thống Kê"</small>
                  </td>
                </tr>
                <tr >
                  <td class="text-center align-middle">
                    <span>1</span>
                  </td>
                  <td class="align-middle">
                    <span class="fw-semibold">tpk</span>
                  </td>
                  <td class="text-center align-middle">
                    <span class="btn btn-primary w-100 text-center align-middle">bs</span>
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
          <Bar/>
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
//       thong_ke: { id_phong_kham: '' },
//       danhSachPhongKham: [],
//       bacSiData: [],
//       arrayTenPhongKham: [],
//       arrayTongBacSi: [],
//       chartData: {
//         labels: [],
//         datasets: [
//           {
//             label: 'Số lượng bác sĩ theo phòng khám',
//             backgroundColor: [
//               '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
//               '#edc948', '#b07aa1', '#ff9da7', '#9c755f', '#bab0ab'
//             ],
//             borderRadius: 6,
//             data: []
//           }
//         ]
//       },
//       chartOptions: {
//         responsive: true,
//         plugins: {
//           legend: { display: false },
//           tooltip: {
//             callbacks: {
//               label: (ctx) => ` ${ctx.parsed.y} bác sĩ`
//             }
//           }
//         },
//         scales: {
//           x: {
//             grid: { display: false },
//             ticks: { color: '#6c757d' }
//           },
//           y: {
//             beginAtZero: true,
//             grid: { color: 'rgba(0,0,0,0.06)' },
//             ticks: { precision: 0, color: '#6c757d' }
//           }
//         }
//       }
//     }
//   },
//   async mounted() {
//     this.loaded = false;
//     this.thong_ke.id_phong_kham = '';
//     this.loadDanhSachPhongKham();
//   },
//   methods: {
//     loadDanhSachPhongKham() {
//       baseRequestAdmin.get('admin/phong-kham/data', {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token_admin"),
//         }
//       })
//       .then(res => {
//         this.danhSachPhongKham = res.data.data;
//       })
//       .catch(() => {});
//     },
//     loadData() {
//       if (!this.thong_ke.id_phong_kham) {
//         this.$toast.warning('Vui lòng chọn phòng khám');
//         return;
//       }

//       this.loaded = false;
//       baseRequestAdmin.post('admin/thong-ke/bac-si-theo-phong-kham', {
//         id_phong_kham: this.thong_ke.id_phong_kham,
//       }, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token_admin"),
//         }
//       })
//       .then(res => {
//         if (res.data.status) {
//         this.bacSiData = res.data.data;
//         this.arrayTenPhongKham = res.data.array_ten_phong_kham;
//         this.arrayTongBacSi = res.data.array_tong_bac_si;
//         this.chartData.labels = this.arrayTenPhongKham;
//         this.chartData.datasets[0].data = this.arrayTongBacSi;
//         this.loaded = true;
//         this.$toast.success(res.data.message);
//         } else {
//           this.$toast.error(res.data.message);
//         }
//       })
//       .catch((err) => {
//         this.loaded = false;
//         const listErr = err.response?.data?.errors || {};
//         Object.values(listErr).forEach((error) => {
//           this.$toast.error(error[0]);
//         });
//       });
//     }
//   },
// }
</script>
<style scoped>

</style>
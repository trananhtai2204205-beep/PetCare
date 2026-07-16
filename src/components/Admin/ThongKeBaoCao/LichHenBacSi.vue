<template>
  <div class="row justify-content-center">
    <div class="card shadow-sm">
      <div class="card-header text-white">
        <div class="row">
          <div class="col text-center">
            <h5><b>THỐNG KÊ LỊCH HẸN THEO BÁC SĨ</b></h5>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-lg-1"></div>
          <div class="col-lg-1 text-end">
            <p class="mt-2">Từ Ngày:</p>
          </div>
          <div class="col-lg-3">
            <input>
          </div>
          <div class="col-lg-1 text-end">
            <p class="mt-2">Đến Ngày:</p>
          </div>
          <div class="col-lg-3">
            <input>
          </div>
          <div class="col-lg-2">
            <button @click="loadData()" class="btn btn-primary">Thống Kê</button>
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
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th class="text-center align-middle">#</th>
                  <th class="text-center align-middle">Bác Sĩ</th>
                  <th class="text-center align-middle">Số lượng lịch hẹn</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td colspan="3" class="text-center align-middle py-5 text-muted">
                    <i class="bx bx-info-circle fs-1 mb-3 d-block"></i>
                    <p class="mb-0">Chưa có dữ liệu thống kê</p>
                    <small>Vui lòng chọn khoảng thời gian và nhấn "Thống Kê"</small>
                  </td>
                </tr>
                <tr >
                  <td class="text-center align-middle">1</td>
                  <td class="align-middle">
                    <span>ten</span>
                  </td>
                  <td class="text-center align-middle">
                    <span class="btn btn-primary w-100 text-center align-middle">
                      lh
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
          <Pie />
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
// import { Pie } from 'vue-chartjs'
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
// import baseRequestAdmin from '../../../core/baseRequestAdmin';

// ChartJS.register(Title, Tooltip, Legend, ArcElement)

// export default {
//   components: { Pie },
//   data() {
//     return {
//       loaded: false,
//       thong_ke: { begin: '', end: '' },
//       lichHenData: [],
//       arrayTenBacSi: [],
//       arrayTongLichHen: [],
//       chartData: {
//         labels: [],
//         datasets: [
//           {
//             backgroundColor: [
//               "#FF6384",
//               "#36A2EB",
//               "#FFCE56",
//               "#4BC0C0",
//               "#9966FF",
//               "#FF9F40"
//             ],
//             data: []
//           }
//         ]
//       },
//       chartOptions: {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'right'
//           }
//         }
//       }
//     }
//   },
//   async mounted() {
//     this.loaded = false;
//     this.thong_ke.begin = '';
//     this.thong_ke.end = '';
//   },
//   methods: {
//     loadData() {
//         this.loaded = false;
//         baseRequestAdmin.post('admin/thong-ke/lich-hen-theo-bac-si', {
//           begin: this.thong_ke.begin,
//           end: this.thong_ke.end
//         }, {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token_admin"),
//           }
//         })
//           .then(res => {
//             if (res.data.status) {
//             this.lichHenData = res.data.data;
//             this.arrayTenBacSi = res.data.array_ten_bac_si;
//             this.arrayTongLichHen = res.data.array_tong_lich_hen;
//             this.chartData.labels = this.arrayTenBacSi;
//             this.chartData.datasets[0].data = this.arrayTongLichHen;
//             this.loaded = true;
//             this.$toast.success(res.data.message);
//             } else {
//               this.$toast.error(res.data.message);
//             }
            
//           })
//           .catch((err) => {
//             this.loaded = false;
//             const listErr = err.response.data.errors;
//             Object.values(listErr).forEach((error) => {
//               this.$toast.error(error[0]);
//             });
//           });
//     }
//   },
// }
</script>

<template>
  <div>
    <!-- Statistics Cards -->
    <div class="row g-4">
      <div class="col-md-6 col-xl-3">
        <div class="card shadow-sm border-0 bg-primary text-white">
          <div class="card-body p-4">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <p class="mb-1 text-white-50 small">TỔNG LỊCH HẸN</p>
                <h3 class="mb-0 text-white fw-bold">1000</h3>
                <small class="text-white-50">Tất cả các lịch hẹn</small>
              </div>
              <div class="bg-white bg-opacity-25 rounded-circle p-3">
                <i class="bx bx-calendar-check fs-2 text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-6 col-xl-3">
        <div class="card shadow-sm border-0 bg-danger text-white">
          <div class="card-body p-4">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <p class="mb-1 text-white-50 small">LỊCH HẸN THÁNG NÀY</p>
                <h3 class="mb-0 text-white fw-bold">20000</h3>
                <small class="text-white-50">Trong tháng hiện tại</small>
              </div>
              <div class="bg-white bg-opacity-25 rounded-circle p-3">
                <i class="bx bx-calendar fs-2 text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-6 col-xl-3">
        <div class="card shadow-sm border-0 bg-success text-white">
          <div class="card-body p-4">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <p class="mb-1 text-white-50 small">LỊCH HẸN THÀNH CÔNG</p>
                <h3 class="mb-0 text-white fw-bold">70000</h3>
                <small class="text-white-50">1000% tỷ lệ thành công</small>
              </div>
              <div class="bg-white bg-opacity-25 rounded-circle p-3">
                <i class="bx bx-check-circle fs-2 text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-6 col-xl-3">
        <div class="card shadow-sm border-0 bg-warning text-dark">
          <div class="card-body p-4">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <p class="mb-1 text-black-50 small">ĐÁNH GIÁ TRUNG BÌNH</p>
                <h3 class="mb-0 fw-bold">4.5/5</h3>
                <small class="text-black-50">Mức độ hài lòng</small>
              </div>
              <div class="bg-white bg-opacity-25 rounded-circle p-3">
                <i class="bx bx-star fs-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="row mt-5">
      <div class="col-12">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white border-0 py-4">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <h5 class="mb-1 fw-bold text-dark">
                  <i class="bx bx-trending-up me-2 text-success"></i>
                  Biểu Đồ Xu Hướng Lịch Hẹn
                </h5>
                <p class="text-muted small mb-0">Thống kê trực quan các loại lịch hẹn</p>
              </div>
              <div class="badge bg-success bg-opacity-10 text-success px-3 py-2">
                <i class="bx bx-trending-up me-1 text-white"></i>
                <span class="text-white">Đang hoạt động</span>
              </div>
            </div>
          </div>
          <div class="card-body pt-2" style="height: 500px;">
            <Line v-if="loaded" :data="chartData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js'
// import baseRequestAdmin from '../../../core/baseRequestAdmin'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

export default {
  name: 'AdminDashboard',
  components: { Line },
  data() {
    return {
      loaded: false,
      stats: {},
      chartData: {
        labels: ['Thành công', 'Chưa hoàn thành', 'Tháng này'],
        datasets: [{
          label: 'Lịch hẹn thành công',
          data: [],
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#28a745',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 8,
          pointHoverRadius: 12
        }, {
          label: 'Lịch hẹn chưa hoàn thành',
          data: [],
          borderColor: '#6c757d',
          backgroundColor: 'rgba(108, 117, 125, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#6c757d',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 8,
          pointHoverRadius: 12
        }, {
          label: 'Lịch hẹn tháng này',
          data: [],
          borderColor: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#dc3545',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 8,
          pointHoverRadius: 12
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              padding: 25,
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#ffffff',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            usePointStyle: true
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          },
          y: {
            display: true,
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              stepSize: 1,
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          }
        },
        elements: {
          line: {
            borderWidth: 4
          }
        }
      }
    }
  },

//   mounted() {
//     this.loaded = false
//     this.loadDashboardData()
//   },

//   methods: {
//     loadDashboardData() {
//       this.loaded = false
//     //   baseRequestAdmin.get('admin/dashboard/data')
//         .then(res => {
//             if (res.data.message) {
//                 this.stats = {
//                     tong_lich_hen: res.data.tong_lich_hen,
//                     lich_hen_thang_nay: res.data.lich_hen_thang_nay,
//                     lich_hen_thanh_cong: res.data.lich_hen_thanh_cong,
//                     ty_le_thanh_cong: res.data.ty_le_thanh_cong,
//                     danh_gia_trung_binh: res.data.danh_gia_trung_binh
//                 }
                
//                 // Update chart data for line chart
//                 const totalAppointments = this.stats.tong_lich_hen || 0
//                 const successfulAppointments = this.stats.lich_hen_thanh_cong || 0
//                 const pendingAppointments = totalAppointments - successfulAppointments
//                 const monthlyAppointments = this.stats.lich_hen_thang_nay || 0
                
//                 // Each dataset represents one line in the chart
//                 this.chartData.datasets[0].data = [successfulAppointments, 0, 0] // Thành công
//                 this.chartData.datasets[1].data = [0, pendingAppointments, 0]    // Chưa hoàn thành  
//                 this.chartData.datasets[2].data = [0, 0, monthlyAppointments]     // Tháng này
                
//                 this.loaded = true
//                 this.$toast.success('Tải dữ liệu dashboard thành công')
//             }
//         })
//         .catch(error => {
//             this.loaded = false
//             if (error.response?.data?.message) {
//                 this.$toast.error(error.response.data.message)
//             } else {
//                 console.error('Error loading dashboard data:', error)
//                 this.$toast.error('Có lỗi khi tải dữ liệu dashboard')
//             }
//         })
//     }
//   }
}
</script>
<template>
  <div class="page-content animate-fadeIn">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <div class="page-title">
          <div class="title-icon" style="background:linear-gradient(135deg,#0EA5E9,#6366F1)">📊</div>
          <div>
            <div>Dashboard</div>
            <div class="page-subtitle">Xin chào, {{ doctor?.name }}! Chúc bạn một ngày làm việc hiệu quả 👋</div>
          </div>
        </div>
      </div>
      <div class="date-badge">
        <span>📅</span>
        <span>{{ todayFormatted }}</span>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-4 mb-4">
      <div class="stat-card" v-for="stat in stats" :key="stat.label" :style="{ '--accent': stat.color }">
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-info">
          <p class="stat-num">{{ stat.value }}</p>
          <p class="stat-label">{{ stat.label }}</p>
        </div>
        <div class="stat-trend" :class="stat.trendUp ? 'up' : 'down'">
          {{ stat.trendUp ? '↑' : '↓' }} {{ stat.trend }}
        </div>
      </div>
    </div>

    <!-- Charts + Upcoming -->
    <div class="dashboard-grid">
      <!-- Weekly Chart -->
      <div class="card chart-card">
        <div class="card-header">
          <div>
            <h3 class="font-bold">Thống kê ca khám</h3>
            <p class="text-sm text-muted">7 ngày gần nhất</p>
          </div>
          <select class="chart-select form-control" style="width:auto">
            <option>7 ngày</option>
            <option>30 ngày</option>
          </select>
        </div>
        <div class="card-body">
          <canvas ref="lineChartEl" height="200"></canvas>
        </div>
      </div>

      <!-- Appointment Types Chart -->
      <div class="card chart-card-sm">
        <div class="card-header">
          <h3 class="font-bold">Loại khám</h3>
        </div>
        <div class="card-body">
          <canvas ref="doughnutEl" height="200"></canvas>
          <div class="chart-legend">
            <div v-for="item in chartLegend" :key="item.label" class="legend-item">
              <span class="legend-dot" :style="{ background: item.color }"></span>
              <span class="text-sm">{{ item.label }}</span>
              <span class="text-sm font-semibold ml-auto">{{ item.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="dashboard-grid mt-4">
      <!-- Upcoming Appointments -->
      <div class="card">
        <div class="card-header">
          <h3 class="font-bold">📅 Lịch hẹn hôm nay</h3>
          <router-link to="/appointments" class="btn btn-ghost btn-sm">Xem tất cả</router-link>
        </div>
        <div class="card-body p-3" style="padding:0">
          <div v-if="upcomingToday.length === 0" class="empty-state" style="padding:30px">
            <p class="empty-icon">🎉</p>
            <p>Không còn lịch hẹn nào hôm nay!</p>
          </div>
          <div v-for="appt in upcomingToday" :key="appt.id" class="upcoming-item">
            <div class="upcoming-time">
              <span class="time-val">{{ appt.time }}</span>
              <span class="badge" :class="`status-${appt.status}`">{{ statusLabel(appt.status) }}</span>
            </div>
            <div class="upcoming-info">
              <div class="avatar-placeholder" :style="`width:38px;height:38px;background:${petColor(appt.pet?.species)};color:white;font-size:16px;`">
                {{ petEmoji(appt.pet?.species) }}
              </div>
              <div>
                <p class="font-semibold text-sm">{{ appt.pet?.name }}</p>
                <p class="text-xs text-muted">{{ appt.pet?.owner?.name }} · {{ appt.pet?.breed }}</p>
              </div>
            </div>
            <div class="upcoming-type">
              <span class="badge badge-primary">{{ typeLabel(appt.type) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Vaccination Alerts -->
      <div class="card">
        <div class="card-header">
          <h3 class="font-bold">💉 Tiêm phòng sắp đến hạn</h3>
          <router-link to="/vaccination" class="btn btn-ghost btn-sm">Chi tiết</router-link>
        </div>
        <div class="card-body" style="padding:0">
          <div v-if="overdueVacc.length > 0" class="vacc-alert">
            <span>⚠️</span>
            <span class="text-sm">{{ overdueVacc.length }} thú cưng <strong>quá hạn tiêm phòng!</strong></span>
          </div>
          <div v-for="vr in upcomingVacc" :key="vr.id" class="vacc-item">
            <div :class="urgencyClass(vr.nextDueDate)" class="vacc-urgency-dot"></div>
            <div class="vacc-info">
              <p class="font-semibold text-sm">{{ vr.pet?.name }}</p>
              <p class="text-xs text-muted">{{ vr.vaccine?.name }}</p>
            </div>
            <div class="vacc-date">
              <p class="text-xs font-semibold" :class="urgencyTextClass(vr.nextDueDate)">{{ formatDate(vr.nextDueDate) }}</p>
              <p class="text-xs text-muted">{{ daysLeft(vr.nextDueDate) }}</p>
            </div>
          </div>
          <div v-if="upcomingVacc.length === 0" class="empty-state" style="padding:30px">
            <p class="empty-icon">✅</p>
            <p>Không có lịch tiêm sắp tới</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useAuthStore } from '../stores/auth'
import { useAppointmentStore } from '../stores/appointments'
import { useVaccinationStore } from '../stores/vaccinations'

Chart.register(...registerables)

const auth = useAuthStore()
const apptStore = useAppointmentStore()
const vaccStore = useVaccinationStore()

const lineChartEl = ref<HTMLCanvasElement | null>(null)
const doughnutEl = ref<HTMLCanvasElement | null>(null)

const doctor = computed(() => auth.doctor)
const upcomingToday = computed(() => apptStore.upcomingToday)
const upcomingVacc = computed(() => vaccStore.upcomingRecords.slice(0, 5))
const overdueVacc = computed(() => vaccStore.overdueRecords)

const todayFormatted = computed(() =>
  new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
)

const stats = computed(() => {
  const today = apptStore.todayAppointments
  const completed = apptStore.completedToday
  const waiting = today.filter(a => a.status === 'waiting').length
  const inProgress = today.filter(a => a.status === 'in_progress').length
  const rate = today.length > 0 ? Math.round((completed / today.length) * 100) : 0
  return [
    { label: 'Ca hôm nay', value: today.length, icon: '📋', color: '#0EA5E9', trend: '+2', trendUp: true },
    { label: 'Đã hoàn thành', value: completed, icon: '✅', color: '#10B981', trend: '+1', trendUp: true },
    { label: 'Đang chờ', value: waiting, icon: '⏳', color: '#F59E0B', trend: '-1', trendUp: false },
    { label: 'Đang khám', value: inProgress, icon: '🩺', color: '#6366F1', trend: '0%', trendUp: true },
  ]
})

const chartLegend = [
  { label: 'Khám tổng quát', color: '#0EA5E9', count: 12 },
  { label: 'Tiêm phòng', color: '#10B981', count: 8 },
  { label: 'Phẫu thuật', color: '#6366F1', count: 3 },
  { label: 'Grooming', color: '#F59E0B', count: 5 },
]

function statusLabel(s: string) {
  return { waiting: 'Chờ', in_progress: 'Đang khám', completed: 'Xong', cancelled: 'Hủy' }[s] || s
}
function typeLabel(t: string) {
  return { checkup: 'Khám TQ', vaccination: 'Tiêm phòng', surgery: 'Phẫu thuật', grooming: 'Grooming', emergency: 'Cấp cứu', follow_up: 'Tái khám' }[t] || t
}
function petEmoji(species?: string) {
  return { dog: '🐕', cat: '🐈', bird: '🦜', rabbit: '🐰', other: '🐾' }[species || ''] || '🐾'
}
function petColor(species?: string) {
  return { dog: '#F59E0B', cat: '#6366F1', bird: '#10B981', rabbit: '#EC4899', other: '#94A3B8' }[species || ''] || '#94A3B8'
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
}
function daysLeft(d: string) {
  const diff = Math.ceil((new Date(d).getTime() - Date.now()) / 86400000)
  if (diff < 0) return 'Quá hạn'
  if (diff === 0) return 'Hôm nay'
  return `Còn ${diff} ngày`
}
function urgencyClass(d: string) {
  const diff = Math.ceil((new Date(d).getTime() - Date.now()) / 86400000)
  if (diff < 0) return 'urgency-overdue'
  if (diff <= 3) return 'urgency-soon'
  return 'urgency-ok'
}
function urgencyTextClass(d: string) {
  const diff = Math.ceil((new Date(d).getTime() - Date.now()) / 86400000)
  if (diff < 0) return 'text-danger'
  if (diff <= 3) return 'text-warning'
  return 'text-success'
}

onMounted(() => {
  // Line Chart
  if (lineChartEl.value) {
    new Chart(lineChartEl.value, {
      type: 'line',
      data: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [{
          label: 'Ca khám',
          data: [8, 12, 9, 15, 11, 7, 5],
          borderColor: '#0EA5E9',
          backgroundColor: 'rgba(14,165,233,0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#0EA5E9',
          pointRadius: 5,
          pointHoverRadius: 7,
        }, {
          label: 'Hoàn thành',
          data: [7, 11, 8, 13, 10, 6, 5],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16,185,129,0.05)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#10B981',
          pointRadius: 5,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#F1F5F9' } },
          x: { grid: { display: false } }
        }
      }
    })
  }

  // Doughnut Chart
  if (doughnutEl.value) {
    new Chart(doughnutEl.value, {
      type: 'doughnut',
      data: {
        labels: ['Khám TQ', 'Tiêm phòng', 'Phẫu thuật', 'Grooming'],
        datasets: [{
          data: [12, 8, 3, 5],
          backgroundColor: ['#0EA5E9', '#10B981', '#6366F1', '#F59E0B'],
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        cutout: '65%',
        plugins: { legend: { display: false } }
      }
    })
  }
})
</script>

<style scoped>
.stat-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 20px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 14px;
  transition: transform var(--transition), box-shadow var(--transition);
  position: relative;
  overflow: hidden;
}
.stat-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--accent);
  border-radius: 4px 0 0 4px;
}
.stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

.stat-icon { font-size: 28px; flex-shrink: 0; }
.stat-info { flex: 1; }
.stat-num { font-size: 28px; font-weight: 800; color: var(--text-primary); line-height: 1; }
.stat-label { font-size: 12px; color: var(--text-muted); margin-top: 4px; font-weight: 500; }
.stat-trend { font-size: 12px; font-weight: 600; padding: 3px 8px; border-radius: var(--radius-full); }
.stat-trend.up { background: var(--success-light); color: #065F46; }
.stat-trend.down { background: var(--danger-light); color: #991B1B; }

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 20px;
}

.chart-card {}
.chart-card-sm {}
.chart-select { font-size: 13px; }

.chart-legend { margin-top: 16px; display: flex; flex-direction: column; gap: 10px; }
.legend-item { display: flex; align-items: center; gap: 8px; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.ml-auto { margin-left: auto; }

.upcoming-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  transition: background var(--transition);
}
.upcoming-item:last-child { border-bottom: none; }
.upcoming-item:hover { background: var(--bg-hover); }

.upcoming-time { width: 80px; flex-shrink: 0; }
.time-val { font-size: 15px; font-weight: 700; color: var(--text-primary); display: block; }

.upcoming-info { display: flex; align-items: center; gap: 10px; flex: 1; }
.upcoming-type { flex-shrink: 0; }

.vacc-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #FEF3C7;
  border-bottom: 1px solid #FDE68A;
  color: #92400E;
}

.vacc-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}
.vacc-item:last-child { border-bottom: none; }

.vacc-urgency-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.urgency-overdue { background: #EF4444; }
.urgency-soon { background: #F59E0B; }
.urgency-ok { background: #10B981; }

.vacc-info { flex: 1; }
.vacc-date { text-align: right; flex-shrink: 0; }

.date-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  font-size: 13px;
  color: var(--text-secondary);
  box-shadow: var(--shadow-sm);
}
</style>

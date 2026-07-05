<template>
  <div class="page-content animate-fadeIn">
    <!-- Welcome Banner -->
    <div class="welcome-banner">
      <div class="welcome-content">
        <div class="welcome-avatar">{{ auth.initials }}</div>
        <div>
          <h2 class="welcome-name">Xin chào, {{ auth.customer?.name?.split(' ').slice(-1)[0] }}! 👋</h2>
          <p class="welcome-sub">Đây là tổng quan hoạt động hôm nay của bạn</p>
        </div>
      </div>
      <div class="welcome-date">
        <span class="date-day">{{ currentDate.day }}</span>
        <span class="date-month">{{ currentDate.monthYear }}</span>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="stats-grid">
      <div class="stat-card" v-for="s in stats" :key="s.label">
        <div class="stat-icon" :style="{ background: s.bg }">{{ s.icon }}</div>
        <div>
          <p class="stat-value">{{ s.value }}</p>
          <p class="stat-label">{{ s.label }}</p>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Upcoming Appointments -->
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="section-title">📅 Lịch hẹn sắp tới</h3>
            <p class="section-sub">Các cuộc hẹn đã đặt</p>
          </div>
          <router-link to="/bookings" class="btn btn-sm btn-secondary">Xem tất cả</router-link>
        </div>
        <div class="card-body">
          <div v-if="upcomingBookings.length === 0" class="empty-state"><div class="empty-icon">📅</div><p>Chưa có lịch hẹn nào</p></div>
          <div v-else class="appt-list">
            <div v-for="b in upcomingBookings.slice(0,3)" :key="b.id" class="appt-item">
              <div class="appt-date-box">
                <span class="appt-day">{{ formatDay(b.date) }}</span>
                <span class="appt-month">{{ formatMonth(b.date) }}</span>
              </div>
              <div class="appt-info">
                <p class="appt-pet">🐾 {{ b.petName }}</p>
                <p class="appt-type">{{ bookingTypeLabel(b.type) }} — {{ b.time }}</p>
                <p class="appt-doc text-muted text-sm" v-if="b.doctorName">{{ b.doctorName }}</p>
              </div>
              <span class="badge" :class="bookStore.statusMap[b.status].class">{{ bookStore.statusMap[b.status].label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Vaccine Reminders -->
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="section-title">💉 Nhắc nhở tiêm phòng</h3>
            <p class="section-sub">Cần chú ý</p>
          </div>
          <router-link to="/vaccinations" class="btn btn-sm btn-secondary">Xem sổ</router-link>
        </div>
        <div class="card-body">
          <div v-if="overdueVaccines.length === 0 && upcomingVaccines.length === 0" class="empty-state"><div class="empty-icon">✅</div><p>Tất cả đã được tiêm đúng hạn!</p></div>
          <div v-else>
            <div v-for="v in [...overdueVaccines, ...upcomingVaccines].slice(0,4)" :key="v.id" class="vaccine-reminder-item">
              <div class="vaccine-icon" :style="{ background: v.status === 'overdue' ? '#FEE2E2' : '#FEF3C7' }">
                {{ v.status === 'overdue' ? '🚨' : '⏰' }}
              </div>
              <div class="vaccine-info">
                <p class="vaccine-name">{{ v.vaccineName }}</p>
                <p class="vaccine-pet text-muted text-sm">{{ v.petName }} — {{ formatDate(v.nextDueDate) }}</p>
              </div>
              <span class="badge" :class="vaccStore.statusMap[v.status].class">{{ vaccStore.statusMap[v.status].label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- My Pets Quick View -->
    <div class="card mt-4">
      <div class="card-header">
        <div>
          <h3 class="section-title">🐾 Thú cưng của tôi</h3>
          <p class="section-sub">{{ pets.length }} thú cưng đã đăng ký</p>
        </div>
        <router-link to="/pets" class="btn btn-sm btn-secondary">Quản lý</router-link>
      </div>
      <div class="card-body">
        <div class="pets-grid">
          <router-link to="/pets" v-for="pet in pets" :key="pet.id" class="pet-card-mini">
            <div class="pet-avatar-mini" :style="petAvatarStyle(pet.species)">{{ petEmoji(pet.species) }}</div>
            <div class="pet-info-mini">
              <p class="pet-name-mini">{{ pet.name }}</p>
              <p class="pet-breed-mini text-muted text-sm">{{ pet.breed }}</p>
              <p class="pet-detail text-sm">{{ pet.age }} tuổi • {{ pet.weight }}kg</p>
            </div>
          </router-link>
          <router-link to="/pets" class="pet-card-mini add-pet-card">
            <div class="add-pet-icon">+</div>
            <p class="add-pet-label">Thêm thú cưng</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCustomerAuthStore } from '../stores/customerAuth'
import { usePetsStore } from '../stores/pets'
import { useBookingsStore } from '../stores/bookings'
import { useVaccineBookStore } from '../stores/vaccineBook'
import { BOOKING_TYPES } from '../stores/bookings'

const auth = useCustomerAuthStore()
const petsStore = usePetsStore()
const bookStore = useBookingsStore()
const vaccStore = useVaccineBookStore()

const pets = computed(() => petsStore.pets)
const upcomingBookings = computed(() => bookStore.upcomingBookings)
const overdueVaccines = computed(() => vaccStore.overdueVaccines)
const upcomingVaccines = computed(() => vaccStore.upcomingVaccines)

const now = new Date()
const currentDate = {
  day: now.getDate().toString().padStart(2, '0'),
  monthYear: now.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })
}

const stats = computed(() => [
  { icon: '🐾', label: 'Thú cưng', value: petsStore.totalPets, bg: 'rgba(255,107,107,0.12)' },
  { icon: '📅', label: 'Lịch hẹn sắp tới', value: bookStore.upcomingBookings.length, bg: 'rgba(78,205,196,0.12)' },
  { icon: '💉', label: 'Cần tiêm phòng', value: vaccStore.upcomingCount, bg: 'rgba(245,158,11,0.12)' },
  { icon: '✅', label: 'Lần khám đã thực hiện', value: bookStore.completedBookings.length, bg: 'rgba(16,185,129,0.12)' },
])

function formatDay(dateStr: string) { return new Date(dateStr).getDate().toString().padStart(2, '0') }
function formatMonth(dateStr: string) { return new Date(dateStr).toLocaleDateString('vi-VN', { month: 'short' }) }
function formatDate(dateStr: string) { return new Date(dateStr).toLocaleDateString('vi-VN') }
function bookingTypeLabel(type: string) { return BOOKING_TYPES.find(t => t.value === type)?.label || type }

const petColors: Record<string, string> = {
  dog: 'rgba(255,107,107,0.15)', cat: 'rgba(78,205,196,0.15)',
  bird: 'rgba(255,230,109,0.2)', rabbit: 'rgba(99,102,241,0.12)', other: 'rgba(148,163,184,0.15)'
}
function petAvatarStyle(species: string) { return { background: petColors[species] || petColors.other } }
function petEmoji(species: string) {
  const m: Record<string,string> = { dog:'🐶', cat:'🐱', bird:'🦜', rabbit:'🐰', other:'🐾' }
  return m[species] || '🐾'
}
</script>

<style scoped>
.welcome-banner {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFD93D 100%);
  border-radius: var(--radius-xl); padding: 28px 32px;
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 24px; color: white;
  box-shadow: 0 8px 32px rgba(255,107,107,0.3);
}
.welcome-content { display: flex; align-items: center; gap: 16px; }
.welcome-avatar {
  width: 56px; height: 56px; border-radius: 50%;
  background: rgba(255,255,255,0.25); color: white;
  font-size: 20px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid rgba(255,255,255,0.4);
}
.welcome-name { font-size: 22px; font-weight: 700; }
.welcome-sub { font-size: 14px; opacity: 0.85; margin-top: 2px; }
.welcome-date { text-align: right; }
.date-day { display: block; font-size: 36px; font-weight: 800; line-height: 1; }
.date-month { display: block; font-size: 13px; opacity: 0.8; margin-top: 2px; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card {
  background: white; border-radius: var(--radius-lg);
  border: 1px solid var(--border); padding: 20px;
  display: flex; align-items: center; gap: 16px;
  box-shadow: var(--shadow-sm); transition: transform 0.2s, box-shadow 0.2s;
}
.stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
.stat-value { font-size: 24px; font-weight: 800; color: var(--text-primary); }
.stat-label { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

.dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.section-title { font-size: 16px; font-weight: 700; color: var(--text-primary); }
.section-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

.appt-list { display: flex; flex-direction: column; gap: 12px; }
.appt-item { display: flex; align-items: center; gap: 14px; padding: 14px; background: var(--bg-hover); border-radius: var(--radius-md); }
.appt-date-box {
  width: 46px; text-align: center; background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  border-radius: 10px; padding: 8px 4px; flex-shrink: 0;
}
.appt-day { display: block; font-size: 20px; font-weight: 800; color: white; line-height: 1; }
.appt-month { display: block; font-size: 10px; color: rgba(255,255,255,0.8); margin-top: 2px; text-transform: uppercase; }
.appt-info { flex: 1; }
.appt-pet { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.appt-type { font-size: 13px; color: var(--text-secondary); margin-top: 2px; }

.vaccine-reminder-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--bg-hover); border-radius: var(--radius-md); margin-bottom: 10px; }
.vaccine-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.vaccine-name { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.vaccine-pet { margin-top: 2px; }
.vaccine-info { flex: 1; }

.pets-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; }
.pet-card-mini {
  background: var(--bg-hover); border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 10px;
  cursor: pointer; text-decoration: none; transition: all 0.2s;
}
.pet-card-mini:hover { border-color: #FF6B6B; box-shadow: 0 4px 12px rgba(255,107,107,0.15); transform: translateY(-2px); }
.pet-avatar-mini { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.pet-info-mini { text-align: center; }
.pet-name-mini { font-size: 14px; font-weight: 700; color: var(--text-primary); }
.pet-breed-mini { margin-top: 2px; }
.pet-detail { color: var(--text-secondary); margin-top: 3px; }
.add-pet-card { border-style: dashed; border-color: #FF6B6B; background: rgba(255,107,107,0.04); color: #FF6B6B; }
.add-pet-icon { width: 52px; height: 52px; border-radius: 50%; background: rgba(255,107,107,0.12); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 300; color: #FF6B6B; }
.add-pet-label { font-size: 13px; font-weight: 600; color: #FF6B6B; }
.mt-4 { margin-top: 20px; }
</style>

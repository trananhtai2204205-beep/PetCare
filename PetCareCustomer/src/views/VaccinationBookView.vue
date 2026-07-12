<template>
  <div class="page-content animate-fadeIn">
    <div class="page-header">
      <div>
        <h2 class="page-title"><span class="title-icon" style="background:rgba(16,185,129,0.1)">💉</span> Sổ tiêm phòng</h2>
        <p class="page-subtitle">Theo dõi lịch tiêm và tẩy giun định kỳ cho thú cưng</p>
      </div>
      <div class="flex gap-2">
        <router-link to="/bookings" class="btn btn-customer">📅 Đặt lịch tiêm</router-link>
      </div>
    </div>

    <!-- Alert banner for overdue -->
    <div v-if="overdueVaccines.length > 0" class="alert-banner danger">
      <span class="alert-banner-icon">🚨</span>
      <div>
        <p class="alert-banner-title">{{ overdueVaccines.length }} vaccine đã quá hạn!</p>
        <p class="alert-banner-sub">{{ overdueVaccines.map(v => `${v.petName} — ${v.vaccineName}`).join(', ') }}. Vui lòng đặt lịch ngay.</p>
      </div>
      <router-link to="/bookings" class="btn btn-sm btn-danger">Đặt lịch</router-link>
    </div>

    <!-- Upcoming reminder -->
    <div v-if="upcomingVaccines.length > 0" class="alert-banner warning">
      <span class="alert-banner-icon">⏰</span>
      <div>
        <p class="alert-banner-title">{{ upcomingVaccines.length }} lịch tiêm sắp đến hạn</p>
        <p class="alert-banner-sub">Hãy chuẩn bị lịch hẹn trước để đảm bảo sức khỏe cho thú cưng.</p>
      </div>
    </div>

    <!-- Pet Filter -->
    <div class="pet-filter">
      <button :class="['pet-filter-btn', { active: selectedPet === '' }]" @click="selectedPet = ''">🐾 Tất cả</button>
      <button
        v-for="pet in pets"
        :key="pet.id"
        :class="['pet-filter-btn', { active: selectedPet === pet.id }]"
        @click="selectedPet = pet.id"
      >{{ petEmoji(pet.species) }} {{ pet.name }}</button>
    </div>

    <!-- Status Filter -->
    <div class="tabs mb-4">
      <button v-for="tab in tabs" :key="tab.value" :class="['tab-item', { active: statusFilter === tab.value }]" @click="statusFilter = tab.value">
        {{ tab.icon }} {{ tab.label }}
        <span v-if="statusCount(tab.value)" class="tab-badge" :class="tab.value">{{ statusCount(tab.value) }}</span>
      </button>
    </div>

    <!-- Vaccination Records -->
    <div v-if="filteredVaccinations.length === 0" class="empty-state">
      <div class="empty-icon">💉</div>
      <p>Không có lịch sử tiêm phòng nào</p>
    </div>

    <div v-else class="vacc-grid">
      <div v-for="v in filteredVaccinations" :key="v.id" class="vacc-card" :class="`vacc-${v.status}`">
        <div class="vacc-card-top">
          <div class="vacc-pet-info">
            <span class="vacc-pet-emoji">{{ petEmoji(v.petSpecies) }}</span>
            <div>
              <p class="vacc-pet-name">{{ v.petName }}</p>
              <p class="vacc-pet-species text-muted text-sm">{{ speciesLabel(v.petSpecies) }}</p>
            </div>
          </div>
          <span class="badge" :class="vaccStore.statusMap[v.status].class">
            {{ vaccStore.statusMap[v.status].icon }} {{ vaccStore.statusMap[v.status].label }}
          </span>
        </div>

        <div class="vacc-name">{{ v.vaccineName }}</div>

        <div class="vacc-meta">
          <div class="vacc-meta-item">
            <span class="meta-label">Mũi số</span>
            <span class="meta-val">{{ v.doseNumber }}/{{ v.totalDoses }}</span>
          </div>
          <div class="vacc-meta-item" v-if="v.administeredDate">
            <span class="meta-label">Ngày tiêm</span>
            <span class="meta-val">{{ formatDate(v.administeredDate) }}</span>
          </div>
          <div class="vacc-meta-item">
            <span class="meta-label">Nhắc nhở tiếp</span>
            <span class="meta-val" :class="{ 'text-danger': v.status === 'overdue', 'text-warning': v.status === 'upcoming' }">
              {{ formatDate(v.nextDueDate) }}
            </span>
          </div>
          <div class="vacc-meta-item" v-if="v.batchNumber">
            <span class="meta-label">Số lô vaccine</span>
            <span class="meta-val">{{ v.batchNumber }}</span>
          </div>
        </div>

        <!-- Dose progress -->
        <div class="dose-progress">
          <div class="dose-track">
            <div
              v-for="d in v.totalDoses"
              :key="d"
              class="dose-dot"
              :class="{ filled: d <= v.doseNumber }"
            ></div>
          </div>
          <span class="dose-text">{{ v.doseNumber }}/{{ v.totalDoses }} mũi</span>
        </div>

        <div class="vacc-footer" v-if="v.doctorName">
          <span class="text-muted text-sm">👨‍⚕️ {{ v.doctorName }}</span>
        </div>

        <div class="vacc-action" v-if="v.status !== 'completed'">
          <router-link to="/bookings" class="btn btn-sm btn-customer w-full justify-center">
            📅 Đặt lịch tiêm
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePetsStore } from '../stores/pets'
import { useVaccineBookStore } from '../stores/vaccineBook'

const petsStore = usePetsStore()
const vaccStore = useVaccineBookStore()

onMounted(async () => {
  await Promise.all([
    petsStore.fetchPets(),
    vaccStore.fetchVaccinations(),
  ])
})

const pets = computed(() => petsStore.pets)
const selectedPet = ref('')
const statusFilter = ref('all')

const tabs = [
  { value: 'all', label: 'Tất cả', icon: '📋' },
  { value: 'completed', label: 'Đã tiêm', icon: '✅' },
  { value: 'upcoming', label: 'Sắp đến hạn', icon: '⏰' },
  { value: 'overdue', label: 'Quá hạn', icon: '🚨' },
]

const overdueVaccines = computed(() => vaccStore.overdueVaccines)
const upcomingVaccines = computed(() => vaccStore.upcomingVaccines)

const filteredVaccinations = computed(() => {
  let result = selectedPet.value
    ? vaccStore.getVaccinationsByPet(selectedPet.value)
    : [...vaccStore.vaccinations]
  if (statusFilter.value !== 'all') result = result.filter(v => v.status === statusFilter.value)
  return result.sort((a, b) => new Date(b.nextDueDate).getTime() - new Date(a.nextDueDate).getTime())
})

function statusCount(status: string) {
  if (status === 'all') return 0
  return vaccStore.vaccinations.filter(v => v.status === status).length || 0
}

function formatDate(d?: string) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function petEmoji(s: string) {
  const m: Record<string,string> = { dog: '🐶', cat: '🐱', bird: '🦜', rabbit: '🐰', other: '🐾' }
  return m[s] || '🐾'
}

function speciesLabel(s: string) {
  const m: Record<string,string> = { dog: 'Chó', cat: 'Mèo', bird: 'Chim', rabbit: 'Thỏ', other: 'Khác' }
  return m[s] || s
}
</script>

<style scoped>
.btn-customer { background: linear-gradient(135deg, #FF6B6B, #FF8E53); color: white; border: none; box-shadow: 0 4px 14px rgba(255,107,107,0.3); }
.mb-4 { margin-bottom: 16px; }

.alert-banner {
  display: flex; align-items: center; gap: 14px; padding: 16px 20px;
  border-radius: var(--radius-lg); margin-bottom: 16px;
  animation: fadeIn 0.3s ease;
}
.alert-banner.danger { background: #FEE2E2; border: 1px solid #FECACA; }
.alert-banner.warning { background: #FEF3C7; border: 1px solid #FDE68A; }
.alert-banner-icon { font-size: 28px; flex-shrink: 0; }
.alert-banner-title { font-size: 14px; font-weight: 700; color: var(--text-primary); }
.alert-banner-sub { font-size: 13px; color: var(--text-secondary); margin-top: 2px; }

.pet-filter { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.pet-filter-btn { padding: 8px 16px; border-radius: 9999px; font-size: 13px; font-weight: 500; border: 1.5px solid var(--border); background: white; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
.pet-filter-btn:hover { border-color: #10B981; color: #10B981; }
.pet-filter-btn.active { border-color: #10B981; background: rgba(16,185,129,0.08); color: #059669; font-weight: 600; }

.tab-badge { margin-left: 4px; font-size: 10px; padding: 1px 5px; border-radius: 9999px; font-weight: 700; }
.tab-badge.completed { background: #D1FAE5; color: #065F46; }
.tab-badge.upcoming { background: #FEF3C7; color: #92400E; }
.tab-badge.overdue { background: #FEE2E2; color: #991B1B; }

.vacc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
.vacc-card {
  background: white; border-radius: var(--radius-xl); border: 1px solid var(--border);
  padding: 20px; box-shadow: var(--shadow-sm); transition: all 0.2s;
}
.vacc-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.vacc-completed { border-top: 3px solid #10B981; }
.vacc-upcoming { border-top: 3px solid #F59E0B; }
.vacc-overdue { border-top: 3px solid #EF4444; }

.vacc-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.vacc-pet-info { display: flex; align-items: center; gap: 10px; }
.vacc-pet-emoji { font-size: 28px; }
.vacc-pet-name { font-size: 14px; font-weight: 700; color: var(--text-primary); }

.vacc-name { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }

.vacc-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
.vacc-meta-item { }
.meta-label { display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 2px; }
.meta-val { font-size: 13px; font-weight: 600; color: var(--text-primary); }

.dose-progress { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.dose-track { display: flex; gap: 6px; flex: 1; }
.dose-dot { flex: 1; height: 6px; border-radius: 9999px; background: var(--border); transition: background 0.2s; }
.dose-dot.filled { background: linear-gradient(135deg, #10B981, #059669); }
.dose-text { font-size: 12px; color: var(--text-muted); font-weight: 600; white-space: nowrap; }

.vacc-footer { margin-bottom: 12px; }
.vacc-action { }

.text-danger { color: var(--danger); }
.text-warning { color: var(--warning); }
</style>

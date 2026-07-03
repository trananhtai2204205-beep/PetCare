<template>
  <header class="app-header">
    <div class="header-left">
      <div class="breadcrumb">
        <span class="breadcrumb-home">PetCare</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-current">{{ pageTitle }}</span>
      </div>
      <h1 class="header-title">{{ pageTitle }}</h1>
    </div>

    <div class="header-right">
      <!-- Date -->
      <div class="header-date">
        <span class="date-icon">📅</span>
        <span>{{ currentDate }}</span>
      </div>

      <!-- Notifications -->
      <div class="notif-wrap" @click="showNotif = !showNotif">
        <button class="btn btn-ghost btn-icon notif-btn">
          🔔
          <span v-if="notifCount > 0" class="notif-count">{{ notifCount }}</span>
        </button>
        <div v-if="showNotif" class="notif-dropdown">
          <div class="notif-header">
            <span class="font-semibold">Thông báo</span>
            <span class="badge badge-danger">{{ notifCount }}</span>
          </div>
          <div
            v-for="n in notifications"
            :key="n.id"
            class="notif-item"
            :class="{ unread: !n.read }"
          >
            <span class="notif-icon">{{ n.icon }}</span>
            <div>
              <p class="notif-msg">{{ n.message }}</p>
              <p class="notif-time text-xs text-muted">{{ n.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Doctor Avatar -->
      <div class="header-avatar-wrap">
        <div class="avatar-placeholder" style="width:38px;height:38px;background:linear-gradient(135deg,#0EA5E9,#6366F1);color:white;font-size:14px;font-weight:700;">
          {{ doctorInitials }}
        </div>
        <div class="avatar-info">
          <p class="avatar-name">{{ doctor?.name }}</p>
          <p class="avatar-role text-xs text-muted">Bác sĩ thú y</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useVaccinationStore } from '../../stores/vaccinations'

const route = useRoute()
const auth = useAuthStore()
const vaccStore = useVaccinationStore()

const showNotif = ref(false)
const doctor = computed(() => auth.doctor)
const doctorInitials = computed(() => {
  if (!doctor.value) return 'BS'
  return doctor.value.name.split(' ').slice(-2).map((w: string) => w[0]).join('')
})

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/appointments': 'Lịch khám',
  '/medical-records': 'Hồ sơ khám bệnh',
  '/medical-history': 'Lịch sử khám',
  '/vaccination': 'Tiêm phòng',
}
const pageTitle = computed(() => pageTitles[route.path] || 'Trang')

const currentDate = computed(() => {
  return new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})

const notifications = computed(() => {
  const items: any[] = []
  vaccStore.overdueRecords.forEach(r => {
    items.push({
      id: `overdue-${r.id}`,
      icon: '💉',
      message: `${r.pet?.name} quá hạn tiêm ${r.vaccine?.name}`,
      time: 'Quá hạn',
      read: false
    })
  })
  vaccStore.upcomingRecords.slice(0, 3).forEach(r => {
    items.push({
      id: `upcoming-${r.id}`,
      icon: '⏰',
      message: `${r.pet?.name} sắp đến lịch tiêm ${r.vaccine?.name}`,
      time: `Ngày ${new Date(r.nextDueDate).toLocaleDateString('vi-VN')}`,
      read: false
    })
  })
  return items.slice(0, 5)
})

const notifCount = computed(() => notifications.value.filter(n => !n.read).length)

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.notif-wrap')) showNotif.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.app-header {
  height: var(--header-height);
  background: white;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 90;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.header-left {}
.breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-muted); }
.breadcrumb-sep { color: var(--border); }
.breadcrumb-current { color: var(--text-secondary); }
.header-title { font-size: 17px; font-weight: 700; color: var(--text-primary); margin-top: 1px; }

.header-right { display: flex; align-items: center; gap: 12px; }

.header-date {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--bg-hover);
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  white-space: nowrap;
}

.notif-wrap { position: relative; }

.notif-btn {
  position: relative;
  font-size: 18px;
  width: 38px;
  height: 38px;
  border: 1px solid var(--border);
}

.notif-count {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #EF4444;
  color: white;
  font-size: 9px;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.notif-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  animation: slideUp 0.2s ease;
  z-index: 999;
}

.notif-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background var(--transition);
}
.notif-item:last-child { border-bottom: none; }
.notif-item:hover { background: var(--bg-hover); }
.notif-item.unread { background: #F0F9FF; }

.notif-icon { font-size: 18px; flex-shrink: 0; }
.notif-msg { font-size: 13px; color: var(--text-primary); }
.notif-time { margin-top: 2px; }

.header-avatar-wrap { display: flex; align-items: center; gap: 10px; }
.avatar-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
</style>

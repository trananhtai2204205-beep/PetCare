<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="logo-icon">🐾</div>
      <div class="logo-text">
        <span class="logo-name">PetCare</span>
        <span class="logo-sub">Phòng khám thú y</span>
      </div>
    </div>

    <!-- Doctor Info -->
    <div class="sidebar-doctor">
      <div class="doctor-avatar-wrap">
        <div class="avatar-placeholder" style="width:44px;height:44px;background:linear-gradient(135deg,#0EA5E9,#6366F1);color:white;font-size:16px;">
          {{ doctorInitials }}
        </div>
        <div class="online-dot"></div>
      </div>
      <div class="doctor-info">
        <p class="doctor-name">{{ doctor?.name }}</p>
        <p class="doctor-role">{{ doctor?.specialty }}</p>
      </div>
    </div>

    <div class="sidebar-divider"></div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <p class="nav-section-label">Chính</p>
      <router-link
        v-for="item in mainNav"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        :class="{ active: isActive(item.to) }"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
        <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
      </router-link>

      <p class="nav-section-label mt">Quản lý</p>
      <router-link
        v-for="item in manageNav"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        :class="{ active: isActive(item.to) }"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
        <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <button class="logout-btn" @click="handleLogout">
        <span>🚪</span>
        <span>Đăng xuất</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useVaccinationStore } from '../../stores/vaccinations'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const vaccStore = useVaccinationStore()

const doctor = computed(() => auth.doctor)
const doctorInitials = computed(() => {
  if (!doctor.value) return 'BS'
  return doctor.value.name.split(' ').slice(-2).map(w => w[0]).join('')
})

const mainNav = computed(() => [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/appointments', icon: '📅', label: 'Lịch khám' },
])

const manageNav = computed(() => [
  { to: '/medical-records', icon: '📋', label: 'Hồ sơ khám bệnh' },
  { to: '/medical-history', icon: '🗂️', label: 'Lịch sử khám' },
  {
    to: '/vaccination', icon: '💉', label: 'Tiêm phòng',
    badge: vaccStore.upcomingCount > 0 ? vaccStore.upcomingCount : undefined
  },
])

function isActive(path: string) {
  return route.path === path || route.path.startsWith(path + '/')
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 18px;
}

.logo-icon {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #0EA5E9, #6366F1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(14,165,233,0.4);
}

.logo-name {
  display: block;
  font-size: 18px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.3px;
}

.logo-sub {
  display: block;
  font-size: 11px;
  color: #64748B;
  margin-top: 1px;
}

.sidebar-doctor {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  background: rgba(255,255,255,0.04);
  border-radius: 10px;
  margin: 0 10px 4px;
}

.doctor-avatar-wrap { position: relative; flex-shrink: 0; }

.online-dot {
  width: 10px;
  height: 10px;
  background: #10B981;
  border: 2px solid var(--sidebar-bg);
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
}

.doctor-name {
  font-size: 13px;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.doctor-role {
  font-size: 11px;
  color: #64748B;
  margin-top: 1px;
}

.sidebar-divider {
  height: 1px;
  background: rgba(255,255,255,0.06);
  margin: 12px 18px;
}

.sidebar-nav {
  flex: 1;
  padding: 0 10px;
}

.nav-section-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #475569;
  text-transform: uppercase;
  padding: 0 8px 6px;
}

.nav-section-label.mt { margin-top: 18px; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  margin-bottom: 2px;
  color: #64748B;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
}

.nav-item:hover {
  background: rgba(255,255,255,0.06);
  color: #CBD5E1;
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(14,165,233,0.2), rgba(99,102,241,0.15));
  color: #0EA5E9;
  font-weight: 600;
  border: 1px solid rgba(14,165,233,0.2);
}

.nav-icon {
  font-size: 16px;
  width: 22px;
  text-align: center;
  flex-shrink: 0;
}

.nav-label { flex: 1; }

.nav-badge {
  background: #EF4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 9999px;
  min-width: 18px;
  text-align: center;
}

.sidebar-footer {
  padding: 12px 10px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: transparent;
  color: #64748B;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.logout-btn:hover {
  background: rgba(239,68,68,0.1);
  color: #EF4444;
}
</style>

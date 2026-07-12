<template>
  <aside class="c-sidebar" :class="{ collapsed: isCollapsed }">
    <!-- Logo -->
    <div class="c-sidebar-logo">
      <div class="c-logo-icon">🐾</div>
      <transition name="fade-text">
        <div class="c-logo-text" v-if="!isCollapsed">
          <span class="c-logo-name">PetCare</span>
          <span class="c-logo-sub">Cổng Khách hàng</span>
        </div>
      </transition>
    </div>

    <!-- Customer Info -->
    <div class="c-sidebar-user">
      <div class="c-user-avatar" :style="avatarStyle">{{ initials }}</div>
      <transition name="fade-text">
        <div class="c-user-info" v-if="!isCollapsed">
          <p class="c-user-name">{{ customer?.name }}</p>
          <p class="c-user-role">Chủ nuôi thú cưng</p>
        </div>
      </transition>
    </div>

    <div class="c-sidebar-divider"></div>

    <!-- Navigation -->
    <nav class="c-sidebar-nav">
      <p class="c-nav-section" v-if="!isCollapsed">Tổng quan</p>
      <router-link
        v-for="item in mainNav"
        :key="item.to"
        :to="item.to"
        class="c-nav-item"
        :class="{ active: isActive(item.to) }"
        :data-tooltip="isCollapsed ? item.label : undefined"
      >
        <span class="c-nav-icon">{{ item.icon }}</span>
        <span class="c-nav-label" v-if="!isCollapsed">{{ item.label }}</span>
        <span v-if="item.badge && !isCollapsed" class="c-nav-badge">{{ item.badge }}</span>
      </router-link>

      <p class="c-nav-section mt" v-if="!isCollapsed">Thú cưng & Sức khỏe</p>
      <router-link
        v-for="item in petNav"
        :key="item.to"
        :to="item.to"
        class="c-nav-item"
        :class="{ active: isActive(item.to) }"
        :data-tooltip="isCollapsed ? item.label : undefined"
      >
        <span class="c-nav-icon">{{ item.icon }}</span>
        <span class="c-nav-label" v-if="!isCollapsed">{{ item.label }}</span>
        <span v-if="item.badge && !isCollapsed" class="c-nav-badge">{{ item.badge }}</span>
      </router-link>

      <p class="c-nav-section mt" v-if="!isCollapsed">Tài khoản</p>
      <router-link
        v-for="item in accountNav"
        :key="item.to"
        :to="item.to"
        class="c-nav-item"
        :class="{ active: isActive(item.to) }"
        :data-tooltip="isCollapsed ? item.label : undefined"
      >
        <span class="c-nav-icon">{{ item.icon }}</span>
        <span class="c-nav-label" v-if="!isCollapsed">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="c-sidebar-footer">
      <button class="c-collapse-btn" @click="isCollapsed = !isCollapsed" :data-tooltip="isCollapsed ? 'Mở rộng' : undefined">
        <span>{{ isCollapsed ? '▶' : '◀' }}</span>
        <span v-if="!isCollapsed">Thu gọn</span>
      </button>
      <button class="c-logout-btn" @click="handleLogout" :data-tooltip="isCollapsed ? 'Đăng xuất' : undefined">
        <span>🚪</span>
        <span v-if="!isCollapsed">Đăng xuất</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCustomerAuthStore } from '../stores/customerAuth'
import { useVaccineBookStore } from '../stores/vaccineBook'
import { useBookingsStore } from '../stores/bookings'

const route = useRoute()
const router = useRouter()
const auth = useCustomerAuthStore()
const vaccStore = useVaccineBookStore()
const bookStore = useBookingsStore()

const isCollapsed = ref(false)
const customer = computed(() => auth.customer)
const initials = computed(() => auth.initials)

const avatarStyle = computed(() => ({
  background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '700',
  fontSize: '15px',
  borderRadius: '50%',
  width: '42px',
  height: '42px',
  flexShrink: '0'
}))

const mainNav = computed(() => [
  { to: '/dashboard', icon: '🏠', label: 'Tổng quan' },
  {
    to: '/bookings', icon: '📅', label: 'Đặt lịch khám',
    badge: bookStore.upcomingBookings.length > 0 ? bookStore.upcomingBookings.length : undefined
  },
])

const petNav = computed(() => [
  { to: '/pets', icon: '🐾', label: 'Thú cưng của tôi' },
  { to: '/health', icon: '🏥', label: 'Hồ sơ sức khỏe' },
  {
    to: '/vaccinations', icon: '💉', label: 'Sổ tiêm phòng',
    badge: vaccStore.upcomingCount > 0 ? vaccStore.upcomingCount : undefined
  },
  { to: '/invoices', icon: '💰', label: 'Hóa đơn' },
])

const accountNav = [
  { to: '/profile', icon: '👤', label: 'Hồ sơ cá nhân' },
]

function isActive(path: string) {
  return route.path === path || route.path.startsWith(path + '/')
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.c-sidebar {
  width: 260px;
  background: #1A1A2E;
  position: fixed;
  left: 0; top: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s ease;
}

.c-sidebar.collapsed { width: 68px; }

.c-sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 14px;
  flex-shrink: 0;
}

.c-logo-icon {
  width: 42px; height: 42px;
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(255,107,107,0.4);
}

.c-logo-name { display: block; font-size: 17px; font-weight: 800; color: white; }
.c-logo-sub { display: block; font-size: 10px; color: #FF6B6B; margin-top: 1px; font-weight: 600; letter-spacing: 0.3px; }

.c-sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(255,107,107,0.08);
  border-radius: 10px;
  margin: 0 8px 4px;
  flex-shrink: 0;
}

.c-user-name { font-size: 13px; font-weight: 600; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; }
.c-user-role { font-size: 10px; color: #FF6B6B; margin-top: 1px; font-weight: 500; }

.c-sidebar-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 12px 14px; flex-shrink: 0; }

.c-sidebar-nav { flex: 1; padding: 0 8px; }

.c-nav-section {
  font-size: 10px; font-weight: 700; letter-spacing: 1px;
  color: #475569; text-transform: uppercase; padding: 0 8px 6px;
}
.c-nav-section.mt { margin-top: 16px; }

.c-nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px; border-radius: 10px; margin-bottom: 2px;
  color: #64748B; font-size: 14px; font-weight: 500;
  transition: all 0.2s ease; cursor: pointer; text-decoration: none;
  white-space: nowrap;
}
.c-nav-item:hover { background: rgba(255,255,255,0.05); color: #CBD5E1; }
.c-nav-item.active {
  background: linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,142,83,0.15));
  color: #FF6B6B; font-weight: 600;
  border: 1px solid rgba(255,107,107,0.2);
}

.c-nav-icon { font-size: 16px; width: 24px; text-align: center; flex-shrink: 0; }
.c-nav-label { flex: 1; }
.c-nav-badge {
  background: #EF4444; color: white; font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 9999px; min-width: 18px; text-align: center;
}

.c-sidebar-footer { padding: 10px 8px; border-top: 1px solid rgba(255,255,255,0.06); flex-shrink: 0; }

.c-collapse-btn, .c-logout-btn {
  width: 100%; display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: 10px; background: transparent;
  color: #64748B; font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 0.2s ease; border: none; white-space: nowrap; margin-bottom: 4px;
}
.c-collapse-btn:hover { background: rgba(255,255,255,0.06); color: #CBD5E1; }
.c-logout-btn:hover { background: rgba(239,68,68,0.1); color: #EF4444; }

.fade-text-enter-active, .fade-text-leave-active { transition: opacity 0.2s ease; }
.fade-text-enter-from, .fade-text-leave-to { opacity: 0; }
</style>

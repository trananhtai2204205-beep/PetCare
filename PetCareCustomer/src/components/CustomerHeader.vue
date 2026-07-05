<template>
  <header class="c-header">
    <!-- Page title -->
    <div class="c-header-left">
      <h1 class="c-header-title">{{ pageTitle }}</h1>
      <p class="c-header-sub">{{ pageSubtitle }}</p>
    </div>

    <!-- Right actions -->
    <div class="c-header-right">
      <!-- Notifications -->
      <div class="c-notif-wrap" ref="notifRef">
        <button class="c-icon-btn" @click="showNotifs = !showNotifs" id="notif-btn">
          <span>🔔</span>
          <span v-if="unreadCount > 0" class="c-notif-dot">{{ unreadCount }}</span>
        </button>

        <transition name="dropdown">
          <div class="c-notif-dropdown" v-if="showNotifs">
            <div class="c-notif-header">
              <span class="font-bold">Thông báo</span>
              <button class="text-sm text-primary-color" @click="markAllRead">Đọc tất cả</button>
            </div>
            <div class="c-notif-list">
              <div
                v-for="n in notifications.slice(0, 5)"
                :key="n.id"
                class="c-notif-item"
                :class="{ unread: !n.read }"
                @click="markNotifRead(n.id)"
              >
                <div class="c-notif-icon">{{ notifIcon(n.type) }}</div>
                <div class="c-notif-body">
                  <p class="c-notif-title">{{ n.title }}</p>
                  <p class="c-notif-msg">{{ n.message }}</p>
                  <p class="c-notif-time">{{ formatRelativeTime(n.date) }}</p>
                </div>
              </div>
              <div v-if="notifications.length === 0" class="empty-state" style="padding: 24px">
                <p>Không có thông báo</p>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- User menu -->
      <div class="c-user-menu" ref="userMenuRef">
        <button class="c-user-btn" @click="showUserMenu = !showUserMenu" id="user-menu-btn">
          <div class="c-user-avatar-sm">{{ initials }}</div>
          <div class="c-user-info-sm">
            <span class="c-user-name-sm">{{ customer?.name }}</span>
            <span class="c-user-role-sm">Chủ nuôi</span>
          </div>
          <span class="c-chevron" :class="{ open: showUserMenu }">▾</span>
        </button>

        <transition name="dropdown">
          <div class="c-user-dropdown" v-if="showUserMenu">
            <router-link to="/profile" class="c-dd-item" @click="showUserMenu = false">
              <span>👤</span> Hồ sơ cá nhân
            </router-link>
            <router-link to="/invoices" class="c-dd-item" @click="showUserMenu = false">
              <span>💰</span> Hóa đơn của tôi
            </router-link>
            <hr class="c-dd-divider" />
            <button class="c-dd-item danger" @click="handleLogout">
              <span>🚪</span> Đăng xuất
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCustomerAuthStore } from '../stores/customerAuth'
import { useVaccineBookStore } from '../stores/vaccineBook'

const route = useRoute()
const router = useRouter()
const auth = useCustomerAuthStore()
const vaccStore = useVaccineBookStore()

const showNotifs = ref(false)
const showUserMenu = ref(false)
const notifRef = ref<HTMLElement | null>(null)
const userMenuRef = ref<HTMLElement | null>(null)

const customer = computed(() => auth.customer)
const initials = computed(() => auth.initials)
const notifications = computed(() => vaccStore.notifications)
const unreadCount = computed(() => vaccStore.unreadNotifCount)

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: '🏠 Tổng quan', subtitle: 'Xin chào! Theo dõi thú cưng và lịch hẹn của bạn.' },
  '/pets': { title: '🐾 Thú cưng của tôi', subtitle: 'Quản lý hồ sơ các bé cưng.' },
  '/bookings': { title: '📅 Đặt lịch khám', subtitle: 'Tạo và theo dõi lịch hẹn khám.' },
  '/health': { title: '🏥 Hồ sơ sức khỏe', subtitle: 'Lịch sử khám bệnh và đơn thuốc.' },
  '/vaccinations': { title: '💉 Sổ tiêm phòng', subtitle: 'Theo dõi lịch tiêm và tẩy giun định kỳ.' },
  '/invoices': { title: '💰 Hóa đơn', subtitle: 'Lịch sử thanh toán và hóa đơn dịch vụ.' },
  '/profile': { title: '👤 Hồ sơ cá nhân', subtitle: 'Cập nhật thông tin tài khoản.' },
}

const pageTitle = computed(() => pageMeta[route.path]?.title || 'PetCare')
const pageSubtitle = computed(() => pageMeta[route.path]?.subtitle || '')

function notifIcon(type: string) {
  const map: Record<string, string> = { vaccine: '💉', appointment: '📅', invoice: '💰', health: '🏥' }
  return map[type] || '🔔'
}

function formatRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins} phút trước`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} giờ trước`
  return `${Math.floor(hours / 24)} ngày trước`
}

function markNotifRead(id: string) { vaccStore.markNotifRead(id) }
function markAllRead() { vaccStore.markAllRead() }

function handleLogout() {
  showUserMenu.value = false
  auth.logout()
  router.push('/login')
}

function handleOutsideClick(e: MouseEvent) {
  if (notifRef.value && !notifRef.value.contains(e.target as Node)) showNotifs.value = false
  if (userMenuRef.value && !userMenuRef.value.contains(e.target as Node)) showUserMenu.value = false
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))
</script>

<style scoped>
.c-header {
  height: 64px; background: white;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 28px; position: sticky; top: 0; z-index: 50;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.c-header-left {}
.c-header-title { font-size: 18px; font-weight: 700; color: var(--text-primary); }
.c-header-sub { font-size: 12px; color: var(--text-muted); margin-top: 1px; }

.c-header-right { display: flex; align-items: center; gap: 10px; }

.c-icon-btn {
  width: 40px; height: 40px; border-radius: 10px;
  background: var(--bg-hover); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; cursor: pointer; position: relative; transition: all 0.2s;
}
.c-icon-btn:hover { background: var(--border); }

.c-notif-dot {
  position: absolute; top: 4px; right: 4px;
  background: #EF4444; color: white; font-size: 9px; font-weight: 700;
  border-radius: 9999px; min-width: 16px; height: 16px;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid white;
}

.c-notif-wrap, .c-user-menu { position: relative; }

.c-notif-dropdown {
  position: absolute; top: calc(100% + 10px); right: 0;
  width: 360px; background: white; border-radius: 14px;
  border: 1px solid var(--border); box-shadow: var(--shadow-lg);
  z-index: 999; overflow: hidden;
}

.c-notif-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; border-bottom: 1px solid var(--border);
  font-size: 14px; font-weight: 600;
}

.c-notif-list { max-height: 360px; overflow-y: auto; }

.c-notif-item {
  display: flex; gap: 12px; padding: 14px 16px;
  border-bottom: 1px solid var(--border); cursor: pointer;
  transition: background 0.15s;
}
.c-notif-item:hover { background: var(--bg-hover); }
.c-notif-item.unread { background: #FFF7F5; }
.c-notif-item:last-child { border-bottom: none; }

.c-notif-icon { font-size: 20px; flex-shrink: 0; width: 32px; text-align: center; margin-top: 2px; }
.c-notif-title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.c-notif-msg { font-size: 12px; color: var(--text-secondary); margin-top: 2px; line-height: 1.5; }
.c-notif-time { font-size: 11px; color: var(--text-muted); margin-top: 4px; }

.c-user-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 6px 10px 6px 6px; border-radius: 10px;
  background: var(--bg-hover); border: 1px solid var(--border);
  cursor: pointer; transition: all 0.2s;
}
.c-user-btn:hover { background: var(--border); }

.c-user-avatar-sm {
  width: 32px; height: 32px; border-radius: 50%;
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  color: white; font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}

.c-user-name-sm { display: block; font-size: 13px; font-weight: 600; color: var(--text-primary); }
.c-user-role-sm { display: block; font-size: 11px; color: var(--text-muted); }

.c-chevron { font-size: 12px; color: var(--text-muted); transition: transform 0.2s; }
.c-chevron.open { transform: rotate(180deg); }

.c-user-dropdown {
  position: absolute; top: calc(100% + 10px); right: 0;
  width: 200px; background: white; border-radius: 14px;
  border: 1px solid var(--border); box-shadow: var(--shadow-lg);
  z-index: 999; padding: 6px;
}

.c-dd-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 8px; font-size: 14px;
  color: var(--text-primary); cursor: pointer; text-decoration: none;
  transition: background 0.15s; width: 100%; background: transparent; border: none;
}
.c-dd-item:hover { background: var(--bg-hover); }
.c-dd-item.danger { color: #EF4444; }
.c-dd-item.danger:hover { background: #FEE2E2; }

.c-dd-divider { border: none; border-top: 1px solid var(--border); margin: 4px 0; }

.dropdown-enter-active, .dropdown-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px); }
</style>

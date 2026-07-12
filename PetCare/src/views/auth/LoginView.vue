<template>
  <div class="auth-page">
    <div class="auth-bg">
      <div class="bg-shape-1"></div>
      <div class="bg-shape-2"></div>
      <div class="bg-shape-3"></div>
    </div>

    <div class="auth-left">
      <div class="brand">
        <div class="brand-icon">🐾</div>
        <div>
          <h1 class="brand-name">PetCare</h1>
          <p class="brand-sub">Hệ thống quản lý phòng khám thú y</p>
        </div>
      </div>

      <div class="auth-illustration">
        <div class="illustration-card">
          <div class="illus-row">
            <div class="illus-stat">
              <p class="illus-num">248</p>
              <p class="illus-label">Ca khám hôm nay</p>
            </div>
            <div class="illus-stat">
              <p class="illus-num">94%</p>
              <p class="illus-label">Tỷ lệ hoàn thành</p>
            </div>
            <div class="illus-stat">
              <p class="illus-num">1.2k</p>
              <p class="illus-label">Thú cưng</p>
            </div>
          </div>
          <p class="illus-desc">Quản lý toàn bộ hoạt động khám chữa bệnh thú y một cách thông minh và hiệu quả.</p>
        </div>
      </div>

      <p class="auth-tagline">"Chăm sóc tận tâm — Sức khỏe toàn diện"</p>
    </div>

    <div class="auth-right">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo-sm">🐾</div>
          <h2 class="auth-title">Chào mừng trở lại!</h2>
          <p class="auth-subtitle">Đăng nhập vào tài khoản bác sĩ của bạn</p>
        </div>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label class="form-label">Email</label>
            <div class="input-group">
              <span class="input-icon">✉️</span>
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="doctor@petcare.vn"
                required
                autocomplete="email"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label class="form-label">Mật khẩu</label>
              <router-link to="/forgot-password" class="forgot-link">Quên mật khẩu?</router-link>
            </div>
            <div class="input-group">
              <span class="input-icon">🔒</span>
              <input
                v-model="password"
                :type="showPass ? 'text' : 'password'"
                class="form-control"
                placeholder="Nhập mật khẩu"
                required
              />
              <span class="input-icon-right" @click="showPass = !showPass">
                {{ showPass ? '🙈' : '👁️' }}
              </span>
            </div>
          </div>

          <div class="remember-row">
            <label class="checkbox-label">
              <input v-model="remember" type="checkbox" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
          </div>

          <div v-if="error" class="alert-error">⚠️ {{ error }}</div>

          <button type="submit" class="btn btn-primary btn-full btn-lg" :disabled="isLoading">
            <span v-if="isLoading" class="spinner"></span>
            <span>{{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}</span>
          </button>
        </form>

        <div class="demo-hint">
          <p>💡 Demo: Nhập bất kỳ email + mật khẩu (≥6 ký tự)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPass = ref(false)
const error = ref('')
const isLoading = ref(false)

async function handleLogin() {
  error.value = ''
  isLoading.value = true
  const ok = await auth.login(email.value, password.value)
  isLoading.value = false
  if (ok) {
    router.push('/dashboard')
  } else {
    error.value = 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.'
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
}

.auth-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bg-shape-1 {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%);
  top: -200px;
  left: -100px;
  border-radius: 50%;
}

.bg-shape-2 {
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
  bottom: -100px;
  left: 200px;
  border-radius: 50%;
}

.bg-shape-3 {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%);
  top: 50%;
  right: 200px;
  border-radius: 50%;
}

.auth-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%);
  position: relative;
  z-index: 1;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 60px;
}

.brand-icon {
  width: 54px;
  height: 54px;
  background: linear-gradient(135deg, #0EA5E9, #6366F1);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  box-shadow: 0 8px 24px rgba(14,165,233,0.4);
}

.brand-name { font-size: 26px; font-weight: 800; color: white; }
.brand-sub { font-size: 13px; color: #64748B; margin-top: 2px; }

.illustration-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 28px;
  backdrop-filter: blur(10px);
  margin-bottom: 40px;
}

.illus-row {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
}

.illus-stat {}
.illus-num { font-size: 28px; font-weight: 800; color: #0EA5E9; }
.illus-label { font-size: 12px; color: #64748B; margin-top: 2px; }
.illus-desc { font-size: 14px; color: #94A3B8; line-height: 1.7; }

.auth-tagline {
  font-size: 15px;
  color: #475569;
  font-style: italic;
}

.auth-right {
  width: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #F8FAFC;
  position: relative;
  z-index: 1;
}

.auth-card {
  width: 100%;
  max-width: 400px;
}

.auth-header { text-align: center; margin-bottom: 32px; }

.auth-logo-sm {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #0EA5E9, #6366F1);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 16px;
  box-shadow: 0 8px 24px rgba(14,165,233,0.3);
}

.auth-title { font-size: 24px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; }
.auth-subtitle { font-size: 14px; color: var(--text-muted); }

.auth-form {}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.label-row .form-label { margin-bottom: 0; }

.forgot-link { font-size: 13px; color: var(--primary); font-weight: 500; }
.forgot-link:hover { text-decoration: underline; }

.remember-row { margin-bottom: 20px; }

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
}

.checkbox-label input { accent-color: var(--primary); }

.alert-error {
  background: #FEE2E2;
  border: 1px solid #FECACA;
  color: #991B1B;
  border-radius: var(--radius-md);
  padding: 10px 14px;
  font-size: 13px;
  margin-bottom: 16px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.demo-hint {
  margin-top: 20px;
  padding: 12px 16px;
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: var(--radius-md);
  font-size: 12px;
  color: #0369A1;
  text-align: center;
}
</style>

<template>
  <div class="auth-page">
    <div class="auth-bg">
      <div class="bg-shape-1"></div>
      <div class="bg-shape-2"></div>
      <div class="bg-shape-3"></div>
    </div>

    <!-- Left panel -->
    <div class="auth-left">
      <div class="brand">
        <div class="brand-icon">🐾</div>
        <div>
          <h1 class="brand-name">PetCare</h1>
          <p class="brand-sub">Cổng thông tin khách hàng</p>
        </div>
      </div>
      <div class="auth-illustration">
        <div class="illustration-card">
          <div class="illus-row">
            <div class="illus-stat">
              <p class="illus-num" style="color:#FF6B6B">1.2k</p>
              <p class="illus-label">Thú cưng</p>
            </div>
            <div class="illus-stat">
              <p class="illus-num" style="color:#4ECDC4">94%</p>
              <p class="illus-label">Hài lòng</p>
            </div>
            <div class="illus-stat">
              <p class="illus-num" style="color:#FFE66D">50+</p>
              <p class="illus-label">Bác sĩ</p>
            </div>
          </div>
          <p class="illus-desc">Theo dõi sức khỏe thú cưng, đặt lịch khám và nhận thông báo nhắc nhở tiêm phòng tại bất kỳ đâu.</p>
        </div>
        <div class="feature-tags">
          <span class="feature-tag">🐶 Quản lý thú cưng</span>
          <span class="feature-tag">📅 Đặt lịch online</span>
          <span class="feature-tag">💉 Sổ tiêm phòng</span>
          <span class="feature-tag">💊 Đơn thuốc</span>
        </div>
      </div>
      <p class="auth-tagline">"Thú cưng khỏe mạnh — Chủ nuôi an tâm"</p>
    </div>

    <!-- Right form panel -->
    <div class="auth-right">
      <div class="auth-card">
        <!-- Toggle login/register -->
        <div class="auth-tabs">
          <button :class="['auth-tab', { active: mode === 'login' }]" @click="mode = 'login'">Đăng nhập</button>
          <button :class="['auth-tab', { active: mode === 'register' }]" @click="mode = 'register'">Đăng ký</button>
        </div>

        <!-- LOGIN FORM -->
        <div v-if="mode === 'login'">
          <div class="auth-header">
            <div class="auth-logo-sm">🐾</div>
            <h2 class="auth-title">Chào mừng trở lại!</h2>
            <p class="auth-subtitle">Đăng nhập để quản lý thú cưng của bạn</p>
          </div>

          <form @submit.prevent="handleLogin" class="auth-form">
            <div class="form-group">
              <label class="form-label">Email hoặc Số điện thoại</label>
              <div class="input-group">
                <span class="input-icon">✉️</span>
                <input v-model="loginForm.email" type="text" class="form-control" placeholder="email@gmail.com" required />
              </div>
            </div>
            <div class="form-group">
              <div class="label-row">
                <label class="form-label">Mật khẩu</label>
                <router-link to="/forgot-password" class="forgot-link">Quên mật khẩu?</router-link>
              </div>
              <div class="input-group">
                <span class="input-icon">🔒</span>
                <input v-model="loginForm.password" :type="showPass ? 'text' : 'password'" class="form-control" placeholder="Nhập mật khẩu" required />
                <span class="input-icon-right" @click="showPass = !showPass">{{ showPass ? '🙈' : '👁️' }}</span>
              </div>
            </div>
            <div v-if="loginError" class="alert-error">⚠️ {{ loginError }}</div>
            <button type="submit" class="btn btn-customer btn-full btn-lg" :disabled="auth.isLoading">
              <span v-if="auth.isLoading" class="spinner"></span>
              {{ auth.isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
            </button>
          </form>

          <div class="demo-hint">
            💡 Demo: Nhập bất kỳ email + mật khẩu (≥6 ký tự)
          </div>
        </div>

        <!-- REGISTER FORM -->
        <div v-else>
          <div class="auth-header">
            <div class="auth-logo-sm">🐾</div>
            <h2 class="auth-title">Tạo tài khoản</h2>
            <p class="auth-subtitle">Đăng ký để bắt đầu chăm sóc thú cưng</p>
          </div>

          <form @submit.prevent="handleRegister" class="auth-form">
            <div class="form-group">
              <label class="form-label">Họ và tên</label>
              <div class="input-group">
                <span class="input-icon">👤</span>
                <input v-model="regForm.name" type="text" class="form-control" placeholder="Nguyễn Thị Lan" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <div class="input-group">
                <span class="input-icon">✉️</span>
                <input v-model="regForm.email" type="email" class="form-control" placeholder="email@gmail.com" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Số điện thoại</label>
              <div class="input-group">
                <span class="input-icon">📱</span>
                <input v-model="regForm.phone" type="tel" class="form-control" placeholder="0912 345 678" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Mật khẩu</label>
              <div class="input-group">
                <span class="input-icon">🔒</span>
                <input v-model="regForm.password" :type="showPass ? 'text' : 'password'" class="form-control" placeholder="Tối thiểu 6 ký tự" required minlength="6" />
                <span class="input-icon-right" @click="showPass = !showPass">{{ showPass ? '🙈' : '👁️' }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Xác nhận mật khẩu</label>
              <div class="input-group">
                <span class="input-icon">🔒</span>
                <input v-model="regForm.confirmPassword" :type="showPass ? 'text' : 'password'" class="form-control" placeholder="Nhập lại mật khẩu" required />
              </div>
            </div>
            <div v-if="regError" class="alert-error">⚠️ {{ regError }}</div>
            <button type="submit" class="btn btn-customer btn-full btn-lg" :disabled="auth.isLoading">
              <span v-if="auth.isLoading" class="spinner"></span>
              {{ auth.isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomerAuthStore } from '../../stores/customerAuth'

const router = useRouter()
const auth = useCustomerAuthStore()

const mode = ref<'login' | 'register'>('login')
const showPass = ref(false)
const loginError = ref('')
const regError = ref('')

const loginForm = ref({ email: '', password: '' })
const regForm = ref({ name: '', email: '', phone: '', password: '', confirmPassword: '' })

async function handleLogin() {
  loginError.value = ''
  const ok = await auth.login(loginForm.value.email, loginForm.value.password)
  if (ok) router.push('/dashboard')
  else loginError.value = 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.'
}

async function handleRegister() {
  regError.value = ''
  if (regForm.value.password !== regForm.value.confirmPassword) {
    regError.value = 'Mật khẩu xác nhận không khớp.'
    return
  }
  const ok = await auth.register({
    name: regForm.value.name,
    email: regForm.value.email,
    phone: regForm.value.phone,
    password: regForm.value.password
  })
  if (ok) router.push('/dashboard')
  else regError.value = 'Đăng ký thất bại. Vui lòng thử lại.'
}
</script>

<style scoped>
.auth-page { min-height: 100vh; display: flex; position: relative; overflow: hidden; }
.auth-bg { position: absolute; inset: 0; z-index: 0; }
.bg-shape-1 { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(255,107,107,0.12) 0%, transparent 70%); top: -200px; left: -100px; border-radius: 50%; }
.bg-shape-2 { position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, rgba(78,205,196,0.10) 0%, transparent 70%); bottom: -100px; left: 200px; border-radius: 50%; }
.bg-shape-3 { position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, rgba(255,230,109,0.08) 0%, transparent 70%); top: 50%; right: 200px; border-radius: 50%; }

.auth-left {
  flex: 1; display: flex; flex-direction: column; justify-content: center;
  padding: 60px; background: linear-gradient(135deg, #0F172A 0%, #1A1A2E 50%, #0F172A 100%);
  position: relative; z-index: 1;
}
.brand { display: flex; align-items: center; gap: 14px; margin-bottom: 50px; }
.brand-icon {
  width: 54px; height: 54px;
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  border-radius: 14px; display: flex; align-items: center; justify-content: center;
  font-size: 26px; box-shadow: 0 8px 24px rgba(255,107,107,0.4);
}
.brand-name { font-size: 26px; font-weight: 800; color: white; }
.brand-sub { font-size: 13px; color: #FF6B6B; margin-top: 2px; font-weight: 500; }
.illustration-card {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 28px; backdrop-filter: blur(10px); margin-bottom: 24px;
}
.illus-row { display: flex; gap: 24px; margin-bottom: 20px; }
.illus-num { font-size: 28px; font-weight: 800; }
.illus-label { font-size: 12px; color: #64748B; margin-top: 2px; }
.illus-desc { font-size: 14px; color: #94A3B8; line-height: 1.7; }
.feature-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
.feature-tag {
  padding: 6px 14px; background: rgba(255,107,107,0.12);
  border: 1px solid rgba(255,107,107,0.2); border-radius: 9999px;
  font-size: 12px; color: #FF6B6B; font-weight: 500;
}
.auth-tagline { font-size: 15px; color: #475569; font-style: italic; }

.auth-right {
  width: 520px; display: flex; align-items: center; justify-content: center;
  padding: 40px; background: #F8FAFC; position: relative; z-index: 1; overflow-y: auto;
}
.auth-card { width: 100%; max-width: 420px; }

.auth-tabs {
  display: flex; background: var(--bg-hover); border-radius: 10px;
  padding: 4px; gap: 4px; margin-bottom: 28px; border: 1px solid var(--border);
}
.auth-tab {
  flex: 1; padding: 9px; border-radius: 8px; font-size: 14px; font-weight: 500;
  color: var(--text-secondary); cursor: pointer; transition: all 0.2s;
  background: transparent; border: none;
}
.auth-tab.active { background: white; color: #FF6B6B; font-weight: 600; box-shadow: var(--shadow-sm); }

.auth-header { text-align: center; margin-bottom: 28px; }
.auth-logo-sm {
  width: 56px; height: 56px;
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  border-radius: 16px; display: flex; align-items: center; justify-content: center;
  font-size: 26px; margin: 0 auto 14px; box-shadow: 0 8px 24px rgba(255,107,107,0.3);
}
.auth-title { font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
.auth-subtitle { font-size: 14px; color: var(--text-muted); }

.label-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.label-row .form-label { margin-bottom: 0; }
.forgot-link { font-size: 13px; color: #FF6B6B; font-weight: 500; }
.forgot-link:hover { text-decoration: underline; }

.btn-customer {
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  color: white; border: none;
  box-shadow: 0 4px 14px rgba(255,107,107,0.35);
}
.btn-customer:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(255,107,107,0.45); }
.btn-customer:disabled { opacity: 0.7; transform: none; cursor: not-allowed; }

.alert-error {
  background: #FEE2E2; border: 1px solid #FECACA; color: #991B1B;
  border-radius: var(--radius-md); padding: 10px 14px; font-size: 13px; margin-bottom: 16px;
}
.spinner {
  width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }
.demo-hint {
  margin-top: 20px; padding: 12px 16px;
  background: #FFF7F5; border: 1px solid #FECACA;
  border-radius: var(--radius-md); font-size: 12px; color: #CC4444; text-align: center;
}
</style>

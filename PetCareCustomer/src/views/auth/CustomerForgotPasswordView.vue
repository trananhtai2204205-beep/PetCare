<template>
  <div class="auth-page">
    <div class="auth-bg">
      <div class="bg-shape-1"></div><div class="bg-shape-2"></div>
    </div>

    <div class="auth-left">
      <div class="brand">
        <div class="brand-icon">🐾</div>
        <div>
          <h1 class="brand-name">PetCare</h1>
          <p class="brand-sub">Khôi phục tài khoản</p>
        </div>
      </div>
      <p class="brand-desc">Đừng lo lắng! Chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào tài khoản và tiếp tục chăm sóc thú cưng yêu quý.</p>
      <p class="auth-tagline">"Thú cưng khỏe mạnh — Chủ nuôi an tâm"</p>
    </div>

    <div class="auth-right">
      <div class="auth-card">
        <button class="back-btn" @click="router.push('/login')">← Quay lại đăng nhập</button>

        <!-- Step 1: Email -->
        <div v-if="step === 1">
          <div class="auth-header">
            <div class="step-icon">✉️</div>
            <h2 class="auth-title">Quên mật khẩu?</h2>
            <p class="auth-subtitle">Nhập email đăng ký để nhận mã xác minh</p>
          </div>
          <form @submit.prevent="handleSendEmail">
            <div class="form-group">
              <label class="form-label">Email</label>
              <div class="input-group">
                <span class="input-icon">✉️</span>
                <input v-model="email" type="email" class="form-control" placeholder="email@gmail.com" required />
              </div>
            </div>
            <button type="submit" class="btn btn-customer btn-full btn-lg" :disabled="isLoading">
              <span v-if="isLoading" class="spinner"></span>
              {{ isLoading ? 'Đang gửi...' : 'Gửi mã xác minh' }}
            </button>
          </form>
        </div>

        <!-- Step 2: OTP -->
        <div v-else-if="step === 2">
          <div class="auth-header">
            <div class="step-icon">🔑</div>
            <h2 class="auth-title">Nhập mã xác minh</h2>
            <p class="auth-subtitle">Mã OTP đã gửi đến <strong>{{ email }}</strong></p>
          </div>
          <form @submit.prevent="handleVerifyOTP">
            <div class="otp-inputs">
              <input v-for="i in 6" :key="i" type="text" maxlength="1" class="otp-input" :ref="el => { if (el) otpRefs[i-1] = el as HTMLInputElement }" @input="onOtpInput($event, i-1)" @keydown="onOtpKeydown($event, i-1)" />
            </div>
            <p class="otp-hint">Mã sẽ hết hạn sau <strong>5:00</strong></p>
            <button type="submit" class="btn btn-customer btn-full btn-lg" :disabled="isLoading || otp.join('').length < 6">
              <span v-if="isLoading" class="spinner"></span>
              {{ isLoading ? 'Đang xác minh...' : 'Xác minh mã' }}
            </button>
            <button type="button" class="btn btn-secondary btn-full mt-2" @click="handleSendEmail">Gửi lại mã</button>
          </form>
        </div>

        <!-- Step 3: New password -->
        <div v-else-if="step === 3">
          <div class="auth-header">
            <div class="step-icon">🔒</div>
            <h2 class="auth-title">Đặt mật khẩu mới</h2>
            <p class="auth-subtitle">Tạo mật khẩu mạnh cho tài khoản của bạn</p>
          </div>
          <form @submit.prevent="handleReset">
            <div class="form-group">
              <label class="form-label">Mật khẩu mới</label>
              <div class="input-group">
                <span class="input-icon">🔒</span>
                <input v-model="newPass" :type="showPass ? 'text' : 'password'" class="form-control" placeholder="Tối thiểu 6 ký tự" required minlength="6" />
                <span class="input-icon-right" @click="showPass = !showPass">{{ showPass ? '🙈' : '👁️' }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Xác nhận mật khẩu</label>
              <div class="input-group">
                <span class="input-icon">🔒</span>
                <input v-model="confirmPass" :type="showPass ? 'text' : 'password'" class="form-control" placeholder="Nhập lại mật khẩu" required />
              </div>
            </div>
            <div v-if="passError" class="alert-error">⚠️ {{ passError }}</div>
            <button type="submit" class="btn btn-customer btn-full btn-lg" :disabled="isLoading">
              <span v-if="isLoading" class="spinner"></span>
              {{ isLoading ? 'Đang cập nhật...' : 'Đặt mật khẩu mới' }}
            </button>
          </form>
        </div>

        <!-- Step 4: Success -->
        <div v-else class="success-state">
          <div class="success-icon">✅</div>
          <h2 class="auth-title">Mật khẩu đã được đặt lại!</h2>
          <p class="auth-subtitle">Tài khoản của bạn đã được khôi phục thành công.</p>
          <button class="btn btn-customer btn-full btn-lg mt-4" @click="router.push('/login')">Đăng nhập ngay</button>
        </div>

        <!-- Progress dots -->
        <div class="step-dots" v-if="step <= 3">
          <div v-for="i in 3" :key="i" class="step-dot" :class="{ active: i <= step }"></div>
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

const step = ref(1)
const email = ref('')
const otp = ref(Array(6).fill(''))
const otpRefs = ref<HTMLInputElement[]>([])
const newPass = ref('')
const confirmPass = ref('')
const showPass = ref(false)
const isLoading = ref(false)
const passError = ref('')

async function handleSendEmail() {
  isLoading.value = true
  await auth.sendResetEmail(email.value)
  isLoading.value = false
  step.value = 2
}

function onOtpInput(e: Event, idx: number) {
  const val = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  otp.value[idx] = val.slice(-1)
  if (val && idx < 5) otpRefs.value[idx + 1]?.focus()
}

function onOtpKeydown(e: KeyboardEvent, idx: number) {
  if (e.key === 'Backspace' && !otp.value[idx] && idx > 0) otpRefs.value[idx - 1]?.focus()
}

async function handleVerifyOTP() {
  isLoading.value = true
  const ok = await auth.verifyOTP(otp.value.join(''))
  isLoading.value = false
  if (ok) step.value = 3
}

async function handleReset() {
  passError.value = ''
  if (newPass.value !== confirmPass.value) { passError.value = 'Mật khẩu không khớp.'; return }
  isLoading.value = true
  await auth.resetPassword(newPass.value)
  isLoading.value = false
  step.value = 4
}
</script>

<style scoped>
.auth-page { min-height: 100vh; display: flex; position: relative; overflow: hidden; }
.auth-bg { position: absolute; inset: 0; z-index: 0; }
.bg-shape-1 { position: absolute; width: 500px; height: 500px; background: radial-gradient(circle, rgba(255,107,107,0.12), transparent 70%); top: -150px; left: -100px; border-radius: 50%; }
.bg-shape-2 { position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, rgba(78,205,196,0.08), transparent 70%); bottom: -100px; right: 100px; border-radius: 50%; }

.auth-left {
  flex: 1; display: flex; flex-direction: column; justify-content: center;
  padding: 60px; background: linear-gradient(135deg, #0F172A, #1A1A2E); position: relative; z-index: 1;
}
.brand { display: flex; align-items: center; gap: 14px; margin-bottom: 32px; }
.brand-icon { width: 54px; height: 54px; background: linear-gradient(135deg, #FF6B6B, #FF8E53); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px; box-shadow: 0 8px 24px rgba(255,107,107,0.4); }
.brand-name { font-size: 26px; font-weight: 800; color: white; }
.brand-sub { font-size: 13px; color: #FF6B6B; margin-top: 2px; font-weight: 500; }
.brand-desc { font-size: 15px; color: #94A3B8; line-height: 1.8; max-width: 360px; margin-bottom: 40px; }
.auth-tagline { font-size: 15px; color: #475569; font-style: italic; }

.auth-right { width: 520px; display: flex; align-items: center; justify-content: center; padding: 40px; background: #F8FAFC; position: relative; z-index: 1; }
.auth-card { width: 100%; max-width: 400px; }

.back-btn { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); background: none; border: none; cursor: pointer; margin-bottom: 28px; padding: 0; }
.back-btn:hover { color: #FF6B6B; }

.auth-header { text-align: center; margin-bottom: 28px; }
.step-icon { font-size: 40px; margin-bottom: 14px; }
.auth-title { font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; }
.auth-subtitle { font-size: 14px; color: var(--text-muted); }

.otp-inputs { display: flex; gap: 10px; justify-content: center; margin-bottom: 16px; }
.otp-input {
  width: 48px; height: 54px; text-align: center; font-size: 22px; font-weight: 700;
  border: 1.5px solid var(--border); border-radius: var(--radius-md);
  background: white; color: var(--text-primary); transition: border-color 0.2s;
}
.otp-input:focus { border-color: #FF6B6B; box-shadow: 0 0 0 3px rgba(255,107,107,0.12); outline: none; }
.otp-hint { text-align: center; font-size: 13px; color: var(--text-muted); margin-bottom: 20px; }

.btn-customer { background: linear-gradient(135deg, #FF6B6B, #FF8E53); color: white; border: none; box-shadow: 0 4px 14px rgba(255,107,107,0.35); }
.btn-customer:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(255,107,107,0.45); }
.btn-customer:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

.alert-error { background: #FEE2E2; border: 1px solid #FECACA; color: #991B1B; border-radius: var(--radius-md); padding: 10px 14px; font-size: 13px; margin-bottom: 16px; }
.spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; margin-right: 4px; }
@keyframes spin { to { transform: rotate(360deg); } }

.success-state { text-align: center; padding: 20px 0; }
.success-icon { font-size: 60px; margin-bottom: 20px; }

.step-dots { display: flex; gap: 8px; justify-content: center; margin-top: 28px; }
.step-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); transition: background 0.2s; }
.step-dot.active { background: #FF6B6B; }
</style>

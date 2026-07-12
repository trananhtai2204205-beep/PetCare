<template>
  <div class="auth-page">
    <div class="auth-bg">
      <div class="bg-shape-1"></div>
      <div class="bg-shape-2"></div>
    </div>

    <div class="forgot-container">
      <router-link to="/login" class="back-link">← Quay lại đăng nhập</router-link>

      <div class="forgot-card">
        <div class="forgot-icon">🔐</div>
        <h2 class="forgot-title">Quên mật khẩu?</h2>
        <p class="forgot-sub">Đừng lo! Chúng tôi sẽ giúp bạn đặt lại mật khẩu</p>

        <!-- Step Indicator -->
        <div class="steps">
          <div v-for="(s, i) in steps" :key="i" class="step-item">
            <div class="step-circle" :class="{ active: step === i + 1, done: step > i + 1 }">
              <span v-if="step > i + 1">✓</span>
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span class="step-label" :class="{ active: step === i + 1 }">{{ s }}</span>
            <div v-if="i < steps.length - 1" class="step-line" :class="{ done: step > i + 1 }"></div>
          </div>
        </div>

        <!-- Step 1: Enter email -->
        <form v-if="step === 1" @submit.prevent="handleSendEmail" class="forgot-form">
          <div class="form-group">
            <label class="form-label">Địa chỉ email</label>
            <div class="input-group">
              <span class="input-icon">✉️</span>
              <input v-model="email" type="email" class="form-control" placeholder="Nhập email đã đăng ký" required />
            </div>
            <p class="form-hint">Chúng tôi sẽ gửi mã OTP đến email này</p>
          </div>
          <button type="submit" class="btn btn-primary btn-full" :disabled="isLoading">
            <span v-if="isLoading" class="spinner"></span>
            {{ isLoading ? 'Đang gửi...' : 'Gửi mã OTP' }}
          </button>
        </form>

        <!-- Step 2: Enter OTP -->
        <form v-if="step === 2" @submit.prevent="handleVerifyOTP" class="forgot-form">
          <p class="otp-info">Mã OTP đã được gửi đến <strong>{{ email }}</strong></p>
          <div class="otp-inputs">
            <input
              v-for="(_, i) in 6"
              :key="i"
              v-model="otpDigits[i]"
              type="text"
              maxlength="1"
              class="otp-digit"
              @input="onOTPInput(i, $event)"
              @keydown.backspace="onOTPBackspace(i)"
              :ref="(el) => { if (el) otpRefs[i] = el as HTMLInputElement }"
            />
          </div>
          <div v-if="otpError" class="alert-error">⚠️ {{ otpError }}</div>
          <button type="submit" class="btn btn-primary btn-full" :disabled="isLoading">
            <span v-if="isLoading" class="spinner"></span>
            {{ isLoading ? 'Đang xác nhận...' : 'Xác nhận OTP' }}
          </button>
          <button type="button" class="resend-btn" @click="step = 1">← Gửi lại mã</button>
        </form>

        <!-- Step 3: New password -->
        <form v-if="step === 3" @submit.prevent="handleResetPassword" class="forgot-form">
          <div class="form-group">
            <label class="form-label">Mật khẩu mới</label>
            <div class="input-group">
              <span class="input-icon">🔒</span>
              <input v-model="newPassword" :type="showPass1 ? 'text' : 'password'" class="form-control" placeholder="Tối thiểu 6 ký tự" required minlength="6" />
              <span class="input-icon-right" @click="showPass1 = !showPass1">{{ showPass1 ? '🙈' : '👁️' }}</span>
            </div>
            <div class="password-strength" v-if="newPassword">
              <div class="strength-bar">
                <div class="strength-fill" :class="strengthClass" :style="{ width: strengthWidth }"></div>
              </div>
              <span class="strength-label" :class="strengthClass">{{ strengthLabel }}</span>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Xác nhận mật khẩu</label>
            <div class="input-group">
              <span class="input-icon">🔒</span>
              <input v-model="confirmPassword" :type="showPass2 ? 'text' : 'password'" class="form-control" placeholder="Nhập lại mật khẩu" required />
              <span class="input-icon-right" @click="showPass2 = !showPass2">{{ showPass2 ? '🙈' : '👁️' }}</span>
            </div>
            <p v-if="confirmPassword && newPassword !== confirmPassword" class="text-danger text-sm mt-1">⚠️ Mật khẩu không khớp</p>
          </div>
          <button type="submit" class="btn btn-primary btn-full" :disabled="isLoading || newPassword !== confirmPassword">
            <span v-if="isLoading" class="spinner"></span>
            {{ isLoading ? 'Đang đặt lại...' : 'Đặt lại mật khẩu' }}
          </button>
        </form>

        <!-- Step 4: Success -->
        <div v-if="step === 4" class="success-state">
          <div class="success-icon">✅</div>
          <h3>Đặt lại mật khẩu thành công!</h3>
          <p>Bạn có thể đăng nhập bằng mật khẩu mới</p>
          <router-link to="/login" class="btn btn-primary btn-full mt-4">Đến trang đăng nhập</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()
const step = ref(1)
const email = ref('')
const otpDigits = ref<string[]>(Array(6).fill(''))
const otpRefs = ref<HTMLInputElement[]>([])
const otpError = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showPass1 = ref(false)
const showPass2 = ref(false)
const isLoading = ref(false)

const steps = ['Nhập email', 'Xác nhận OTP', 'Mật khẩu mới']

const strengthClass = computed(() => {
  const len = newPassword.value.length
  if (len < 6) return 'weak'
  if (len < 10) return 'medium'
  return 'strong'
})
const strengthWidth = computed(() => {
  const len = newPassword.value.length
  if (len < 6) return '30%'
  if (len < 10) return '65%'
  return '100%'
})
const strengthLabel = computed(() => ({ weak: 'Yếu', medium: 'Trung bình', strong: 'Mạnh' }[strengthClass.value]))

async function handleSendEmail() {
  isLoading.value = true
  await auth.sendResetEmail(email.value)
  isLoading.value = false
  step.value = 2
}

function onOTPInput(i: number, e: Event) {
  const val = (e.target as HTMLInputElement).value
  otpDigits.value[i] = val.slice(-1)
  if (val && i < 5) otpRefs.value[i + 1]?.focus()
}

function onOTPBackspace(i: number) {
  if (!otpDigits.value[i] && i > 0) {
    otpDigits.value[i - 1] = ''
    otpRefs.value[i - 1]?.focus()
  }
}

async function handleVerifyOTP() {
  const otp = otpDigits.value.join('')
  if (otp.length < 6) { otpError.value = 'Vui lòng nhập đủ 6 chữ số'; return }
  isLoading.value = true
  otpError.value = ''
  await auth.verifyOTP(otp)
  isLoading.value = false
  step.value = 3
}

async function handleResetPassword() {
  if (newPassword.value !== confirmPassword.value) return
  isLoading.value = true
  await auth.resetPassword(newPassword.value)
  isLoading.value = false
  step.value = 4
}
</script>

<style scoped>
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0F172A, #1E293B); position: relative; overflow: hidden; }
.auth-bg { position: absolute; inset: 0; }
.bg-shape-1 { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%); top: -200px; left: -100px; border-radius: 50%; }
.bg-shape-2 { position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%); bottom: -100px; right: -100px; border-radius: 50%; }

.forgot-container { width: 100%; max-width: 500px; padding: 24px; position: relative; z-index: 1; }
.back-link { display: inline-flex; align-items: center; color: #64748B; font-size: 14px; margin-bottom: 24px; transition: color 0.2s; }
.back-link:hover { color: white; }

.forgot-card { background: white; border-radius: 24px; padding: 40px; box-shadow: var(--shadow-xl); }
.forgot-icon { font-size: 48px; text-align: center; margin-bottom: 12px; }
.forgot-title { font-size: 24px; font-weight: 800; text-align: center; color: var(--text-primary); margin-bottom: 6px; }
.forgot-sub { font-size: 14px; color: var(--text-muted); text-align: center; margin-bottom: 32px; }

.steps { display: flex; align-items: center; justify-content: center; margin-bottom: 32px; gap: 0; }
.step-item { display: flex; align-items: center; gap: 6px; }
.step-circle { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; background: #F1F5F9; color: var(--text-muted); transition: all 0.3s; flex-shrink: 0; }
.step-circle.active { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(14,165,233,0.4); }
.step-circle.done { background: var(--success); color: white; }
.step-label { font-size: 12px; color: var(--text-muted); white-space: nowrap; }
.step-label.active { color: var(--primary); font-weight: 600; }
.step-line { width: 32px; height: 2px; background: #E2E8F0; margin: 0 8px; transition: background 0.3s; }
.step-line.done { background: var(--success); }

.forgot-form {}
.form-hint { font-size: 12px; color: var(--text-muted); margin-top: 6px; }

.otp-info { font-size: 13px; color: var(--text-secondary); text-align: center; margin-bottom: 20px; }
.otp-inputs { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; }
.otp-digit { width: 46px; height: 54px; border: 2px solid var(--border); border-radius: 10px; text-align: center; font-size: 22px; font-weight: 700; color: var(--text-primary); transition: all 0.2s; }
.otp-digit:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(14,165,233,0.15); }

.alert-error { background: #FEE2E2; border: 1px solid #FECACA; color: #991B1B; border-radius: var(--radius-md); padding: 10px 14px; font-size: 13px; margin-bottom: 16px; }
.resend-btn { width: 100%; margin-top: 12px; background: none; border: none; color: var(--primary); font-size: 14px; cursor: pointer; padding: 8px; }
.resend-btn:hover { text-decoration: underline; }

.password-strength { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.strength-bar { flex: 1; height: 4px; background: #E2E8F0; border-radius: 9999px; overflow: hidden; }
.strength-fill { height: 100%; border-radius: 9999px; transition: all 0.3s; }
.strength-fill.weak { background: #EF4444; }
.strength-fill.medium { background: #F59E0B; }
.strength-fill.strong { background: #10B981; }
.strength-label { font-size: 12px; font-weight: 600; }
.strength-label.weak { color: #EF4444; }
.strength-label.medium { color: #F59E0B; }
.strength-label.strong { color: #10B981; }

.success-state { text-align: center; padding: 20px 0; }
.success-icon { font-size: 64px; margin-bottom: 16px; }
.success-state h3 { font-size: 20px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
.success-state p { font-size: 14px; color: var(--text-muted); }

.spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; margin-right: 6px; }
@keyframes spin { to { transform: rotate(360deg); } }
.text-danger { color: var(--danger); }
</style>

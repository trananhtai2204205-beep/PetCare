<template>
  <div class="page-content animate-fadeIn">
    <div class="page-header">
      <div>
        <h2 class="page-title"><span class="title-icon" style="background:rgba(78,205,196,0.12)">📅</span> Đặt lịch khám</h2>
        <p class="page-subtitle">Tạo và theo dõi lịch hẹn khám thú cưng</p>
      </div>
      <button class="btn btn-customer" @click="showBookingModal = true" id="new-booking-btn">
        + Đặt lịch mới
      </button>
    </div>

    <!-- Status Tabs -->
    <div class="tabs mb-4">
      <button v-for="tab in tabs" :key="tab.value" :class="['tab-item', { active: activeTab === tab.value }]" @click="activeTab = tab.value">
        {{ tab.label }}
        <span v-if="tabCount(tab.value) > 0" class="tab-count">{{ tabCount(tab.value) }}</span>
      </button>
    </div>

    <!-- Booking List -->
    <div class="bookings-list">
      <div v-if="filteredBookings.length === 0" class="empty-state">
        <div class="empty-icon">📅</div>
        <p>Không có lịch hẹn nào</p>
        <button class="btn btn-customer mt-3" @click="showBookingModal = true">Đặt lịch ngay</button>
      </div>

      <div v-for="b in filteredBookings" :key="b.id" class="booking-card" :class="`status-${b.status}`">
        <div class="booking-date-col">
          <div class="booking-date-box">
            <span class="bk-day">{{ formatDay(b.date) }}</span>
            <span class="bk-month">{{ formatMonth(b.date) }}</span>
          </div>
          <span class="bk-time">🕐 {{ b.time }}</span>
        </div>

        <div class="booking-info">
          <div class="booking-header-row">
            <div class="booking-type-badge">{{ typeIcon(b.type) }} {{ typeLabel(b.type) }}</div>
            <span class="badge" :class="bookStore.statusMap[b.status].class">{{ bookStore.statusMap[b.status].label }}</span>
          </div>
          <div class="booking-meta">
            <span class="bk-pet">🐾 <strong>{{ b.petName }}</strong></span>
            <span class="bk-doc" v-if="b.doctorName">👨‍⚕️ {{ b.doctorName }}</span>
          </div>
          <p v-if="b.symptoms" class="booking-symptoms">💬 {{ b.symptoms }}</p>
        </div>

        <div class="booking-actions" v-if="['pending', 'confirmed'].includes(b.status)">
          <button class="btn btn-sm btn-secondary" @click="openReschedule(b)" :id="`reschedule-${b.id}`">📆 Dời lịch</button>
          <button class="btn btn-sm btn-danger" @click="handleCancel(b.id)" :id="`cancel-${b.id}`">❌ Hủy</button>
        </div>
      </div>
    </div>

    <!-- New Booking Modal -->
    <Teleport to="body">
      <div v-if="showBookingModal" class="modal-overlay" @click.self="showBookingModal = false">
        <div class="modal-box" style="max-width:640px">
          <div class="modal-header">
            <h3 class="modal-title">📅 Đặt lịch khám mới</h3>
            <button class="modal-close" @click="showBookingModal = false">✕</button>
          </div>
          <form @submit.prevent="handleCreate">
            <div class="modal-body">
              <!-- Step indicator -->
              <div class="booking-steps">
                <div v-for="s in 3" :key="s" class="booking-step" :class="{ active: bookStep >= s, current: bookStep === s }">
                  <div class="step-num">{{ s }}</div>
                  <span class="step-lbl">{{ ['Chọn thú cưng', 'Chọn lịch', 'Triệu chứng'][s-1] }}</span>
                </div>
              </div>

              <!-- Step 1 -->
              <div v-if="bookStep === 1" class="step-content">
                <h4 class="step-title">Chọn thú cưng và loại khám</h4>
                <div class="form-group">
                  <label class="form-label">Thú cưng *</label>
                  <div class="pet-selector">
                    <div
                      v-for="pet in pets"
                      :key="pet.id"
                      class="pet-option"
                      :class="{ selected: bookForm.petId === pet.id }"
                      @click="selectPet(pet)"
                    >
                      <span class="pet-opt-emoji">{{ petEmoji(pet.species) }}</span>
                      <span>{{ pet.name }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Loại khám *</label>
                  <div class="type-selector">
                    <div
                      v-for="t in BOOKING_TYPES"
                      :key="t.value"
                      class="type-option"
                      :class="{ selected: bookForm.type === t.value }"
                      @click="bookForm.type = t.value"
                    >
                      <span>{{ t.icon }}</span>
                      <span>{{ t.label }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Chọn bác sĩ (tùy chọn)</label>
                  <select v-model="bookForm.doctorId" class="form-control">
                    <option value="">Bất kỳ bác sĩ nào</option>
                    <option v-for="d in AVAILABLE_DOCTORS" :key="d.id" :value="d.id">
                      {{ d.name }} — {{ d.specialty }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Step 2 -->
              <div v-else-if="bookStep === 2" class="step-content">
                <h4 class="step-title">Chọn ngày và giờ khám</h4>
                <div class="grid-2">
                  <div class="form-group">
                    <label class="form-label">Ngày khám *</label>
                    <input v-model="bookForm.date" type="date" class="form-control" :min="minDate" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Giờ khám *</label>
                    <div class="time-slots">
                      <button
                        v-for="t in timeSlots"
                        :key="t"
                        type="button"
                        class="time-slot"
                        :class="{ selected: bookForm.time === t }"
                        @click="bookForm.time = t"
                      >{{ t }}</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div v-else class="step-content">
                <h4 class="step-title">Mô tả triệu chứng</h4>
                <div class="form-group">
                  <label class="form-label">Triệu chứng sơ bộ</label>
                  <textarea v-model="bookForm.symptoms" class="form-control" rows="4" placeholder="Mô tả ngắn gọn triệu chứng của thú cưng..."></textarea>
                </div>
                <!-- Summary -->
                <div class="booking-summary">
                  <h5 class="summary-title">Tóm tắt lịch hẹn</h5>
                  <div class="summary-row"><span>🐾 Thú cưng</span><strong>{{ selectedPetName }}</strong></div>
                  <div class="summary-row"><span>🩺 Loại khám</span><strong>{{ typeLabel(bookForm.type) }}</strong></div>
                  <div class="summary-row"><span>📅 Ngày</span><strong>{{ bookForm.date }}</strong></div>
                  <div class="summary-row"><span>🕐 Giờ</span><strong>{{ bookForm.time }}</strong></div>
                  <div class="summary-row" v-if="bookForm.doctorId"><span>👨‍⚕️ Bác sĩ</span><strong>{{ selectedDoctorName }}</strong></div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="bookStep > 1 ? bookStep-- : showBookingModal = false">
                {{ bookStep > 1 ? '← Quay lại' : 'Hủy' }}
              </button>
              <button v-if="bookStep < 3" type="button" class="btn btn-customer" @click="nextStep" :disabled="!canNextStep">
                Tiếp theo →
              </button>
              <button v-else type="submit" class="btn btn-customer" :disabled="bookStore.isLoading">
                <span v-if="bookStore.isLoading" class="spinner-sm"></span>
                Xác nhận đặt lịch
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Reschedule Modal -->
    <Teleport to="body">
      <div v-if="rescheduleTarget" class="modal-overlay" @click.self="rescheduleTarget = null">
        <div class="modal-box" style="max-width:400px">
          <div class="modal-header">
            <h3 class="modal-title">📆 Dời lịch hẹn</h3>
            <button class="modal-close" @click="rescheduleTarget = null">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Ngày mới</label>
              <input v-model="newDate" type="date" class="form-control" :min="minDate" />
            </div>
            <div class="form-group">
              <label class="form-label">Giờ mới</label>
              <div class="time-slots">
                <button v-for="t in timeSlots" :key="t" type="button" class="time-slot" :class="{ selected: newTime === t }" @click="newTime = t">{{ t }}</button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="rescheduleTarget = null">Hủy</button>
            <button class="btn btn-customer" @click="handleReschedule" :disabled="!newDate || !newTime">Xác nhận dời lịch</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePetsStore } from '../stores/pets'
import { useBookingsStore, BOOKING_TYPES, AVAILABLE_DOCTORS } from '../stores/bookings'
import type { Booking, BookingType } from '../types'
import type { CustomerPet } from '../types'

const petsStore = usePetsStore()
const bookStore = useBookingsStore()

const activeTab = ref<string>('all')
const tabs = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xác nhận' },
  { value: 'confirmed', label: 'Đã xác nhận' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
]

const filteredBookings = computed(() => {
  const sorted = [...bookStore.bookings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return activeTab.value === 'all' ? sorted : sorted.filter(b => b.status === activeTab.value)
})

function tabCount(tab: string) {
  if (tab === 'all') return 0
  return bookStore.bookings.filter(b => b.status === tab).length
}

const pets = petsStore.pets
const showBookingModal = ref(false)
const bookStep = ref(1)
const bookForm = ref({ petId: '', petName: '', petSpecies: '', type: 'checkup' as BookingType, doctorId: '', date: '', time: '', symptoms: '' })

const selectedPetName = computed(() => pets.find(p => p.id === bookForm.value.petId)?.name || '')
const selectedDoctorName = computed(() => AVAILABLE_DOCTORS.find(d => d.id === bookForm.value.doctorId)?.name || 'Bất kỳ')

const canNextStep = computed(() => {
  if (bookStep.value === 1) return !!bookForm.value.petId && !!bookForm.value.type
  if (bookStep.value === 2) return !!bookForm.value.date && !!bookForm.value.time
  return true
})

const minDate = new Date().toISOString().split('T')[0]
const timeSlots = ['08:00','08:30','09:00','09:30','10:00','10:30','13:00','13:30','14:00','14:30','15:00','15:30']

function selectPet(pet: CustomerPet) {
  bookForm.value.petId = pet.id
  bookForm.value.petName = pet.name
  bookForm.value.petSpecies = pet.species
}

function nextStep() { if (canNextStep.value) bookStep.value++ }

async function handleCreate() {
  const doctor = AVAILABLE_DOCTORS.find(d => d.id === bookForm.value.doctorId)
  await bookStore.createBooking({
    ...bookForm.value,
    doctorName: doctor?.name || 'Chờ phân công'
  })
  showBookingModal.value = false
  bookStep.value = 1
  bookForm.value = { petId: '', petName: '', petSpecies: '', type: 'checkup', doctorId: '', date: '', time: '', symptoms: '' }
  activeTab.value = 'pending'
}

async function handleCancel(id: string) {
  if (confirm('Bạn có chắc muốn hủy lịch hẹn này?')) await bookStore.cancelBooking(id)
}

const rescheduleTarget = ref<Booking | null>(null)
const newDate = ref('')
const newTime = ref('')
function openReschedule(b: Booking) { rescheduleTarget.value = b; newDate.value = b.date; newTime.value = b.time }
async function handleReschedule() {
  if (rescheduleTarget.value) {
    await bookStore.rescheduleBooking(rescheduleTarget.value.id, newDate.value, newTime.value)
    rescheduleTarget.value = null
  }
}

function formatDay(d: string) { return new Date(d).getDate().toString().padStart(2,'0') }
function formatMonth(d: string) { return new Date(d).toLocaleDateString('vi-VN', { month: 'short' }) }
function typeLabel(type: string) { return BOOKING_TYPES.find(t => t.value === type)?.label || type }
function typeIcon(type: string) { return BOOKING_TYPES.find(t => t.value === type)?.icon || '🩺' }
function petEmoji(s: string) { const m: Record<string,string> = {dog:'🐶',cat:'🐱',bird:'🦜',rabbit:'🐰',other:'🐾'}; return m[s]||'🐾' }
</script>

<style scoped>
.btn-customer { background: linear-gradient(135deg, #FF6B6B, #FF8E53); color: white; border: none; box-shadow: 0 4px 14px rgba(255,107,107,0.3); }
.btn-customer:hover { transform: translateY(-1px); }
.btn-customer:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
.spinner-sm { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; margin-right: 4px; }
@keyframes spin { to { transform: rotate(360deg); } }
.mb-4 { margin-bottom: 16px; }
.mt-3 { margin-top: 12px; }

.bookings-list { display: flex; flex-direction: column; gap: 14px; }
.booking-card {
  background: white; border-radius: var(--radius-lg); border: 1px solid var(--border);
  padding: 20px; display: flex; gap: 20px; align-items: flex-start;
  box-shadow: var(--shadow-sm); transition: box-shadow 0.2s;
}
.booking-card:hover { box-shadow: var(--shadow-md); }
.booking-card.status-confirmed { border-left: 4px solid #0EA5E9; }
.booking-card.status-pending { border-left: 4px solid #F59E0B; }
.booking-card.status-completed { border-left: 4px solid #10B981; }
.booking-card.status-cancelled { border-left: 4px solid #CBD5E1; opacity: 0.7; }

.booking-date-col { display: flex; flex-direction: column; align-items: center; gap: 6px; min-width: 56px; }
.booking-date-box { background: linear-gradient(135deg, #FF6B6B, #FF8E53); border-radius: 10px; padding: 8px 10px; text-align: center; }
.bk-day { display: block; font-size: 22px; font-weight: 800; color: white; line-height: 1; }
.bk-month { display: block; font-size: 10px; color: rgba(255,255,255,0.8); text-transform: uppercase; }
.bk-time { font-size: 12px; color: var(--text-muted); font-weight: 500; }

.booking-info { flex: 1; }
.booking-header-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.booking-type-badge { background: var(--bg-hover); border: 1px solid var(--border); border-radius: 9999px; padding: 3px 12px; font-size: 12px; font-weight: 600; color: var(--text-primary); }
.booking-meta { display: flex; gap: 16px; font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; }
.booking-symptoms { font-size: 13px; color: var(--text-secondary); background: var(--bg-hover); padding: 8px 12px; border-radius: 8px; }

.booking-actions { display: flex; flex-direction: column; gap: 6px; }

/* Booking Steps */
.booking-steps { display: flex; gap: 0; margin-bottom: 28px; }
.booking-step { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; position: relative; }
.booking-step:not(:last-child)::after { content: ''; position: absolute; top: 16px; left: 50%; width: 100%; height: 2px; background: var(--border); z-index: 0; }
.booking-step.active::after { background: #FF6B6B; }
.step-num { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--border); background: white; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: var(--text-muted); z-index: 1; transition: all 0.2s; }
.booking-step.active .step-num { border-color: #FF6B6B; background: #FF6B6B; color: white; }
.step-lbl { font-size: 11px; color: var(--text-muted); }
.booking-step.active .step-lbl { color: #FF6B6B; font-weight: 600; }

.step-content { }
.step-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 18px; }

.pet-selector { display: flex; flex-wrap: wrap; gap: 10px; }
.pet-option { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1.5px solid var(--border); border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s; background: white; }
.pet-option:hover { border-color: #FF6B6B; background: #FFF7F5; }
.pet-option.selected { border-color: #FF6B6B; background: rgba(255,107,107,0.08); color: #FF6B6B; font-weight: 600; }
.pet-opt-emoji { font-size: 20px; }

.type-selector { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.type-option { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border: 1.5px solid var(--border); border-radius: 10px; cursor: pointer; font-size: 13px; transition: all 0.2s; background: white; }
.type-option:hover { border-color: #FF6B6B; background: #FFF7F5; }
.type-option.selected { border-color: #FF6B6B; background: rgba(255,107,107,0.08); color: #FF6B6B; font-weight: 600; }

.time-slots { display: flex; flex-wrap: wrap; gap: 6px; }
.time-slot { padding: 6px 12px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 13px; cursor: pointer; transition: all 0.2s; background: white; }
.time-slot:hover { border-color: #FF6B6B; }
.time-slot.selected { border-color: #FF6B6B; background: #FF6B6B; color: white; font-weight: 600; }

.booking-summary { background: #FFF7F5; border: 1px solid #FECACA; border-radius: 12px; padding: 16px; margin-top: 16px; }
.summary-title { font-size: 14px; font-weight: 700; margin-bottom: 12px; color: var(--text-primary); }
.summary-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-secondary); padding: 6px 0; border-bottom: 1px solid rgba(255,107,107,0.1); }
.summary-row:last-child { border-bottom: none; }

.tab-count { background: #FF6B6B; color: white; font-size: 10px; padding: 1px 5px; border-radius: 9999px; margin-left: 4px; }
</style>

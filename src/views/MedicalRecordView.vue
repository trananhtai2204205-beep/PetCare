<template>
  <div class="page-content animate-fadeIn">
    <div class="page-header">
      <div class="page-title">
        <div class="title-icon" style="background:linear-gradient(135deg,#6366F1,#8B5CF6)">📋</div>
        <div>
          <div>Hồ sơ khám bệnh</div>
          <div class="page-subtitle">Nhập thông tin khám cho bệnh nhân</div>
        </div>
      </div>
    </div>

    <div class="record-layout">
      <!-- Left: Appointment Selector -->
      <div class="appt-panel">
        <div class="card">
          <div class="card-header">
            <h3 class="font-bold text-sm">📅 Chọn lịch hẹn</h3>
          </div>
          <div class="appt-search">
            <div class="input-group">
              <span class="input-icon">🔍</span>
              <input v-model="apptSearch" type="text" class="form-control" placeholder="Tìm lịch hẹn..." style="padding-left:40px" />
            </div>
          </div>
          <div class="appt-list">
            <div
              v-for="appt in filteredAppts"
              :key="appt.id"
              class="appt-item"
              :class="{ selected: selectedApptId === appt.id, has_record: hasRecord(appt.id) }"
              @click="selectAppointment(appt)"
            >
              <div class="appt-item-left">
                <div class="avatar-placeholder" :style="`width:38px;height:38px;background:${petColor(appt.pet?.species)};color:white;font-size:16px;`">
                  {{ petEmoji(appt.pet?.species) }}
                </div>
              </div>
              <div class="appt-item-info">
                <p class="font-semibold text-sm">{{ appt.pet?.name }}</p>
                <p class="text-xs text-muted">{{ appt.pet?.owner?.name }}</p>
                <p class="text-xs text-muted">⏰ {{ appt.time }} · {{ typeLabel(appt.type) }}</p>
              </div>
              <div class="appt-item-right">
                <span class="badge" :class="`status-${appt.status}`" style="font-size:10px">{{ statusLabel(appt.status) }}</span>
                <span v-if="hasRecord(appt.id)" class="badge badge-success" style="font-size:10px;margin-top:2px">Có HS</span>
              </div>
            </div>
            <div v-if="filteredAppts.length === 0" class="empty-state" style="padding:20px">
              <p>Không có lịch hẹn</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Medical Form -->
      <div class="record-form-panel">
        <!-- No appointment selected -->
        <div v-if="!selectedAppt" class="card empty-state" style="height:400px">
          <p class="empty-icon">📋</p>
          <p>Chọn một lịch hẹn để nhập hồ sơ khám bệnh</p>
        </div>

        <!-- Form -->
        <div v-else>
          <!-- Pet Info Header -->
          <div class="card pet-header-card mb-4">
            <div class="pet-header">
              <div class="avatar-placeholder" :style="`width:56px;height:56px;background:${petColor(selectedAppt.pet?.species)};color:white;font-size:24px;`">
                {{ petEmoji(selectedAppt.pet?.species) }}
              </div>
              <div class="pet-header-info">
                <h2 class="font-bold" style="font-size:20px">{{ selectedAppt.pet?.name }}</h2>
                <div class="pet-tags">
                  <span class="badge badge-primary">{{ selectedAppt.pet?.breed }}</span>
                  <span class="badge badge-gray">{{ selectedAppt.pet?.age }} tuổi</span>
                  <span class="badge badge-gray">{{ selectedAppt.pet?.weight }} kg</span>
                  <span class="badge" :class="selectedAppt.pet?.gender === 'male' ? 'badge-primary' : 'badge-secondary'">
                    {{ selectedAppt.pet?.gender === 'male' ? '♂ Đực' : '♀ Cái' }}
                  </span>
                </div>
              </div>
              <div class="pet-header-owner">
                <p class="font-semibold">{{ selectedAppt.pet?.owner?.name }}</p>
                <p class="text-sm text-muted">📞 {{ selectedAppt.pet?.owner?.phone }}</p>
                <p class="text-sm text-muted">📍 {{ selectedAppt.pet?.owner?.address }}</p>
              </div>
              <div class="pet-vitals">
                <div class="vital-item">
                  <label class="form-label" style="margin-bottom:4px">Cân nặng (kg)</label>
                  <input v-model.number="form.weight" type="number" step="0.1" class="form-control" style="width:90px" />
                </div>
                <div class="vital-item">
                  <label class="form-label" style="margin-bottom:4px">Nhiệt độ (°C)</label>
                  <input v-model.number="form.temperature" type="number" step="0.1" class="form-control" style="width:90px" />
                </div>
              </div>
            </div>
          </div>

          <!-- Symptoms -->
          <div class="card mb-4">
            <div class="card-header">
              <h3 class="font-bold">🤒 Triệu chứng</h3>
            </div>
            <div class="card-body">
              <div class="symptoms-tags">
                <span v-for="(s, i) in form.symptoms" :key="i" class="tag">
                  {{ s }}
                  <span class="tag-remove" @click="removeSymptom(i)">✕</span>
                </span>
              </div>
              <div class="symptom-input-row">
                <input
                  v-model="symptomInput"
                  type="text"
                  class="form-control"
                  placeholder="Thêm triệu chứng (Enter để thêm)..."
                  @keydown.enter.prevent="addSymptom"
                />
                <button class="btn btn-primary btn-sm" @click="addSymptom">+ Thêm</button>
              </div>
              <div class="quick-symptoms">
                <span class="text-xs text-muted">Triệu chứng thường gặp:</span>
                <button
                  v-for="s in quickSymptoms"
                  :key="s"
                  class="quick-btn"
                  :class="{ added: form.symptoms.includes(s) }"
                  @click="toggleQuickSymptom(s)"
                >{{ s }}</button>
              </div>
            </div>
          </div>

          <!-- Diagnosis & Treatment -->
          <div class="card mb-4">
            <div class="card-header">
              <h3 class="font-bold">🔬 Chẩn đoán & Điều trị</h3>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">Chẩn đoán *</label>
                <textarea v-model="form.diagnosis" class="form-control" placeholder="Nhập chẩn đoán bệnh..." rows="3"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Phương pháp điều trị</label>
                <textarea v-model="form.treatment" class="form-control" placeholder="Mô tả phương pháp điều trị..." rows="4"></textarea>
              </div>
              <div class="form-group mb-0">
                <label class="form-label">Ngày tái khám</label>
                <input v-model="form.nextVisitDate" type="date" class="form-control" style="width:200px" />
              </div>
            </div>
          </div>

          <!-- Prescriptions -->
          <div class="card mb-4">
            <div class="card-header">
              <h3 class="font-bold">💊 Kê đơn thuốc</h3>
              <button class="btn btn-primary btn-sm" @click="addPrescription">+ Thêm thuốc</button>
            </div>
            <div class="card-body" style="padding:0">
              <div v-if="form.prescriptions.length === 0" class="empty-state" style="padding:30px">
                <p>Chưa có thuốc nào được kê</p>
              </div>
              <div v-else class="table-container" style="border:none;border-radius:0">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Tên thuốc</th>
                      <th>Liều lượng</th>
                      <th>Tần suất</th>
                      <th>Số ngày</th>
                      <th>Cách dùng</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(rx, i) in form.prescriptions" :key="i">
                      <td><input v-model="rx.medicineName" class="form-control" placeholder="Tên thuốc" style="min-width:130px" /></td>
                      <td><input v-model="rx.dosage" class="form-control" placeholder="VD: 1 viên" style="width:90px" /></td>
                      <td><input v-model="rx.frequency" class="form-control" placeholder="VD: 2 lần/ngày" style="width:120px" /></td>
                      <td><input v-model="rx.duration" class="form-control" placeholder="VD: 5 ngày" style="width:90px" /></td>
                      <td><input v-model="rx.instructions" class="form-control" placeholder="Hướng dẫn..." style="min-width:150px" /></td>
                      <td>
                        <button class="btn btn-ghost btn-sm text-danger" @click="removePrescription(i)">🗑️</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="card mb-4">
            <div class="card-header">
              <h3 class="font-bold">📝 Ghi chú của bác sĩ</h3>
            </div>
            <div class="card-body">
              <textarea v-model="form.notes" class="form-control" placeholder="Ghi chú thêm, lưu ý cho chủ nhân..." rows="4"></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="action-bar">
            <button class="btn btn-secondary" @click="resetForm">↺ Làm mới</button>
            <div class="flex gap-3">
              <button class="btn btn-secondary" @click="saveRecord">💾 Lưu nháp</button>
              <button class="btn btn-success" @click="saveAndComplete">✅ Lưu & Hoàn thành khám</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="showToast" class="toast">✅ {{ toastMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppointmentStore } from '../stores/appointments'
import { useMedicalRecordStore } from '../stores/medicalRecords'
import type { Appointment } from '../types'

const apptStore = useAppointmentStore()
const recordStore = useMedicalRecordStore()

const apptSearch = ref('')
const selectedApptId = ref<string | null>(null)
const selectedAppt = ref<Appointment | null>(null)
const symptomInput = ref('')
const showToast = ref(false)
const toastMsg = ref('')

const quickSymptoms = ['Bỏ ăn', 'Nôn mửa', 'Tiêu chảy', 'Uể oải', 'Sốt', 'Ho', 'Hắt hơi', 'Ngứa ngáy', 'Rụng lông', 'Mắt đỏ', 'Chảy nước mũi', 'Khó thở']

const form = ref({
  symptoms: [] as string[],
  diagnosis: '',
  treatment: '',
  prescriptions: [] as any[],
  notes: '',
  weight: undefined as number | undefined,
  temperature: undefined as number | undefined,
  nextVisitDate: ''
})

const filteredAppts = computed(() => {
  const q = apptSearch.value.toLowerCase()
  return apptStore.appointments.filter(a =>
    a.status !== 'cancelled' &&
    (!q || a.pet?.name.toLowerCase().includes(q) || a.pet?.owner?.name.toLowerCase().includes(q))
  ).sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`))
})

function hasRecord(id: string) {
  return !!recordStore.getRecordByAppointment(id)
}

function selectAppointment(appt: Appointment) {
  selectedApptId.value = appt.id
  selectedAppt.value = appt
  const existing = recordStore.getRecordByAppointment(appt.id)
  if (existing) {
    form.value = {
      symptoms: [...existing.symptoms],
      diagnosis: existing.diagnosis,
      treatment: existing.treatment,
      prescriptions: existing.prescriptions.map(p => ({ ...p })),
      notes: existing.notes,
      weight: existing.weight,
      temperature: existing.temperature,
      nextVisitDate: existing.nextVisitDate || ''
    }
  } else {
    resetForm()
  }
}

function resetForm() {
  form.value = { symptoms: [], diagnosis: '', treatment: '', prescriptions: [], notes: '', weight: undefined, temperature: undefined, nextVisitDate: '' }
}

function addSymptom() {
  if (symptomInput.value.trim() && !form.value.symptoms.includes(symptomInput.value.trim())) {
    form.value.symptoms.push(symptomInput.value.trim())
    symptomInput.value = ''
  }
}

function removeSymptom(i: number) {
  form.value.symptoms.splice(i, 1)
}

function toggleQuickSymptom(s: string) {
  const idx = form.value.symptoms.indexOf(s)
  if (idx === -1) form.value.symptoms.push(s)
  else form.value.symptoms.splice(idx, 1)
}

function addPrescription() {
  form.value.prescriptions.push({ id: '', medicineName: '', dosage: '', frequency: '', duration: '', instructions: '' })
}

function removePrescription(i: number) {
  form.value.prescriptions.splice(i, 1)
}

function saveRecord() {
  if (!selectedAppt.value) return
  recordStore.saveRecord({
    appointmentId: selectedAppt.value.id,
    petId: selectedAppt.value.petId,
    doctorId: 'doc-001',
    pet: selectedAppt.value.pet,
    ...form.value
  })
  showToastMsg('Đã lưu hồ sơ khám bệnh!')
}

function saveAndComplete() {
  if (!selectedAppt.value) return
  saveRecord()
  apptStore.updateStatus(selectedAppt.value.id, 'completed')
  showToastMsg('Đã hoàn thành khám và lưu hồ sơ!')
}

function showToastMsg(msg: string) {
  toastMsg.value = msg
  showToast.value = true
  setTimeout(() => showToast.value = false, 3000)
}

function typeLabel(t: string) {
  return { checkup: '🩺 Khám TQ', vaccination: '💉 Tiêm phòng', surgery: '🔪 Phẫu thuật', grooming: '✂️ Grooming', emergency: '🚨 Cấp cứu', follow_up: '🔄 Tái khám' }[t] || t
}
function statusLabel(s: string) {
  return { waiting: 'Chờ', in_progress: 'Đang khám', completed: 'Xong', cancelled: 'Hủy' }[s] || s
}
function petEmoji(species?: string) {
  return { dog: '🐕', cat: '🐈', bird: '🦜', rabbit: '🐰', other: '🐾' }[species || ''] || '🐾'
}
function petColor(species?: string) {
  return { dog: '#F59E0B', cat: '#6366F1', bird: '#10B981', rabbit: '#EC4899', other: '#94A3B8' }[species || ''] || '#94A3B8'
}
</script>

<style scoped>
.record-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  align-items: start;
}

.appt-panel { position: sticky; top: calc(var(--header-height) + 16px); }
.appt-search { padding: 12px; border-bottom: 1px solid var(--border); }

.appt-list { max-height: calc(100vh - 280px); overflow-y: auto; }

.appt-item {
  display: flex;
  gap: 10px;
  padding: 12px;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background var(--transition);
}
.appt-item:last-child { border-bottom: none; }
.appt-item:hover { background: var(--bg-hover); }
.appt-item.selected { background: #EFF6FF; border-left: 3px solid var(--primary); }
.appt-item.has_record { background: #F0FDF4; }
.appt-item.selected.has_record { background: #EFF6FF; }

.appt-item-info { flex: 1; }
.appt-item-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }

.pet-header-card {}
.pet-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
}
.pet-header-info { flex: 1; }
.pet-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
.pet-header-owner { font-size: 14px; border-left: 1px solid var(--border); padding-left: 16px; }
.pet-vitals { display: flex; gap: 12px; flex-shrink: 0; }
.vital-item {}

.symptoms-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; min-height: 28px; }
.symptom-input-row { display: flex; gap: 8px; margin-bottom: 12px; }
.quick-symptoms { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
.quick-btn {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  background: var(--bg-hover);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition);
}
.quick-btn:hover { border-color: var(--primary); color: var(--primary); }
.quick-btn.added { background: var(--primary-light); color: var(--primary-dark); border-color: var(--primary-light); }

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}

.toast {
  position: fixed;
  bottom: 28px;
  right: 28px;
  background: #0F172A;
  color: white;
  padding: 14px 20px;
  border-radius: var(--radius-lg);
  font-size: 14px;
  font-weight: 600;
  box-shadow: var(--shadow-xl);
  z-index: 9999;
  animation: slideUp 0.3s ease;
}
</style>

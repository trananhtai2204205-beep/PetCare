<template>
  <div class="page-content animate-fadeIn">
    <div class="page-header">
      <div class="page-title">
        <div class="title-icon" style="background:linear-gradient(135deg,#EC4899,#F43F5E)">💉</div>
        <div>
          <div>Tiêm phòng</div>
          <div class="page-subtitle">Quản lý lịch tiêm phòng và thông tin vaccine</div>
        </div>
      </div>
    </div>

    <!-- Alert: Overdue -->
    <div v-if="overdueRecords.length > 0" class="overdue-alert">
      <span style="font-size:20px">⚠️</span>
      <div>
        <p class="font-semibold">{{ overdueRecords.length }} thú cưng quá hạn tiêm phòng!</p>
        <p class="text-sm">Cần liên hệ chủ nhân ngay để sắp xếp lịch tiêm.</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs mb-4">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-item"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.icon }} {{ tab.label }}
        <span v-if="tab.count" class="tab-badge">{{ tab.count }}</span>
      </button>
    </div>

    <!-- TAB 1: Vaccination Schedule -->
    <div v-if="activeTab === 'schedule'">
      <div class="search-bar mb-4">
        <div class="search-input-wrap">
          <span class="search-icon">🔍</span>
          <input v-model="scheduleSearch" type="text" class="form-control" placeholder="Tìm theo tên thú, chủ nhân, vaccine..." />
        </div>
        <select v-model="scheduleFilter" class="form-control" style="width:160px">
          <option value="">Tất cả trạng thái</option>
          <option value="scheduled">Đã lên lịch</option>
          <option value="completed">Đã tiêm</option>
          <option value="overdue">Quá hạn</option>
        </select>
        <button class="btn btn-primary" @click="openAddRecord">➕ Thêm lịch tiêm</button>
      </div>

      <div class="card">
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Thú cưng</th>
                <th>Chủ nhân</th>
                <th>Vaccine</th>
                <th>Mũi số</th>
                <th>Ngày tiêm</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredSchedule.length === 0">
                <td colspan="7">
                  <div class="empty-state"><p class="empty-icon">💉</p><p>Không có lịch tiêm nào</p></div>
                </td>
              </tr>
              <tr v-for="vr in filteredSchedule" :key="vr.id">
                <td>
                  <div class="flex items-center gap-2">
                    <div class="avatar-placeholder" :style="`width:36px;height:36px;background:${petColor(vr.pet?.species)};color:white;font-size:16px;`">
                      {{ petEmoji(vr.pet?.species) }}
                    </div>
                    <div>
                      <p class="font-semibold">{{ vr.pet?.name }}</p>
                      <p class="text-xs text-muted">{{ vr.pet?.breed }}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="font-semibold">{{ vr.pet?.owner?.name }}</p>
                  <p class="text-xs text-muted">📞 {{ vr.pet?.owner?.phone }}</p>
                </td>
                <td>
                  <p class="font-semibold">{{ vr.vaccine?.name }}</p>
                  <p class="text-xs text-muted">{{ vr.vaccine?.manufacturer }}</p>
                </td>
                <td>
                  <span class="badge badge-primary">Mũi {{ vr.doseNumber }}</span>
                </td>
                <td>
                  <p class="font-semibold" :class="dateClass(vr.nextDueDate, vr.status)">{{ formatDate(vr.nextDueDate) }}</p>
                  <p class="text-xs" :class="dateClass(vr.nextDueDate, vr.status)">{{ daysLabel(vr.nextDueDate, vr.status) }}</p>
                </td>
                <td>
                  <span class="badge" :class="vaccStatusClass(vr.status)">{{ vaccStatusLabel(vr.status) }}</span>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button v-if="vr.status === 'scheduled'" class="btn btn-success btn-sm" @click="markCompleted(vr)">✅ Đã tiêm</button>
                    <button class="btn btn-ghost btn-sm" @click="openEdit(vr)">✏️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 2: Upcoming / Alerts -->
    <div v-if="activeTab === 'upcoming'">
      <div class="upcoming-grid">
        <!-- Overdue -->
        <div class="card" v-if="overdueRecords.length > 0">
          <div class="card-header">
            <h3 class="font-bold text-danger">🔴 Quá hạn tiêm phòng</h3>
            <span class="badge badge-danger">{{ overdueRecords.length }}</span>
          </div>
          <div v-for="vr in overdueRecords" :key="vr.id" class="upcoming-vr-item danger">
            <div class="flex items-center gap-10 flex-1">
              <div class="avatar-placeholder" :style="`width:40px;height:40px;background:${petColor(vr.pet?.species)};color:white;font-size:18px;`">
                {{ petEmoji(vr.pet?.species) }}
              </div>
              <div>
                <p class="font-semibold">{{ vr.pet?.name }}</p>
                <p class="text-xs text-muted">{{ vr.pet?.owner?.name }} · {{ vr.pet?.owner?.phone }}</p>
              </div>
            </div>
            <div>
              <p class="font-semibold text-sm">{{ vr.vaccine?.name }} - Mũi {{ vr.doseNumber }}</p>
              <p class="text-xs text-danger font-semibold">Quá hạn: {{ formatDate(vr.nextDueDate) }}</p>
            </div>
            <button class="btn btn-danger btn-sm" @click="markCompleted(vr)">Đã tiêm</button>
          </div>
        </div>

        <!-- Within 7 days -->
        <div class="card">
          <div class="card-header">
            <h3 class="font-bold text-warning">🟡 Trong 7 ngày tới</h3>
            <span class="badge badge-warning">{{ within7.length }}</span>
          </div>
          <div v-if="within7.length === 0" class="empty-state" style="padding:24px"><p>Không có lịch tiêm nào</p></div>
          <div v-for="vr in within7" :key="vr.id" class="upcoming-vr-item warning">
            <div class="flex items-center gap-10 flex-1">
              <div class="avatar-placeholder" :style="`width:40px;height:40px;background:${petColor(vr.pet?.species)};color:white;font-size:18px;`">
                {{ petEmoji(vr.pet?.species) }}
              </div>
              <div>
                <p class="font-semibold">{{ vr.pet?.name }}</p>
                <p class="text-xs text-muted">{{ vr.pet?.owner?.name }} · {{ vr.pet?.owner?.phone }}</p>
              </div>
            </div>
            <div>
              <p class="font-semibold text-sm">{{ vr.vaccine?.name }} - Mũi {{ vr.doseNumber }}</p>
              <p class="text-xs text-warning font-semibold">{{ formatDate(vr.nextDueDate) }} · {{ daysLabel(vr.nextDueDate, vr.status) }}</p>
            </div>
            <button class="btn btn-success btn-sm" @click="markCompleted(vr)">Đã tiêm</button>
          </div>
        </div>

        <!-- Within 30 days -->
        <div class="card">
          <div class="card-header">
            <h3 class="font-bold text-success">🟢 Trong 30 ngày tới</h3>
            <span class="badge badge-success">{{ within30.length }}</span>
          </div>
          <div v-if="within30.length === 0" class="empty-state" style="padding:24px"><p>Không có lịch tiêm nào</p></div>
          <div v-for="vr in within30" :key="vr.id" class="upcoming-vr-item success">
            <div class="flex items-center gap-10 flex-1">
              <div class="avatar-placeholder" :style="`width:40px;height:40px;background:${petColor(vr.pet?.species)};color:white;font-size:18px;`">
                {{ petEmoji(vr.pet?.species) }}
              </div>
              <div>
                <p class="font-semibold">{{ vr.pet?.name }}</p>
                <p class="text-xs text-muted">{{ vr.pet?.owner?.name }}</p>
              </div>
            </div>
            <div>
              <p class="font-semibold text-sm">{{ vr.vaccine?.name }} - Mũi {{ vr.doseNumber }}</p>
              <p class="text-xs text-success font-semibold">{{ formatDate(vr.nextDueDate) }} · {{ daysLabel(vr.nextDueDate, vr.status) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: Vaccine Info -->
    <div v-if="activeTab === 'vaccines'">
      <div class="card">
        <div class="card-header">
          <h3 class="font-bold">💊 Danh mục vaccine</h3>
          <span class="badge badge-primary">{{ vaccines.length }} loại</span>
        </div>
        <div class="vaccine-grid">
          <div v-for="v in vaccines" :key="v.id" class="vaccine-card">
            <div class="vaccine-icon">💉</div>
            <div class="vaccine-info">
              <h4 class="font-bold">{{ v.name }}</h4>
              <p class="text-sm text-muted mt-1">{{ v.description }}</p>
              <div class="vaccine-meta">
                <span class="meta-item"><strong>Nhà SX:</strong> {{ v.manufacturer }}</span>
                <span class="meta-item"><strong>Liều:</strong> {{ v.dosage }}</span>
                <span class="meta-item"><strong>Số mũi:</strong> {{ v.requiredDoses }}</span>
                <span class="meta-item"><strong>Tái tiêm:</strong> {{ v.intervalDays }} ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-box" style="max-width:520px">
        <div class="modal-header">
          <h3 class="modal-title">{{ editingRecord ? '✏️ Cập nhật lịch tiêm' : '➕ Thêm lịch tiêm' }}</h3>
          <button class="modal-close" @click="showModal = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Vaccine *</label>
            <select v-model="modalForm.vaccineId" class="form-control">
              <option value="">-- Chọn vaccine --</option>
              <option v-for="v in vaccines" :key="v.id" :value="v.id">{{ v.name }}</option>
            </select>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Ngày tiêm / Hạn tiêm *</label>
              <input v-model="modalForm.nextDueDate" type="date" class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">Mũi số</label>
              <input v-model.number="modalForm.doseNumber" type="number" min="1" class="form-control" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Trạng thái</label>
            <select v-model="modalForm.status" class="form-control">
              <option value="scheduled">Đã lên lịch</option>
              <option value="completed">Đã tiêm</option>
              <option value="overdue">Quá hạn</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Số lô vaccine</label>
            <input v-model="modalForm.batchNumber" type="text" class="form-control" placeholder="VD: LOT2024-001" />
          </div>
          <div class="form-group">
            <label class="form-label">Ghi chú</label>
            <textarea v-model="modalForm.notes" class="form-control" rows="3" placeholder="Ghi chú thêm..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showModal = false">Hủy</button>
          <button class="btn btn-primary" @click="saveRecord">Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useVaccinationStore } from '../stores/vaccinations'
import type { VaccinationRecord, VaccineStatus } from '../types'

const store = useVaccinationStore()

onMounted(async () => {
  await store.fetchVaccines()
  await store.fetchRecords()
})

const activeTab = ref('schedule')
const scheduleSearch = ref('')
const scheduleFilter = ref<VaccineStatus | ''>('')
const showModal = ref(false)
const editingRecord = ref<VaccinationRecord | null>(null)

const modalForm = ref({
  vaccineId: '',
  nextDueDate: new Date().toISOString().split('T')[0],
  doseNumber: 1,
  status: 'scheduled' as VaccineStatus,
  batchNumber: '',
  notes: ''
})

const overdueRecords = computed(() => store.overdueRecords)
const vaccines = computed(() => store.vaccines)

const tabs = computed(() => [
  { id: 'schedule', icon: '📋', label: 'Lịch tiêm', count: 0 },
  { id: 'upcoming', icon: '⏰', label: 'Sắp đến hạn', count: overdueRecords.value.length + within7.value.length },
  { id: 'vaccines', icon: '💊', label: 'Thông tin vaccine', count: 0 },
])

const today = new Date().toISOString().split('T')[0]
const date7 = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
const date30 = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]

const within7 = computed(() =>
  store.upcomingRecords.filter(r => r.nextDueDate >= today && r.nextDueDate <= date7)
)
const within30 = computed(() =>
  store.upcomingRecords.filter(r => r.nextDueDate > date7 && r.nextDueDate <= date30)
)

const filteredSchedule = computed(() => {
  const q = scheduleSearch.value.toLowerCase()
  return store.records.filter(r => {
    const matchQuery = !q || r.pet?.name.toLowerCase().includes(q) || r.pet?.owner?.name.toLowerCase().includes(q) || r.vaccine?.name.toLowerCase().includes(q)
    const matchStatus = !scheduleFilter.value || r.status === scheduleFilter.value
    return matchQuery && matchStatus
  }).sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate))
})

function markCompleted(vr: VaccinationRecord) {
  store.updateStatus(vr.id, 'completed', new Date().toISOString().split('T')[0])
}

function openAddRecord() {
  editingRecord.value = null
  modalForm.value = { vaccineId: '', nextDueDate: today, doseNumber: 1, status: 'scheduled', batchNumber: '', notes: '' }
  showModal.value = true
}

function openEdit(vr: VaccinationRecord) {
  editingRecord.value = vr
  modalForm.value = {
    vaccineId: vr.vaccineId,
    nextDueDate: vr.nextDueDate,
    doseNumber: vr.doseNumber,
    status: vr.status,
    batchNumber: vr.batchNumber || '',
    notes: vr.notes || ''
  }
  showModal.value = true
}

function saveRecord() {
  if (editingRecord.value) {
    store.updateRecord(editingRecord.value.id, {
      vaccineId: modalForm.value.vaccineId,
      nextDueDate: modalForm.value.nextDueDate,
      doseNumber: modalForm.value.doseNumber,
      status: modalForm.value.status,
      batchNumber: modalForm.value.batchNumber,
      notes: modalForm.value.notes
    })
  }
  showModal.value = false
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function daysLabel(d: string, status: VaccineStatus) {
  if (status === 'completed') return '✅ Đã tiêm'
  const diff = Math.ceil((new Date(d).getTime() - Date.now()) / 86400000)
  if (diff < 0) return `Quá hạn ${Math.abs(diff)} ngày`
  if (diff === 0) return 'Hôm nay!'
  return `Còn ${diff} ngày`
}

function dateClass(d: string, status: VaccineStatus) {
  if (status === 'completed') return 'text-success'
  const diff = Math.ceil((new Date(d).getTime() - Date.now()) / 86400000)
  if (diff < 0) return 'text-danger'
  if (diff <= 3) return 'text-warning'
  return ''
}

function vaccStatusClass(s: VaccineStatus) {
  return { scheduled: 'badge-primary', completed: 'badge-success', overdue: 'badge-danger', cancelled: 'badge-gray' }[s] || 'badge-gray'
}

function vaccStatusLabel(s: VaccineStatus) {
  return { scheduled: '📅 Lên lịch', completed: '✅ Đã tiêm', overdue: '⚠️ Quá hạn', cancelled: '❌ Đã hủy' }[s] || s
}

function petEmoji(species?: string) {
  return { dog: '🐕', cat: '🐈', bird: '🦜', rabbit: '🐰', other: '🐾' }[species || ''] || '🐾'
}
function petColor(species?: string) {
  return { dog: '#F59E0B', cat: '#6366F1', bird: '#10B981', rabbit: '#EC4899', other: '#94A3B8' }[species || ''] || '#94A3B8'
}
</script>

<style scoped>
.overdue-alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: var(--radius-lg);
  margin-bottom: 20px;
  color: #991B1B;
}

.tab-badge {
  background: #EF4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: var(--radius-full);
  min-width: 18px;
  text-align: center;
}

.upcoming-grid { display: flex; flex-direction: column; gap: 16px; }

.upcoming-vr-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
}
.upcoming-vr-item:last-child { border-bottom: none; }
.upcoming-vr-item.danger { background: #FFF5F5; }
.upcoming-vr-item.warning { background: #FFFBF0; }
.upcoming-vr-item.success { background: #F0FDF4; }

.vaccine-grid { padding: 20px; display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }

.vaccine-card {
  display: flex;
  gap: 14px;
  padding: 18px;
  background: var(--bg-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: all var(--transition);
}
.vaccine-card:hover { border-color: var(--primary); box-shadow: var(--shadow-sm); }

.vaccine-icon { font-size: 28px; flex-shrink: 0; }
.vaccine-info { flex: 1; }

.vaccine-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  margin-top: 10px;
}
.meta-item { font-size: 12px; color: var(--text-secondary); }

.gap-10 { gap: 10px; }
</style>

<template>
  <div class="page-content animate-fadeIn">
    <div class="page-header">
      <div class="page-title">
        <div class="title-icon" style="background:linear-gradient(135deg,#0EA5E9,#38BDF8)">📅</div>
        <div>
          <div>Lịch khám</div>
          <div class="page-subtitle">Quản lý lịch hẹn khám bệnh thú cưng</div>
        </div>
      </div>
      <button class="btn btn-primary" @click="openAdd">➕ Thêm lịch hẹn</button>
    </div>

    <!-- Filter + Search -->
    <div class="card mb-4">
      <div class="card-body" style="padding:16px">
        <div class="search-bar">
          <div class="search-input-wrap">
            <span class="search-icon">🔍</span>
            <input v-model="searchQuery" type="text" class="form-control" placeholder="Tìm theo tên thú, chủ, giống..." />
          </div>
          <input v-model="filterDate" type="date" class="form-control" style="width:170px" />
          <select v-model="filterStatus" class="form-control" style="width:150px">
            <option value="">Tất cả trạng thái</option>
            <option value="waiting">Đang chờ</option>
            <option value="in_progress">Đang khám</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
          <select v-model="filterType" class="form-control" style="width:150px">
            <option value="">Tất cả loại</option>
            <option v-for="t in appointmentTypes" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
          <button class="btn btn-secondary btn-sm" @click="clearFilters">✕ Xóa lọc</button>
        </div>

        <!-- Status Tabs -->
        <div class="status-tabs">
          <button
            v-for="tab in statusTabs"
            :key="tab.value"
            class="status-tab"
            :class="{ active: filterStatus === tab.value }"
            @click="filterStatus = tab.value"
          >
            {{ tab.icon }} {{ tab.label }}
            <span class="tab-count">{{ tab.count }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Ngày & Giờ</th>
              <th>Thú cưng</th>
              <th>Chủ nhân</th>
              <th>Loại khám</th>
              <th>Trạng thái</th>
              <th>Ghi chú</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredAppointments.length === 0">
              <td colspan="7">
                <div class="empty-state">
                  <p class="empty-icon">📅</p>
                  <p>Không tìm thấy lịch hẹn nào</p>
                </div>
              </td>
            </tr>
            <tr v-for="appt in paginatedData" :key="appt.id">
              <td>
                <p class="font-semibold">{{ formatDate(appt.date) }}</p>
                <p class="text-sm text-muted">⏰ {{ appt.time }}</p>
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="avatar-placeholder" :style="`width:36px;height:36px;background:${petColor(appt.pet?.species)};color:white;font-size:16px;`">
                    {{ petEmoji(appt.pet?.species) }}
                  </div>
                  <div>
                    <p class="font-semibold">{{ appt.pet?.name }}</p>
                    <p class="text-xs text-muted">{{ appt.pet?.breed }} · {{ appt.pet?.age }}t</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="font-semibold">{{ appt.pet?.owner?.name }}</p>
                <p class="text-xs text-muted">📞 {{ appt.pet?.owner?.phone }}</p>
              </td>
              <td><span class="badge badge-primary">{{ typeLabel(appt.type) }}</span></td>
              <td>
                <select
                  :value="appt.status"
                  class="status-select"
                  :class="`status-${appt.status}`"
                  @change="changeStatus(appt.id, ($event.target as HTMLSelectElement).value as any)"
                >
                  <option value="waiting">⏳ Đang chờ</option>
                  <option value="in_progress">🩺 Đang khám</option>
                  <option value="completed">✅ Hoàn thành</option>
                  <option value="cancelled">❌ Đã hủy</option>
                </select>
              </td>
              <td>
                <p class="text-sm text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                  {{ appt.notes || '—' }}
                </p>
              </td>
              <td>
                <div class="flex gap-2">
                  <button class="btn btn-ghost btn-sm" @click="openEdit(appt)" title="Sửa">✏️</button>
                  <button class="btn btn-ghost btn-sm text-danger" @click="confirmDelete(appt.id)" title="Xóa">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <span>Hiển thị {{ (page - 1) * pageSize + 1 }}–{{ Math.min(page * pageSize, filteredAppointments.length) }} / {{ filteredAppointments.length }} lịch hẹn</span>
        <div class="pagination-btns">
          <button class="page-btn" :disabled="page === 1" @click="page--">‹</button>
          <button v-for="p in totalPages" :key="p" class="page-btn" :class="{ active: page === p }" @click="page = p">{{ p }}</button>
          <button class="page-btn" :disabled="page === totalPages" @click="page++">›</button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-box" style="max-width:580px">
        <div class="modal-header">
          <h3 class="modal-title">{{ editingId ? '✏️ Sửa lịch hẹn' : '➕ Thêm lịch hẹn mới' }}</h3>
          <button class="modal-close" @click="closeModal">✕</button>
        </div>
        <div class="modal-body">
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Tên thú cưng *</label>
              <input v-model="form.petName" class="form-control" placeholder="Tên thú cưng" required />
            </div>
            <div class="form-group">
              <label class="form-label">Giống loài</label>
              <input v-model="form.breed" class="form-control" placeholder="Giống loài" />
            </div>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Loài *</label>
              <select v-model="form.species" class="form-control">
                <option value="dog">🐕 Chó</option>
                <option value="cat">🐈 Mèo</option>
                <option value="bird">🦜 Chim</option>
                <option value="rabbit">🐰 Thỏ</option>
                <option value="other">🐾 Khác</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Chủ nhân *</label>
              <input v-model="form.ownerName" class="form-control" placeholder="Tên chủ nhân" />
            </div>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">SĐT chủ</label>
              <input v-model="form.ownerPhone" class="form-control" placeholder="0xxx xxx xxx" />
            </div>
            <div class="form-group">
              <label class="form-label">Loại khám *</label>
              <select v-model="form.type" class="form-control">
                <option v-for="t in appointmentTypes" :key="t.value" :value="t.value">{{ t.label }}</option>
              </select>
            </div>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Ngày hẹn *</label>
              <input v-model="form.date" type="date" class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">Giờ hẹn *</label>
              <input v-model="form.time" type="time" class="form-control" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Ghi chú</label>
            <textarea v-model="form.notes" class="form-control" placeholder="Thông tin thêm..." rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">Hủy</button>
          <button class="btn btn-primary" @click="saveAppointment">{{ editingId ? 'Lưu thay đổi' : 'Thêm lịch hẹn' }}</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="deleteId" class="modal-overlay" @click.self="deleteId = null">
      <div class="modal-box" style="max-width:400px">
        <div class="modal-header">
          <h3 class="modal-title">🗑️ Xác nhận xóa</h3>
          <button class="modal-close" @click="deleteId = null">✕</button>
        </div>
        <div class="modal-body">
          <p style="color:var(--text-secondary)">Bạn có chắc muốn xóa lịch hẹn này? Hành động này không thể hoàn tác.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="deleteId = null">Hủy</button>
          <button class="btn btn-danger" @click="doDelete">Xóa lịch hẹn</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAppointmentStore } from '../stores/appointments'
import type { AppointmentStatus, AppointmentType } from '../types'

const store = useAppointmentStore()

onMounted(() => {
  store.fetchAppointments()
})

const searchQuery = ref('')
const filterDate = ref('')
const filterStatus = ref<AppointmentStatus | ''>('')
const filterType = ref<AppointmentType | ''>('')
const page = ref(1)
const pageSize = 8
const showModal = ref(false)
const editingId = ref<string | null>(null)
const deleteId = ref<string | null>(null)

const form = ref({
  petName: '', breed: '', species: 'dog' as any,
  ownerName: '', ownerPhone: '', type: 'checkup' as AppointmentType,
  date: new Date().toISOString().split('T')[0], time: '09:00', notes: ''
})

const appointmentTypes = [
  { value: 'checkup', label: '🩺 Khám tổng quát' },
  { value: 'vaccination', label: '💉 Tiêm phòng' },
  { value: 'surgery', label: '🔪 Phẫu thuật' },
  { value: 'grooming', label: '✂️ Grooming' },
  { value: 'emergency', label: '🚨 Cấp cứu' },
  { value: 'follow_up', label: '🔄 Tái khám' },
]

const statusTabs = computed(() => {
  const all = store.appointments
  return [
    { value: '', label: 'Tất cả', icon: '📋', count: all.length },
    { value: 'waiting', label: 'Đang chờ', icon: '⏳', count: all.filter(a => a.status === 'waiting').length },
    { value: 'in_progress', label: 'Đang khám', icon: '🩺', count: all.filter(a => a.status === 'in_progress').length },
    { value: 'completed', label: 'Hoàn thành', icon: '✅', count: all.filter(a => a.status === 'completed').length },
    { value: 'cancelled', label: 'Đã hủy', icon: '❌', count: all.filter(a => a.status === 'cancelled').length },
  ]
})

const filteredAppointments = computed(() => {
  let result = store.searchAppointments(
    searchQuery.value,
    filterStatus.value as AppointmentStatus || undefined,
    filterDate.value || undefined
  )
  if (filterType.value) result = result.filter(a => a.type === filterType.value)
  return result.sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`))
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredAppointments.value.length / pageSize)))
const paginatedData = computed(() => filteredAppointments.value.slice((page.value - 1) * pageSize, page.value * pageSize))

function clearFilters() {
  searchQuery.value = ''
  filterDate.value = ''
  filterStatus.value = ''
  filterType.value = ''
  page.value = 1
}

function typeLabel(t: string) {
  return appointmentTypes.find(x => x.value === t)?.label || t
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
function petEmoji(species?: string) {
  return { dog: '🐕', cat: '🐈', bird: '🦜', rabbit: '🐰', other: '🐾' }[species || ''] || '🐾'
}
function petColor(species?: string) {
  return { dog: '#F59E0B', cat: '#6366F1', bird: '#10B981', rabbit: '#EC4899', other: '#94A3B8' }[species || ''] || '#94A3B8'
}

function openAdd() {
  editingId.value = null
  form.value = { petName: '', breed: '', species: 'dog', ownerName: '', ownerPhone: '', type: 'checkup', date: new Date().toISOString().split('T')[0], time: '09:00', notes: '' }
  showModal.value = true
}

function openEdit(appt: any) {
  editingId.value = appt.id
  form.value = {
    petName: appt.pet?.name || '',
    breed: appt.pet?.breed || '',
    species: appt.pet?.species || 'dog',
    ownerName: appt.pet?.owner?.name || '',
    ownerPhone: appt.pet?.owner?.phone || '',
    type: appt.type,
    date: appt.date,
    time: appt.time,
    notes: appt.notes || ''
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingId.value = null
}

function saveAppointment() {
  const petId = `pet-${Date.now()}`
  const ownerId = `own-${Date.now()}`
  const petData = {
    id: petId, name: form.value.petName, species: form.value.species as any,
    breed: form.value.breed, age: 1, weight: 0, gender: 'male' as any, color: '', ownerId,
    owner: { id: ownerId, name: form.value.ownerName, phone: form.value.ownerPhone, email: '', address: '' }
  }

  if (editingId.value) {
    store.updateAppointment(editingId.value, {
      type: form.value.type, date: form.value.date, time: form.value.time,
      notes: form.value.notes, pet: petData
    })
  } else {
    store.addAppointment({
      petId, doctorId: 'doc-001', type: form.value.type,
      date: form.value.date, time: form.value.time,
      status: 'waiting', notes: form.value.notes, pet: petData
    })
  }
  closeModal()
}

function confirmDelete(id: string) { deleteId.value = id }
function doDelete() {
  if (deleteId.value) store.deleteAppointment(deleteId.value)
  deleteId.value = null
}
function changeStatus(id: string, status: AppointmentStatus) {
  store.updateStatus(id, status)
}
</script>

<style scoped>
.status-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.status-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-hover);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all var(--transition);
}
.status-tab:hover { border-color: var(--primary); color: var(--primary); }
.status-tab.active { background: var(--primary); color: white; border-color: var(--primary); }

.tab-count {
  background: rgba(255,255,255,0.3);
  padding: 1px 6px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
}
.status-tab.active .tab-count { background: rgba(255,255,255,0.25); }

.status-select {
  padding: 5px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  border: 1.5px solid var(--border);
  cursor: pointer;
}
.status-select.status-waiting { background: var(--warning-light); color: #92400E; border-color: #FDE68A; }
.status-select.status-in_progress { background: #DBEAFE; color: #1D4ED8; border-color: #BFDBFE; }
.status-select.status-completed { background: var(--success-light); color: #065F46; border-color: #A7F3D0; }
.status-select.status-cancelled { background: #F1F5F9; color: var(--text-secondary); }
</style>

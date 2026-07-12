<template>
  <div class="page-content animate-fadeIn">
    <div class="page-header">
      <div class="page-title">
        <div class="title-icon" style="background:linear-gradient(135deg,#10B981,#059669)">🗂️</div>
        <div>
          <div>Lịch sử khám bệnh</div>
          <div class="page-subtitle">Toàn bộ hồ sơ khám bệnh thú cưng</div>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="card mb-4">
      <div class="card-body" style="padding:16px">
        <div class="search-bar">
          <div class="search-input-wrap">
            <span class="search-icon">🔍</span>
            <input v-model="searchQuery" type="text" class="form-control" placeholder="Tìm theo tên thú, chủ nhân, chẩn đoán..." />
          </div>
          <input v-model="filterDateFrom" type="date" class="form-control" style="width:170px" />
          <span class="text-muted text-sm">đến</span>
          <input v-model="filterDateTo" type="date" class="form-control" style="width:170px" />
          <button class="btn btn-secondary btn-sm" @click="clearFilters">✕ Xóa lọc</button>
        </div>
        <p class="text-sm text-muted mt-2">Tìm thấy <strong>{{ filteredRecords.length }}</strong> hồ sơ</p>
      </div>
    </div>

    <!-- Table -->
    <div class="card">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Thú cưng</th>
              <th>Chủ nhân</th>
              <th>Ngày khám</th>
              <th>Triệu chứng</th>
              <th>Chẩn đoán</th>
              <th>Đơn thuốc</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="paginatedRecords.length === 0">
              <td colspan="7">
                <div class="empty-state">
                  <p class="empty-icon">🗂️</p>
                  <p>Không tìm thấy hồ sơ nào</p>
                </div>
              </td>
            </tr>
            <tr v-for="record in paginatedRecords" :key="record.id">
              <td>
                <div class="flex items-center gap-2">
                  <div class="avatar-placeholder" :style="`width:36px;height:36px;background:${petColor(record.pet?.species)};color:white;font-size:16px;`">
                    {{ petEmoji(record.pet?.species) }}
                  </div>
                  <div>
                    <p class="font-semibold">{{ record.pet?.name }}</p>
                    <p class="text-xs text-muted">{{ record.pet?.breed }}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="font-semibold">{{ record.pet?.owner?.name }}</p>
                <p class="text-xs text-muted">📞 {{ record.pet?.owner?.phone }}</p>
              </td>
              <td>
                <p class="font-semibold">{{ formatDate(record.createdAt) }}</p>
                <p class="text-xs text-muted">{{ formatTime(record.createdAt) }}</p>
              </td>
              <td>
                <div class="symptom-preview">
                  <span v-for="s in record.symptoms.slice(0, 2)" :key="s" class="tag" style="font-size:11px;padding:2px 8px">{{ s }}</span>
                  <span v-if="record.symptoms.length > 2" class="text-xs text-muted">+{{ record.symptoms.length - 2 }}</span>
                </div>
              </td>
              <td>
                <p class="text-sm" style="max-width:180px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">
                  {{ record.diagnosis }}
                </p>
              </td>
              <td>
                <span v-if="record.prescriptions.length > 0" class="badge badge-success">{{ record.prescriptions.length }} thuốc</span>
                <span v-else class="badge badge-gray">Không</span>
              </td>
              <td>
                <button class="btn btn-primary btn-sm" @click="viewDetail(record)">👁 Chi tiết</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <span>Hiển thị {{ Math.min((page - 1) * pageSize + 1, filteredRecords.length) }}–{{ Math.min(page * pageSize, filteredRecords.length) }} / {{ filteredRecords.length }} hồ sơ</span>
        <div class="pagination-btns">
          <button class="page-btn" :disabled="page === 1" @click="page--">‹</button>
          <button v-for="p in totalPages" :key="p" class="page-btn" :class="{ active: page === p }" @click="page = p">{{ p }}</button>
          <button class="page-btn" :disabled="page === totalPages" @click="page++">›</button>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="detailRecord" class="modal-overlay" @click.self="detailRecord = null">
      <div class="modal-box" style="max-width:680px">
        <div class="modal-header">
          <h3 class="modal-title">🗂️ Chi tiết hồ sơ khám</h3>
          <div class="flex gap-2">
            <button class="btn btn-secondary btn-sm" @click="printRecord">🖨️ In hồ sơ</button>
            <button class="modal-close" @click="detailRecord = null">✕</button>
          </div>
        </div>
        <div class="modal-body" id="print-area">
          <!-- Pet Info -->
          <div class="detail-pet-header">
            <div class="avatar-placeholder" :style="`width:52px;height:52px;background:${petColor(detailRecord.pet?.species)};color:white;font-size:22px;`">
              {{ petEmoji(detailRecord.pet?.species) }}
            </div>
            <div>
              <h3 class="font-bold" style="font-size:18px">{{ detailRecord.pet?.name }}</h3>
              <div class="flex gap-2 mt-1">
                <span class="badge badge-primary">{{ detailRecord.pet?.breed }}</span>
                <span class="badge badge-gray">{{ detailRecord.pet?.age }} tuổi</span>
                <span class="badge badge-gray">{{ detailRecord.pet?.weight }} kg</span>
              </div>
              <p class="text-sm text-muted mt-1">Chủ nhân: <strong>{{ detailRecord.pet?.owner?.name }}</strong> · {{ detailRecord.pet?.owner?.phone }}</p>
            </div>
            <div class="ml-auto text-right">
              <p class="text-sm text-muted">Ngày khám</p>
              <p class="font-bold">{{ formatDate(detailRecord.createdAt) }}</p>
              <div class="flex gap-3 mt-1" v-if="detailRecord.weight || detailRecord.temperature">
                <span class="text-sm" v-if="detailRecord.weight">⚖️ {{ detailRecord.weight }} kg</span>
                <span class="text-sm" v-if="detailRecord.temperature">🌡️ {{ detailRecord.temperature }}°C</span>
              </div>
            </div>
          </div>

          <hr class="divider" />

          <!-- Symptoms -->
          <div class="detail-section">
            <h4 class="detail-label">🤒 Triệu chứng</h4>
            <div class="flex gap-2 flex-wrap">
              <span v-for="s in detailRecord.symptoms" :key="s" class="tag">{{ s }}</span>
              <span v-if="detailRecord.symptoms.length === 0" class="text-muted text-sm">Không ghi nhận</span>
            </div>
          </div>

          <!-- Diagnosis -->
          <div class="detail-section">
            <h4 class="detail-label">🔬 Chẩn đoán</h4>
            <p class="detail-text">{{ detailRecord.diagnosis || '—' }}</p>
          </div>

          <!-- Treatment -->
          <div class="detail-section">
            <h4 class="detail-label">💊 Phương pháp điều trị</h4>
            <p class="detail-text">{{ detailRecord.treatment || '—' }}</p>
          </div>

          <!-- Prescriptions -->
          <div class="detail-section" v-if="detailRecord.prescriptions.length > 0">
            <h4 class="detail-label">📋 Đơn thuốc</h4>
            <div class="table-container" style="border-radius:8px">
              <table class="table">
                <thead>
                  <tr>
                    <th>Thuốc</th>
                    <th>Liều lượng</th>
                    <th>Tần suất</th>
                    <th>Thời gian</th>
                    <th>Hướng dẫn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="rx in detailRecord.prescriptions" :key="rx.id">
                    <td class="font-semibold">{{ rx.medicineName }}</td>
                    <td>{{ rx.dosage }}</td>
                    <td>{{ rx.frequency }}</td>
                    <td>{{ rx.duration }}</td>
                    <td class="text-sm text-muted">{{ rx.instructions }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Notes -->
          <div class="detail-section" v-if="detailRecord.notes">
            <h4 class="detail-label">📝 Ghi chú bác sĩ</h4>
            <p class="detail-text detail-notes">{{ detailRecord.notes }}</p>
          </div>

          <!-- Next Visit -->
          <div class="detail-section" v-if="detailRecord.nextVisitDate">
            <h4 class="detail-label">📅 Lịch tái khám</h4>
            <p class="text-primary-color font-semibold">{{ formatDate(detailRecord.nextVisitDate) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMedicalRecordStore } from '../stores/medicalRecords'
import type { MedicalRecord } from '../types'

const store = useMedicalRecordStore()

const searchQuery = ref('')
const filterDateFrom = ref('')
const filterDateTo = ref('')
const page = ref(1)
const pageSize = 8
const detailRecord = ref<MedicalRecord | null>(null)

const filteredRecords = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return store.searchRecords(searchQuery.value).filter(r => {
    const date = r.createdAt.split('T')[0]
    const matchFrom = !filterDateFrom.value || date >= filterDateFrom.value
    const matchTo = !filterDateTo.value || date <= filterDateTo.value
    return matchFrom && matchTo
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRecords.value.length / pageSize)))
const paginatedRecords = computed(() => filteredRecords.value.slice((page.value - 1) * pageSize, page.value * pageSize))

function clearFilters() {
  searchQuery.value = ''
  filterDateFrom.value = ''
  filterDateTo.value = ''
  page.value = 1
}

function viewDetail(record: MedicalRecord) {
  detailRecord.value = record
}

function printRecord() {
  window.print()
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
function formatTime(d: string) {
  return new Date(d).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}
function petEmoji(species?: string) {
  return { dog: '🐕', cat: '🐈', bird: '🦜', rabbit: '🐰', other: '🐾' }[species || ''] || '🐾'
}
function petColor(species?: string) {
  return { dog: '#F59E0B', cat: '#6366F1', bird: '#10B981', rabbit: '#EC4899', other: '#94A3B8' }[species || ''] || '#94A3B8'
}
</script>

<style scoped>
.symptom-preview { display: flex; gap: 4px; flex-wrap: wrap; align-items: center; }

.detail-pet-header { display: flex; align-items: flex-start; gap: 16px; }
.detail-section { margin-bottom: 20px; }
.detail-label { font-size: 13px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
.detail-text { font-size: 14px; color: var(--text-primary); line-height: 1.7; }
.detail-notes { background: var(--bg-hover); padding: 12px; border-radius: var(--radius-md); border-left: 3px solid var(--primary); }
</style>

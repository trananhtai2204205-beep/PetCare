<template>
  <div class="page-content animate-fadeIn">
    <div class="page-header">
      <div>
        <h2 class="page-title"><span class="title-icon" style="background:rgba(99,102,241,0.1)">🏥</span> Hồ sơ sức khỏe</h2>
        <p class="page-subtitle">Lịch sử khám bệnh, đơn thuốc và kết quả xét nghiệm</p>
      </div>
    </div>

    <!-- Pet Filter -->
    <div class="pet-filter">
      <button :class="['pet-filter-btn', { active: selectedPet === '' }]" @click="selectedPet = ''">🐾 Tất cả</button>
      <button
        v-for="pet in pets"
        :key="pet.id"
        :class="['pet-filter-btn', { active: selectedPet === pet.id }]"
        @click="selectedPet = pet.id"
      >{{ petEmoji(pet.species) }} {{ pet.name }}</button>
    </div>

    <!-- Records -->
    <div v-if="filteredRecords.length === 0" class="empty-state">
      <div class="empty-icon">🏥</div>
      <p>Chưa có hồ sơ khám bệnh nào</p>
    </div>

    <div v-else class="records-list">
      <div v-for="r in filteredRecords" :key="r.id" class="record-card">
        <div class="record-header" @click="toggleRecord(r.id)">
          <div class="record-left">
            <div class="record-pet-badge">
              <span>{{ petEmoji(r.petSpecies) }}</span>
              <span>{{ r.petName }}</span>
            </div>
            <div class="record-meta">
              <span class="record-date">📅 {{ formatDate(r.date) }}</span>
              <span class="record-doc">👨‍⚕️ {{ r.doctorName }}</span>
            </div>
            <p class="record-diagnosis">{{ r.diagnosis }}</p>
          </div>
          <button class="expand-btn" :class="{ open: expandedId === r.id }">▾</button>
        </div>

        <transition name="slide-down">
          <div v-if="expandedId === r.id" class="record-body">
            <!-- Vitals -->
            <div class="vitals-row" v-if="r.weight || r.temperature">
              <div class="vital-item" v-if="r.weight">
                <span class="vital-icon">⚖️</span>
                <div><p class="vital-val">{{ r.weight }} kg</p><p class="vital-lbl">Cân nặng</p></div>
              </div>
              <div class="vital-item" v-if="r.temperature">
                <span class="vital-icon">🌡️</span>
                <div><p class="vital-val">{{ r.temperature }}°C</p><p class="vital-lbl">Nhiệt độ</p></div>
              </div>
            </div>

            <!-- Symptoms -->
            <div class="info-section">
              <h4 class="info-title">💬 Triệu chứng</h4>
              <div class="tags-row">
                <span v-for="s in r.symptoms" :key="s" class="symptom-tag">{{ s }}</span>
              </div>
            </div>

            <!-- Treatment -->
            <div class="info-section">
              <h4 class="info-title">💊 Phương pháp điều trị</h4>
              <p class="info-text">{{ r.treatment }}</p>
            </div>

            <!-- Prescriptions -->
            <div class="info-section" v-if="r.prescriptions.length > 0">
              <h4 class="info-title">📋 Đơn thuốc</h4>
              <div class="table-container">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Thuốc</th>
                      <th>Liều dùng</th>
                      <th>Tần suất</th>
                      <th>Thời gian</th>
                      <th>Hướng dẫn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="p in r.prescriptions" :key="p.medicineName">
                      <td><strong>{{ p.medicineName }}</strong></td>
                      <td>{{ p.dosage }}</td>
                      <td>{{ p.frequency }}</td>
                      <td>{{ p.duration }}</td>
                      <td class="text-muted">{{ p.instructions }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Lab Results -->
            <div class="info-section" v-if="r.labResults && r.labResults.length > 0">
              <h4 class="info-title">🧪 Kết quả xét nghiệm</h4>
              <div class="lab-grid">
                <div v-for="lab in r.labResults" :key="lab.name" class="lab-item" :class="`lab-${lab.status}`">
                  <p class="lab-name">{{ lab.name }}</p>
                  <p class="lab-val">{{ lab.value }} <span class="lab-unit">{{ lab.unit }}</span></p>
                  <span class="lab-status-badge">
                    {{ lab.status === 'normal' ? '✅ Bình thường' : lab.status === 'high' ? '⬆️ Cao' : '⬇️ Thấp' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Notes & Next Visit -->
            <div class="info-section" v-if="r.notes || r.nextVisitDate">
              <h4 class="info-title">📝 Ghi chú</h4>
              <p class="info-text" v-if="r.notes">{{ r.notes }}</p>
              <div class="next-visit" v-if="r.nextVisitDate">
                📅 Lịch tái khám: <strong>{{ formatDate(r.nextVisitDate) }}</strong>
                <router-link to="/bookings" class="btn btn-sm btn-customer ml-2">Đặt lịch tái khám</router-link>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePetsStore } from '../stores/pets'
import { useHealthRecordsStore } from '../stores/healthRecords'

const petsStore = usePetsStore()
const healthStore = useHealthRecordsStore()

onMounted(async () => {
  await Promise.all([
    petsStore.fetchPets(),
    healthStore.fetchRecords(),
  ])
})

const pets = computed(() => petsStore.pets)
const selectedPet = ref('')
const expandedId = ref<string | null>(null)

const filteredRecords = computed(() => {
  const all = healthStore.getAllRecords()
  if (!selectedPet.value) return all
  return all.filter(r => r.petId === selectedPet.value)
})

function toggleRecord(id: string) { expandedId.value = expandedId.value === id ? null : id }
function formatDate(d: string) { return new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) }
function petEmoji(s: string) { const m: Record<string,string> = {dog:'🐶',cat:'🐱',bird:'🦜',rabbit:'🐰',other:'🐾'}; return m[s]||'🐾' }
</script>

<style scoped>
.btn-customer { background: linear-gradient(135deg, #FF6B6B, #FF8E53); color: white; border: none; font-size: 12px; padding: 6px 12px; border-radius: 8px; }
.ml-2 { margin-left: 8px; }

.pet-filter { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.pet-filter-btn {
  padding: 8px 16px; border-radius: 9999px; font-size: 13px; font-weight: 500;
  border: 1.5px solid var(--border); background: white; color: var(--text-secondary);
  cursor: pointer; transition: all 0.2s;
}
.pet-filter-btn:hover { border-color: #FF6B6B; color: #FF6B6B; }
.pet-filter-btn.active { border-color: #FF6B6B; background: rgba(255,107,107,0.08); color: #FF6B6B; font-weight: 600; }

.records-list { display: flex; flex-direction: column; gap: 14px; }
.record-card { background: white; border-radius: var(--radius-lg); border: 1px solid var(--border); overflow: hidden; box-shadow: var(--shadow-sm); }
.record-header { padding: 20px 24px; display: flex; justify-content: space-between; align-items: flex-start; cursor: pointer; transition: background 0.15s; }
.record-header:hover { background: var(--bg-hover); }
.record-left { flex: 1; }
.record-pet-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,107,107,0.08); border: 1px solid rgba(255,107,107,0.2); color: #CC4444; border-radius: 9999px; padding: 3px 12px; font-size: 13px; font-weight: 600; margin-bottom: 8px; }
.record-meta { display: flex; gap: 16px; font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; }
.record-diagnosis { font-size: 16px; font-weight: 700; color: var(--text-primary); }
.expand-btn { width: 32px; height: 32px; border-radius: 8px; background: var(--bg-hover); border: 1px solid var(--border); cursor: pointer; font-size: 16px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.expand-btn.open { transform: rotate(180deg); }

.record-body { padding: 0 24px 24px; border-top: 1px solid var(--border); }
.vitals-row { display: flex; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--border); margin-bottom: 16px; }
.vital-item { display: flex; align-items: center; gap: 10px; background: var(--bg-hover); border-radius: 10px; padding: 10px 16px; }
.vital-icon { font-size: 22px; }
.vital-val { font-size: 16px; font-weight: 700; color: var(--text-primary); }
.vital-lbl { font-size: 11px; color: var(--text-muted); }
.info-section { margin-bottom: 20px; }
.info-title { font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 10px; }
.info-text { font-size: 14px; color: var(--text-secondary); line-height: 1.7; }
.tags-row { display: flex; flex-wrap: wrap; gap: 8px; }
.symptom-tag { padding: 4px 12px; background: #FFF7F5; border: 1px solid #FECACA; border-radius: 9999px; font-size: 12px; color: #CC4444; font-weight: 500; }
.lab-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
.lab-item { padding: 14px; border-radius: 10px; border: 1px solid var(--border); text-align: center; }
.lab-normal { border-color: #BBF7D0; background: #F0FDF4; }
.lab-high { border-color: #FECACA; background: #FFF7F5; }
.lab-low { border-color: #BAE6FD; background: #F0F9FF; }
.lab-name { font-size: 12px; color: var(--text-muted); margin-bottom: 4px; }
.lab-val { font-size: 20px; font-weight: 800; color: var(--text-primary); }
.lab-unit { font-size: 12px; font-weight: 400; }
.lab-status-badge { font-size: 11px; font-weight: 600; }
.next-visit { display: flex; align-items: center; gap: 8px; background: #F0F9FF; border: 1px solid #BAE6FD; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #0369A1; margin-top: 10px; }

.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; overflow: hidden; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; max-height: 0; }
.slide-down-enter-to, .slide-down-leave-from { opacity: 1; max-height: 2000px; }
</style>

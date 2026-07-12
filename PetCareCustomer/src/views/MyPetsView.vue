<template>
  <div class="page-content animate-fadeIn">
    <div class="page-header">
      <div>
        <h2 class="page-title"><span class="title-icon" style="background:rgba(255,107,107,0.12)">🐾</span> Thú cưng của tôi</h2>
        <p class="page-subtitle">Quản lý hồ sơ các bé cưng</p>
      </div>
      <button class="btn btn-customer" @click="openAdd" id="add-pet-btn">
        <span>+</span> Thêm thú cưng
      </button>
    </div>

    <!-- Pet Grid -->
    <div v-if="pets.length === 0" class="empty-state">
      <div class="empty-icon">🐾</div>
      <p>Bạn chưa có thú cưng nào. Hãy thêm ngay!</p>
      <button class="btn btn-customer mt-3" @click="openAdd">Thêm thú cưng đầu tiên</button>
    </div>

    <div v-else class="pets-grid">
      <div v-for="pet in pets" :key="pet.id" class="pet-card">
        <!-- Avatar -->
        <div class="pet-card-top" :style="petGradient(pet.species)">
          <div class="pet-emoji">{{ petEmoji(pet.species) }}</div>
          <div class="pet-actions-top">
            <button class="pet-action-btn" @click="openEdit(pet)" :id="`edit-pet-${pet.id}`">✏️</button>
            <button class="pet-action-btn danger" @click="confirmDelete(pet)" :id="`delete-pet-${pet.id}`">🗑️</button>
          </div>
        </div>
        <div class="pet-card-body">
          <div class="pet-name-row">
            <h3 class="pet-name">{{ pet.name }}</h3>
            <span class="badge badge-gray">{{ pet.gender === 'male' ? '♂ Đực' : '♀ Cái' }}</span>
          </div>
          <p class="pet-breed">{{ pet.breed }}</p>
          <div class="pet-meta-grid">
            <div class="pet-meta-item">
              <span class="meta-icon">🎂</span>
              <span>{{ pet.age }} tuổi</span>
            </div>
            <div class="pet-meta-item">
              <span class="meta-icon">⚖️</span>
              <span>{{ pet.weight }} kg</span>
            </div>
            <div class="pet-meta-item">
              <span class="meta-icon">🎨</span>
              <span>{{ pet.color }}</span>
            </div>
            <div class="pet-meta-item" v-if="pet.microchipId">
              <span class="meta-icon">💊</span>
              <span>{{ pet.microchipId }}</span>
            </div>
          </div>
          <p v-if="pet.notes" class="pet-notes">📝 {{ pet.notes }}</p>
          <div class="pet-card-footer">
            <router-link to="/health" class="btn btn-sm btn-secondary w-full justify-center">🏥 Xem hồ sơ</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal-box">
          <div class="modal-header">
            <h3 class="modal-title">{{ editId ? '✏️ Cập nhật thú cưng' : '🐾 Thêm thú cưng mới' }}</h3>
            <button class="modal-close" @click="showModal = false">✕</button>
          </div>
          <form @submit.prevent="handleSave">
            <div class="modal-body">
              <div class="grid-2">
                <div class="form-group">
                  <label class="form-label">Tên thú cưng *</label>
                  <input v-model="form.name" class="form-control" placeholder="Mochi, Luna..." required />
                </div>
                <div class="form-group">
                  <label class="form-label">Loài *</label>
                  <select v-model="form.species" class="form-control" required>
                    <option value="">Chọn loài</option>
                    <option value="dog">🐶 Chó</option>
                    <option value="cat">🐱 Mèo</option>
                    <option value="bird">🦜 Chim</option>
                    <option value="rabbit">🐰 Thỏ</option>
                    <option value="other">🐾 Khác</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Giống *</label>
                  <input v-model="form.breed" class="form-control" placeholder="Shiba Inu, British..." required />
                </div>
                <div class="form-group">
                  <label class="form-label">Giới tính *</label>
                  <select v-model="form.gender" class="form-control" required>
                    <option value="">Chọn</option>
                    <option value="male">♂ Đực</option>
                    <option value="female">♀ Cái</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Tuổi (năm) *</label>
                  <input v-model.number="form.age" type="number" min="0" max="30" step="0.5" class="form-control" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Cân nặng (kg) *</label>
                  <input v-model.number="form.weight" type="number" min="0.1" max="100" step="0.1" class="form-control" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Màu lông</label>
                  <input v-model="form.color" class="form-control" placeholder="Cam vàng, Xám..." />
                </div>
                <div class="form-group">
                  <label class="form-label">Mã Microchip</label>
                  <input v-model="form.microchipId" class="form-control" placeholder="MC-2024-..." />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Ghi chú sức khỏe</label>
                <textarea v-model="form.notes" class="form-control" placeholder="Dị ứng, bệnh nền..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal = false">Hủy</button>
              <button type="submit" class="btn btn-customer" :disabled="petsStore.isLoading">
                <span v-if="petsStore.isLoading" class="spinner-sm"></span>
                {{ editId ? 'Cập nhật' : 'Thêm thú cưng' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirm -->
    <Teleport to="body">
      <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
        <div class="modal-box" style="max-width:400px">
          <div class="modal-body" style="text-align:center;padding:36px 24px">
            <div style="font-size:48px;margin-bottom:16px">🗑️</div>
            <h3 style="font-size:18px;font-weight:700;margin-bottom:8px">Xóa thú cưng?</h3>
            <p class="text-secondary">Bạn có chắc muốn xóa <strong>{{ deleteTarget.name }}</strong>? Thao tác này không thể hoàn tác.</p>
            <div class="flex gap-3 justify-center mt-4">
              <button class="btn btn-secondary" @click="deleteTarget = null">Hủy</button>
              <button class="btn btn-danger" @click="handleDelete">Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePetsStore } from '../stores/pets'
import type { CustomerPet } from '../types'

const petsStore = usePetsStore()
const pets = computed(() => petsStore.pets)

onMounted(() => {
  petsStore.fetchPets()
})

const showModal = ref(false)
const editId = ref<string | null>(null)
const deleteTarget = ref<CustomerPet | null>(null)

const defaultForm = () => ({ name: '', species: '' as any, breed: '', gender: '' as any, age: 1, weight: 1, color: '', microchipId: '', notes: '' })
const form = ref(defaultForm())

function openAdd() { editId.value = null; form.value = defaultForm(); showModal.value = true }
function openEdit(pet: CustomerPet) { editId.value = pet.id; form.value = { ...pet, microchipId: pet.microchipId || '', notes: pet.notes || '' }; showModal.value = true }
function confirmDelete(pet: CustomerPet) { deleteTarget.value = pet }

async function handleSave() {
  if (editId.value) {
    await petsStore.updatePet(editId.value, form.value)
  } else {
    await petsStore.addPet(form.value)
  }
  showModal.value = false
}

async function handleDelete() {
  if (deleteTarget.value) {
    await petsStore.deletePet(deleteTarget.value.id)
    deleteTarget.value = null
  }
}

const gradients: Record<string, string> = {
  dog: 'linear-gradient(135deg, #FF6B6B20, #FF8E5320)',
  cat: 'linear-gradient(135deg, #4ECDC420, #44CF6C20)',
  bird: 'linear-gradient(135deg, #FFE66D30, #F59E0B20)',
  rabbit: 'linear-gradient(135deg, #6366F120, #8B5CF620)',
  other: 'linear-gradient(135deg, #94A3B820, #64748B20)'
}
function petGradient(species: string) { return { background: gradients[species] || gradients.other } }
function petEmoji(species: string) {
  const m: Record<string,string> = { dog:'🐶', cat:'🐱', bird:'🦜', rabbit:'🐰', other:'🐾' }
  return m[species] || '🐾'
}
</script>

<style scoped>
.btn-customer { background: linear-gradient(135deg, #FF6B6B, #FF8E53); color: white; border: none; box-shadow: 0 4px 14px rgba(255,107,107,0.3); }
.btn-customer:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(255,107,107,0.4); }
.btn-customer:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
.spinner-sm { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; margin-right: 4px; }
@keyframes spin { to { transform: rotate(360deg); } }
.mt-3 { margin-top: 12px; }

.pets-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.pet-card { background: white; border-radius: var(--radius-xl); border: 1px solid var(--border); overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s, box-shadow 0.2s; }
.pet-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.pet-card-top { padding: 28px 20px 20px; display: flex; justify-content: flex-end; position: relative; }
.pet-emoji { font-size: 56px; position: absolute; bottom: 16px; left: 20px; }
.pet-actions-top { display: flex; gap: 6px; }
.pet-action-btn {
  width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.7);
  border: 1px solid rgba(255,255,255,0.5); font-size: 14px;
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
}
.pet-action-btn:hover { background: white; }
.pet-action-btn.danger:hover { background: #FEE2E2; }

.pet-card-body { padding: 16px 20px 20px; }
.pet-name-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
.pet-name { font-size: 20px; font-weight: 800; color: var(--text-primary); }
.pet-breed { font-size: 13px; color: var(--text-secondary); margin-bottom: 14px; }
.pet-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
.pet-meta-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); background: var(--bg-hover); padding: 6px 10px; border-radius: 8px; }
.meta-icon { font-size: 14px; }
.pet-notes { font-size: 12px; color: var(--text-secondary); background: #FFF7F5; border: 1px solid #FECACA; border-radius: 8px; padding: 8px 10px; margin-bottom: 14px; }
.pet-card-footer { }
</style>

<template>
  <!-- Auth Layout -->
  <router-view v-if="isAuthRoute" />

  <!-- Main Layout -->
  <div v-else class="app-layout">
    <Sidebar />
    <div class="main-content">
      <AppHeader />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue'
import AppHeader from './components/layout/AppHeader.vue'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const auth = useAuthStore()
const isAuthRoute = computed(() => route.meta.layout === 'auth')

// Phục hồi session nếu đã đăng nhập trước đó
onMounted(() => auth.checkAuth())
</script>

<style scoped></style>

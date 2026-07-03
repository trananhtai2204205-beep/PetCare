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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue'
import AppHeader from './components/layout/AppHeader.vue'

const route = useRoute()
const isAuthRoute = computed(() => route.meta.layout === 'auth')
</script>

<style scoped></style>

<template>
  <!-- Auth Layout -->
  <router-view v-if="isAuthRoute" />

  <!-- Customer Portal Layout -->
  <div v-else class="app-layout">
    <CustomerSidebar />
    <div class="main-content" :style="{ marginLeft: '260px' }">
      <CustomerHeader />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CustomerSidebar from './components/CustomerSidebar.vue'
import CustomerHeader from './components/CustomerHeader.vue'

const route = useRoute()
const isAuthRoute = computed(() => route.meta.layout === 'auth')
</script>

<style scoped></style>

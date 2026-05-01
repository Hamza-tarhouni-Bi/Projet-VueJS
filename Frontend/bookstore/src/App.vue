<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminNavbar from './components/AdminNavbar.vue'
import Navbar from './components/Navbar.vue'

const route = useRoute()

const isAdminRoute = computed(() => {
  return route?.path?.startsWith('/admin') && route?.path !== '/admin/login'
})

const isAuthRoute = computed(() => {
  return route?.path === '/admin/login' || route?.path?.startsWith('/admin')
})
</script>

<template>
  <div v-if="isAdminRoute" class="admin-layout">
    <AdminNavbar />
    <main class="admin-content">
      <router-view />
    </main>
  </div>

  <div v-else class="user-layout">
    <Navbar v-if="!isAuthRoute" />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.admin-layout { display: flex; flex-direction: column; min-height: 100vh; background-color: #f3f4f6; font-family: sans-serif; }
.admin-content { flex: 1; padding: 2rem; overflow-y: auto; }
.user-layout { display: flex; flex-direction: column; min-height: 100vh; font-family: sans-serif; }
.main { flex: 1; }
</style>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const token = ref<string | null>(null)
const role = ref<string | null>(null)

const checkAuth = () => {
  token.value = localStorage.getItem('token')
  role.value = localStorage.getItem('role')
}

onMounted(() => checkAuth())
watch(route, () => checkAuth())

const logout = () => {
  localStorage.clear()
  token.value = null
  role.value = null
  router.push('/login')
}

const isActive = (path: string) => route.path === path
</script>

<template>
  <nav class="navbar">

    <!-- Logo -->
    <div class="logo" @click="router.push(token ? '/home' : '/login')">
      Book Shop
    </div>

    <!-- Links -->
    <div class="links">

      <!-- Guest -->
      <template v-if="!token">
        <span
          class="link"
          :class="{ active: isActive('/home') }"
          @click="router.push('/home')"
        >
          Home
        </span>

        <span
          class="link"
          :class="{ active: isActive('/login') }"
          @click="router.push('/login')"
        >
          Login
        </span>
      </template>

      <!-- User -->
      <template v-else-if="role === 'user'">

        <span
          class="link"
          :class="{ active: isActive('/home') }"
          @click="router.push('/home')"
        >
          Accueil
        </span>

        <span
          class="link"
          :class="{ active: isActive('/allbooks') }"
          @click="router.push('/allbooks')"
        >
          All Books
        </span>

        <span class="link logout" @click="logout">
          Logout
        </span>

      </template>

    </div>

  </nav>
</template>

<style scoped>
.navbar {
  height: 70px;
  background: linear-gradient(to right, #2c3e50, #3b82f6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  color: white;
  border-bottom: 2px solid #ddd;
}

/* Logo */
.logo {
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
}

/* Links container */
.links {
  display: flex;
  gap: 25px;
}

/* Links */
.link {
  cursor: pointer;
  font-size: 14px;
  color: #e5e7eb;
  transition: 0.2s;
}

/* Hover (only visual, not affecting active logic) */
.link:hover {
  color: white;
}

/* Active link (ONLY when active) */
.link.active {
  font-weight: bold;
  text-decoration: underline;
  color: white;
}

/* Logout */
.logout {
  color: red;
}

.logout:hover {
  color: #ff6666;
}
</style>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

const isActive = (path: string) => route.path.startsWith(path)
</script>

<template>
  <nav class="navbar">

    <!-- Logo -->
    <div class="logo" @click="router.push('/home')">
      Book Shop
    </div>

    <!-- Links -->
    <div class="links">

      <!-- Accueil -->
      <span
        class="link"
        :class="{ active: isActive('/home') }"
        @click="router.push('/home')"
      >
        Accueil
      </span>

      <!-- 👇 NEW Authors -->
      <span
        class="link"
        :class="{ active: isActive('/admin/authors') }"
        @click="router.push('/admin/authors')"
      >
        Authors
      </span>

     

      <!-- Books -->
      <span
        class="link"
        :class="{ active: isActive('/admin/books') }"
        @click="router.push('/admin/books')"
      >
        Books
      </span>

    

      <!-- Logout -->
      <span class="link logout" @click="logout">
        Logout
      </span>

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

.logo {
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
}

.links {
  display: flex;
  gap: 25px;
}

.link {
  cursor: pointer;
  font-size: 14px;
  color: #e5e7eb;
  transition: 0.2s;
}

.link:hover {
  color: white;
}

.link.active {
  font-weight: bold;
  text-decoration: underline;
  color: white;
}

.logout {
  color: #ff4d4d;
}

.logout:hover {
  color: #ff8080;
}
</style>
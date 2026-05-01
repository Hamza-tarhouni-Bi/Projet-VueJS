<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #f3f4f6; text-align: center; padding-left: 1rem; padding-right: 1rem;">
    <h1 style="font-size: 3.75rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">404</h1>
    <p style="color: #6b7280; font-size: 1.125rem; margin-bottom: 2rem;">Oops! Page not found.</p>
    <button
      @click="router.push('/login')"
      style="background-color: #2563eb; color: white; padding: 0.5rem 1.5rem; border-radius: 0.75rem; border: none; cursor: pointer; transition: background-color 0.2s;"
      onmouseover="this.style.backgroundColor='#1d4ed8'"
      onmouseout="this.style.backgroundColor='#2563eb'"
    >
      Go Home
    </button>
  </div>
</template>
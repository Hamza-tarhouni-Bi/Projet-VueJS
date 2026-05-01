<script setup lang="ts">
import { ref } from 'vue'
import BookList from '../components/BookList.vue'

const startYear = ref<number | null>(null)
const endYear = ref<number | null>(null)
const appliedStart = ref<number | null>(null)
const appliedEnd = ref<number | null>(null)

const search = () => {
  appliedStart.value = startYear.value
  appliedEnd.value = endYear.value
}
</script>

<template>
  <div style="background-color: #f3f4f6; min-height: 100vh;">

    <!-- Search Bar -->
    <div class="search-bar">
      <div class="field">
        <label>Start Year</label>
        <input v-model.number="startYear" type="number" placeholder="ex: 1900" />
      </div>

      <div class="field">
        <label>End Year</label>
        <input v-model.number="endYear" type="number" placeholder="ex: 2024" />
      </div>

      <button class="btn" @click="search">Search</button>
    </div>

    <BookList :startYear="appliedStart" :endYear="appliedEnd" />

  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.field input {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  outline: none;
  width: 160px;
}

.field input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.btn {
  padding: 8px 24px;
  background: linear-gradient(135deg, #2b6cb0, #2563eb);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: 0.2s;
  height: 36px;
}

.btn:hover {
  opacity: 0.9;
}
</style>
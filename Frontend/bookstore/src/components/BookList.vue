<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Card from './Card.vue'

const props = defineProps(['startYear', 'endYear'])
const books = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/books/all')
    const data = await res.json()
    books.value = data.listeBooks ?? []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const filtered = computed(() => {
  return books.value.filter(b => {
    if (props.startYear && b.year < props.startYear) return false
    if (props.endYear && b.year > props.endYear) return false
    return true
  })
})
</script>

<template>
  <div class="container">
    <p v-if="loading" class="loading">Loading books...</p>

    <div v-else class="grid">
      <Card v-for="book in filtered" :key="book.id" :book="book" />
    </div>

    <p v-if="!loading && filtered.length === 0" class="empty">
      No books found
    </p>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
}

.loading {
  text-align: center;
  color: #6b7280;
}

.empty {
  text-align: center;
  margin-top: 2.5rem;
  color: #9ca3af;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}
</style>
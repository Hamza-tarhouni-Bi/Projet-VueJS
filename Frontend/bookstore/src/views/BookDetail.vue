<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const book = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:3000/books/search/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    book.value = Array.isArray(data) ? data[0] : data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container">

    <button @click="router.back()" class="back-btn">
      Back
    </button>

    <p v-if="loading" class="loading">Loading book...</p>

    <div v-else-if="book" class="card">
      <img :src="book.image" alt="cover" class="image" />

      <div class="content">
        <h1 class="title">{{ book.title }}</h1>

        <p class="author">
          {{ book.author?.prenom }} {{ book.author?.nom }}
        </p>

        <div class="badges">
          <span class="badge">{{ book.year }}</span>
          <span class="badge">{{ book.editor }}</span>
        </div>
      </div>
    </div>

    <p v-else class="empty">Book not found </p>

  </div>
</template>

<style scoped>
.container {
  background-color: #f3f4f6;
  padding: 2rem;
  min-height: 100vh;
}

/* Back button */
.back-btn {
  margin-bottom: 1.5rem;
  border-radius: 8px;
  padding: 10px 30px;
  color: white;
  font-size: 0.875rem;
  border: none;
  background: rgb(65, 132, 225);
  cursor: pointer;
  transition: color 0.2s ease;
}

.back-btn:hover {
  color: #000;
}

/* Loading */
.loading {
  text-align: center;
  color: #6b7280;
}

/* Empty */
.empty {
  text-align: center;
  color: #9ca3af;
}

/* Card */
.card {
  background-color: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  border-radius: 1rem;
}

/* Image */
.image {
  width: 100%;
  object-fit: cover;
}

/* Content */
.content {
  display: flex;
  flex-direction: column;
}

/* Title */
.title {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

/* Author */
.author {
  color: #6b7280;
  margin-bottom: 1rem;
}

/* Badges */
.badges {
  display: flex;
  gap: 0.5rem;
}

.badge {
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

/* Responsive */
@media (min-width: 768px) {
  .card {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
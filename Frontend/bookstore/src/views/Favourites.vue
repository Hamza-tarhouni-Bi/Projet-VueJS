<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const favourites = ref(JSON.parse(localStorage.getItem('favourites') || '[]'))

const removeFav = (id: number) => {
  const updated = favourites.value.filter((b: any) => b.id !== id)
  localStorage.setItem('favourites', JSON.stringify(updated))
  favourites.value = updated
}
</script>

<template>
  <div class="page">

    <div class="header">
      <h1>❤️ My Favourites</h1>
      <p>{{ favourites.length }} book{{ favourites.length !== 1 ? 's' : '' }} saved</p>
    </div>

    <div v-if="favourites.length === 0" class="empty">
      <div class="empty-icon">📚</div>
      <p>No favourites yet.</p>
      <button class="browse-btn" @click="router.push('/allbooks')">Browse Books</button>
    </div>

    <div v-else class="grid">
      <div
        v-for="book in favourites"
        :key="book.id"
        class="card"
        @click="router.push(`/books/${book.id}`)"
      >
        <!-- Image -->
        <div class="image-container">
          <img :src="book.image" alt="cover" />
        </div>

        <!-- Content -->
        <div class="content">
          <h2 class="title">{{ book.title }}</h2>
          <p class="author">✍️ {{ book.author?.prenom }} {{ book.author?.nom }}</p>
          <p class="editor">🏢 {{ book.editor }}</p>
          <p class="year">📅 {{ book.year }}</p>

          <button class="btn" @click.stop="removeFav(book.id)">
            ❌ Remove from Favourites
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.page {
  padding: 2rem 3rem;
  min-height: 100vh;
  background-color: #f8fafc;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
}

.header p {
  font-size: 14px;
  color: #718096;
  margin-top: 4px;
}

.empty {
  text-align: center;
  margin-top: 6rem;
  color: #718096;
}

.empty-icon {
  font-size: 60px;
  margin-bottom: 1rem;
}

.empty p {
  font-size: 18px;
  margin-bottom: 1.5rem;
}

.browse-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #2b6cb0, #2563eb);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: 0.2s;
}

.browse-btn:hover {
  opacity: 0.9;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  width: 240px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card:hover .image-container img {
  transform: scale(1.05);
}

.content {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  font-size: 15px;
  font-weight: 700;
  color: #1a202c;
  line-height: 1.3;
}

.author {
  font-size: 12px;
  color: #718096;
}

.editor {
  font-size: 12px;
  color: #718096;
}

.year {
  font-size: 12px;
  color: #a0aec0;
}

.btn {
  margin-top: 8px;
  width: 100%;
  padding: 9px;
  background: linear-gradient(135deg, #e53e3e, #c53030);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: 0.2s;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>
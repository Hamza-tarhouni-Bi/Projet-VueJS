<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['book'])

const isLoggedIn = !!localStorage.getItem('token')

const getFavs = () => JSON.parse(localStorage.getItem('favourites') || '[]')

const isFav = ref(getFavs().some((b: any) => b.id === props.book.id))

const toggleFav = () => {
  if (!isLoggedIn) return

  const favs = getFavs()

  if (isFav.value) {
    const updated = favs.filter((b: any) => b.id !== props.book.id)
    localStorage.setItem('favourites', JSON.stringify(updated))
    isFav.value = false
  } else {
    favs.push(props.book)
    localStorage.setItem('favourites', JSON.stringify(favs))
    isFav.value = true
  }
}
</script>

<template>
  <div class="card">

    <!-- Image -->
    <div class="image-container">
      <img :src="props.book.image" alt="cover" />
    </div>

    <!-- Content -->
    <div class="content">
      <h2 class="title">{{ props.book.title }}</h2>
      <p class="author">✍️ {{ props.book.author?.prenom }} {{ props.book.author?.nom }}</p>
      <p class="editor">🏢 {{ props.book.editor }}</p>
      <p class="year">📅 {{ props.book.year }}</p>

      <button
        class="btn"
        :class="{ active: isFav }"
        @click="toggleFav"
      >
        {{ isFav ? '❤️ Remove Favourites' : '🤍 Add to Favourites' }}
      </button>
    </div>

  </div>
</template>

<style scoped>
.card {
  width: 260px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  font-family: Arial, sans-serif;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}

.image-container {
  width: 100%;
  height: 320px;
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
  background: linear-gradient(135deg, #2b6cb0, #2563eb);
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

.btn.active {
  background: linear-gradient(135deg, #e53e3e, #c53030);
}
</style>
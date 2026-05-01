<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section class="hero">

    <h1 class="title">
      Découvrez des livres pour tous les goûts
    </h1>

    <p class="subtitle">
      Des classiques intemporels aux derniers best-sellers, trouvez votre prochaine lecture ici.
    </p>

    <button
      @click="router.push('/allbooks')"
      class="btn"
    >
      Explorer le catalogue
    </button>

  </section>
</template>

<style scoped>
.hero {
  background-color: #f3f4f6;
  padding: 4rem 1rem;
  text-align: center;
}

/* Title */
.title {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

/* Subtitle */
.subtitle {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 1.5rem;
}

/* Button */
.btn {
  background-color: #2563eb;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;
}

/* Hover */
.btn:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (min-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 16px;
  }
}
</style>
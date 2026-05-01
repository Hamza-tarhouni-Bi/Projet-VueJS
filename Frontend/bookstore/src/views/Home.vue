<script setup lang="ts">
</script>

<template>
  <footer class="footer">

    <div class="container">

      <h2 class="title">Besoin d'aide ?</h2>

      <p class="subtitle">
        Contactez-nous pour toute question ou assistance.
      </p>

      <button class="btn">
        Contactez-nous
      </button>

    </div>

  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(to right, #111827, #1f2937);
  color: white;
  padding: 2.5rem 1rem;
}

/* Container */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
}

/* Title */
.title {
  font-size: 18px;
  font-weight: 600;
}

/* Subtitle */
.subtitle {
  font-size: 14px;
  color: #d1d5db;
}

/* Button */
.btn {
  margin-top: 0.75rem;
  background-color: #2563eb;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;
}

/* Hover effect */
.btn:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}
</style>
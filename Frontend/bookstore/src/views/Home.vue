<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '../components/HeroSection.vue';
import BookList from '../components/BookList.vue';
import Footer from '../components/Footer.vue';


const searchQuery = ref('')
</script>

<template>
  <div>
    <HeroSection />
   <center> <h1 class="text-center">Livres Populaires</h1></center>
    <BookList :query="searchQuery" />
    
  </div>
  <Footer />
</template>

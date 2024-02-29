<template>
  <h1>Client Page</h1>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <ResultComponent :layout="renderedLayout" :styles="renderedStyles" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ResultComponent from '../components/ResultComponent.vue';

const loading = ref(true);
const renderedLayout = ref('');
const renderedStyles = ref('');

onMounted(async () => {
  try {
    // Fetch data from the API
    const response = await fetch((import.meta.env.VITE_API_BACKEND || 'http://localhost:5001') + '/api/getData');
    const data = await response.json();

    // Assign data to reactive variables
    renderedLayout.value = data.layout || '';
    renderedStyles.value = data.styles || '';
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
  }
});
</script>
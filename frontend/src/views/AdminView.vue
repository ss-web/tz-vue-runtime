<template>
  <h1>Admin Page</h1>
  <div class="admin-page">
    <div class="edit-component">
      <section>
        <textarea v-model="layout" rows="4" cols="50" placeholder="Layout"></textarea>
      </section>
      <section>
        <textarea v-model="styles" rows="4" cols="50" placeholder="Styles"></textarea>
      </section>
      <button @click.prevent="saveSettings" class="btn">Save</button>
    </div>
    <ResultComponent :layout="layout" :styles="styles" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ResultComponent from '../components/ResultComponent.vue';

const defLayout = `
  <img src="https://149455152.v2.pressablecdn.com/wp-content/uploads/2015/11/Kids-Programming-1024x512.jpg" />
  <h3>Card title</h3>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint eius corrupti non laudantium qui, possimus explicabo, iste reiciendis dolorum rem quibusdam commodi alias nobis eos a eum fugiat saepe?</p>
  <button class="btn">Buttons</button>
`
const defStyles = `b{color:blue; background: red}
img{
  max-width: 100%;
}
.btn {
  font-size: 16px;
  margin-top: 8px;
  padding: 8px;
}
`
const layout = ref(defLayout);
const styles = ref(defStyles);

const saveSettings = async () => {
  console.log('Saving settings:', { layout: layout.value, styles: styles.value });
  try {
    const response = await fetch((import.meta.env.VITE_API_BACKEND || 'http://localhost:5001') + '/api/saveSettings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        layout: layout.value,
        styles: styles.value,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Settings saved successfully:', result);
    } else {
      throw new Error('Failed to save settings');
    }
  } catch (error) {
    console.error('Error saving settings:', error.message);
  }
};

// Функция для разбора текста стилей
function parseStyles(stylesText) {
  const stylesArray = stylesText.split(';').filter(Boolean);
  const parsedStyles = {};
  stylesArray.forEach((style) => {
    const [property, value] = style.split(':');
    if (property && value) {
      parsedStyles[property.trim()] = value.trim();
    }
  });
  return parsedStyles;
} //

onMounted(async () => {
  const response = await fetch((import.meta.env.VITE_API_BACKEND || 'http://localhost:5001') + '/api/getData');
  const data = await response.json();

    // Assign data to reactive variables
  layout.value = data.layout || defLayout;
  styles.value = data.styles || defStyles;
})
</script>

<style scoped>
textarea{
  border: 1px solid var(--color-purple);
  font-size: 16px;
  margin-bottom: 20px;
}
.admin-page {
  display: flex;
  padding: 20px;
}

.edit-component {
  margin-bottom: 20px;
  margin-right: 20px;
}

.result {
  margin-top: 20px;
  padding: 10px;
}
</style>

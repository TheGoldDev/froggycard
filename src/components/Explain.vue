

<template>
  <div class="object-description explain">
    <p class="word">
      {{ word }}
    </p>

    <p>{{ objectDescription.value }}</p>

  </div>
</template>


<script setup>
import '../assets/styles.css';  //link css / scss
import { ref } from 'vue';
import objectsData from '../../public/data/objectDescription_en.json';

const objectDescription = ref('');
let word = "RATEAU";
</script>

<template>
  <div id="app">

    <router-view></router-view>

  </div>
</template>

<script>
import ToggleLanguage from './components/ToggleLanguage.vue';

export default {
  name: 'App',
  components: {
    ToggleLanguage
  }
};
</script>

<style>
/* Vos styles existants */
</style>

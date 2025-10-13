<template>
  <div class="choix-langue">
    <img src="/public/images/fr-icon.png" alt="icon choix langue anglais" class="lang-icon">
    <button @click="toggleLanguage" class="language-switch" aria-label="Changement de langue">
      <div class="switch" :class="{ 'switch-en': currentLanguage === 'en', 'switch-fr': currentLanguage === 'fr' }"></div>
    </button>
    <img src="/public/images/en-icon.png" alt="icon choix langue français" class="lang-icon">
  </div>

</template>

<script>
export default {
  data() {
    return {
      currentLanguage: localStorage.getItem('lang') || 'fr' // Récupérer la langue actuellement sélectionnée depuis le stockage local
    };
  },
  methods: {
    toggleLanguage() {
      const newLanguage = this.currentLanguage === 'fr' ? 'en' : 'fr';

      this.currentLanguage = newLanguage;
      localStorage.setItem('lang', newLanguage); // Stocker la nouvelle langue sélectionnée dans le stockage local
      this.$i18n.locale = newLanguage; // Mettre à jour la langue dans l'instance de VueI18n

    }
  }
};
</script>

<style scoped>

</style>
  
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import messages from '../src/js/messages';

const i18n = createI18n({
  locale: 'fr', // Locale par défaut
  messages
});

const app = createApp(App);

// Vérifier si les données existent déjà dans le localStorage
const savedLang = localStorage.getItem('lang');

if (savedLang) {
  // Si elles existent, utiliser la langue stockée dans le localStorage
  i18n.global.locale = savedLang;
} else {
  // Si elles n'existent pas, utiliser la langue par défaut et enregistrer dans le localStorage
  localStorage.setItem('lang', i18n.global.locale);
}

app
  .use(router)
  .use(i18n)
  .mount('#app');

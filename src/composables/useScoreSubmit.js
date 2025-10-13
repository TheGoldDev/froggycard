import { ref } from 'vue';
import axios from 'axios';

export function useScoreSubmit(difficulty) {
  const pseudo = ref('');

  const submitPseudo = async (displayTime) => {
    try {
      await axios.post('https://mmi22c07-2.h205.online/api/classements', {
        time: displayTime,
        difficulty: difficulty,
        pseudo: pseudo.value
      }, {
        headers: {
          'Content-Type': 'application/ld+json'
        }
      });
      const confirmationPseudo = document.querySelector('.confirmation-pseudo');
      if (confirmationPseudo) {
        confirmationPseudo.style.display = "block";
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du pseudo :', error);
    }
  };

  return {
    pseudo,
    submitPseudo
  };
}

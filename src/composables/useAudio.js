import { ref } from 'vue';

export function useAudio() {
  const language = localStorage.getItem('lang');
  const langAudio = language === 'fr' ? '_fr.mp3' : '_en.mp3';
  const cardSound = ref('');
  let audio = null;

  const playSound = (buttonSelector) => {
    const button = document.querySelector(buttonSelector);

    if (audio && !audio.paused) {
      audio.pause();
      button?.classList.remove('no-btn--sound--pause');
      button?.classList.add('no-btn--sound--play');
    } else {
      audio = new Audio(`../../public/sounds/${cardSound.value}${langAudio}`);
      audio.play();
      button?.classList.remove('no-btn--sound--play');
      button?.classList.add('no-btn--sound--pause');

      audio.addEventListener('ended', function() {
        button?.classList.remove('no-btn--sound--pause');
        button?.classList.add('no-btn--sound--play');
      });
    }
  };

  return {
    cardSound,
    playSound,
    langAudio
  };
}

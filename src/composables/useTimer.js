import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

export function useTimer() {
  const horloge = ref(null);
  const minutes = ref(0);
  const secondes = ref(0);

  const startTimer = () => {
    horloge.value = setInterval(() => {
      secondes.value++;
      if (secondes.value === 60) {
        minutes.value++;
        secondes.value = 0;
      }
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(horloge.value);
  };

  const displayTime = computed(() => {
    return `${minutes.value < 10 ? '0' + minutes.value : minutes.value}:${secondes.value < 10 ? '0' + secondes.value : secondes.value}`;
  });

  const gameTime = computed(() => {
    const minute = minutes.value;
    const second = secondes.value;
    if (minute < 1) {
      return `${second} secondes`;
    } else if (minute > 1) {
      return `${minute} minutes et ${second} secondes`;
    } else {
      return `${minute} minute et ${second} secondes`;
    }
  });

  onMounted(() => {
    startTimer();
  });

  onBeforeUnmount(() => {
    stopTimer();
  });

  return {
    horloge,
    minutes,
    secondes,
    startTimer,
    stopTimer,
    displayTime,
    gameTime
  };
}

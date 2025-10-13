export const WORD = "FROGGY";
export const COLORS = ['#E2A340FF', '#D3715BFF', '#228AB9FF', '#4C8B25FF'];

export function getColorByIndex(index) {
  return COLORS[index % COLORS.length];
}

export function displayTimer(horloge) {
  clearInterval(horloge.value);
  const timerElement = document.getElementsByClassName('timer')[0];
  if (timerElement) timerElement.style.display = "none";
  const displayTimeVictory = document.getElementById('display-time-victory');
  if (displayTimeVictory) displayTimeVictory.style.display = "none";
  const timerInput = document.getElementsByClassName('input-classement')[0];
  if (timerInput) timerInput.style.display = "none";
}

export function goToMenu() {
  location.href = "/";
}

export function reload() {
  location.reload();
}

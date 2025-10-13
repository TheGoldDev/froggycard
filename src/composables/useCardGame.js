import { ref } from 'vue';
import jsonDataEn from '../../public/data/objectDescription_en.json';
import jsonDataFr from '../../public/data/objectDescription_fr.json';

export function useCardGame(rows, columns, cardTypes, stopTimer) {
  const language = localStorage.getItem('lang');
  const jsonData = language === 'fr' ? jsonDataFr : jsonDataEn;

  const totalCards = rows * columns;
  const numEachType = totalCards / cardTypes.length;
  const pairsToWin = cardTypes.length;

  let winCount = ref(0);
  const grid = ref(Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({
      isFlipped: false,
      backImagePath: ''
    }))
  ));

  let flippedCard = null;
  const cardDescription = ref('');
  const cardSound = ref('');

  function getBackImagePath() {
    const types = cardTypes.map(image => ({ image, count: 0 }));

    for (let i = 0; i < grid.value.length; i++) {
      for (let j = 0; j < grid.value[i].length; j++) {
        const backImagePath = grid.value[i][j].backImagePath;
        const index = types.findIndex(type => type.image === backImagePath);
        if (index !== -1) {
          types[index].count++;
        }
      }
    }

    let selectedType = null;
    do {
      const randomIndex = Math.floor(Math.random() * types.length);
      if (types[randomIndex].count < numEachType) {
        selectedType = types[randomIndex];
        selectedType.count++;
      }
    } while (!selectedType);

    return selectedType.image;
  }

  for (let i = 0; i < grid.value.length; i++) {
    for (let j = 0; j < grid.value[i].length; j++) {
      grid.value[i][j].backImagePath = getBackImagePath();
    }
  }

  function flipCard(rowIndex, cardIndex) {
    const card = grid.value[rowIndex][cardIndex];
    if (!card.isFlipped) {
      card.isFlipped = true;
      if (!flippedCard) {
        flippedCard = { rowIndex, cardIndex, backImagePath: card.backImagePath };
      } else {
        const { rowIndex: prevRowIndex, cardIndex: prevCardIndex, backImagePath: prevBackImagePath } = flippedCard;
        if (rowIndex === prevRowIndex && cardIndex === prevCardIndex) {
          return;
        }
        if (card.backImagePath === prevBackImagePath) {
          grid.value[prevRowIndex][prevCardIndex].isFlipped = true;
          card.isFlipped = true;
          winCount.value++;

          if (winCount.value === pairsToWin) {
            setTimeout(() => {
              grid.value[prevRowIndex][prevCardIndex].isFlipped = false;
              card.isFlipped = false;
            }, 2000);
            document.getElementById('jeu').style.display = "none";
            document.getElementById('victory').style.display = "flex";
            stopTimer();
          }

          let cardName = card.backImagePath.split('/').pop().split('.')[0];
          const matchingCard = jsonData.text.find(item => item.name === cardName);
          if (matchingCard) {
            cardDescription.value = matchingCard.description;
            cardSound.value = matchingCard.name;
          }
        } else {
          setTimeout(() => {
            grid.value[prevRowIndex][prevCardIndex].isFlipped = false;
            card.isFlipped = false;
          }, 500);
        }
        flippedCard = null;
      }
    }
  }

  function getCardAlt(imagePath) {
    return "Carte " + imagePath.split('/').pop().split('.')[0];
  }

  return {
    grid,
    flipCard,
    getCardAlt,
    cardDescription,
    cardSound,
    winCount
  };
}

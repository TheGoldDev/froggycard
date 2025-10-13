<template>
  <div id="app" class="jeux jeux--difficile">
    <div class="container container__difficile">
      <div class="container__left">
        <div  class="explain explain--difficile">
          <div class="word">
            <span class="FroggyDesc" v-for="(letter, index) in WORD" :key="index" :style="{ color: getColorByIndex(index) }">{{ letter }}</span>
          </div>
          <p class="description">{{ cardDescription }}</p>
          <div class="row">
            <img draggable="false" src="/images/grenouille lunettes.svg" alt="icon grenouille lunette">
            <div  @click="handlePlaySound()" class="no-btn no-btn--sound  no-btn--sound--red"></div>
          </div>
        </div>
        <router-link to="/" class="btn btn--difficile btn--round"><img src="/images/back_door.svg" aria-label="Retourner au menu" alt="Retour au menu"></router-link>
      </div>
      <div class="container__middle container__middle--difficile">
        <div id="jeu" class="grid grid--difficile game">
          <div class="row" v-for="(row, rowIndex) in grid" :key="rowIndex">
            <div class="container" v-for="(card, cardIndex) in row" :key="cardIndex" @click="flipCard(rowIndex, cardIndex)">
              <div class="card" :class="{ active: card.isFlipped }">
                <div class="front">
                  <img draggable="false" :src="getCardImagePath()" alt="carte retournée">
                </div>
                <div class="back">
                  <img draggable="false" :src="card.backImagePath" :alt="getCardAlt(card.backImagePath)">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="container__right">
            <div class="timer">
              <p class="rouge-p"> {{ displayTime }}</p>
              <button @click="handleDisplayTimer()" class="no-btn no-btn--timer no-btn--timer--red"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="victory" class="victory victory--red rouge">
    <p id="vic-text" class="rouge-p">{{ $t('popUp.bravo') }}</p>
    <p id="display-time-victory">
      {{ $t('popUp.victory1') }} {{ gameTime }} {{ $t('popUp.victory2difficile') }}
    </p>
    <form @submit.prevent="handleSubmitPseudo" class="input-classement">
      <input type="text" v-model="pseudo" :placeholder="$t('popUp.placeholder')" required />
      <button type="submit" class="btn btn--difficile">{{$t('popUp.submit')}}</button>
    </form>
    <p class="confirmation-pseudo">{{ $t("popUp.confirmationPseudo") }}</p>
    <button @click="reload" class="btn btn--difficile" aria-label="recommencer une partie">{{ $t('popUp.newPartie') }}</button>
    <button @click="goToMenu"  class="btn btn--difficile">{{$t('popUp.accueil')}}</button>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useTimer } from '@/composables/useTimer';
import { useAudio } from '@/composables/useAudio';
import { useCardGame } from '@/composables/useCardGame';
import { useScoreSubmit } from '@/composables/useScoreSubmit';
import { WORD, getColorByIndex, displayTimer, goToMenu, reload } from '@/utils/gameUtils';

const CARD_TYPES = [
  "/images/difficile/arrosoir.svg",
  "/images/difficile/balais.svg",
  "/images/difficile/carotte.svg",
  "/images/difficile/courgette.svg",
  "/images/difficile/eolienne.svg",
  "/images/difficile/feuilles.svg",
  "/images/difficile/hydraulique.svg",
  "/images/difficile/geothermique.svg",
  "/images/difficile/laitue.svg",
  "/images/difficile/oeuf.svg",
  "/images/difficile/pelle.svg",
  "/images/difficile/rateau.svg",
  "/images/difficile/seau.svg",
  "/images/difficile/solaire.svg",
  "/images/difficile/tomate.svg"
];

const { horloge, displayTime, gameTime, stopTimer } = useTimer();
const { cardSound: audioCardSound, playSound } = useAudio();
const { grid, flipCard, getCardAlt, cardDescription, cardSound } = useCardGame(5, 6, CARD_TYPES, stopTimer);
const { pseudo, submitPseudo } = useScoreSubmit('hard');

watch(cardSound, (newValue) => {
  audioCardSound.value = newValue;
});

function getCardImagePath() {
  return "/images/difficile/back.svg";
}

function handlePlaySound() {
  playSound('.no-btn--sound');
}

function handleDisplayTimer() {
  displayTimer(horloge);
}

function handleSubmitPseudo() {
  submitPseudo(displayTime.value);
}
</script>

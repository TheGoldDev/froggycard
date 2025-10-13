<template>
  <div id="app" class="jeux jeux--facile">
    <div class="container container__facile">
      <div class="container__left">
        <div  class="explain">
          <div class="word">
            <span class="FroggyDesc" v-for="(letter, index) in WORD" :key="index" :style="{ color: getColorByIndex(index) }">{{ letter }}</span>
          </div>
          <p class="description">{{ cardDescription }}</p>
          <div class="row">
              <img src="/images/grenouille lunettes.svg" alt="icon grenouille lunette">
              <div  @click="handlePlaySound()" class="no-btn no-btn--sound"></div>
          </div>
        </div>
        <router-link to="/" class="btn btn--green btn--round"><img src="/images/back_door.svg" aria-label="Retourner au menu" alt="Retour au menu"></router-link>
      </div>
      <div class="container__middle">
        <div id="jeu" class="grid game">
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
              <p class="dark-vert-p display-timer"> {{ displayTime }} </p>
              <button @click="handleDisplayTimer()" class="no-btn no-btn--timer"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="victory" class="victory victory--green">
    <p id="vic-text" class="light-vert-p">{{ $t("popUp.bravo") }}</p> <br>
    <p id="display-time-victory">
      {{$t("popUp.victory1")}} {{ gameTime }} {{$t("popUp.victory2facile")}}
    </p>
    <form @submit.prevent="handleSubmitPseudo" class="input-classement">
      <input type="text" v-model="pseudo" :placeholder="$t('popUp.placeholder')" required />
      <button type="submit" class="btn btn--green">{{$t("popUp.submit")}}</button>
    </form>
    <p class="confirmation-pseudo" style="display: none;">{{ $t("popUp.confirmationPseudo") }}</p>
    <button @click="reload" class="btn btn--green" aria-label="recommencer une partie">{{ $t("popUp.newPartie") }}</button>
    <button @click="goToMenu"  class="btn btn--green">{{ $t("popUp.accueil") }}</button>
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
  "/images/facile/arrosoir.svg",
  "/images/facile/biomasse.svg",
  "/images/facile/courgette.svg",
  "/images/facile/eolienne.svg",
  "/images/facile/fourche.svg",
  "/images/facile/geothermique.svg"
];

const { horloge, displayTime, gameTime, stopTimer } = useTimer();
const { cardSound: audioCardSound, playSound } = useAudio();
const { grid, flipCard, getCardAlt, cardDescription, cardSound } = useCardGame(3, 4, CARD_TYPES, stopTimer);
const { pseudo, submitPseudo } = useScoreSubmit('easy');

watch(cardSound, (newValue) => {
  audioCardSound.value = newValue;
});

function getCardImagePath() {
  return "/images/facile/back.svg";
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


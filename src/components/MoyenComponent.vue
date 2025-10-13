<template>
  <div id="app" class="jeux jeux--moyen">
    <div class="container container__facile">
      <div class="container__left">
        <div  class="explain explain--moyen">
          <div class="word">
            <span class="FroggyDesc" v-for="(letter, index) in WORD" :key="index" :style="{ color: getColorByIndex(index) }">{{ letter }}</span>
          </div>
          <p class="description">{{ cardDescription }}</p>
          <div class="row">
            <img draggable="false" src="/public/images/grenouille lunettes.svg" alt="icon grenouille lunette">
            <div  @click="handlePlaySound()" class="no-btn  no-btn--sound no-btn--sound--orange"></div>
          </div>
        </div>
        <router-link to="/" class="btn btn--moyen btn--round"><img src="/images/back_door.svg" aria-label="Retourner au menu" alt="Retour au menu"></router-link>
      </div>
      <div class="container__middle container__middle--moyen">
        <div id="jeu" class="grid grid--moyen game">
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
              <p class="orange-p"> {{ displayTime }}</p>
              <button @click="handleDisplayTimer()" class="no-btn no-btn--timer no-btn--timer--orange"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="victory" class="victory victory--orange orange">
    <p id="vic-text" class="dark-orange-p">{{ $t('popUp.bravo') }}</p>
    <p id="display-time-victory">
      {{$t('popUp.victory1')}} {{ gameTime }} {{$t('popUp.victory2moyen')}}
    </p>
    <form @submit.prevent="handleSubmitPseudo" class="input-classement">
      <input type="text" v-model="pseudo" :placeholder="$t('popUp.placeholder')" required />
      <button type="submit" class="btn btn--moyen">{{$t('popUp.submit')}}</button>
    </form>
    <p class="confirmation-pseudo">{{ $t("popUp.confirmationPseudo") }}</p>
    <button @click="reload" class="btn btn--moyen" aria-label="recommencer une partie">{{ $t('popUp.newPartie') }}</button>
    <button @click="goToMenu"  class="btn btn--moyen">{{$t('popUp.accueil')}}</button>
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
  "/images/moyen/arrosoir.svg",
  "/images/moyen/biomasse.svg",
  "/images/moyen/courgette.svg",
  "/images/moyen/eolienne.svg",
  "/images/moyen/fourche.svg",
  "/images/moyen/seau.svg",
  "/images/moyen/hydraulique.svg",
  "/images/moyen/pelle.svg",
  "/images/moyen/solaire.svg",
  "/images/moyen/tomate.svg"
];

const { horloge, displayTime, gameTime, stopTimer } = useTimer();
const { cardSound: audioCardSound, playSound } = useAudio();
const { grid, flipCard, getCardAlt, cardDescription, cardSound } = useCardGame(4, 5, CARD_TYPES, stopTimer);
const { pseudo, submitPseudo } = useScoreSubmit('medium');

watch(cardSound, (newValue) => {
  audioCardSound.value = newValue;
});

function getCardImagePath() {
  return "/images/moyen/back.svg";
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
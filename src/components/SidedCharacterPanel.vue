<script setup lang="ts">
import { mainLogic } from '../main';
import ProgressBar from './ProgressBar.vue';

const player = mainLogic.currentPlayer;
</script>

<template>
    <div class="flex flex-col mx-16 items-center">
        <div class="flex w-full justify-center">
            <div class="mr-4">{{ player.name }}</div>
            <div>{{ $t("player.level.text", [player.level]) }}</div>
        </div>
        <ProgressBar class="w-full h-6 m-1" :value="player.health" :max="player.maxHealth" text="bar.health.text" background="#77000055" border="#990000" fill="#ff0000" :extra="() => [(player.healthRegen >= 0 ? '+' : '') + player.healthRegen.toFixed(1)]"/>
        <ProgressBar class="w-full h-6 m-1" :value="player.mana" :max="player.maxMana" text="bar.mana.text" background="#00007755" border="#000099" fill="#0000ff" :extra="() => [(player.manaRegen >= 0 ? '+' : '') + player.manaRegen.toFixed(1)]"/>
        <ProgressBar class="w-full h-6 m-1" :value="player.stamina" :max="player.maxStamina" text="bar.stamina.text" background="#00770055" border="#009900" fill="#15803d" :extra="() => [(player.staminaRegen >= 0 ? '+' : '') + player.staminaRegen.toFixed(1)]"/>
        <ProgressBar class="w-full h-6 m-1" :value="player.experience" :max="player.expToNextLevel" text="bar.experience.text" background="#77770055" border="#999900" fill="#fbbf24"/>
    </div>
</template>
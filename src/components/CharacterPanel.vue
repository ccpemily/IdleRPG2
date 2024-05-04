<script setup lang="ts">
import { mainLogic } from '../main';
import ProgressBar from './common/ProgressBar.vue';
import PlayerAttributesPanel from './player/PlayerAttributesPanel.vue';

const player = mainLogic.currentPlayer;
</script>

<template>
    <div class="w-full h-full border-2">
        <div class="flex flex-col flex-grow mx-16 items-center">
            <div class="flex w-full justify-center">
                <div class="mr-4">{{ player.name }}</div>
                <div>{{ $t("player.level.text", [player.level]) }}</div>
            </div>
            <ProgressBar class="w-full h-6 m-1" :value="player.health.value" :max="player.health.max" text="bar.health.text" background="#77000055" border="#990000" fill="#ff0000" :extra="() => [(player.health.regen >= 0 ? '+' : '') + player.health.regen.toFixed(2)]"/>
            <ProgressBar class="w-full h-6 m-1" :value="player.mana.value" :max="player.mana.max" text="bar.mana.text" background="#00007755" border="#000099" fill="#0000ff" :extra="() => [(player.mana.regen >= 0 ? '+' : '') + player.mana.regen.toFixed(2)]"/>
            <ProgressBar class="w-full h-6 m-1" :value="player.stamina.value" :max="player.stamina.max" text="bar.stamina.text" background="#00770055" border="#009900" fill="#15803d" :extra="() => [(player.stamina.regen >= 0 ? '+' : '') + player.stamina.regen.toFixed(2)]"/>
            <ProgressBar class="w-full h-6 m-1" :value="player.experience" :max="player.expToNextLevel" text="bar.experience.text" background="#77770055" border="#999900" fill="#fbbf24"/>
            <div class="flex-1 w-full">
                <PlayerAttributesPanel/>
                <div tabindex="0" class="collapse collapse-arrow bg-base-200 rounded-none"> 
                    <div class="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div class="collapse-content"> 
                        <p>tabindex="0" attribute is necessary to make the div focusable</p>
                    </div>
                </div>
                <div tabindex="0" class="collapse collapse-arrow bg-base-200 rounded-none"> 
                    <div class="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div class="collapse-content"> 
                        <p>tabindex="0" attribute is necessary to make the div focusable</p>
                    </div>
                </div>
                <div tabindex="0" class="collapse collapse-arrow bg-base-200 rounded-none"> 
                    <div class="collapse-title text-xl font-medium">
                        Focus me to see content
                    </div>
                    <div class="collapse-content"> 
                        <p>tabindex="0" attribute is necessary to make the div focusable</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
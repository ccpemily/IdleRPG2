<script setup>
import { Locations, CombatLocation } from '../../core/location';
import { mainLogic } from '../../main.ts';
</script>

<template>
    <div class="w-full border-l-2 border-r-2 border-b-2 h-8 flex items-center">
        <a class="text-center">{{ $t(Locations[mainLogic.currentLocation].name) }}</a>
    </div>
    <div class="w-full flex flex-1 flex-grow flex-col" v-if="!mainLogic.inCombatArea">
        <div class="w-full border-l-2 border-r-2 border-b-2 flex-1" style="min-height: 40%;">
            <p class="italic text-gray-500">{{ 
                $t(Locations[mainLogic.currentLocation].varyWithDaytime ? 
                    Locations[mainLogic.currentLocation].description + '.' + mainLogic.daytime : 
                    Locations[mainLogic.currentLocation].description) 
                }}</p>
            <br>
            <p class=" text-gray-500">{{ $t("weather." + mainLogic.weather + ".description." + (mainLogic.isDay ? "day" : "night")) }}</p>
        </div>
        
        <div class="w-full border-l-2 border-r-2 border-b-2 flex-1">
            <a class="italic text-gray-500">Dialog Panel</a>
        </div>
    </div>
    <div class="w-full flex flex-1 flex-grow flex-col"  v-if="mainLogic.inCombatArea">
        
    </div>
</template>
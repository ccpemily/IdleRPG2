<script setup lang="ts">
import { Locations } from '../../core/location';
import { mainLogic } from '../../main';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun, faCloudRain, faCloud } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue';
const weather2icon = {
    sunny: faSun,
    cloudy: faCloud,
    rainy: faCloudRain
}
const weekdays = ["date.monday", "date.tuesday", "date.wendesday", "date.thursday", "date.friday", "date.saturday", "date.sunday"];

const date = computed(() => new Date(mainLogic.eventclock.totalTicks));
</script>

<template>
    <div class="flex flex-row flex-1 border-2 items-center">
        <p class="flex flex-1 h-8 items-center">
            <a class="align-middle text-center">{{ 
                $t("date.locales", [date.getFullYear(), date.getMonth() + 1, date.getDate()])
                + '\t' 
                + $t(weekdays[new Date(mainLogic.eventclock.totalTicks).getDay()])
                + '\t'
                + new Date(mainLogic.eventclock.totalTicks).toLocaleTimeString() 
            }}</a>
        </p>
        <p class="flex h-8 mx-2 items-center text-center">{{ $t("weather." + mainLogic.weather) }}</p>
        <FontAwesomeIcon :icon="weather2icon[mainLogic.weather]" class="w-6 h-6"/>
    </div>
    <div class="w-full border-l-2 border-r-2 border-b-2 h-8 flex items-center">
        <a class="text-center">{{ $t(Locations[mainLogic.currentLocation].name) }}</a>
    </div>
</template>
<script setup lang="ts">
import LocationInfoPanel from '../location/LocationInfoPanel.vue';
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
    <div class="flex flex-row border-2 items-center h-8 w-full">
        <p class="flex h-8 items-center flex-1">
            <a class="align-middle text-center">{{ 
                $t("date.locales", [date.getFullYear(), date.getMonth() + 1, date.getDate()])
                + '\t' 
                + $t(weekdays[date.getDay()])
                + '\t'
                + date.toLocaleTimeString() 
            }}</a>
        </p>
        <p class="flex h-8 mx-2 items-center text-center">{{ $t("weather." + mainLogic.weather) }}</p>
        <FontAwesomeIcon :icon="weather2icon[mainLogic.weather]" class="w-6 h-6 right-0"/>
    </div>
    <div class="w-full flex-1">
        <LocationInfoPanel/>
    </div>
    
</template>
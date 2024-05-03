<script setup>
import { Locations } from '../../core/location';
import { mainLogic } from '../../main.ts';
</script>

<template>
    <div class="w-full border-l-2 border-r-2 border-b-2 h-8 flex flex-grow items-center">
        <a class="text-center">{{ $t(Locations[mainLogic.currentLocation].name) }}</a>
    </div>
    <div class="w-full h-full flex flex-grow flex-col">
        <div class="w-full border-l-2 border-r-2 border-b-2 flex-1" style="min-height: 40%;">
            <a class="italic text-gray-500">{{ $t(Locations[mainLogic.currentLocation].description) }}</a>
        </div>
        <div class="w-full border-l-2 border-r-2 border-b-2 flex-1">
            <a class="italic text-gray-500">Dialog Panel</a>
        </div>
    </div>
</template>
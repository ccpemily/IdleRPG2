<script setup lang="ts">
import { toIntOrFixed1 } from '../../utils';

defineProps<{
    value: number,
    max: number,
    text: string,
    background: string,
    border: string,
    fill: string,
    extra?: () => string[]
}>()
</script>

<template>
    <div class="relative">
        <div class="border-2 w-full h-full absolute" :style="{
            backgroundColor: background
        }"></div>
        <div class="h-full absolute " :style="{
            backgroundColor: fill,
            width: Math.min(value / max, 1) * 100 + '%'
        }"></div>
        <div class="top-0 w-full h-full text-center text-white absolute">{{ $t(text, [toIntOrFixed1(value), toIntOrFixed1(max)].concat(extra == undefined ? [] : extra())) }}</div>
        <div class="border-2 w-full h-full absolute" :style="{
            borderColor: border
        }"></div>
    </div>
</template>
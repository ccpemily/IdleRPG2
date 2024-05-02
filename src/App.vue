<script setup lang="ts">
import MainPanel from './components/MainPanel.vue'
import SidedCharacterPanel from './components/SidedCharacterPanel.vue'
import { mainLogic } from './main.ts';

function onClockClick(_: MouseEvent) {
  if (!mainLogic.eventclock.running) {
    mainLogic.eventclock.start();
  }
  else {
    mainLogic.eventclock.stop();
  }
}

</script>

<template>
  <div class="flex flex-row w-full h-full">
    <div class="flex flex-col flex-1">
      <SidedCharacterPanel class="flex-1" />
      <div>
        <button type="button" class="btn rounded-none" @click="onClockClick">
          {{ mainLogic.eventclock.running ? $t("button.main.pause") : $t("button.main.resume") }}
        </button>
        <button type="button" class="btn rounded-none" @click="">{{ $t("button.main.save") }}</button>
        <button type="button" class="btn rounded-none" @click="">{{ $t("button.main.load") }}</button>
        <button type="button" class="btn rounded-none" @click="">{{ $t("button.main.import") }}</button>
        <button type="button" class="btn rounded-none" @click="">{{ $t("button.main.export") }}</button>
        <button type="button" class="btn rounded-none" @click="">{{ $t("button.main.reset") }}</button>
      </div>
    </div>
    <div class="main" style="flex: 2;">
      <MainPanel />
    </div>
  </div>
</template>

<style>
:root,html,body,#app{
  @apply w-full h-full m-0 p-0;
}
</style>
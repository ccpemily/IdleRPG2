<script setup lang="ts">
import MainPanel from './components/MainPanel.vue'
import SidedCharacterPanel from './components/SidedCharacterPanel.vue'
import { clock, mainLogic } from './main.js';

function onClockClick(event: MouseEvent) {
  if (!clock.running) {
    clock.run();
  }
  else {
    clock.stop();
  }
}

</script>

<template>
  <div class="app_main">
    <div class="leftside" style="display: flex; flex-direction: column;">
      <SidedCharacterPanel style="flex: 1;" />
      <div class="bottom_layer">
        <button type="button" class="bottom_buttons" @click="onClockClick">{{ clock.running ? $t("button.main.pause") :
          $t("button.main.resume") }}</button>
        <button type="button" class="bottom_buttons" @click="">{{ $t("info.current", [mainLogic.current]) }}</button>
      </div>
    </div>
    <div class="main">
      <MainPanel />
    </div>
  </div>
</template>

<style scoped>
.app_main {
  display: flex;
  flex-direction: row;
  position: fixed;
  left: 0%;
  top: 0%;

  height: 100%;
  width: 100%;
}

.main {
  position: relative;
  width: 70%;
  right: 0%;

  height: 100%;
}

.leftside {
  position: relative;
  width: 30%;
  height: 100%;
}

.bottom_layer {
  display: flex;
  flex-direction: row;

  position: relative;
  bottom: 0%;
}

.bottom_buttons {
  padding: auto;
}
</style>
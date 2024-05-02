<script setup lang="ts">

</script>

<template>
    <div class="main_tab">
        <div class="top_area">
            <button type="button" @click="">{{ $t("topbar.events") }}</button>
            <button type="button" @click="">{{ $t("topbar.inventory") }}</button>
            <button type="button" @click="">{{ $t("topbar.story") }}</button>
        </div>
        <div class="main_area">
        
        </div>
        <div class="play_area">

        </div>
    </div>
</template>

<style scoped>
    .main_tab {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
    }

    .top_area {
        display: flex;
    }

    .top_area > button {
        flex: 1;
        border-radius: 0px;
    }

    .main_area {
        background-color: azure;
        height: 70%;
    }

    .play_area {
        background-color: cornflowerblue;
        height: 30%;
    }
</style>
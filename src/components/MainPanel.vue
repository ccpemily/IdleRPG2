<script setup lang="ts">
import { computed, ref } from 'vue';
import LocationPanel from './main/LocationPanel.vue';
import RouteRenderer from './tsx/RouteRenderer';
import LocationActivitiesRenderer from './tsx/LocationActivitiesRenderer';
import ActivityRenderer from './tsx/ActivityRenderer';
import { mainLogic } from '../main';
import { LocationId, Routes, Locations } from '../core/location';

import { ActivityID } from '../core/activity';
import LogPanel from './main/LogPanel.vue';
import InventoryPanel from './main/InventoryPanel.vue';
import StoriesPanel from './main/StoriesPanel.vue';
import LocationNPCsRenderer from './tsx/LocationNPCsRenderer';
import { NPCsID } from '../core/npc';

const tab = ref('events' as 'events' | 'inventory' | 'story')
const loc = computed(() => mainLogic.currentLocation)

function onRouteClick({ to }: { to: LocationId }) {
    mainLogic.currentLocation = to
    console.log("Changed location")
}

function onActivityClick(act: ActivityID){
    mainLogic.startActivity(act);
}

function onStopActivityClick(){
    mainLogic.stopActivity();
}

function onNpcSelectClick(id: NPCsID){
    mainLogic.startTalkWithNpc(id);
}
</script>

<template>
    <div class="w-full h-full flex flex-col overflow-hidden">
        <div role="tablist" class="flex tabs tabs-lifted">
            <input type="radio" v-model="tab" value="events" name="tab_selector" role="tab" class="tab flex-1 rounded-none"
                :aria-label="$t('topbar.events')" checked>
            <input type="radio" v-model="tab" value="inventory" name="tab_selector" role="tab" class="tab flex-1"
                :aria-label="$t('topbar.inventory')">
            <input type="radio" v-model="tab" value="story" name="tab_selector" role="tab" class="tab flex-1"
                :aria-label="$t('topbar.story')">
        </div>
        <div class="flex flex-col bg-slate-50 h-0" style="flex-grow: 2;">
            <LocationPanel v-if="tab == 'events'"/>
            <InventoryPanel v-if="tab == 'inventory'"/>
            <StoriesPanel v-if="tab == 'story'"/> 
        </div>
        <div class="flex bg-slate-300 h-0" style="flex-grow: 1;">
            <div style="flex-grow: 1; max-width: 33.33%;">
                <ul class="menu">
                    <li v-if="Locations[loc].npcs.length > 0 && !mainLogic.currentActivity">
                        <LocationNPCsRenderer v-if="!mainLogic.currentActivity && !mainLogic.currentSelectedNpc" 
                            v-for="id in Locations[loc].npcs" :npcid="id" :onclick="onNpcSelectClick"
                        />
                    </li>
                    <li v-if="Locations[loc].activities.length > 0 && !mainLogic.currentSelectedNpc">
                        <LocationActivitiesRenderer v-if="!mainLogic.currentActivity && !mainLogic.currentSelectedNpc" 
                            v-for="act in Locations[loc].activities" :activity="act" :onclick="onActivityClick"
                        />
                    </li>
                    <RouteRenderer v-if="!mainLogic.currentActivity && !mainLogic.currentSelectedNpc" 
                        v-for="to in Routes[loc]" :from="loc" :to="to.dst" :onclick="onRouteClick"
                    />
                    <ActivityRenderer v-if="mainLogic.currentActivity && !mainLogic.currentSelectedNpc" 
                        :id="mainLogic.currentActivity" :onstop="onStopActivityClick"
                    />
                </ul>
            </div>
            <div class="bg-slate-500" style="flex-grow: 2;">
                <LogPanel/>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
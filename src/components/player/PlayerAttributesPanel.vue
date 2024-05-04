<script setup lang="ts">
import { reactive, ref } from 'vue';
import { mainLogic } from '../../main';
import { EntityAttributeType } from '../../core/entity/attribute';
import PlayerAttributeRenderer from '../tsx/PlayerAttributeRenderer';

let allocatingPerks = false;

let isAllocating = ref(allocatingPerks);

const player = mainLogic.currentPlayer;

const allocatedPerks = reactive({
    strength: 0, constitution: 0, dexterity: 0, intelligence: 0, wisdom: 0, charisma: 0, consumed: 0
})

function canAllocateAttribute(name: EntityAttributeType){
    let cur = player[name].base + allocatedPerks[name];
    let step = 1 + Math.floor(Math.max(0, cur - 10) / 10);
    return player.attributePerks - allocatedPerks.consumed >= step;
}

function tryAllocateAttribute(name: EntityAttributeType){
    let cur = player[name].base + allocatedPerks[name];
    let step = 1 + Math.floor(Math.max(0, cur - 10) / 10);
    return step;
}

function onAllocatePerksClick(_:MouseEvent){
    if(!isAllocating.value){
        isAllocating.value = true;
        //console.log("Remain: P" + player.attributePerks + ", Allocated: " + allocatedPerks.consumed);
    }
}

function onAllocateConfirmed(_:MouseEvent){
    player.onPerksAllocated(allocatedPerks);
    isAllocating.value = false;
    allocatedPerks.strength = 0;
    allocatedPerks.constitution = 0;
    allocatedPerks.dexterity = 0;
    allocatedPerks.intelligence = 0;
    allocatedPerks.wisdom = 0;
    allocatedPerks.charisma = 0;
    allocatedPerks.consumed = 0;
}

function onAllocateCanceled(_:MouseEvent){
    isAllocating.value = false;
    allocatedPerks.strength = 0;
    allocatedPerks.constitution = 0;
    allocatedPerks.dexterity = 0;
    allocatedPerks.intelligence = 0;
    allocatedPerks.wisdom = 0;
    allocatedPerks.charisma = 0;
    allocatedPerks.consumed = 0;
}

function onAttributeClick(attribute: EntityAttributeType){
    if(isAllocating.value){
        let pointToConsume = tryAllocateAttribute(attribute);
        allocatedPerks.consumed += pointToConsume;
        allocatedPerks[attribute] += 1;
        console.log("Consumed: " + pointToConsume);
        console.log("Total consumed: " + allocatedPerks.consumed);
        console.log("Remaining: " + (player.attributePerks - allocatedPerks.consumed));
    }
}
</script>

<template>
    <div class="flex flex-col w-full mt-1">
        <div class="w-full bg-slate-200 flex items-center justify-center">
            <label class="text-center italic">{{ $t("player.attribute.title") }}</label>
        </div>
        <div class="flex flex-row flex-grow w-full">
            <PlayerAttributeRenderer id="strength" :isallocating="isAllocating" :onattributeclick="onAttributeClick" :canallocate="canAllocateAttribute" :allocatedperks="allocatedPerks"/>
            <PlayerAttributeRenderer id="constitution" :isallocating="isAllocating" :onattributeclick="onAttributeClick" :canallocate="canAllocateAttribute" :allocatedperks="allocatedPerks"/>
            <PlayerAttributeRenderer id="dexterity" :isallocating="isAllocating" :onattributeclick="onAttributeClick" :canallocate="canAllocateAttribute" :allocatedperks="allocatedPerks"/>
        </div>
        <div class="flex flex-row flex-grow w-full">
            <PlayerAttributeRenderer id="intelligence" :isallocating="isAllocating" :onattributeclick="onAttributeClick" :canallocate="canAllocateAttribute" :allocatedperks="allocatedPerks"/>
            <PlayerAttributeRenderer id="wisdom" :isallocating="isAllocating" :onattributeclick="onAttributeClick" :canallocate="canAllocateAttribute" :allocatedperks="allocatedPerks"/>
            <PlayerAttributeRenderer id="charisma" :isallocating="isAllocating" :onattributeclick="onAttributeClick" :canallocate="canAllocateAttribute" :allocatedperks="allocatedPerks"/>
        </div>
        <div class="flex flex-row">
            <div class="tooltip tooltip-bottom flex flex-grow flex-1" :data-tip="$t('player.attribute_perks.description')" v-if="!isAllocating">
                <button class="btn font-normal text-center text-sm flex-1 rounded-none min-h-0 h-6" 
                    :disabled="player.attributePerks <= 0" 
                    style="background-color: #f2f2f2;"
                    :onclick="onAllocatePerksClick"
                >{{ $t("player.attribute_perks.text", [player.attributePerks]) }}</button>
            </div>
            <div v-if="isAllocating" class="flex flex-row flex-grow">
                <button class="btn font-normal text-center text-sm flex-1 rounded-none min-h-0 h-6" 
                    style="background-color: #f2f2f2; flex: 4;"
                    :onclick="onAllocateConfirmed"
                >{{ $t("player.attribute_perks.confirm", [player.attributePerks - allocatedPerks.consumed, player.attributePerks]) }}</button>
                <button class="btn font-normal text-center text-sm flex-1 rounded-none min-h-0 h-6" 
                    style="background-color: #f2f2f2; flex: 1;"
                    :onclick="onAllocateCanceled"
                >{{ $t("player.attribute_perks.cancel") }}</button>
            </div>
        </div> 
    </div>
</template>
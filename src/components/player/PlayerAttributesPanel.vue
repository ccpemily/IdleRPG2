<script setup lang="ts">
import { reactive, ref } from 'vue';
import { mainLogic } from '../../main';

let allocatingPerks = false;

let isAllocating = ref(allocatingPerks);

const abbrToFullAttr = {
    'str': "baseStrength",
    'con': "baseConstitution",
    'dex': "baseDexterity",
    'int': "baseIntelligence",
    'wis': "baseWisdom",
    'cha': "baseCharisma"
}

const fullAttrToAbbr = {
    "baseStrength": 'str',
    "baseConstitution": 'con',
    "baseDexterity": 'dex',
    "baseIntelligence": 'int',
    "baseWisdom": 'wis',
    "baseCharisma": 'cha'
}

const player = mainLogic.currentPlayer;

const allocatedPerks = reactive({
    str: 0, con: 0, dex: 0, int: 0, wis: 0, cha: 0, consumed: 0
})

function canAllocateAttribute(name:'baseStrength'|'baseConstitution'|'baseDexterity'|'baseIntelligence'|'baseWisdom'|'baseCharisma'){
    let cur = player[name] + allocatedPerks[fullAttrToAbbr[name]];
    let step = 1 + Math.floor(Math.max(0, cur - 10) / 10);
    return player.attributePerks - allocatedPerks.consumed >= step;
}

function tryAllocateAttribute(name:'baseStrength'|'baseConstitution'|'baseDexterity'|'baseIntelligence'|'baseWisdom'|'baseCharisma'){
    let cur = player[name] + allocatedPerks[fullAttrToAbbr[name]];
    let step = 1 + Math.floor(Math.max(0, cur - 10) / 10);
    return step;
}

function onAllocatePerksClick(_:MouseEvent){
    if(!isAllocating.value){
        isAllocating.value = true;
        console.log("Remain: P" + player.attributePerks + ", Allocated: " + allocatedPerks.consumed);
    }
}

function onAllocateConfirmed(_:MouseEvent){
    player.onPerksAllocated(allocatedPerks);
    isAllocating.value = false;
    allocatedPerks.str = 0;
    allocatedPerks.con = 0;
    allocatedPerks.dex = 0;
    allocatedPerks.int = 0;
    allocatedPerks.wis = 0;
    allocatedPerks.cha = 0;
    allocatedPerks.consumed = 0;
}

function onAllocateCanceled(_:MouseEvent){
    isAllocating.value = false;
    allocatedPerks.str = 0;
    allocatedPerks.con = 0;
    allocatedPerks.dex = 0;
    allocatedPerks.int = 0;
    allocatedPerks.wis = 0;
    allocatedPerks.cha = 0;
    allocatedPerks.consumed = 0;
}

function onAttributeClick(attribute:string){
    if(isAllocating.value){
        let pointToConsume = tryAllocateAttribute(abbrToFullAttr[attribute]);
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
            <button type="button" 
                class="btn rounded-none flex flex-col flex-1"
                :disabled="isAllocating && !canAllocateAttribute('baseStrength')"
                :onclick="() => onAttributeClick('str')"
            >
                <span class="text-center">{{ $t("player.attribute.str") }}</span>
                <span class="text-center">{{ player.baseStrength.toFixed(0) + (isAllocating ? "(+" + allocatedPerks['str'] + ")" : '') }}</span>
            </button>
            <button type="button" 
                class="btn rounded-none flex flex-col flex-1"
                :disabled="isAllocating && !canAllocateAttribute('baseConstitution')"
                :onclick="() => onAttributeClick('con')"
            >
                <span class="text-center">{{ $t("player.attribute.con") }}</span>
                <span class="text-center">{{ player.baseConstitution.toFixed(0) + (isAllocating ? "(+" + allocatedPerks['con'] + ")" : '') }}</span>
            </button>
            <button type="button" 
                class="btn rounded-none flex flex-col flex-1"
                :disabled="isAllocating && !canAllocateAttribute('baseDexterity')"
                :onclick="() => onAttributeClick('dex')"
            >
                <span class="text-center">{{ $t("player.attribute.dex") }}</span>
                <span class="text-center">{{ player.baseDexterity.toFixed(0) + (isAllocating ? "(+" + allocatedPerks['dex'] + ")" : '') }}</span>
            </button>
        </div>
        <div class="flex flex-row flex-grow w-full">
            <button type="button" 
                class="btn rounded-none flex flex-col flex-1"
                :disabled="isAllocating && !canAllocateAttribute('baseIntelligence')"
                :onclick="() => onAttributeClick('int')"
            >
                <span class="text-center">{{ $t("player.attribute.int") }}</span>
                <span class="text-center">{{ player.baseIntelligence.toFixed(0) + (isAllocating ? "(+" + allocatedPerks['int'] + ")" : '') }}</span>
            </button>
            <button type="button" 
                class="btn rounded-none flex flex-col flex-1"
                :disabled="isAllocating && !canAllocateAttribute('baseWisdom')"
                :onclick="() => onAttributeClick('wis')"
            >
                <span class="text-center">{{ $t("player.attribute.wis") }}</span>
                <span class="text-center">{{ player.baseWisdom.toFixed(0) + (isAllocating ? "(+" + allocatedPerks['wis'] + ")" : '') }}</span>
            </button>
            <button type="button" 
                class="btn rounded-none flex flex-col flex-1"
                :disabled="isAllocating && !canAllocateAttribute('baseCharisma')"
                :onclick="() => onAttributeClick('cha')"
            >
                <span class="text-center">{{ $t("player.attribute.cha") }}</span>
                <span class="text-center">{{ player.baseCharisma.toFixed(0) + (isAllocating ? "(+" + allocatedPerks['cha'] + ")" : '') }}</span>
            </button>
        </div>
        <div class="flex flex-row">
            <button v-if="!isAllocating" 
                :disabled="player.attributePerks <= 0" 
                class="btn font-normal text-center text-sm flex-1 rounded-none min-h-0 h-6" 
                style="background-color: #f2f2f2;"
                :onclick="onAllocatePerksClick"
            >{{ $t("player.attribute_perks.text", [player.attributePerks]) }}</button>
            <div v-if="isAllocating" class="flex flex-row flex-grow">
                <button v-if="isAllocating"
                    class="btn font-normal text-center text-sm flex-1 rounded-none min-h-0 h-6" 
                    style="background-color: #f2f2f2; flex: 4;"
                    :onclick="onAllocateConfirmed"
                >{{ $t("player.attribute_perks.confirm", [player.attributePerks - allocatedPerks.consumed, player.attributePerks]) }}</button>
                <button v-if="isAllocating"
                    class="btn font-normal text-center text-sm flex-1 rounded-none min-h-0 h-6" 
                    style="background-color: #f2f2f2; flex: 1;"
                    :onclick="onAllocateCanceled"
                >{{ $t("player.attribute_perks.cancel") }}</button>
            </div>
        </div> 
    </div>
</template>
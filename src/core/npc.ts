import { RegistryClass, createRegistry } from "./staticregistry";

export class DialogOption {
    id:string;

    constructor(id: string){
        this.id = id;
    }
}

export class NPC extends RegistryClass<string>{
    selectType = 'talk';

    get name(){
        return "npc." + this.id + ".name";
    }
}

export const NPCs = createRegistry({
    "village_elder": new NPC()
});

export type NPCsID = keyof typeof NPCs;
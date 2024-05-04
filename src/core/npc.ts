export class DialogOption {
    id:string;

    constructor(id: string){
        this.id = id;
    }
}

export class NPC {
    id:string;
    selectType = 'talk';

    get name(){
        return "npc." + this.id + ".name";
    }

    constructor(id: string){
        this.id = id;
    }
}

export const NPCs = {
    "village_elder": new NPC("village_elder")
}

export type NPCsID = keyof typeof NPCs;
import { ActivityID } from "./activity";
import { NPC, NPCsID } from "./npc";

export class Location {
    id: string;
    activities: ActivityID[] = [];
    npcs: NPCsID[] = [];
    isRestingArea: boolean = false;
    varyWithDaytime: boolean = false;

    get name(){
        return "location." + this.id + ".name";
    }

    get description(){
        return "location." + this.id + ".description";
    }

    constructor(id: string, activities:ActivityID[]=[], npcs:NPCsID[]=[], restingArea?:boolean, varyWithDaytime?:boolean) {
        this.id = id;
        this.activities = this.activities.concat(activities);
        this.npcs = this.npcs.concat(npcs);
        this.isRestingArea = restingArea;
        this.varyWithDaytime = varyWithDaytime;
    }
}

export class CombatLocation extends Location{
    respawnLocID:LocationId = 'home';
    completed:boolean = false;

    constructor(id: string) {
        super(id, [], [], false);
    }
}

export const Locations = {
    "home": new Location("home", ["sleep"], [], true),
    "village": new Location("village", ["run_around"], ["village_elder"], true, true),
    "cave": new Location("cave"),
    "deep_cave": new CombatLocation("deep_cave")
} as const;

export type LocationId = keyof typeof Locations
export const Routes: Record<LocationId, { dst: LocationId, text: string }[]> = {
    home: [{ dst: "village", text: "route.goto" }],
    village: [{ dst: "home", text: "route.gohome" }, { dst: "cave", text: "route.goto" }],
    cave: [{ dst: "village", text: "route.back" }, { dst: "deep_cave", text: "route.goto" }],
    deep_cave: [{ dst: "cave", text: "route.back" }, {dst: "home", text: "route.fast_return" }]
}
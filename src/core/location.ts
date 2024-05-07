import { ActivityID } from "./activity";
import { NPCsID } from "./npc";
import { RegistryClass, createRegistry } from "./staticregistry";

export class Location extends RegistryClass<string> {
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

    constructor(activities:ActivityID[]=[], npcs:NPCsID[]=[], restingArea?:boolean, varyWithDaytime?:boolean) {
        super();
        this.activities = this.activities.concat(activities);
        this.npcs = this.npcs.concat(npcs);
        this.isRestingArea = restingArea;
        this.varyWithDaytime = varyWithDaytime;
    }
}

export class CombatLocation extends Location{
    respawnLocID:LocationID = 'home';
    completed:boolean = false;

    constructor() {
        super([], [], false);
    }
}

export const Locations = createRegistry({
    "home": new Location(["sleep"], [], true),
    "village": new Location(["run_around"], ["village_elder"], true, true),
    "cave": new Location(),
    "deep_cave": new CombatLocation()
});

export type LocationID = keyof typeof Locations;

export const Routes: Record<LocationID, { dst: LocationID, text: string }[]> = {
    home: [{ dst: "village", text: "route.goto" }],
    village: [{ dst: "home", text: "route.gohome" }, { dst: "cave", text: "route.goto" }],
    cave: [{ dst: "village", text: "route.back" }, { dst: "deep_cave", text: "route.goto" }],
    deep_cave: [{ dst: "cave", text: "route.back" }, {dst: "home", text: "route.fast_return" }]
}
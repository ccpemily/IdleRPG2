import { ActivityID } from "./activity";
import { NPC } from "./npc";

export class Location {
    id: string;
    activities: ActivityID[] = [];
    npcs: NPC[] = [];
    isRestingArea: boolean = false;

    get name(){
        return "location." + this.id + ".name";
    }

    get description(){
        return "location." + this.id + ".description";
    }

    constructor(id: string, activities:ActivityID[]=[], restingArea?:boolean) {
        this.id = id;
        this.activities = this.activities.concat(activities);
        this.isRestingArea = restingArea;
    }
}

export const Locations = {
    "home": new Location("home", ["sleep"], true),
    "village": new Location("village", ["run_around"], true),
    "cave": new Location("cave")
} as const;

export type LocationId = keyof typeof Locations
export const Routes: Record<LocationId, { dst: LocationId, text: string }[]> = {
    home: [{ dst: "village", text: "route.goto" }],
    village: [{ dst: "home", text: "route.gohome" }, { dst: "cave", text: "route.goto" }],
    cave: [{ dst: "village", text: "route.goto" }]
}
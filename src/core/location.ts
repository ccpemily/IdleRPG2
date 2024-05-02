import { ActivityID } from "./activity";

export class Location {
    name: string;
    activities: ActivityID[] = []
    isRestingArea: boolean = false;
    constructor(name: string, activities:ActivityID[]=[], restingArea?:boolean) {
        this.name = name;
        this.activities = this.activities.concat(activities);
        this.isRestingArea = restingArea;
    }
}

export const Locations = {
    "home": new Location("location.home.name", ["sleep"], true),
    "village": new Location("location.village.name", ["run_around"], true),
    "cave": new Location("location.cave.name")
} as const;

export type LocationId = keyof typeof Locations
export const Routes: Record<LocationId, { dst: LocationId, text: string }[]> = {
    home: [{ dst: "village", text: "route.goto" }],
    village: [{ dst: "home", text: "route.gohome" }, { dst: "cave", text: "route.goto" }],
    cave: [{ dst: "village", text: "route.goto" }]
}
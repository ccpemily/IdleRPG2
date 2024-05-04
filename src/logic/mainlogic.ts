import { Player } from "../core/player/player";
import { CombatLocation, LocationId as LocationID, Locations } from "../core/location";
import { alea } from 'seedrandom'
import { Activities, ActivityID } from "../core/activity";
import { NPCsID } from "../core/npc";

const MAX_TICK_ONCE = 1000;
const MAX_UI_FRAME = 600;
const UI_UPDATE_INTERVAL = 500;

export class Clock {
    totalTicks = 0;
    lastTicked = 0;
    tickSpeed = 1;
    tickInterval = 16;
    timerId: number = NaN;

    subscribers: (() => void)[] = [];

    start() {
        this.stop();
        this.lastTicked = Date.now();
        this.timerId = setInterval(() => {
            const now = Date.now();
            let needToTick = Math.floor((now - this.lastTicked) / this.tickInterval * this.tickSpeed);
            if (needToTick > MAX_TICK_ONCE) {
                needToTick = MAX_TICK_ONCE;
            }
            this.lastTicked += needToTick / this.tickSpeed * this.tickInterval;
            for (let _ = 0; _ < needToTick; _++) {
                this.totalTicks += 1000;
                this.subscribers.forEach(callback => callback());
            }
        }, this.tickInterval);
    }
    get running() {
        return !Number.isNaN(this.timerId);
    }

    stop() {
        if (this.running)
            clearInterval(this.timerId);
        this.timerId = NaN;
    }


}

export class MainLogic {
    private static instance: MainLogic;

    uiframe:number = 0;

    uiclock:number = NaN;
    eventclock: Clock = new Clock();

    currentPlayer: Player = new Player("Player");
    currentSelectedNpc?: NPCsID = undefined;
    currentLocation: LocationID = "home";
    currentActivity?: ActivityID = undefined;

    get inCombatArea(){
        if(Locations[this.currentLocation] instanceof CombatLocation){
            let loc = Locations[this.currentLocation] as CombatLocation;
            return !loc.completed;
        }
        else {
            return false;
        }
    }

    get weather() {
        let rnd = alea(Math.floor((this.eventclock.totalTicks) / (1000 * 3600 * 24)))()

        if (rnd < 0.4) {
            return 'sunny'
        } else if (rnd < 0.7) {
            return 'cloudy'
        } else {
            return 'rainy'
        }
    }

    get daytime(){
        let t = new Date(this.eventclock.totalTicks).getHours();

        if(t > 2 && t <= 5){
            return 'dawn';
        }
        else if(t > 5 && t <= 8){
            return 'morning';
        }
        else if(t > 8 && t <= 10){
            return 'forenoon';
        }
        else if(t > 10 && t <= 12){
            return 'noon';
        }
        else if(t > 12 && t <= 17){
            return 'afternoon';
        }
        else if(t > 17 && t <= 19){
            return 'evening';
        }
        else if(t > 19 && t <= 22){
            return 'night';
        }
        else{
            return 'late_night';
        }
    }

    get isDay(){
        return ['dawn', 'morning', 'forenoon', 'noon', 'afternoon'].indexOf(this.daytime) >= 0
    }

    tryLoad(path:string){
        return false;
    }

    save(path:string){

    }

    init() {
        //this.uiclock = setInterval(() => this.uiframe = (this.uiframe + 1) % MAX_UI_FRAME, UI_UPDATE_INTERVAL);
        this.eventclock.subscribers.push(() => this.tick())
        this.eventclock.totalTicks = Date.now()
    }

    prepare() {
        this.currentLocation = "home";
    }

    tick() {
        if(this.currentActivity){
            if(Activities[this.currentActivity].shouldContinue(this)){
                Activities[this.currentActivity].tick(this);
            }
            else {
                this.stopActivity();
            }
        }
        this.currentPlayer.tick();
    }

    startActivity(id: ActivityID){
        Activities[id].onActivityStart(this);
        this.currentActivity = id;
    }

    stopActivity(){
        Activities[this.currentActivity].onAcitvityCompleted(this);
        this.currentActivity = undefined;
    }

    startTalkWithNpc(id: NPCsID){
        this.currentSelectedNpc = id;
    }

    stopTalkWithNpc(){
        this.currentSelectedNpc = undefined;
    }

    enableUIAnimation(){
        this.disableUIAnimation();
        this.uiclock = setInterval(() => this.uiframe = (this.uiframe + 1) % MAX_UI_FRAME, UI_UPDATE_INTERVAL);
    }

    disableUIAnimation(){
        if(!Number.isNaN(this.uiclock)){
            clearInterval(this.uiclock);
        }
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new MainLogic();
        }
        return this.instance;
    }
}

export type DayTime = MainLogic['daytime']
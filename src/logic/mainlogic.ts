import { Player } from "../core/player";
import { LocationId as LocationID } from "../core/location";
import { alea } from 'seedrandom'
import { Activities, ActivityID } from "../core/activity";

const MAX_TICK_ONCE = 1000;
const MAX_UI_FRAME = 600;
const UI_UPDATE_INTERVAL = 500;

export class Clock {
    totalTicks = 0;
    lastTicked = 0;
    tickSpeed = 1;
    tickInterval = 1000;
    timerId: number = NaN;

    init() {
        this.totalTicks = 0;
        this.lastTicked = 0;
        this.tickSpeed = 0;
        this.tickInterval = 1000;
        this.stop();
        this.timerId = NaN;
    }

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

    uiclock:number = 0;
    eventclock: Clock = new Clock();

    currentPlayer: Player = new Player("Player");
    currentLocation: LocationID = "home";
    currentActivity?: ActivityID = undefined;

    inCombatArea: boolean = false;

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

    tryLoad(path:string){
        return false;
    }

    save(path:string){

    }

    init() {
        setInterval(() => this.uiclock = (this.uiclock + 1) % MAX_UI_FRAME, UI_UPDATE_INTERVAL);
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

    static getInstance() {
        if (this.instance == null) {
            this.instance = new MainLogic();
        }
        return this.instance;
    }
}
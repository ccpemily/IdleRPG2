import { MainLogic } from "../logic/mainlogic";
import { RegistryClass, createRegistry } from "./staticregistry";

const TICK_SPEED_WHEN_SLEEPING = 6

export class Activity extends RegistryClass<string>{
    tickCooldown:number = -1;
    tickFreq:number = -1;
    onActivityStart:(logic: MainLogic) => void;
    onActivityTick: (logic: MainLogic) => void;
    onActivityResulted: (logic: MainLogic) => void;
    onAcitvityCompleted: (logic: MainLogic) => void;
    shouldContinue: (logic: MainLogic) => boolean = () => true;


    get name(){
        return "activity." + this.id + ".name";
    }

    get textWhenDoing(){
        return "activity." + this.id + ".text";
    }

    get description(){
        return "activity." + this.id + ".description";
    }

    get textWhenStop(){
        return "activity." + this.id + ".stop";
    }

    constructor(
        onActivityStart?: (logic: MainLogic) => void, 
        onActivityTick?: (logic: MainLogic) => void, 
        onActivityResulted?: (logic: MainLogic) => void,
        onActivityCompeleted?: (logic: MainLogic) => void,
        shouldContinue?: (logic: MainLogic) => boolean,
        freq?: number
    ){
        super();
        if(freq){
            this.tickFreq = freq;
        }
        this.tickCooldown = this.tickFreq;
        this.onActivityStart = onActivityStart == undefined ? (_) => {} : onActivityStart;
        this.onActivityTick = onActivityTick == undefined ? (_) => {} : onActivityTick;
        this.onActivityResulted = onActivityResulted == undefined ? (_) => {} : onActivityResulted;
        this.onAcitvityCompleted = onActivityCompeleted == undefined ? (_) => {} : onActivityCompeleted;
        this.shouldContinue = shouldContinue == undefined ? (_) => true : shouldContinue;
    }

    tick(logic:MainLogic){
        if(this.tickCooldown > 0){
            this.tickCooldown--;
            if(this.tickCooldown == 0){
                this.onActivityTick(logic);
                this.tickCooldown = this.tickFreq;
            }
        }
    }
}

export const Activities = createRegistry({
    "sleep" : new Activity(
        (logic) => {
            logic.eventclock.tickSpeed = TICK_SPEED_WHEN_SLEEPING;
        },
        (_) => {},
        (_) => {},
        (logic) => {
            logic.eventclock.tickSpeed = 1;
        }
    ),
    "run_around" : new Activity(
        (logic) => {
            logic.currentPlayer.statusModifiers.push({
                id: "run_around",
                priority: 0,
                applyToRegen: {
                    health: undefined,
                    mana: undefined,
                    stamina: (_) => -1
                }
            })
        },
        (_) => {},
        (_) => {
            
        },
        (logic) => {
            let idx = logic.currentPlayer.statusModifiers.findIndex((value) => {value.id == "run_around"});
            logic.currentPlayer.statusModifiers.splice(idx, 1);
        },
        (logic) => {
            return logic.currentPlayer.stamina.value > 0;
        },
        60
    )
});

export type ActivityID = keyof typeof Activities;
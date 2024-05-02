import { MainLogic } from "../logic/mainlogic";

const TICK_SPEED_WHEN_SLEEPING = 6

export class Activity {
    private _name:string;
    tickCooldown:number = -1;
    tickFreq:number = -1;
    onActivityStart:(logic: MainLogic) => void;
    onActivityTick: (logic: MainLogic) => void;
    onActivityResulted: (logic: MainLogic) => void;
    onAcitvityCompleted: (logic: MainLogic) => void;
    shouldContinue: (logic: MainLogic) => boolean = () => true;


    get name(){
        return "activity." + this._name + ".name";
    }

    get textWhenDoing(){
        return "activity." + this._name + ".text";
    }

    get description(){
        return "activity." + this._name + ".description";
    }

    get textWhenStop(){
        return "activity." + this._name + ".stop";
    }

    constructor(
        id:string, 
        onActivityStart?: (logic: MainLogic) => void, 
        onActivityTick?: (logic: MainLogic) => void, 
        onActivityResulted?: (logic: MainLogic) => void,
        onActivityCompeleted?: (logic: MainLogic) => void,
        shouldContinue?: (logic: MainLogic) => boolean,
        freq?: number
    ){
        this._name = id;
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

export const Activities = {
    "sleep" : new Activity(
        "sleep",
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
        "run_around",
        (logic) => {
            logic.currentPlayer.statusModifiers.push({
                id: "run_around",
                applyToStaminaRegen(_) {
                    return -3;
                }
            })
        },
        (_) => {},
        (logic) => {
            let player = logic.currentPlayer;
            player.baseMaxStamina += player.level * 2;
        },
        (logic) => {
            let idx = logic.currentPlayer.statusModifiers.findIndex((value) => {value.id == "run_around"});
            logic.currentPlayer.statusModifiers.splice(idx, 1);
        },
        (logic) => {
            return logic.currentPlayer.stamina > 0;
        },
        60
    )
}

export type ActivityID = keyof typeof Activities;
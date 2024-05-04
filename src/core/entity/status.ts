import { mainLogic } from "../../main";
import { Event, EventArgs } from "../event";
import { Locations } from "../location";
import { LivingEntity } from "./livingentity";

export type EntityStatusType = 'health' | 'mana' | 'stamina';

export class StatusChangedEventArgs extends EventArgs {
    change: 'full' | 'depleted';

    constructor(change: 'full' | 'depleted'){
        super('status_changed');
        this.change = change;
    }
}

export class BaseStatusChangedEventArgs extends EventArgs {
    prev: number;
    newval: number;

    constructor(prev: number, newval: number){
        super('base_status_changed');
        this.prev = prev;
        this.newval = newval;
    }
}

export function getStatus(p: LivingEntity, id: EntityStatusType): EntityStatus {
    let s = p[id];
    return s;
}

export abstract class EntityStatus {
    id: EntityStatusType;
    protected _initalMax: number;
    protected _initalRegen: number;
    protected _baseMax: number;
    protected _baseRegen: number;
    protected _current: number;
    protected _parent: LivingEntity;

    depleted: Event<StatusChangedEventArgs> = new Event();
    full: Event<StatusChangedEventArgs> = new Event();
    baseMaxChanged: Event<BaseStatusChangedEventArgs> = new Event();
    baseRegenChanged: Event<BaseStatusChangedEventArgs> = new Event();

    get value(){
        return this._current;
    }

    set value(newVal: number){
        if(newVal <= 0){
            if(this.value > 0){
                this.depleted.invoke(this, new StatusChangedEventArgs('depleted'));
            }
            this._current = 0;
        }
        else if(newVal >= this.max){
            if(this.value < this.max){
                this.full.invoke(this, new StatusChangedEventArgs('full'));
            }
            this._current = this.max;
        }
        else {
            this._current = newVal;
        }
    }

    get baseMax(){
        return this._baseMax;
    }
    
    protected set baseMax(newVal: number){
        if(newVal != this._baseMax){
            this.baseMaxChanged.invoke(this, new BaseStatusChangedEventArgs(this.baseMax, newVal));
        }
        this._baseMax = newVal > 0 ? newVal : 0;
    }

    get baseRegen(){
        return this._baseRegen;
    }

    protected set baseRegen(newVal: number){
        if(newVal != this._baseRegen){
            this.baseRegenChanged.invoke(this, new BaseStatusChangedEventArgs(this.baseRegen, newVal));
        }
        this._baseRegen = newVal > 0 ? newVal : 0;
    }

    get adjustedMax(){
        return this.adjustMaxByAttribute(this.baseMax);
    }

    get adjustedRegen(){
        return this.adjustRegenByAttribute(this.baseRegen);
    }

    get max(){
        let cur = this.adjustedMax;
        this._parent.statusModifiers.filter((m) => m.applyToMax[this.id]).sort((m1, m2) => m1.priority - m2.priority).forEach((modifier) => {
            cur = modifier.applyToMax[this.id](cur);
        });
        return cur;
    }

    get regen(){
        let cur = this.adjustedRegen;
        this._parent.statusModifiers.filter((m) => m.applyToRegen[this.id]).sort((m1, m2) => m1.priority - m2.priority).forEach((modifier) => {
            cur = modifier.applyToRegen[this.id](cur);
        });
        return cur;
    }

    constructor(id: EntityStatusType, baseMax: number, baseRegen: number, parent: LivingEntity, initPercentage?: number){
        this.id = id;
        this._initalMax = baseMax;
        this._initalRegen = baseRegen;
        this._baseMax = baseMax;
        this._baseRegen = baseRegen;
        this._parent = parent;
        if(initPercentage){
            this._current = initPercentage * this.max;
        }
        else {
            this._current = this.max;
        }
    }

    protected adjustMaxByAttribute(m: number){
        return m;
    }
    protected adjustRegenByAttribute(r: number){
        return r;
    }

    tick(){
        if(new Date(mainLogic.eventclock.totalTicks).getSeconds() == 0){
            this.value += this.regen;
        }
    }

    onLevelUp(){

    }
}

export class Health extends EntityStatus {
    constructor(baseMax: number, baseRegen: number, parent: LivingEntity){
        super('health', baseMax, baseRegen, parent);
    }

    protected adjustMaxByAttribute(m: number){
        let adjusted = m * (1 + this._parent.constitution.adjust * (3 / 100 + this._parent.constitution.adjust / 200))
        return adjusted;
    }
    protected adjustRegenByAttribute(r: number){
        let adjusted = r * (1 + this._parent.constitution.adjust * (2 + this._parent.constitution.adjust / 200))
        return adjusted * (Locations[mainLogic.currentLocation].isRestingArea ? 20 : 1);
    }

    onLevelUp(){
        this.baseMax = this._initalMax * (1 + this._parent.level / 10 + this._parent.level * (this._parent.level / 400 + this._parent.level * (this._parent.level / 2000)));
        this.baseRegen = this._initalRegen * (1 + this._parent.level / 20 + this._parent.level * (this._parent.level / 600 + this._parent.level * (this._parent.level / 3000)));
    }
}

export class Mana extends EntityStatus {
    constructor(baseMax: number, baseRegen: number, parent: LivingEntity){
        super('mana', baseMax, baseRegen, parent);
    }

    protected adjustMaxByAttribute(m: number){
        let adjusted = m * (1 + this._parent.intelligence.adjust * (2 / 100 + this._parent.intelligence.adjust / 250))
        return adjusted;
    }
    protected adjustRegenByAttribute(r: number){
        let adjusted = r * (1 + this._parent.wisdom.adjust * (3 + this._parent.wisdom.adjust / 250))
        return adjusted;
    }

    onLevelUp(){
        this.baseMax = this._initalMax * (1 + this._parent.level / 20 + this._parent.level * (this._parent.level / 800 + this._parent.level * (this._parent.level / 4000)));
        this.baseRegen = this._initalRegen * (1 + this._parent.level / 20 + this._parent.level * (this._parent.level / 1000 + this._parent.level * (this._parent.level / 6000)));
    }
}

export class Stamina extends EntityStatus {
    constructor(baseMax: number, baseRegen: number, parent: LivingEntity){
        super('stamina', baseMax, baseRegen, parent);
    }

    protected adjustMaxByAttribute(m: number){
        let adjusted = m * (1 + this._parent.strength.adjust * (3 / 100 + this._parent.strength.adjust / 200))
        return adjusted;
    }
    protected adjustRegenByAttribute(r: number){
        let adjusted = r * (1 + this._parent.constitution.adjust * (30 / 100 + this._parent.constitution.adjust / 250))
        return adjusted;
    }

    onLevelUp(){
        this.baseMax = this._initalMax * (1 + this._parent.level / 20 + this._parent.level * (this._parent.level / 800 + this._parent.level * (this._parent.level / 4000)));
        this.baseRegen = this._initalRegen * (1 + this._parent.level / 20 + this._parent.level * (this._parent.level / 1000 + this._parent.level * (this._parent.level / 6000)));
    }
}



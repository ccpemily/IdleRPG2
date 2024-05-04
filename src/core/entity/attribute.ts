import { Event, EventArgs } from "../event";
import { LivingEntity } from "./livingentity";

export type EntityAttributeType = 'strength' | 'constitution' | 'dexterity' | 'intelligence' | 'wisdom' | 'charisma';

export class AttributeChangedEventArgs extends EventArgs{
    prev: number;
    newval: number;

    constructor(prev: number, newval: number){
        super('base_attribute_changed');
        this.prev = prev;
        this.newval = newval;
    }
}

export class EntityAttribute {
    id: EntityAttributeType;
    protected _base: number;
    protected _parent: LivingEntity;
    
    baseChanged: Event<AttributeChangedEventArgs> = new Event();

    get base(){
        return this._base;
    }

    set base(newval: number){
        if(this.base != newval){
            this.baseChanged.invoke(this, new AttributeChangedEventArgs(this.base, newval));
        }
        this._base = newval > 0 ? newval : 0;
    }
    
    get value(){
        let v = this.base;
        this._parent.attributesModifiers.filter((m) => m.applyTo[this.id]).sort((m1, m2) => m1.priority - m2.priority).forEach((m) => {
            v = m.applyTo[this.id](v);
        });
        return v > 0 ? v : 0;
    }

    get adjust(){
        return Math.floor((this.value - 10) / 2);
    }

    constructor(id: EntityAttributeType, parent: LivingEntity, initval: number = 10){
        this.id = id;
        this._base = initval;
        this._parent = parent;
    }

    resetTo(resetVal: number): number{
        if(resetVal >= this.base){
            return 0;
        }
        else {
            let r = resetVal > 10 ? resetVal : 10;
            let perksReturned = 0;
            let current = this._base;
            while(current > r){
                perksReturned += Math.ceil((current - 10) / 10)
                current--;
            }
            return perksReturned;
        }
    }
}
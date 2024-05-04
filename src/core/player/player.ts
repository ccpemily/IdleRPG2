import { LivingEntity } from "../entity/livingentity";

export class Player extends LivingEntity{
    private _experience = 0;
    private baseExpToNextLevel = 100;

    _attributePerks = 20;

    get attributePerks(){
        return this._attributePerks;
    }

    set attributePerks(value: number){
        if(value > this._attributePerks){
            console.log("Gained perks points: ", value - this._attributePerks);
        }
        else if(value < this._attributePerks){
            console.log("Spent perks points: ", this._attributePerks - value);
        }
        this._attributePerks = value;
    }

    // #region BaseCombatStatus
    baseAttackPower = 1;
    baseAttackSpeed = 1;
    baseArmorClass = 10; // AC
    // #endregion

    get experience(){
        return this._experience;
    }

    set experience(value:number){
        if(value < 0){
            this._experience = 0;
        }
        else if(value >= this.expToNextLevel){
            let overflow = value - this.expToNextLevel;
            this._level += 1;
            this.onLevelUp();
            this.experience = overflow;
        }
        else {
            this._experience = value;
        }
    }

    get level(){
        return this._level;
    }

    get expToNextLevel(){
        return this.baseExpToNextLevel + Math.floor(this.level * this.baseExpToNextLevel * 0.8);
    }

    constructor(name: string){
        super(0, 50, 50, 50, 0.02, 0.5, 0.8);
        this.name = name;
    }

    tick(){
        super.tick();
    }

    onLevelUp(){
        super.onLevelUp();
        this.attributePerks += Math.ceil(this.level / 10);
    }

    onPerksAllocated({
        strength, constitution, dexterity, intelligence, wisdom, charisma,
        consumed
    }:{
        strength: number, constitution: number, dexterity: number, intelligence: number, wisdom: number, charisma: number,
        consumed: number
    }){
        this.strength.base += strength;
        this.constitution.base += constitution;
        this.dexterity.base += dexterity;
        this.intelligence.base += intelligence;
        this.wisdom.base += wisdom;
        this.charisma.base += charisma;
        this.attributePerks -= consumed;
    }
}
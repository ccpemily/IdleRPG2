import { mainLogic } from "../main";
import { Locations } from "./location";

export class Player {
    name:string;
    private _health:number;
    private _stamina:number;
    private _mana:number;

    private _experience = 50;
    private _level = 1;

    attributePerks = 20;

    // #region BaseStatus
    baseMaxHealth = 200;
    baseMaxStamina = 100;
    baseMaxMana = 100;
    baseExpToNextLevel = 100;

    baseHealthRegen = 0.5;
    baseStaminaRegen = 0.3;
    baseManaRegen = 0.4;
    // #endregion

    // #region BaseAttributes
    baseStrength = 8; // STR
    baseConstitution = 8; // CON
    baseDexterity = 8; // DEX
    baseIntelligence = 8; // INT
    baseWisdom = 8; // WIS
    baseCharisma = 8; // CHA
    // #endregion

    // #region BaseCombatStatus
    baseAttackPower = 1;
    baseAttackSpeed = 1;
    baseArmorClass = 10; // AC
    // #endregion

    statusModifiers: PlayerStatusModifier[] = [];
    attributesModifiers: PlayerAttributesModifier[] = [];
    combatModifiers: PlayerCombatModifier[] = [];

    get inRestingArea(){
        return Locations[mainLogic.currentLocation].isRestingArea
    }

    // #region Status Properties
    get health(){
        return this._health;
    }

    set health(value:number){
        if(value > this.maxHealth){
            this._health = this.maxHealth;
        }
        else if(value < 0){
            this._health = 0;
        }
        else {
            this._health = value;
        }
    }

    get stamina(){
        return this._stamina;
    }

    set stamina(value:number){
        if(value > this.maxStamina){
            this._stamina = this.maxStamina;
        }
        else if(value < 0){
            this._stamina = 0;
        }
        else {
            this._stamina = value;
        }
    }

    get mana(){
        return this._mana;
    }

    set mana(value:number){
        if(value > this.maxMana){
            this._mana = this.maxMana;
        }
        else if(value < 0){
            this._mana = 0;
        }
        else {
            this._mana = value;
        }
    }

    get maxHealth(){
        let cur = this.baseMaxHealth;
        this.statusModifiers.forEach((modifier) => {
            if(modifier.applyToMaxHealth){
                cur = modifier.applyToMaxHealth(cur);
            }
        });
        return cur;
    }

    get maxMana(){
        let cur = this.baseMaxMana;
        this.statusModifiers.forEach((modifier) => {
            if(modifier.applyToMaxMana){
                cur = modifier.applyToMaxMana(cur);
            }
        });
        return cur;
    }

    get maxStamina(){
        let cur = this.baseMaxStamina;
        this.statusModifiers.forEach((modifier) => {
            if(modifier.applyToMaxStamina){
                cur = modifier.applyToMaxStamina(cur);
            }
        });
        return cur;
    }

    get experience(){
        return this._experience;
    }

    set experience(value:number){
        if(value < 0){
            this._experience = 0;
        }
        else if(value >= this.expToNextLevel){
            let overflow = value - this.expToNextLevel;
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
        return this.baseExpToNextLevel + Math.floor((this.level - 1) * this.baseExpToNextLevel * 0.8);
    }

    get healthRegen(){
        return this.inRestingArea ? this.baseHealthRegen : 0;
    }

    get staminaRegen(){
        let base = 0;
        if (this.inRestingArea){
            base = this.baseStaminaRegen;
        }

        this.statusModifiers.forEach((modifier) => {
            base = modifier.applyToStaminaRegen(base);
        })

        return base;
    }

    get manaRegen(){
        return this.inRestingArea ? this.baseManaRegen : 0;
    }
    // #endregion

    constructor(name: string){
        this.name = name;
        this.health = this.maxHealth;
        this.stamina = this.maxStamina;
        this.mana = this.maxMana;
        this.experience = 0;
    }

    tick(){
        this.health += this.healthRegen;
        this.mana += this.manaRegen;
        this.stamina += this.staminaRegen;
        this.experience += 8;
    }

    onLevelUp(){
        this._level += 1;
        this.baseMaxHealth += 21 + this.level * 4 + 0.7 * this.level * this.level;
        this.baseMaxMana += 11 + this.level * 2 + 0.3 * this.level * this.level;
        this.baseMaxStamina += 13 + this.level * 3 + 0.4 * this.level * this.level;

        this.baseHealthRegen += 0.1 + this.level * 0.01 + 0.008 * this.level * this.level;
        this.baseManaRegen += 0.05 + this.level * 0.01 + 0.004 * this.level * this.level;
        this.baseStaminaRegen += 0.07 + this.level * 0.01 + 0.003 * this.level * this.level;

        this.attributePerks += 1 + Math.floor(this.level / 10);
    }

    onPerksAllocated({
        str, con, dex, int, wis, cha,
        consumed
    }:{
        str: number, con: number, dex: number, int: number, wis: number, cha: number,
        consumed: number
    }){
        this.baseStrength += str;
        this.baseConstitution += con;
        this.baseDexterity += dex;
        this.baseIntelligence += int;
        this.baseWisdom += wis;
        this.baseCharisma += cha;
        this.attributePerks -= consumed;
    }
}

export interface PlayerStatusModifier {
    id:string;

    applyToMaxHealth?: (maxHealth:number) => number;
    applyToMaxMana?: (maxMana:number) => number;
    applyToMaxStamina?: (maxStamina:number) => number;

    applyToHealthRegen?: (healthRegen:number) => number;
    applyToManaRegen?: (manaRegen:number) => number;
    applyToStaminaRegen?: (staminaRegen:number) => number;

    applyToExperienceGain?: (gained:number) => number;
}

export interface PlayerAttributesModifier {

}

export interface PlayerCombatModifier {

}
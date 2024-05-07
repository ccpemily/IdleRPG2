import { EntityAttribute, EntityAttributeType } from "./attribute";
import { Health, EntityStatusType, Stamina, Mana } from "./status";

export abstract class LivingEntity {
    name: string;
    protected _level = 0;

    get level(): number {
        return this._level;
    }

    health: Health;
    mana: Mana;
    stamina: Stamina;

    strength: EntityAttribute;
    constitution: EntityAttribute;
    dexterity: EntityAttribute;
    intelligence: EntityAttribute;
    wisdom: EntityAttribute;
    charisma: EntityAttribute;

    statusModifiers: IEntityStatusModifier[] = [];
    attributesModifiers: IEntityAttributesModifier[] = [];
    combatModifiers: IEntityCombatModifier[] = [];

    tick(){
        this.health.tick();
        this.mana.tick();
        this.stamina.tick();
    }

    onLevelUp(){
        this.health.onLevelUp();
        this.mana.onLevelUp();
        this.stamina.onLevelUp();
    }

    constructor(level: number, health: number, mana: number, stamina: number, healthRegen: number, manaRegen: number, staminaRegen: number,
        attrs?: { str?: number, con?: number, dex?: number, int?: number, wis?: number, cha?: number },
    ){
        this._level = level;

        this.strength = new EntityAttribute('strength', this, attrs ? attrs.str : undefined);
        this.constitution = new EntityAttribute('constitution', this, attrs ? attrs.con : undefined);
        this.dexterity = new EntityAttribute('dexterity', this, attrs ? attrs.dex : undefined);
        this.intelligence = new EntityAttribute('intelligence', this, attrs ? attrs.int : undefined);
        this.wisdom = new EntityAttribute('wisdom', this, attrs ? attrs.wis : undefined);
        this.charisma = new EntityAttribute('charisma', this, attrs ? attrs.cha : undefined);

        this.health = new Health(health, healthRegen, this);
        this.mana = new Mana(mana, manaRegen, this);
        this.stamina = new Stamina(stamina, staminaRegen, this);

        this.onLevelUp();
    }
}

export interface IEntityStatusModifier {
    id:string;
    priority:number;

    applyToMax?: Record<EntityStatusType, (value: number) => number>;
    applyToRegen?: Record<EntityStatusType, (value: number) => number>;

    applyToExperienceGain?: (gained:number) => number;
}

export interface IEntityAttributesModifier {
    id:string;
    priority:number;

    applyTo: Record<EntityAttributeType, (value: number) => number>;
}

export interface IEntityCombatModifier {

}
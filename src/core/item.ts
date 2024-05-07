import { RegistryClass, Registry } from "./staticregistry";

@Registry(() => Items)
export class Item extends RegistryClass<typeof Items>{
    get name() {
        return "item." + this.id + ".name";
    }

    constructor(properties? : ItemProperties){
        super();
    }
}

export class ItemProperties {
    stacksTo: -1;

    static get(){
        return new ItemProperties();
    }
}

export class ItemStack {
    private _count: number;

    get count(){
        return this._count;
    }

    shrink(count? : number){
        this._count -= count;
        if(this.count < 0){
            this._count = 0;
        }
    }
}

export class EquipmentItem extends Item{

}

export class FoodItem extends Item{

}

export const Items = {
    "empty": new Item(),
    "air": new Item(),
    "test": new Item()
} as const;

export type ItemID = keyof typeof Items;
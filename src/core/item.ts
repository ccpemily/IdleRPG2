import { RegistryClass, createRegistry } from "./staticregistry";

export class Item extends RegistryClass<string>{
    get name() {
        return "item." + this.id + ".name";
    }

    constructor(properties? : ItemProperties){
        super();
        if(properties){

        }
    }
}

export class ItemProperties {
    _stacksTo = -1;
    _color = 0;
    _desc: string[] = []

    static get(){
        return new ItemProperties();
    }

    stacksTo(count: number){
        this._stacksTo = count;
        return this;
    }

    withColor(color: number){
        this._color = color;
        return this;
    }

    withDescription(desc: string[]){
        this._desc.concat(desc);
        return this;
    }
}

export class ItemStack {
    private _count: number;
    private _item: Item;

    get item(){
        return this._item;
    }

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

export const Items = createRegistry({
    "empty": new Item(),
    "air": new Item(),
    "test": new Item()
});

export type ItemID = keyof typeof Items;
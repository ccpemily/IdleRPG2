export class Item {

}

export class ItemProperties {

}

export class ItemStack {

}

export class EquipmentItem {

}

export class FoodItem {

}

export const Items = {
    "empty": new Item()
}

export type ItemID = keyof typeof Items;
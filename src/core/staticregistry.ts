type Consturctor<T> = { new (...args: any[]): T };

export abstract class RegistryClass<T> {
    
    get id(): keyof T {
        return undefined;
    }
}

// Annotation to bound a subclass of RegistryClass with a registryMap supplier, which will provide an implementation of get id().
export const Registry = <T>(registryMap: () => T) => <S extends Consturctor<RegistryClass<T>>>(target: S) => 
    class extends target {
        private _id: keyof T = undefined;
        get id(): keyof T {
            if(this._id){
                return this._id;
            }
            else {
                let map = registryMap();
                let keys = Object.keys(map) as (keyof T)[];
                let k = keys.find((value) => map[value] == this);
                if(k){
                    this._id = k;
                    return k;
                }
                else {
                    throw new Error("This instance is not in Registry Mapping!");
                }
            }
        }
    }
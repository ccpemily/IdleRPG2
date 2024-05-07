export abstract class RegistryClass<T extends string | number | symbol> {
    
    get id(): T {
        return undefined;
    }
}

export function createRegistry<T>(registryMap: T){
    return Object.fromEntries(Object.entries(registryMap).map(([id, value]) => [id, Object.assign(value, {id})])) as {
        [K in keyof typeof registryMap]: T[K] & {id: K};
    }
}
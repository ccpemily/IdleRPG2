export class EventArgs {
    name = "event";

    constructor(name: string){
        this.name = name;
    }
}

export class Event<T extends EventArgs> {
    handlers:Array<(sender: any, args: T) => void> = [];

    constructor(){

    }

    register(handler:(sender: any, args: T) => void){
        this.handlers.push(handler);
    }

    remove(handler:(sender:any, args: T) => void){
        let idx = this.handlers.indexOf(handler);
        if(idx){
            this.handlers.splice(idx, 1);
        }
    }

    invoke(sender:any, arg:T){
        this.handlers.forEach((handler) => {
            handler(sender, arg);
        })
    }
}
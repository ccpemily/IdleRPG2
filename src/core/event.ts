export class EventArgs {
    
}

export class Event<T extends EventArgs> {
    handlers:Array<(sender:any, arg:T) => void> = [];

    constructor(){

    }

    register(handler:(sender:any, arg:T) => void){
        this.handlers.push(handler);
    }

    invoke(sender:any, arg:T){
        this.handlers.forEach((handler) => {
            handler(sender, arg);
        })
    }
}
export class Event<T> {
    handlers:Array<(sender:any, arg: T) => void> = [];

    constructor(){

    }

    register(handler:(sender:any, arg:T) => void){
        this.handlers.push(handler);
    }

    invoke(sender:any, arg:T){
        
    }
}
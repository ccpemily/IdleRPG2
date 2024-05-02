export class Clock {
    interval = 1000;
    worker:Worker;  
    tick_subscriber:Array<() => void> = [];
    running = false;

    constructor(interval:number){
        this.interval = interval;
        this.worker = new Worker(new URL("./clock.worker.ts", import.meta.url), {type: "module"});
        this.worker.onmessage = (_: any) => this.tick();
    }

    tick(){
        if(this.running){
            for(let handler of this.tick_subscriber){
                handler();
            }
        }
    }

    addTickHandler(handler:() => void){
        this.tick_subscriber.push(handler);
    }

    run(){
        this.running = true;
        this.worker.postMessage({enabled: true, interval: this.interval})
    }

    stop(){
        this.running = false;
        this.worker.postMessage({enabled: false, interval: this.interval})
    }
}
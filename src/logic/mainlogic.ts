export class MainLogic {
    private static instance:MainLogic;

    current:number = 0;

    prepare(){
        
    }

    tick(){
        this.current += 1;
        console.log("Ticked by 1");
    }

    static getInstance(){
        if(this.instance == null){
            this.instance = new MainLogic();
        }
        return this.instance;
    }
}
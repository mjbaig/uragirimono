export default class Uragirimono {

    worker: Worker;

    process: string;

    constructor() {
        this.worker = null;

        this.process = "console.log(\"hello\")"
    }

    init() {

        if(this.worker != null) {
            return;
        }

        const func = `( () => {
        while(true) {
            ${this.process.toString()}
        }
    })();`

    console.log(func);

        const blob = new Blob([func], { type: 'application/javascript' });

        const worker = new Worker(window.URL.createObjectURL(blob));
    }
}
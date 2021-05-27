'use strict'

export default class GenServer {

    constructor(genServerName) {
        this.genServerName = genServerName;
    }

    /**
     * @param {string} processName Unique name for the process you wish to spawn
     * @param {Function} process stateless function that you wish to run in the server
     * @param {object} initialState Initial state for the process you wish to spawn
     */
    startLink( processName, process, initialState) {

        const blob = new Blob([`(
            while(true) {
                ${process.toString()}
            }
        )();`], { type: 'application/javascript' })

        if(!!this.workerMap[processName]) {
            console.warn(`${processName} already exists in the genserver named '${this.genServerName}'`);
        }
        
        const worker = new Worker(window.URL.createObjectURL(blob));

        return worker;

    }

    /**
     * 
     * @param {Function} process stateless function that you wish to run in the server
     */
    killProcess(processName) {
        worker = this.workerMap[processName];

        if(!!worker) {
            worker.terminate();
        }
    }

    killAllProcesses() {

    }

    killServer() {

    }

}
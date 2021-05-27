abstract class GenServer implements Process {

    constructor() {

    }

    abstract init(): void

    start(): Process {
        throw new Error("not implemented");
    }

    call(): any {
        throw new Error("not implemented");
    }

    cast(): any {
        throw new Error("not implemented");
    }

    handleCast(): any {
        throw new Error("not implemented");
    }
}
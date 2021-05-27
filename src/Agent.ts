abstract class Agent extends GenServer {

    abstract init(): any;

    abstract get(): any;

    abstract update(): any;

}
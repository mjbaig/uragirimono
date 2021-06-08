'use strict'

interface Subscriber {
    update(message: Message);
}

interface Message {
    channel: string,
    payload: Object,
}

export default class Uragirimono {

    worker: Worker;

    process: string;

    channels: Map<string, Array<Subscriber>> =  new Map();

    constructor() {
        this.worker = null;

        this.process = `
            self.onmessage = function (message) {
                console.log(message.data);

                self.postMessage(message.data);
            }
        `

        this.init();
    }

    init() {

        if(this.worker != null) {
            return;
        }

        const func = `( () => {
                ${this.process.toString()}
        })();`

        console.log(func);

        const blob = new Blob([func], { type: 'application/javascript' });

        this.worker = new Worker(window.URL.createObjectURL(blob));

        this.worker.onmessage = function(event) {
            if(!!event) {
                const message: Message = event.data
                const subscribers = this.channels.get(message.channel) as Array<Subscriber>
                if(subscribers) {
                    subscribers.map(function(subscriber: Subscriber) {
                        subscriber.update(message);
                    });
                }
            }
        }.bind(this);
    }

    registerChannel(channel: string) {
        if(!this.channels.get(channel)) {
            this.channels.set(channel, []);
        }
    }

    send(message: Message) {
        this.worker.postMessage(message);
    }

    registerSubscriber(channel: string, subscriber: Subscriber) {
        if(!!this.channels.get(channel)) {
            this.channels.get(channel).push(subscriber);
        }
    }

}
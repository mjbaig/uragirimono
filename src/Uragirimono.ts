'use strict'

interface Subscriber {
    update(message: Message);
}

interface Message {
    channelName: string,
    payload: Object,
}

interface Channel {
    name: string,
    subscribers: Array<Subscriber>,
    worker: Worker
}

export default class Uragirimono {

    process: string;

    channels: Map<string, Channel> =  new Map();

    constructor() {
    }

    createWorker() {

        this.process = `
            self.onmessage = function (message) {
                self.postMessage(message.data);
            }
        `

        const func = `( () => {
                ${this.process.toString()}
        })();`


        const blob = new Blob([func], { type: 'application/javascript' });

        const worker = new Worker(window.URL.createObjectURL(blob));

        worker.onmessage = function(event) {
            if(!!event) {
                const message: Message = event.data
                const subscribers = this.channels.get(message.channelName).subscribers as Array<Subscriber>
                if(subscribers) {
                    subscribers.map(function(subscriber: Subscriber) {
                        subscriber.update(message);
                    });
                }
            }
        }.bind(this);

        return worker;
    }

    registerChannel(channelName: string) {
        if(!this.channels.get(channelName)) {
            this.channels.set(channelName, {
                name: channelName,
                subscribers: [],
                worker: this.createWorker()
            } as Channel);
        }
    }

    destroyChannel(channelName: string) {
        const channel: Channel = this.channels.get(channelName);
        if(!channel) {
            channel.worker.terminate();
            this.channels.delete(channelName);
        }
    }

    send(message: Message) {
        const channelName = message.channelName;
        if(!!channelName) {
            const worker = this.channels.get(channelName).worker as Worker;
            worker.postMessage(message);
        }
    }

    registerSubscriber(channelName: string, subscriber: Subscriber) {
        if(!!this.channels.get(channelName)) {
            this.channels.get(channelName).subscribers.push(subscriber);
        }
    }

}
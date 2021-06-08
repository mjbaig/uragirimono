'use strict'

interface Subscriber {
    update(message: Message): void;
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

class Uragirimono {

    channels: Map<string, Channel> =  new Map();

    constructor() {
        console.log("t");
        console.log("instance");
    }

    createWorker() {

        const process = `
            self.onmessage = function (message) {
                self.postMessage(message.data);
            }
        `

        const func = `( () => {
                ${process.toString()}
        })();`


        const blob = new Blob([func], { type: 'application/javascript' });

        const worker = new Worker(window.URL.createObjectURL(blob));

        worker.onmessage = (event: MessageEvent) => {
            if(!!event) {
                const message: Message = event.data
                const channel: Channel | undefined = this.channels.get(message.channelName);
                if(channel !== undefined) {
                    const subscribers = channel.subscribers as Array<Subscriber>
                    if(subscribers) {
                        subscribers.map(function(subscriber: Subscriber) {
                            subscriber.update(message);
                        });
                    }
                }
                
            }
        }

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
        const channel: Channel | undefined = this.channels.get(channelName);
        if(channel !== undefined) {
            channel.worker.terminate();
            this.channels.delete(channelName);
        }
    }

    send(message: Message) {
        const channelName = message.channelName;
        if(!!channelName) {
            const channel: Channel | undefined = this.channels.get(channelName);
            if(channel !== undefined) {
                const worker = channel.worker as Worker;
                worker.postMessage(message);
            }
        }
    }

    registerSubscriber(channelName: string, subscriber: Subscriber) {
        const channel: Channel | undefined = this.channels.get(channelName)
        if(channel !== undefined) {
            channel.subscribers.push(subscriber);
        }
    }

}

export const uragirimono = new Uragirimono();

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
    subscribers: Array<Subscriber>
}

class Uragirimono {

    channels: Map<string, Channel> =  new Map();

    constructor() {
    }

    registerChannel(channelName: string) {
        if(!this.channels.get(channelName)) {
            this.channels.set(channelName, {
                name: channelName,
                subscribers: []
            } as Channel);
        }
    }

    destroyChannel(channelName: string) {
        const channel: Channel | undefined = this.channels.get(channelName);
        if(channel !== undefined) {
            this.channels.delete(channelName);
        }
    }

    send(message: Message) {
        const channelName = message.channelName;
        if(!!channelName) {
            const channel: Channel | undefined = this.channels.get(channelName);
            if(channel !== undefined) {
                const subscribers = channel.subscribers as Array<Subscriber>;
                subscribers.map((subscriber: Subscriber) => {
                    subscriber.update(message);
                });
            }
        }
    }

    updateSubscribers(message: Message) {



    }

    registerSubscriber(channelName: string, subscriber: Subscriber) {
        const channel: Channel | undefined = this.channels.get(channelName)
        if(channel !== undefined) {
            channel.subscribers.push(subscriber);
        }
    }

}

export const uragirimono = new Uragirimono();

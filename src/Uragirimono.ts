'use strict'

interface Message {
    channelName: string,
    payload: Object,
}

interface Channel {
    name: string,
    subscriberCallbacks: Array<(message: Message) => void>
}

class Uragirimono {

    channels: Map<string, Channel> =  new Map();

    constructor() {
    }

    registerChannel(channelName: string) {
        if(!this.channels.get(channelName)) {
            this.channels.set(channelName, {
                name: channelName,
                subscriberCallbacks: []
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
                const subscriberCallbacks = channel.subscriberCallbacks as Array<(message: Message) => void>;
                subscriberCallbacks.map((subscriberCallback: (message: Message) => void) => {
                    subscriberCallback(message);
                });
            }
        }
    }

    registerSubscriber(channelName: string, subscriberCallback: (message: Message) => void) {
        const channel: Channel | undefined = this.channels.get(channelName)
        if(channel !== undefined) {
            channel.subscriberCallbacks.push(subscriberCallback);
        }
    }

}

export const uragirimono = new Uragirimono();

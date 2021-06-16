'use strict'

interface Message {
    channelName: string,
    payload: Object,
    address: Number
}

interface Channel {
    name: string,
    subscibers: Array<Subscriber>
}

interface Range {
    min: Number,
    max: Number
}

interface Subscriber {
    addressableRange: Range,
    callback: (message: Message) => void
}

export default class Uragirimono {

    channels: Map<string, Channel> =  new Map();

    constructor() {
    }

    registerChannel(channelName: string) {
        if(!this.channels.get(channelName)) {
            this.channels.set(channelName, {
                name: channelName,
                subscibers: []
            } as Channel);
        }
    }

    destroyChannel(channelName: string) {
        const channel: Channel | undefined = this.channels.get(channelName);
        if(channel !== undefined) {
            this.channels.delete(channelName);
        }
    }

    write(message: Message) {
        const channelName = message.channelName;
        if(!!channelName) {
            const channel: Channel | undefined = this.channels.get(channelName);
            const subscibers: Subscriber[] | undefined = channel?.subscibers;
            if(subscibers !== undefined) {

                subscibers.map((subscriber: Subscriber) => {
                    const range: Range = subscriber.addressableRange;
                    const callback: (message: Message) => void = subscriber.callback;
                    if(message.address >= range.min && message.address <= range.max) {
                        callback(message)
                    }
                });

            }
        }
    }

    registerSubscriber(channelName: string, addressableRange: Range, subscriberCallback: (message: Message) => void) {
        const channel: Channel | undefined = this.channels.get(channelName)
        if(channel !== undefined) {
            channel.subscibers.push({
                addressableRange: addressableRange,
                callback: subscriberCallback
            } as Subscriber)
        }
    }

}



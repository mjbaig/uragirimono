class Uragirimono {
    constructor() {
        this.channels = new Map();
    }
    registerChannel(channelName) {
        if (!this.channels.get(channelName)) {
            this.channels.set(channelName, {
                name: channelName,
                subscriberCallbacks: []
            });
        }
    }
    destroyChannel(channelName) {
        const channel = this.channels.get(channelName);
        if (channel !== undefined) {
            this.channels.delete(channelName);
        }
    }
    send(message) {
        const channelName = message.channelName;
        if (!!channelName) {
            const channel = this.channels.get(channelName);
            if (channel !== undefined) {
                const subscriberCallbacks = channel.subscriberCallbacks;
                subscriberCallbacks.map((subscriberCallback) => {
                    subscriberCallback(message);
                });
            }
        }
    }
    registerSubscriber(channelName, subscriberCallback) {
        const channel = this.channels.get(channelName);
        if (channel !== undefined) {
            channel.subscriberCallbacks.push(subscriberCallback);
        }
    }
}
const uragirimono = new Uragirimono();

export { uragirimono };

class Uragirimono {
    constructor() {
        this.channels = new Map();
    }
    registerChannel(channelName) {
        if (!this.channels.get(channelName)) {
            this.channels.set(channelName, {
                name: channelName,
                subscribers: []
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
                const subscribers = channel.subscribers;
                subscribers.map((subscriber) => {
                    subscriber.update(message);
                });
            }
        }
    }
    updateSubscribers(message) {
    }
    registerSubscriber(channelName, subscriber) {
        const channel = this.channels.get(channelName);
        if (channel !== undefined) {
            channel.subscribers.push(subscriber);
        }
    }
}
const uragirimono = new Uragirimono();

export { uragirimono };

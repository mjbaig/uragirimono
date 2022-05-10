class Uragirimono {
    constructor() {
        this.channels = new Map();
    }
    registerChannel(channelName) {
        if (!this.channels.get(channelName)) {
            this.channels.set(channelName, {
                name: channelName,
                subscibers: []
            });
        }
    }
    destroyChannel(channelName) {
        const channel = this.channels.get(channelName);
        if (channel !== undefined) {
            this.channels.delete(channelName);
        }
    }
    write(message) {
        const channelName = message.channelName;
        if (!!channelName) {
            const channel = this.channels.get(channelName);
            const subscibers = channel?.subscibers;
            if (subscibers !== undefined) {
                subscibers.map((subscriber) => {
                    const range = subscriber.addressableRange;
                    const callback = subscriber.callback;
                    if (message.address >= range.min && message.address <= range.max) {
                        callback(message);
                    }
                });
            }
        }
    }
    registerSubscriber(channelName, addressableRange, subscriberCallback) {
        const channel = this.channels.get(channelName);
        if (channel !== undefined) {
            channel.subscibers.push({
                addressableRange: addressableRange,
                callback: subscriberCallback
            });
        }
    }
}

export default Uragirimono;
//# sourceMappingURL=uragirimono.esm.js.map

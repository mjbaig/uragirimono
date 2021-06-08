class Uragirimono {
    constructor() {
        this.channels = new Map();
    }
    createWorker() {
        const process = `
            self.onmessage = function (message) {
                self.postMessage(message.data);
            }
        `;
        const func = `( () => {
                ${process.toString()}
        })();`;
        const blob = new Blob([func], { type: 'application/javascript' });
        const worker = new Worker(window.URL.createObjectURL(blob));
        worker.onmessage = (event) => {
            if (!!event) {
                const message = event.data;
                const channel = this.channels.get(message.channelName);
                if (channel !== undefined) {
                    const subscribers = channel.subscribers;
                    if (subscribers) {
                        subscribers.map(function (subscriber) {
                            subscriber.update(message);
                        });
                    }
                }
            }
        };
        return worker;
    }
    registerChannel(channelName) {
        if (!this.channels.get(channelName)) {
            this.channels.set(channelName, {
                name: channelName,
                subscribers: [],
                worker: this.createWorker()
            });
        }
    }
    destroyChannel(channelName) {
        const channel = this.channels.get(channelName);
        if (channel !== undefined) {
            channel.worker.terminate();
            this.channels.delete(channelName);
        }
    }
    send(message) {
        const channelName = message.channelName;
        if (!!channelName) {
            const channel = this.channels.get(channelName);
            if (channel !== undefined) {
                const worker = channel.worker;
                worker.postMessage(message);
            }
        }
    }
    registerSubscriber(channelName, subscriber) {
        const channel = this.channels.get(channelName);
        if (channel !== undefined) {
            channel.subscribers.push(subscriber);
        }
    }
}

export default Uragirimono;

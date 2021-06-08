var Uragirimono = /** @class */ (function () {
    function Uragirimono() {
        this.channels = new Map();
    }
    Uragirimono.prototype.createWorker = function () {
        this.process = "\n            self.onmessage = function (message) {\n                self.postMessage(message.data);\n            }\n        ";
        var func = "( () => {\n                " + this.process.toString() + "\n        })();";
        var blob = new Blob([func], { type: 'application/javascript' });
        var worker = new Worker(window.URL.createObjectURL(blob));
        worker.onmessage = function (event) {
            if (!!event) {
                var message_1 = event.data;
                var subscribers = this.channels.get(message_1.channelName).subscribers;
                if (subscribers) {
                    subscribers.map(function (subscriber) {
                        subscriber.update(message_1);
                    });
                }
            }
        }.bind(this);
        return worker;
    };
    Uragirimono.prototype.registerChannel = function (channelName) {
        if (!this.channels.get(channelName)) {
            this.channels.set(channelName, {
                name: channelName,
                subscribers: [],
                worker: this.createWorker()
            });
        }
    };
    Uragirimono.prototype.destroyChannel = function (channelName) {
        var channel = this.channels.get(channelName);
        if (!channel) {
            channel.worker.terminate();
            this.channels["delete"](channelName);
        }
    };
    Uragirimono.prototype.send = function (message) {
        var channelName = message.channelName;
        if (!!channelName) {
            var worker = this.channels.get(channelName).worker;
            worker.postMessage(message);
        }
    };
    Uragirimono.prototype.registerSubscriber = function (channelName, subscriber) {
        if (!!this.channels.get(channelName)) {
            this.channels.get(channelName).subscribers.push(subscriber);
        }
    };
    return Uragirimono;
}());

export default Uragirimono;

var Uragirimono = /** @class */ (function () {
    function Uragirimono() {
        this.channels = new Map();
        this.worker = null;
        this.process = "\n            self.onmessage = function (message) {\n                console.log(message.data);\n\n                self.postMessage(message.data);\n            }\n        ";
        this.init();
    }
    Uragirimono.prototype.init = function () {
        if (this.worker != null) {
            return;
        }
        var func = "( () => {\n                " + this.process.toString() + "\n        })();";
        console.log(func);
        var blob = new Blob([func], { type: 'application/javascript' });
        this.worker = new Worker(window.URL.createObjectURL(blob));
        this.worker.onmessage = function (event) {
            if (!!event) {
                var message_1 = event.data;
                var subscribers = this.channels.get(message_1.channel);
                if (subscribers) {
                    subscribers.map(function (subscriber) {
                        subscriber.update(message_1);
                    });
                }
            }
        }.bind(this);
    };
    Uragirimono.prototype.registerChannel = function (channel) {
        if (!this.channels.get(channel)) {
            this.channels.set(channel, []);
        }
    };
    Uragirimono.prototype.send = function (message) {
        this.worker.postMessage(message);
    };
    Uragirimono.prototype.registerSubscriber = function (channel, subscriber) {
        if (!!this.channels.get(channel)) {
            this.channels.get(channel).push(subscriber);
        }
    };
    return Uragirimono;
}());

export default Uragirimono;

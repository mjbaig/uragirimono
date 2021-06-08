import Uragirimono from './bundle.development.esm.js';

class TestSubscriber {
    update(message) {
        console.log("gottee");
    }
}

const testSubscriber = new TestSubscriber();

const t = new Uragirimono();

t.registerChannel("test");

t.registerSubscriber("test", testSubscriber);

t.send({
    channel: "test",
    payload: {"test": 0}
});
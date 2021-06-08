import Uragirimono from './bundle.development.esm.js';

class TestSubscriber {
    update(message) {
        console.log(`${JSON.stringify(message.payload)} ha`);
    }
}

class TestSubscriber2 {
    update(message) {
        console.log(`${JSON.stringify(message.payload)} gottem`);
    }
}

const testSubscriber = new TestSubscriber();
const testSubscriber2 = new TestSubscriber2();

const t = new Uragirimono();

t.registerChannel("test");

t.registerSubscriber("test", testSubscriber);
t.registerSubscriber("test", testSubscriber2);

t.registerChannel("taco");

t.registerSubscriber("taco", testSubscriber);
t.registerSubscriber("taco", testSubscriber2);

t.send({
    channelName: "test",
    payload: {"test1": 0}
});

t.send({
    channelName: "test",
    payload: {"test2": 0}
});

t.send({
    channelName: "test",
    payload: {"test3": 0}
});

t.send({
    channelName: "taco",
    payload: {"test4": 0}
});

t.send({
    channelName: "taco",
    payload: {"test5": 0}
});

t.send({
    channelName: "taco",
    payload: {"test6": 0}
});


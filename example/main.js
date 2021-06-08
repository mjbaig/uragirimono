import {uragirimono} from './bundle.development.esm.js';

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


uragirimono.registerChannel("test");

uragirimono.registerSubscriber("test", testSubscriber);
uragirimono.registerSubscriber("test", testSubscriber2);

uragirimono.registerChannel("taco");

uragirimono.registerSubscriber("taco", testSubscriber);
uragirimono.registerSubscriber("taco", testSubscriber2);

uragirimono.send({
    channelName: "test",
    payload: {"test1": 0}
});

uragirimono.send({
    channelName: "test",
    payload: {"test2": 0}
});

uragirimono.send({
    channelName: "test",
    payload: {"test3": 0}
});

uragirimono.send({
    channelName: "taco",
    payload: {"test4": 0}
});

uragirimono.send({
    channelName: "taco",
    payload: {"test5": 0}
});

uragirimono.send({
    channelName: "taco",
    payload: {"test6": 0}
});


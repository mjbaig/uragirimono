'use strict'

import Uragirimono from './bundle.development.esm.js';

const uragirimono = new Uragirimono();

var value1 = 1;

class TestSubscriber {
    update(message) {
        value1 = message.channelName;
        console.log(`${JSON.stringify(message.payload)} ha`);
    }
}

var value2 = 2;

class TestSubscriber2 {
    update(message) {
        value2 = message.channelName;
        console.log(`${JSON.stringify(message.payload)} gottem`);
    }
}

const testSubscriber = new TestSubscriber();
const testSubscriber2 = new TestSubscriber2();


uragirimono.registerChannel("test");

uragirimono.registerSubscriber("test", testSubscriber.update);
uragirimono.registerSubscriber("test", testSubscriber2.update);

uragirimono.registerChannel("taco");

uragirimono.registerSubscriber("taco", testSubscriber.update);
uragirimono.registerSubscriber("taco", testSubscriber2.update);

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

console.log(`value1: ${value1} value2: ${value2}`);
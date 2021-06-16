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

uragirimono.registerSubscriber("test", {min: 0, max: 100}, testSubscriber.update);

uragirimono.registerSubscriber("test", {min: 0, max: 100}, testSubscriber2.update);

uragirimono.send({
    channelName: "test",
    payload: {test: 0},
    address: 50
});

uragirimono.send({
    channelName: "test",
    payload: {test: 1},
    address: 50
});

uragirimono.send({
    channelName: "test",
    payload: {test: 5},
    address: 150
});
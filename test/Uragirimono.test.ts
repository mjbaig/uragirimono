import { expect } from 'chai';
import Uragirimono from '../src/Uragirimono';

const uragirimono = new Uragirimono();

var value = 0;

describe('Uragirimono tests', () => { // the tests container
    it('create new channel', () => { // the single test
        /* fps limit */
        uragirimono.registerChannel("testChannel");
        

        expect(uragirimono.channels.get("testChannel")).to.not.equal(undefined);
    });

    it('add subscriber', () => {

        uragirimono.registerSubscriber("testChannel", {min: 0, max: 100},
            () => {
                console.log("klasjdf");
                value = 1;
            });
    });

    it('send message', () => { // the single test
        /* fps limit */
        uragirimono.write({
            channelName: "testChannel",
            payload: {test: 0},
            address: 50
        });

        expect(value).to.equal(1);
    });

    it('create destroy channel', () => { // the single test
        /* fps limit */
        uragirimono.destroyChannel("testChannel");
    });
});

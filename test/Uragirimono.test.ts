import { expect } from 'chai';
import {uragirimono} from '../src/Uragirimono';

var value = 0;

describe('Uragirimono tests', () => { // the tests container
    it('create new channel', () => { // the single test
        /* fps limit */
        uragirimono.registerChannel("testChannel");
        

        expect(uragirimono.channels.get("testChannel")).to.not.equal(undefined);
    });

    it('add subscriber', () => {

        uragirimono.registerSubscriber("testChannel", {
            update() {
                console.log("klasjdf");
                value = 1;
            }
        })
    });

    it('send message', () => { // the single test
        /* fps limit */
        uragirimono.send({
            channelName: "testChannel",
            payload: {test: 0}
        });

        expect(value).to.equal(1);
    });

    it('create destroy channel', () => { // the single test
        /* fps limit */
        uragirimono.destroyChannel("testChannel");
    });
});

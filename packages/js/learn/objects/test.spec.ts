import { makeHelloMsg } from "./index";

describe('objects', () => {
    it('makeStringFromObj', () => {
            expect(makeHelloMsg({ name: "Pavel", lastName: "Kolomnikov"})).toEqual('');
    })
})
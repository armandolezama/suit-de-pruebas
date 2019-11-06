const assert = require('chai').assert;
const phoneNumber = require('../../src/phoneNumber/phoneNumber')

suite('Coonvert in phone number', () => {
    test('Case numbers', () => {
        assert.strictEqual(phoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]), "(123) 456-7890");
    })

});

const assert = require('chai').assert;
const {getSpacesPosition} = require('../../src/IterativeRotationCypher/IterativeRotationCypher');
const {delSpaces} = require('../../src/IterativeRotationCypher/IterativeRotationCypher');
const {moveByModule} = require('../../src/IterativeRotationCypher/IterativeRotationCypher');
const {moveByArray} = require('../../src/IterativeRotationCypher/IterativeRotationCypher');

suite('Iterative Rotation Cypher', () => {
    test('Get space ubication', () => {
        assert.deepEqual(getSpacesPosition('My string to be tested'), [2,9,12,15]);
    })

    test('Del space ubication', () => {
        assert.deepEqual(delSpaces('My string to be tested'), 'Mystringtobetested');
    })

    test('Move by module', ()=> {
        assert.deepEqual(moveByModule('this ', 3), 'is th' )
    })

    test('Move by array', ()=> {
        assert.deepEqual(moveByArray('this is a long string'), 'long stringthis is a ')
    })
});

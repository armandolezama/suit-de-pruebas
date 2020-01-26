const assert = require('chai').assert;
const {getSpacesPosition} = require('../../src/IterativeRotationCypher/IterativeRotationCypher');
const {delSpaces} = require('../../src/IterativeRotationCypher/IterativeRotationCypher');
const {moveByModule} = require('../../src/IterativeRotationCypher/IterativeRotationCypher');
const {moveByArray} = require('../../src/IterativeRotationCypher/IterativeRotationCypher');
const {reasignSpaces} = require('../../src/IterativeRotationCypher/IterativeRotationCypher');
const {splitAndApply} = require('../../src/IterativeRotationCypher/IterativeRotationCypher');
const {shiftNPlacesToTheRigth} = require('../../src/IterativeRotationCypher/IterativeRotationCypher');

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
        assert.deepEqual(moveByArray([...'this is a long string'], 10), 'long stringthis is a ')
    })

    test('Reasign spaces', () => {
        assert.deepEqual(reasignSpaces('Mystringtobetested', [2,9,12,15]), 'My string to be tested')
    })

    test('Split and apply', ()=> {
        assert.deepEqual(splitAndApply('My string to be tested', shiftNPlacesToTheRigth, 10), 'My ringst to be stedte')
    })
});

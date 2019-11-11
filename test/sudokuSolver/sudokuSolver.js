const assert = require('chai').assert
const {findZeroCoordinates} = require('../../src/sudokuSolver/sudokuSolver');
const {getNumbersByColumn} = require('../../src/sudokuSolver/sudokuSolver');
const {getMissingNumbers} = require('../../src/sudokuSolver/sudokuSolver');
const {getNumbersByGrid} = require('../../src/sudokuSolver/sudokuSolver');
const {setNumbersByCoordinate} = require('../../src/sudokuSolver/sudokuSolver');
const {solveSudoku} = require('../../src/sudokuSolver/sudokuSolver');

suite('Sudoku Solver', () => {
    test('Test case', () => {
        const puzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]];
        const answer = [[5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]];
        assert.deepEqual(solveSudoku(puzzle), answer);  
    })

    test('Get numbers from column', () => {
        const puzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]];
        const answer = [2,3,5,6,7,9];
        assert.deepEqual(getNumbersByColumn(puzzle, 3), answer);  
    });

    test('Get numbers from row', () => {
        const puzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]];
        const answer = [1,2,4,5,7,9];
        assert.deepEqual(getMissingNumbers(puzzle[3]), answer);  
    });

    test('Get numbers from grid', () => {
        const puzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]];
        const answer = [1,4,5,7,9];
        assert.deepEqual(getNumbersByGrid(puzzle, [3,3]), answer);  
    });

    test('Set numbers by coordinate', () => {
        const resultColumn = [2,3,5,6,7,9]
        const resultRow = [1,4,5,7,9]
        const resultGrid = [1,2,4,5,7,9]
        const answer = [5,7,9];
        assert.deepEqual(setNumbersByCoordinate(resultColumn, 
            resultRow, resultGrid), answer);  
    })

    test('get zeros Coordinates', () => {
        const puzzle = [
            [5, 3, 0],
            [6, 0, 0],
            [0, 9, 8]];
        const answer = [
            {x: 0, y: 2, rs: []}, 
            {x: 1, y: 1, rs: []}, 
            {x: 1, y: 2, rs: []}, 
            {x: 2, y: 0, rs: []}
        ];
        assert.deepEqual(findZeroCoordinates(puzzle), answer);
    })
})
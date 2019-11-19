const assert = require('chai').assert
const {buildSolution} = require('../../src/sudokuMultiSolver/sudokuMultiSolver');
const {writeValueByCoordinate} = require('../../src/sudokuMultiSolver/sudokuMultiSolver');
const {getStatus} = require('../../src/sudokuMultiSolver/sudokuMultiSolver');
const {setCounters} = require('../../src/sudokuMultiSolver/sudokuMultiSolver');
const {solveMultiSudoku} = require('../../src/sudokuMultiSolver/sudokuMultiSolver');
const {getLongestRS} = require('../../src/sudokuMultiSolver/sudokuMultiSolver');
const {excludeEqualsByRow} = require('../../src/sudokuMultiSolver/sudokuMultiSolver');
const {excludeEqualsByColumn} = require('../../src/sudokuMultiSolver/sudokuMultiSolver');
const {excludeEqualsByGrid} = require('../../src/sudokuMultiSolver/sudokuMultiSolver');

suite('Sudoku Multi Solver', () => {

    test('Get longest rs', () => {
        const allPosibleSolutions = [{
            x: 4,
            y: 8,
            counter: 1,
            rs: [1,4,8]
        },
        {
            x: 3,
            y: 2,
            counter: 0,
            rs: [3,8,9,4]
        },
        {
            x: 6,
            y: 7,
            counter: 0,
            rs: [7,9,1,4]
        }]
        const pivot = {
            x: 3,
            y: 2,
            counter: 1,
            rs: [3,8,9,4]
        }
        const emptyFirstSolution = []
        assert.deepEqual(getLongestRS(allPosibleSolutions, emptyFirstSolution), pivot);
    })

    test('Exclude equals by row', () => {
        const allPosibleSolutions = [{
            x: 4,
            y: 8,
            counter: 0,
            rs: [1,4,8]
        },
        {
            x: 3,
            y: 2,
            counter: 1,
            rs: [3,8,9]
        },
        {
            x: 3,
            y: 7,
            counter: 0,
            rs: [7,9,1]
        }]
        const pivot = {
            x: 3,
            y: 5,
            rs: [3,4]
        }
        const solution = [{
            x: 4,
            y: 8,
            counter: 0,
            rs: [1,4,8]
        },
        {
            x: 3,
            y: 2,
            counter: 1,
            rs: [8,9]
        },
        {
            x: 3,
            y: 7,
            counter: 0,
            rs: [7,9,1]
        }]
        assert.deepEqual(excludeEqualsByRow(allPosibleSolutions, pivot, 0), solution);
    })

    test('Exclude equals by Column', () => {
        const allPosibleSolutions = [{
            x: 4,
            y: 2,
            counter: 0,
            rs: [1,4,3]
        },
        {
            x: 3,
            y: 2,
            counter: 1,
            rs: [3,8,9]
        },
        {
            x: 3,
            y: 7,
            counter: 0,
            rs: [7,9,1]
        }]
        const pivot = {
            x: 3,
            y: 2,
            rs: [3,4]
        }
        const solution = [{
            x: 4,
            y: 2,
            counter: 0,
            rs: [1,4]
        },
        {
            x: 3,
            y: 2,
            counter: 1,
            rs: [8,9]
        },
        {
            x: 3,
            y: 7,
            counter: 0,
            rs: [7,9,1]
        }]
        assert.deepEqual(excludeEqualsByColumn(allPosibleSolutions, pivot, 0), solution);
    })

    test('Exclude equals by Grid', () => {
        const allPosibleSolutions = [{
            x: 6,
            y: 2,
            counter: 0,
            rs: [1,4,3]
        },
        {
            x: 3,
            y: 4,
            counter: 1,
            rs: [3,8,9]
        },
        {
            x: 6,
            y: 5,
            counter: 0,
            rs: [3,7,9,1]
        },
        {
            x: 4,
            y: 1,
            counter: 0,
            rs: [3,7,9,1]
        }]
        const pivot = {
            x: 3,
            y: 2,
            rs: [3,4]
        }
        const solution = [{
            x: 6,
            y: 2,
            counter: 0,
            rs: [1,4,3]
        },
        {
            x: 3,
            y: 4,
            counter: 1,
            rs: [3,8,9]
        },
        {
            x: 6,
            y: 5,
            counter: 0,
            rs: [3,7,9,1]
        },
        {
            x: 4,
            y: 1,
            counter: 0,
            rs: [7,9,1]
        }]
        assert.deepEqual(excludeEqualsByGrid(allPosibleSolutions, pivot, 0), solution);
    })

    test('Write value by coordinate', () => {
        const firstSolutions = [{
            x: 4,
            y: 8,
            rs: [1]
        },
        {
            x: 6,
            y: 7,
            rs: [9]
        }]
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
        const puzzleForSolutions = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 9, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]];
        assert.deepEqual(writeValueByCoordinate(firstSolutions, puzzle), puzzleForSolutions);
    })

    test('Get status of solutions. Zeros finded', () => {
        const newCoordinates = [
            {
                x: 4,
                y: 8,
                counter: 1,
                rs: [1]
            },
            {
                x: 6,
                y: 7,
                counter: 2,
                rs: [7]
            },
            {
                x: 3,
                y: 2,
                counter: 0,
                rs: []
            },
            {
                x: 6,
                y: 7,
                counter: 2,
                rs: []
            },
            {
                x: 6,
                y: 7,
                counter: 2,
                rs: [1,7,6]
            }]
        
        const status = {
            isAnyRsEqualToZero: true,
            isAnyRsBiggerThanOne: false,
            isValidSolution: false,
            runFirstLevelTest: true
        }
        assert.deepEqual(getStatus(newCoordinates), status)
    })

    test('Get status of solutions. Ones finded', () => {
        const newCoordinates = [
            {
                x: 4,
                y: 8,
                counter: 1,
                rs: [1,4,8]
            },
            {
                x: 6,
                y: 7,
                counter: 2,
                rs: [7,9,1]
            },
            {
                x: 3,
                y: 2,
                counter: 0,
                rs: [9]
            },
            {
                x: 6,
                y: 7,
                counter: 2,
                rs: [9,1]
            },
            {
                x: 6,
                y: 7,
                counter: 2,
                rs: [1]
            }]
        
        const status = {
            isAnyRsEqualToZero: false,
            isAnyRsBiggerThanOne: true,
            isValidSolution: false,
            runFirstLevelTest: true
        }
        assert.deepEqual(getStatus(newCoordinates), status)
    })
    test('Set counters. Set first as one (initialize)', () => {
        const allPosibleSolutions = [{
            x: 4,
            y: 8,
            counter: 0,
            rs: [1,4,8]
        },
        {
            x: 3,
            y: 2,
            counter: 0,
            rs: [3,8,9]
        },
        {
            x: 6,
            y: 7,
            counter: 0,
            rs: [7,9,1]
        }]
        const allPosibleSolutionsSeted = [{
            x: 4,
            y: 8,
            counter: 1,
            rs: [1,4,8]
        },
        {
            x: 3,
            y: 2,
            counter: 0,
            rs: [3,8,9]
        },
        {
            x: 6,
            y: 7,
            counter: 0,
            rs: [7,9,1]
        }]
        assert.deepEqual(setCounters(allPosibleSolutions), allPosibleSolutionsSeted)
    })
    test('Set counters. Set first as one (next digit)', () => {
        const allPosibleSolutions = [{
            x: 4,
            y: 8,
            counter: 9,
            rs: [1,4,8]
        },
        {
            x: 3,
            y: 2,
            counter: 0,
            rs: [3,8,9]
        },
        {
            x: 6,
            y: 7,
            counter: 0,
            rs: [7,9,1]
        }]
        const allPosibleSolutionsSeted = [{
            x: 4,
            y: 8,
            counter: 0,
            rs: [1,4,8]
        },
        {
            x: 3,
            y: 2,
            counter: 1,
            rs: [3,8,9]
        },
        {
            x: 6,
            y: 7,
            counter: 0,
            rs: [7,9,1]
        }]
        assert.deepEqual(setCounters(allPosibleSolutions), allPosibleSolutionsSeted)
    })

    test('Set counters. Set first as one (end)', () => {
        const allPosibleSolutions = [{
            x: 4,
            y: 8,
            counter: 9,
            rs: [1,4,8]
        },
        {
            x: 3,
            y: 2,
            counter: 9,
            rs: [3,8,9]
        },
        {
            x: 6,
            y: 7,
            counter: 9,
            rs: [7,9,1]
        }]
        const allPosibleSolutionsSeted = [{
            x: 4,
            y: 8,
            counter: 0,
            rs: [1,4,8]
        },
        {
            x: 3,
            y: 2,
            counter: 0,
            rs: [3,8,9]
        },
        {
            x: 6,
            y: 7,
            counter: 0,
            rs: [7,9,1]
        }]
        assert.deepEqual(setCounters(allPosibleSolutions), allPosibleSolutionsSeted)
    })

    // test('Multi solver single case', () => {
    //     const puzzle = [
    //         [5, 3, 0, 0, 7, 0, 0, 0, 0],
    //         [6, 0, 0, 1, 9, 5, 0, 0, 0],
    //         [0, 9, 8, 0, 0, 0, 0, 6, 0],
    //         [8, 0, 0, 0, 6, 0, 0, 0, 3],
    //         [4, 0, 0, 8, 0, 3, 0, 0, 1],
    //         [7, 0, 0, 0, 2, 0, 0, 0, 6],
    //         [0, 6, 0, 0, 0, 0, 2, 8, 0],
    //         [0, 0, 0, 4, 1, 9, 0, 0, 5],
    //         [0, 0, 0, 0, 8, 0, 0, 7, 9]];
    //     const answer = [[
    //         [5, 3, 4, 6, 7, 8, 9, 1, 2],
    //         [6, 7, 2, 1, 9, 5, 3, 4, 8],
    //         [1, 9, 8, 3, 4, 2, 5, 6, 7],
    //         [8, 5, 9, 7, 6, 1, 4, 2, 3],
    //         [4, 2, 6, 8, 5, 3, 7, 9, 1],
    //         [7, 1, 3, 9, 2, 4, 8, 5, 6],
    //         [9, 6, 1, 5, 3, 7, 2, 8, 4],
    //         [2, 8, 7, 4, 1, 9, 6, 3, 5],
    //         [3, 4, 5, 2, 8, 6, 1, 7, 9]]];
    //     assert.deepEqual(solveMultiSudoku(puzzle), answer);  
    // })

    // test('Multi solver multi case', () => {
    //     const puzzle = [
    //         [5, 3, 0, 0, 7, 0, 0, 0, 0],
    //         [6, 0, 0, 1, 9, 5, 0, 0, 0],
    //         [0, 9, 8, 0, 0, 0, 0, 6, 0],
    //         [8, 0, 0, 0, 6, 0, 0, 0, 3],
    //         [4, 0, 0, 8, 0, 3, 0, 0, 1],
    //         [7, 0, 0, 0, 2, 0, 0, 0, 6],
    //         [0, 6, 0, 0, 0, 0, 2, 0, 0],
    //         [0, 0, 0, 4, 1, 9, 0, 0, 5],
    //         [0, 0, 0, 0, 8, 0, 0, 7, 9]];
    //     const answer = [[
    //         [5, 3, 2, 6, 7, 8, 9, 1, 4],
    //         [6, 7, 4, 1, 9, 5, 3, 8, 2],
    //         [1, 9, 8, 3, 4, 2, 5, 6, 7],
    //         [8, 5, 9, 7, 6, 1, 4, 2, 3],
    //         [4, 2, 6, 8, 5, 3, 7, 9, 1],
    //         [7, 1, 3, 9, 2, 4, 8, 5, 6],
    //         [9, 6, 1, 5, 3, 7, 2, 4, 8],
    //         [2, 8, 7, 4, 1, 9, 6, 3, 5],
    //         [3, 4, 5, 2, 8, 6, 1, 7, 9]
    //     ],
    //     [
    //         [5, 3, 4, 6, 7, 8, 9, 1, 2],
    //         [6, 7, 2, 1, 9, 5, 3, 4, 8],
    //         [1, 9, 8, 3, 4, 2, 5, 6, 7],
    //         [8, 5, 9, 7, 6, 1, 4, 2, 3],
    //         [4, 2, 6, 8, 5, 3, 7, 9, 1],
    //         [7, 1, 3, 9, 2, 4, 8, 5, 6],
    //         [9, 6, 1, 5, 3, 7, 2, 8, 4],
    //         [2, 8, 7, 4, 1, 9, 6, 3, 5],
    //         [3, 4, 5, 2, 8, 6, 1, 7, 9]
    //     ],
    //     [
    //         [5, 3, 4, 6, 7, 8, 9, 1, 2],
    //         [6, 7, 2, 1, 9, 5, 3, 8, 4],
    //         [1, 9, 8, 3, 4, 2, 5, 6, 7],
    //         [8, 5, 9, 7, 6, 1, 4, 2, 3],
    //         [4, 2, 6, 8, 5, 3, 7, 9, 1],
    //         [7, 1, 3, 9, 2, 4, 8, 5, 6],
    //         [9, 6, 1, 5, 3, 7, 2, 4, 8],
    //         [2, 8, 7, 4, 1, 9, 6, 3, 5],
    //         [3, 4, 5, 2, 8, 6, 1, 7, 9]
    //     ]
    // ];
    //     assert.deepEqual(solveMultiSudoku(puzzle), answer);  
    // })
})
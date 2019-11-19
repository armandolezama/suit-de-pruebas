const {getNumbersByColumn} = require('../sudokuSolver/sudokuSolver');
const {getMissingNumbers} = require('../sudokuSolver/sudokuSolver');
const {getNumbersByGrid} = require('../sudokuSolver/sudokuSolver');
const {setNumbersByCoordinate} = require('../sudokuSolver/sudokuSolver');
const evaluateSudoku = require('../../src/sudoku/sudoku')

const findZeroCoordinates = array => {
    let zeroCoordinates = [];
    for(const row in array){
        for(const column in array[row]) {
            if (array[row][column] === 0) zeroCoordinates.push({
                x: Number(row), 
                y: Number(column),
                counter: 0,
                rs: []
            })
        }
    }
    for(const element of zeroCoordinates){
        element.rs = setNumbersByCoordinate(getNumbersByColumn(array, element.y), getMissingNumbers(array[element.x]), getNumbersByGrid(array, [element.x,element.y]))
    }

    return zeroCoordinates;
}

const getLongestRS = allSolutions => {
    let pivot  = {
        rs: []
    }
    for(const solution in allSolutions){
        if(allSolutions[solution].rs.length > pivot.rs.length){
            pivot = allSolutions[solution]
            pivot.counter = parseInt(solution)
        }
    }
    return pivot
}

const organizeSolutions = (array, pivot) => [...array.slice(0, pivot.counter), ...array.slice(pivot.counter, array.length - 1)]

const excludeEqualsByRow = (arrayOfSolutions, pivot, currentValue) => {
    for(const solution of arrayOfSolutions){
        if(pivot.x === solution.x){
            solution.rs = solution.rs.filter(possibleValues => possibleValues !== pivot.rs[currentValue] )
        }
    }
    return arrayOfSolutions
}

const excludeEqualsByColumn = (arrayOfSolutions, pivot, currentValue) => {
    for(const solution of arrayOfSolutions){
        if(pivot.y === solution.y){
            solution.rs = solution.rs.filter(possibleValues => possibleValues !== pivot.rs[currentValue] )
        }
    }
    return arrayOfSolutions
}

const getGridCoordinate = axis => {
    switch(true){
        case axis < 3:
        return 1
        case axis < 6:
        return 2
        case axis < 9:
        return 3
    }
}

const excludeEqualsByGrid = (arrayOfSolutions, pivot, currentValue) => {
    for(const solution of arrayOfSolutions){
        if(getGridCoordinate(pivot.x) === getGridCoordinate(solution.x) && getGridCoordinate(pivot.y) === getGridCoordinate(solution.y)){
            solution.rs = solution.rs.filter(possibleValues => possibleValues !== pivot.rs[currentValue])
        }
    }
    return arrayOfSolutions
}

const buildSolution = (totalArray, pivot, index) => {
    totalArray = organizeSolutions(totalArray, pivot)
    excludeEqualsByRow(totalArray, pivot, index)
    excludeEqualsByColumn(totalArray, pivot, index)
    excludeEqualsByGrid(totalArray, pivot, index)
    return totalArray
}

const getStatus = (newCoordinates) => {
    let index = 0;
    let status = {
        isAnyRsEqualToZero: false,
        isAnyRsBiggerThanOne: false,
        isValidSolution: false,
        runFirstLevelTest: true
    }
    do{
        if(newCoordinates[index].rs.length > 1){
            status.isAnyRsBiggerThanOne = true
        }
        if(newCoordinates[index].rs.length === 0){
            status.isAnyRsEqualToZero = true
        }
        index++
    } while (!status.isAnyRsEqualToZero && !status.isAnyRsBiggerThanOne && index < newCoordinates.length)
    return status
}

const reduceToOneSolution = () => {
    let status = Object
    for(const index in pivot.rs){
        totalArray = buildSolution(totalArray, pivot, index)
        status = getStatus(totalArray)
    }

}

const writeValueByCoordinate = (firstSolutions, puzzle) => {
    for(const element of firstSolutions){
        if(element.rs.length === 1){
            puzzle[element.x][element.y] = element.rs[0]
        }
    }
    return puzzle
}


const setCounters = array => {
    let index = 0
    do{
        if(array[index].counter < array[index].rs.length){
            array[index].counter++
            index = array.length
        } else if(array[index].counter >= array[index].rs.length){
            array[index].counter = 0
        }
        index++
    } while(index < array.length )
    return array
}


const solveSudokuTest = (array) => {
    
    let counter = findZeroCoordinates(array).length
    for(let i = 0; i < counter; i++){
        let coordinatesAndResolutions = findZeroCoordinates(array)
        if(coordinatesAndResolutions.length === 0){
            return array
        }
        for(const element of coordinatesAndResolutions){
            element.rs = setNumbersByCoordinate(getNumbersByColumn(array, element.y), getMissingNumbers(array[element.x]), getNumbersByGrid(array, [element.x,element.y]))
            if(element.rs.length === 1){
                array[element.x][element.y] = element.rs[0]
            }
        }
    }
    return array
}

const solveMultiSudoku = (array) => {
    let allPossibleSolutions = findZeroCoordinates(array)
    let pivot = getLongestRS(allPossibleSolutions)
    let solutions = []
    
    

    // return {status, puzzleForTestSolution}
    return solutions
}

module.exports = {
    solveSudokuTest, 
    buildSolution, 
    writeValueByCoordinate,
    getStatus,
    setCounters,
    solveMultiSudoku,
    getLongestRS,
    excludeEqualsByRow,
    excludeEqualsByColumn,
    excludeEqualsByGrid}
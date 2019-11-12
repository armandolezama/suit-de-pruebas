const {getNumbersByColumn} = require('../sudokuSolver/sudokuSolver');
const {getMissingNumbers} = require('../sudokuSolver/sudokuSolver');
const {getNumbersByGrid} = require('../sudokuSolver/sudokuSolver');
const {setNumbersByCoordinate} = require('../sudokuSolver/sudokuSolver');
const evaluateSudoku = require('../../src/sudoku/sudoku')

const buildSolution = (totalArray, individualArray) => {
    for(const element of totalArray){
        if(element.counter > 0){
            individualArray.push(
                {
                    x: element.x, 
                    y: element.y,
                    rs: element.rs[element.counter - 1]})
        }
    }
    return individualArray
}

const writeValueByCoordinate = (firstSolutions, puzzle) => {
    for(const element of firstSolutions){
        if(element.rs.length === 1){
            puzzle[element.x][element.y] = element.rs[0]
        }
    }
    return puzzle
}


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


const getStatus = (newCoordinates) => {
    let index = 0;
    let status = {
        findAZero: false,
        findAOne: false,
        isUnsolved: true,
        runFirstLevelTest: true
    }
    do{
        if(newCoordinates[index].rs.length === 1){
            status.findAOne = true
        } else if(newCoordinates[index].rs.length === 0){
            status.findAZero = true
            status.findAOne = false
        } 
        index++
    } while (!status.findAOne && !status.findAZero && index < newCoordinates.length)

    return status
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
    let allPossibleSolutions = setCounters(findZeroCoordinates(array))
    let firstSolutions = buildSolution(allPossibleSolutions, [])
    let puzzleForSolutions = writeValueByCoordinate(firstSolutions, array)
    let newCoordinates = findZeroCoordinates(puzzleForSolutions)
    let status = getStatus(newCoordinates)
    let puzzleForTestSolution = array
    let solutions = []
    do{
        if(status.findAZero){
            allPossibleSolutions = setCounters(allPossibleSolutions)
            status.findAZero = false
            firstSolutions = buildSolution(allPossibleSolutions, [])
            puzzleForSolutions = writeValueByCoordinate(firstSolutions, array)
            newCoordinates = findZeroCoordinates(puzzleForSolutions)
            if(newCoordinates.length === 0){
                status.runFirstLevelTest = false
            } else {
                status = getStatus(newCoordinates)
            }
        } else if(status.findAOne){
            puzzleForTestSolution = writeValueByCoordinate(newCoordinates, puzzleForSolutions)
            newCoordinates = findZeroCoordinates(puzzleForTestSolution)
            if(evaluateSudoku(puzzleForTestSolution) && newCoordinates.length == 0){
                status.isUnsolved = false
                solutions.push(puzzleForTestSolution)
                status.findAOne = false
                status.findAZero = true
            } else {
                status = getStatus(newCoordinates)
            }
        }
        
    if(firstSolutions.length === 0){status.runFirstLevelTest = false}
    } while(status.runFirstLevelTest)

    console.log(status)
    // return {status, puzzleForTestSolution}
    return puzzleForSolutions
}

module.exports = {
    solveSudokuTest, 
    buildSolution, 
    writeValueByCoordinate,
    getStatus,
    setCounters,
    solveMultiSudoku}
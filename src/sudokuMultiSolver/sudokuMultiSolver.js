const {getNumbersByColumn} = require('../sudokuSolver/sudokuSolver');
const {getMissingNumbers} = require('../sudokuSolver/sudokuSolver');
const {getNumbersByGrid} = require('../sudokuSolver/sudokuSolver');
const {setNumbersByCoordinate} = require('../sudokuSolver/sudokuSolver');

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
        puzzle[element.x][element.y] = element.rs
    }
    return puzzle
}


const findZeroCoordinates = (array) => {
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

    return zeroCoordinates;
}


const getStatus = (newCoordinates) => {
    let index = 0;
    let status = {
        findAZero: false,
        findAOne: false,
        runFirstLevelTest: false,
        runSecondLevelTest: false
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

const solveMultiSudoku = () => {}

module.exports = {
    solveSudokuTest, 
    buildSolution, 
    writeValueByCoordinate,
    getStatus,
    setCounters}
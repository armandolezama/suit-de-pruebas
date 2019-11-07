const getMissingNumbers = arrayFromPuzzle => [1,2,3,4,5,6,7,8,9].filter(numberRequired => !arrayFromPuzzle.includes(numberRequired));

const getRowsByGrid = (array, gridRow) => array.slice(gridRow - 3, gridRow);

const getOneGrid = (array, gridCol) => array.reduce((newGrid, gridRow) => newGrid = [...newGrid, ...gridRow.slice(gridCol -3, gridCol)], []);

// @todo Encapsular switch con reduce
const getNumbersByGrid = (array, coordinates) => {
    let gridToWork = [];
    switch(true){
        case coordinates[0] < 3:
        gridToWork = getRowsByGrid(array, 3)
        break
        case coordinates[0] < 6:
        gridToWork = getRowsByGrid(array, 6)
        break
        case coordinates[0] < 9:
        gridToWork = getRowsByGrid(array, 9)
        break
    }
    
    switch(true){
        case coordinates[1] < 3:
        gridToWork = getOneGrid(gridToWork, 3)
        break
        case coordinates[1] < 6:
        gridToWork = getOneGrid(gridToWork, 6)
        break
        case coordinates[1] < 9:
        gridToWork = getOneGrid(gridToWork, 9)
        break
    }
    
    return getMissingNumbers(gridToWork)
}

const getNumbersByRow = (array, row) => {
    return getMissingNumbers(array[row])
}

const getNumbersByColumn = (array, column) => {
    let numberGetted = [];
        for(const row of array){
            numberGetted.push(row[column]);
        }
    return getMissingNumbers(numberGetted);
}

const findZeroCoordinates = (array) => {
    let zeroCoordinates = [];
    for(const row in array){
        for(const column in array[row]) {
            if (array[row][column] === 0) zeroCoordinates.push({
                x: Number(row), 
                y: Number(column),
                rs: []
            })
        }
    }

    return zeroCoordinates;
}

const setNumbersByCoordinate = (resultColumn, resultRow, resultGrid) => {
    let array = resultColumn.filter(value => resultRow.includes(value))
    array = array.filter(value => resultGrid.includes(value))
    return array
}

const substituteValue = (array, objectValues) => {
    array[objectValues.x][objectValues.y] = objectValues.rs[0]
    return array
}


const solveSudoku = (array) => {
    
    let counter = findZeroCoordinates(array).length
    for(let i = 0; i < counter; i++){
        let coordinatesAndResolutions = findZeroCoordinates(array)
        if(coordinatesAndResolutions.length === 0){
            return array
        }
        for(const element of coordinatesAndResolutions){
            let columnNumbers = getNumbersByColumn(array, element.y)
            let rowNumbers = getNumbersByRow(array, element.x)
            let gridNumbers = getNumbersByGrid(array, [element.x,element.y])
    
            element.rs = setNumbersByCoordinate(columnNumbers, rowNumbers, gridNumbers)
            
            if(element.rs.length === 1){
                array = substituteValue(array, element)
            }
        }
    }
    return array
    
}

module.exports = {
    findZeroCoordinates,
    getNumbersByColumn,
    getNumbersByRow,
    getNumbersByGrid,
    setNumbersByCoordinate,
    solveSudoku
}
const getMissingNumbers = arrayFromPuzzle => [1,2,3,4,5,6,7,8,9].filter(numberRequired => !arrayFromPuzzle.includes(numberRequired));

const getRowsByGrid = (array, gridRow) => array.slice(gridRow - 3, gridRow);

const getOneGrid = (array, gridCol) => array.reduce((newGrid, gridRow) => newGrid = [...newGrid, ...gridRow.slice(gridCol -3, gridCol)], []);

const getProtoGrid = (array, coordinate, gridOperation) => array.reduce( gridToWork => {
        switch(true){
            case coordinate < 3:
            gridToWork = gridOperation(array, 3)
            break
            case coordinate < 6:
            gridToWork = gridOperation(array, 6)
            break
            case coordinate < 9:
            gridToWork = gridOperation(array, 9)
            break
        }
        return gridToWork
    }, [])


// @todo Encapsular switch con reduce
const getNumbersByGrid = (array, coordinates) => getMissingNumbers(getProtoGrid(getProtoGrid(array, coordinates[0], getRowsByGrid), coordinates[1], getOneGrid))


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

const setNumbersByCoordinate = (resultColumn, resultRow, resultGrid) => resultColumn.filter(value => resultRow.includes(value)).filter(value => resultGrid.includes(value))


const solveSudoku = (array) => {
    
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

module.exports = {
    findZeroCoordinates,
    getNumbersByColumn,
    getNumbersByGrid,
    getMissingNumbers,
    setNumbersByCoordinate,
    solveSudoku
}
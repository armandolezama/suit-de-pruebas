
const exploreArray = (minorArray) => { 
    const arraySet = new Set(minorArray)
    if(minorArray.length !== arraySet.size){
        return "Is a invalid case"
    }

    return "";
}

const exploreColumn = (array) => {
    let compareArray = [];
    let validCase = "";

    for(const column in array){
        for(const row in array[column]){
            compareArray.push(array[row][column]);
        }
        validCase = exploreArray(compareArray);
        compareArray = [];
        if([...validCase].length > 0 ){
            return validCase
        }
    }

    return "";

}

const exploreRow = (array) => {
    let validCase = "";

    for(const element of array){
        validCase = exploreArray(element)

        if([...validCase].length > 0 ){
            console.log('exploreRow')
            return validCase
        }
    }

    return "";
}


const getRowsByGrid = (array, gridRow) => {
    let newArray = array.slice(gridRow - 3, gridRow)
    return newArray
}

const getOneGrid = (array, gridCol) => {
    let newGrid = []
    for(const gridRow of array){
        newGrid = [...newGrid, ...gridRow.slice(gridCol -3, gridCol)]
    }
    return newGrid
}


const exploreGrid = (array) => {
    let grids = [];
    for(let gridColumn = 0; gridColumn < 4; gridColumn++){
        for(let gridRow = 0; gridRow < 4; gridRow++){
            grids.push(getOneGrid(getRowsByGrid(array, 3 * gridRow) , 3 * gridColumn));
        }
        validCase = exploreArray(grids);
        if([...validCase].length > 0 ){
            return validCase
        }
    }
    return ""
}

const evaluateSudoku = (array) => {
    let validCase = "";
    validCase = exploreColumn(array);
    if([...validCase].length > 0 ){
        return false
    }
    validCase = exploreRow(array);
    if([...validCase].length > 0 ){
        return false
    }

    validCase = exploreGrid(array)
    if([...validCase].length > 0 ){
        return validCase
    } else {
        return true
    }
}

module.exports = evaluateSudoku;
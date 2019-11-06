
const exploreArray = (minorArray) => { 
    const arraySet = new Set(minorArray)
    if(minorArray.length !== arraySet.size){
        return "Is a invalid case"
    }
}

const exploreColumn = (array) => {
    let compareArray = [];
    let validCase = "";

    for(const index in array){
        column = index
        for(const row of array[column]){
            compareArray.push(array[row][column]);
        }
        validCase = exploreArray(compareArray)
        if([...validCase].length > 0 ){
            return validCase
        }
    }

}

const exploreRow = (array) => {
    let validCase = "";

    for(const element of array){
        validCase = exploreArray(element)

        if([...validCase].length > 0 ){
            return validCase
        }
    }

    return validCase;
}

const startByRow = (array, stack) => {
    
}

const exploreGrid = (array) => {

    array.slice(0, 2)
    array.slice(3, 5)
    array.slice(6, 8)

}

const evaluateSudoku = (array) => {
    let validCase = "";
    validCase = exploreColumn(array);
    if([...validCase].length > 0 ){
        return validCase
    }
    validCase = exploreRow(array);
    if([...validCase].length > 0 ){
        return validCase
    }
}

module.export = evaluateSudoku;
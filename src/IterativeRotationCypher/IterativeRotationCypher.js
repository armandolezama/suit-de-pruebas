
const getSpacesPosition = string => {
    let positions = []
    for(const index in [...string]) {
        if ([...string][index] === " ") positions.push(parseInt(index));
    }
    return positions
}

const delSpaces = string => string.replace(/ /g, '');

const shiftTenPlacesToTheRigth = string => {
    if([...string].length <= 10){

    } else {
        
    }
}

const myString = `this is
        my newline character`

module.exports = {getSpacesPosition, delSpaces}
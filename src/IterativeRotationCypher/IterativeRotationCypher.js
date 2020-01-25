
const getSpacesPosition = string => {
    let positions = []
    for(const index in [...string]) {
        if ([...string][index] === " ") {
            positions = [...positions, parseInt(index)]
            };
    }
    return positions
}

const delSpaces = string => string.replace(/ /g, '');

const moveByArray = myLongArray => {
    myLongArray = [...myLongArray]
    const mayorArray = [];
    iteration = 0;
    while (myLongArray.length > 10) {
        mayorArray[iteration] = myLongArray.splice(0 ,10);
        iteration++
    }
    if(myLongArray.length > 0){
        mayorArray[iteration] = myLongArray;
    };
    const myNewString = [...mayorArray.slice(1, mayorArray.length).join('')];

    return [...myNewString.filter(letter => letter !== ','),...mayorArray[0].join('') ].join('')
}

const moveByModule = (string, numberModule) => {
    const startPosition = string.length - numberModule;
    const finalPosition = string.length
    return [...string.slice(startPosition, finalPosition), ...string.slice(0, startPosition)].join('');
}

const shiftTenPlacesToTheRigth = string => {
    if([...string].length <= 10){
        return moveByModule(string, 10 % string.length)
    } else {
        return moveByArray(string)
    }
}

// const longString = `This
// is
// a
// long
// string`

// Array.from(longString).join(' ').toString()

// const myBigArray = [['string'],['and other']]

// const myString = myBigArray.join()

// [...myString].filter(letter => letter !== ',').join('')

module.exports = {getSpacesPosition, delSpaces, moveByModule, shiftTenPlacesToTheRigth, moveByArray}
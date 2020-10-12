
const getSpacesPosition = string => {
    let positions = []
    for(const index in [...string]) {
        if ([...string][index] === " ") {
            positions = [...positions, parseInt(index)]
            };
    };
    return positions
};

const delSpaces = string => string.replace(/ /g, '');

const shiftNPlacesToTheRight = (string, n) => {
    if([...string].length <= n){
        return moveByModule(string, n % string.length)
    } else {
        return moveByArray([...string], n)
    }
}

const moveByModule = (string, numberModule) => {
    const startPosition = string.length - numberModule;
    const finalPosition = string.length
    return [...string.slice(startPosition, finalPosition), ...string.slice(0, startPosition)].join('');
};

const moveByArray = (myLongArray, n) => {
    const mayorArray = [];
    iteration = 0;
    while (myLongArray.length > n) {
        mayorArray[iteration] = myLongArray.splice(0 ,n);
        iteration++
    }
    if(myLongArray.length > 0){
        mayorArray[iteration] = myLongArray;
    };

    return [...[...mayorArray.slice(1, mayorArray.length).join('')].filter(letter => letter !== ','),...mayorArray[0].join('') ].join('')
};

const reasignSpaces = (string, positions) => {
    string = [...string]
    for(const position of positions){
        string.splice(position, 0, ' ')
    }
    return string.join('')
}

const splitAndApply = (string, apply, n) => {
    string = string.split(' ');
    for(const word in string){
        string[word] = apply(string[word], n);
    };
    return string.join(' ');
};

const IterativeRotationCipher = {
    encode: (n,str) => {
        while (n > 0) {
            let zeroPositions = [];
            for(const index in [...str]) {
                if ([...str][index] === " ") {
                    positions = [...positions, parseInt(index)]
                    };
            };
            str.replace(/ /g, '');
             if([...str].length <= n){
                return moveByModule(str, n % str.length)
            } else {
                return moveByArray([...str], n)
            };
            str = reasignSpaces(str, zeroPositions);
            str = splitAndApply(str, shiftNPlacesToTheRight, n);
            n - 1
        };
        return str;
    },
    decode: () => {

    }
}

module.exports = {getSpacesPosition, 
delSpaces, 
moveByModule, 
shiftNPlacesToTheRight, 
moveByArray, 
reasignSpaces, splitAndApply}
makeAllCaps(['cucumber', 'tomatos', 'avocado'])
    .then(sortWords)
    .then((result) => console.log(result))
    .catch(error => console.log(error))

makeAllCaps(['cucumber', 44, true])
    .then(sortWords)
    .then((result) => console.log(result))
    .catch(error => console.log(error))

function makeAllCaps(arr) {
    return new Promise((resolve, reject) => {
        if (arr.every(item => typeof item === 'string')) {
            resolve(arr.map(item => item.toUpperCase()));
        } else {
            reject('Array contains non-string elements');
        }
    });
}

function sortWords(arr) {
    return new Promise((resolve, reject) => {
        if (arr.length > 0) {
            resolve(arr.sort());
        } else {
            reject('Array is empty');
        }
    });
}
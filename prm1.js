compareToTen(15)
    .then(result => console.log(result)) // Should Print: 15 is Valid
    .catch(error => console.log(error))

compareToTen(8)
    .then(result => console.log(result))
    .catch(error => console.log(error)) // Should Print: 8 is too small

function compareToTen(num) {
    return new Promise((resolve, reject) => {
        if (num > 10) {
            resolve(num + " is Valid");
        } else {
            reject(num + " is too small");
        }
    });
}
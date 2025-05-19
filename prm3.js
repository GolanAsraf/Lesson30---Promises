function add(prmX, prmY) {
    return Promise.all([prmX, prmY])
        .then(values => {
            return values[0] + values[1]
        })
}

// `fetchX()` should return a promise that is resolved to 25 immediately
function fetchX() {
    return new Promise((resolve) => {
        resolve(25)
    })
}
// `fetchY()` should return a promise that is resolved after 2 seconds to 17
function fetchY() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(17)
        }, 2000)
    })
}

add(fetchX(), fetchY())
    .then(sum => {
        console.log(sum)
    })
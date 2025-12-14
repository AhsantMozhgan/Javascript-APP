// let message = function() {
//     console.log('Welcome')
// }
// message()


// let userId = function(id) {
//     console.log(id)
// }
// userId(5)        // 5
// userId(2)        // 2

let userId = function(id) {
    let res = 'User ID is: ' + id
    return res
}

let showResult = userId(10)
console.log(showResult)
// let sum = function(num1, num2, num3) {
//     let res = num1 + num2 + num3
//     return res
// }

// let showResult = sum(2, 3, 4)
// console.log(showResult)     // 9

let getUserInfo = function(name = 'Test', id = 2) {
    return 'Name: ' + name + ' ' + 'ID: ' + id 
}

let showResult = getUserInfo('Mozhan', 22)
// Does not return default values
console.log(showResult)     // Name: Mozhan ID: 22
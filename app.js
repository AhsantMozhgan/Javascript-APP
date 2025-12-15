// let isUser = true
// isUser = false
// console.log(isUser) //false

// const isUser = true
// isUser = false
// console.log(isUser) // TypeError: Assignment to constant variable.

//OR
// const userInfo = {
//     id: 2
// }
// userInfo = {
//     id: 21
// }
// console.log(userInfo)   //TypeError: Assignment to constant variable.

// Correct code
//shows that a const object’s properties can still be changed.
const userInfo = {
    id: 2
}
userInfo.id = 3
console.log(userInfo.id)    //3
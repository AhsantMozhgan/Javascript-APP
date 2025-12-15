// let num = 12.293

// let res = num.toFixed(2)
// let res1 = num.toFixed(5)
// console.log(res)    //12.29
// console.log(res1)    //12.29300

// console.log(Math.round(num))    //12
// console.log(Math.floor(num))    //12
// console.log(Math.ceil(num))     //13

// let randomNum = Math.random()
// console.log(randomNum)  //0.31690170094571646

// generate a random integer that is greater than or equal to num1 and less than num2.
let num1 = 10
let num2 = 20
// let randomNum = Math.random() * (num2 - num1)
// console.log(randomNum)  //9.13642468653013

// let randomNum = Math.floor(Math.random() * (num2 - num1))
// console.log(randomNum)  //4

let randomNum = Math.floor(Math.random() * (num2 - num1)) + num1
console.log(randomNum)  //12
// let age = 12
// if (age > 20) {
//     console.log('Is Young!')
// }

// if (age < 20) {
//     console.log('Is Child!')
// }

// // If statement
// let validEmail = true
// let validPasword = false
// if (validEmail && validPasword) {
//     console.log('Logged in')
// } else if (validEmail || validPasword) {
//     console.log('Is correct')
// }

let isUser = false
let userRole = 'admin'

if (isUser) {
    console.log('Welcome User!')
} else if (userRole === 'admin') {
    console.log('Welcome Admin!')       // Welcome Admin!
} else {
    console.log('Welcome!')
}
// This code defines a password validation function.
// Write a JavaScript function named `isValidPassword` that:
// - Takes one parameter: `password`.  
// - Returns `true` only if:
//   - The password length is greater than 8 characters, and  
//   - The password does NOT contain the substring `"12345"`.  
// - Otherwise, it returns `false`.



let isValidPassword = function(password) {
    if (password.length > 8 && !password.includes('12345')) {
        return true
    } else {
        return false
    }  
}

console.log(isValidPassword('abcd12345'))   //false
console.log(isValidPassword('abcd12'))      //false
console.log(isValidPassword('abcdabcd22'))  //true
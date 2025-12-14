let firstName = 'Mozhgan'

if (true) {
    let lastName = 'Ahsant'
    console.log(lastName)       // Ahsant
    if (true) {
        let age = 30
        console.log(age)
    }
}

// console.log(lastName)       // ReferenceError: lastName is not defined
console.log(firstName)      // Mozhgan


let name = 'Test1'

if (true) {
    let name = 'Test2'
    if (true) {
        let name = 'Test3'      // Test3
        console.log(name)
    }
}
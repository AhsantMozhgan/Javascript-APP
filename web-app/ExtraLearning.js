
// arrow-function
// const productName = (title) => {
//     return title
// }
// Why this full syntax with parentheses and curly braces?
// → Explicit: clearly shows parameter list and return statement
// → Useful when function has multiple lines or needs more logic later

//or
// const productName = title => title
// Why this shorter syntax?
// → Arrow function implicit return: single expression → no need for {} or return keyword
// → Very concise & common in modern JS (especially for simple transformations)
// → Preferred when function is one-liner and immediately used

// console.log(productName('Book'))
// → Would output: 'Book'
// Why test like this?
// → Quick way to verify function works as expected

const productName = [{
    title: 'Book1',
    exist: true
}, {
    title: 'Book2',
    exist: false
}, {
    title: 'Book3',
    exist: true
}]
// Why named productName (array of objects)?
// → Descriptive name → clearly shows it contains product data
// → In real app, better name would be products or productList
// → Each item has title & exist properties → ready for filtering

// const filteredProducts = products.filter((item) => {
// return item.exist == true
// })
// Why this full syntax with parentheses and curly braces?
// → Explicit: clearly shows parameter and return
// → Useful for multi-line filters or when adding more conditions later
// → == true is redundant (item.exist is boolean) → item.exist is cleaner

//or
const filteredProducts = productName.filter(item => item.exist == true)
// Why this shorter syntax?
// → Arrow function with implicit return → very concise & readable
// → item => ... is most common pattern in modern JavaScript
// → item.exist == true → works but better as item.exist (boolean directly)
// → filter() returns new array containing only items where callback returns true

console.log(filteredProducts)
// → Expected output: array with two items (Book1 and Book3)
//   [{title: 'Book1', exist: true}, {title: 'Book3', exist: true}]
// Why console.log here?
// → Quick way to verify filtering worked as expected
// → Shows only products where exist === true



// arrow-function-deference
// const product = {
//     title: 'Book',
//     productName: function() {
//         return `Product Name: ${this.title}`
//     }
// }
// console.log(product.productName())   // → "Product Name: Book"

// Why does this work correctly?
// → Regular function (function() { ... }) has its own this
// → When called as product.productName(), this is bound to the product object
// → this.title correctly refers to 'Book'
// → Classic and reliable way to write object methods in JavaScript

// //error: (Product Name: undefined)
// //arrow-function-deference
// const product = {
//     title: 'Book',
//     productName: () => {
//         return `Product Name: ${this.title}`
//     }
// }
// console.log(product.productName())  // → "Product Name: undefined"

// Why does this print "undefined" instead of "Book"?
// → Arrow functions do NOT have their own this
// → Arrow functions inherit this from the surrounding (lexical) scope
// → Here, surrounding scope is global/window → this.title is undefined
// → Arrow functions are NOT suitable for object methods when you need this to refer to the object

//error: (Product Name: undefined)
//arrow-function-deference
const product = {
    title: 'Book',
    productName() {
        return `Product Name: ${this.title}`
    }
}
console.log(product.productName())  // → "Product Name: Book"

// Why does this work correctly (modern syntax)?
// → Shorthand method syntax (ES6+): productName() { ... }
// → Equivalent to productName: function() { ... }
// → Regular function → own this → bound to product object when called
// → this.title correctly accesses 'Book'
// → Recommended modern way to write object methods
// → Clean, concise, no arrow function pitfalls with this

//if-short-syntax
const price = 79
// let message = ''
// if(price > 59) {
//     message = 'HasDiscount!'
// } else {
//     message = 'Has Not Discount!'
// }

//OR
const message = price > 59 ? 'Has Discount' : 'Has Not Discount!'
console.log(message)


// error-handling
// let number = '2'
// console.log (typeof number)     // string

let number = () => {
    return 20
}
console.log (typeof number)     // function

/////
const getPrice = (amount) => {
    if (typeof amount === 'number') {
        return amount
    } else {
        throw Error('Amount must be a number')
    }
}
console.log(getPrice('20'))

/////
try {
    const number = 2
    console.log(number)
} catch (e) {
    console.log('Error')
}

// constructor-function
// const User = {
//     id: 2,
//     email: 'sadri.masood@gmail.com',
//     userInfo: function () {
//         return 'ID: ${this.id} - Email: ${this.email}'
//     }
// }
// Why this object literal works?
// → Simple object with properties and method
// → this refers to the object itself when called as User.userInfo()
// → But you can only have ONE instance → not reusable for multiple users

// const User = function() {
//     this.email = 'sadri.masood@gmail.com'
// }
// // const username = User()      // → undefined (or window.email in non-strict mode)
// const username = new User()     // → User {}
// console.log(username)         // → User { email: 'sadri.masood@gmail.com' }

// Why does new User() create an object?
// → When you call a function with new:
//   1. A new empty object is created {}
//   2. this is bound to that new object
//   3. The function body runs → adds properties to this
//   4. The new object is automatically returned
// → Without new → this is global/window → bad side effects (pollutes global scope)
// → That's why User() returns undefined (no explicit return)

//Dynamic
const User = function(email) {
    this.email = email
    // Why this.email = email ?
    // → this refers to the newly created object (because of new)
    // → Assigns the passed email to the instance
    // → Each new User gets its own email
}
// Why function with parameter?
// → Makes the constructor reusable/dynamic
// → Each instance can have different data

const username = new User('ahsantmozhgan@gmail.com')
console.log(username)         // → User { email: 'ahsantmozhgan@gmail.com' }
// Why new is required?
// → new creates new object, sets this, runs constructor, returns object
// → Without new → this would be global → bad practice

const username2 = new User('ahsantmozhgan2@gmail.com')
console.log(username2)         // → User { email: 'ahsantmozhgan2@gmail.com' }
// Why multiple instances work?
// → Every time you use new User(...) → completely new object is created
// → Each has its own this → own email property
// → Independent instances → perfect for multiple users/products/etc.

// Summary: Constructor function pattern (classic JS before ES6 class)
// → Function name starts with capital letter by convention (User)
// → Use new to create instances
// → this inside constructor refers to new object
// → Properties added with this.property = value
// → Each instance gets its own copy of properties
// → Methods can be added too (though better on prototype for memory efficiency)



// inheritance
// const User = {
//     id: 2,
//     email: 'sadri.masood@gmail.com',
//     userInfo: function () {
//         return 'ID: ${this.id} - Email: ${this.email}'
//     }
// }
// Why this object literal approach has limitations?
// → It creates only ONE object → you can't easily make multiple independent users
// → All users would share the same id/email if you tried to reuse it
// → No inheritance or reusability for creating similar objects with different data

const UserI = function(id, email) {
    this.id = id
    this.email = email
    // Why this.email = email and this.id = id ?
    // → this refers to the new object created by new UserI(...)
    // → Assigns the passed arguments as properties of each instance
    // → Each new UserI gets its own unique email and id
}
// Why constructor function named UserI (capital U)?
// → Convention in JavaScript: constructor functions start with capital letter
// → Signals that it should be called with new to create instances

UserI.prototype.userInfo = function() {
    return `ID: ${this.id} - Email: ${this.email}`
    // Why add method to .prototype instead of inside constructor?
    // → Saves memory: method is shared across all instances (not recreated per object)
    // → Inheritance: all objects created by new UserI inherit userInfo from prototype
    // → this inside prototype method refers to the instance that called it
    // → Classic JavaScript inheritance pattern before ES6 class
}
// Why UserI.prototype?
// → Every function in JS has a .prototype object
// → Properties/methods added to .prototype are shared by all instances
// → This is how inheritance works in pre-class JavaScript

const usernameI = new UserI('test@gmail.com', 2)
console.log(usernameI.userInfo())         
// → Outputs: "ID: 2 - Email: test@gmail.com"

// Why new UserI(...) ?
// → new does 4 things:
//   1. Creates new empty object {}
//   2. Sets this to point to that new object
//   3. Runs constructor body → adds email & id
//   4. Returns the new object (implicitly)
// → usernameI gets its own email/id + access to userInfo via prototype chain

const usernameI2 = new UserI('test2@gmail.com', 6)
console.log(usernameI2.userInfo())  
// → Outputs: "ID: 6 - Email: test2@gmail.com"

// Why multiple instances work?
// → Every new UserI() creates a completely independent object
// → Each has its own this.email & this.id
// → All share the same userInfo method from prototype → memory efficient
// → This is true inheritance: instances inherit behavior from prototype

// Summary: Why this prototype pattern?
// → Allows creating many similar objects (instances) with different data
// → Shared methods live on prototype → saves memory (not duplicated per object)
// → this inside methods refers to the calling instance
// → Classic way to implement "classes" in pre-ES6 JavaScript
// → Modern equivalent: class UserI { constructor(email, id) { ... } userInfo() { ... } }        

//////////////////////////////////////////////////////////////////////
// class-syntax
class UserC {
    // Why class keyword (ES6+)?
    // → Modern, cleaner syntax for creating constructor functions + prototypes
    // → More readable & expressive than old function + User.prototype.method
    // → Still prototype-based inheritance under the hood (not classical inheritance)
    // → Standard way in modern JavaScript

    constructor(id, email) {
        this.id = id
        this.email = email
        // Why constructor method?
        // → Special method called automatically when using new UserC(...)
        // → this refers to the newly created instance
        // → Initializes instance properties (like old constructor function body)
        // → Can have only one constructor per class
    }

    userInfo() {
        return `ID: ${this.id} - Email: ${this.email}`
        // Why method defined inside class body?
        // → Automatically added to UserC.prototype (shared across all instances)
        // → Saves memory: method exists once, not duplicated per object
        // → this refers to the instance that calls it (e.g. usernameC.userInfo())
        // → No need to write UserC.prototype.userInfo = function() { ... }
    }
    // Why no function keyword?
    // → Class method shorthand → equivalent to methodName: function() { ... }
    // → Cleaner & more readable
}

const usernameC = new UserC(2, 'classtest@gmail.com')
// Why new UserC(...) ?
// → new does 4 things (same as old constructor pattern):
//   1. Creates new empty object {}
//   2. Sets this to point to that new object
//   3. Runs constructor → adds id & email
//   4. Returns the new object automatically
// → Without new → this would be global/window → bad practice

console.log(usernameC.userInfo())
// → Outputs: "ID: 2 - Email: classtest@gmail.com"

// Why does this work?
// → usernameC inherits userInfo from UserC.prototype
// → this inside userInfo refers to usernameC instance
// → class syntax makes prototype inheritance feel more like classical OOP
// → But it's syntactic sugar — still prototype chain under the hood

// Summary: Why prefer class syntax over old constructor + prototype?
// → More readable & structured (constructor, methods grouped together)
// → No need to manually set .prototype
// → Easier to add static methods, getters/setters, extends (inheritance)
// → Standard in modern JavaScript (React, Node, etc.)
// → Still fully compatible with old prototype style




//////////////////////////////////////////////////////////////////////
// subclasses
class UserSc {
    // Parent/base class (superclass)
    // Why class UserSc?
    // → Defines common properties/methods that all users share
    // → Acts as blueprint for any kind of user

    constructor(id, email) {
        this.id = id
        this.email = email
        // Why constructor here?
        // → Called automatically when using new UserSc(...) or subclasses
        // → this refers to the new instance being created
        // → Initializes shared properties (id & email)
    }
    // No methods added → can be extended in subclasses or here if needed
}

// Job class inherits from UserSc (subclass/child class)
class Job extends UserSc {
    // Why extends UserSc?
    // → Job inherits all properties & methods from UserSc
    // → Job is a specialized type of User → has everything UserSc has + more
    // → Classic inheritance: "Job is a User with a jobTitle"

    constructor(id, email, jobTitle) {
        super(id, email)
        // Why super(id, email)?
        // → Calls parent class (UserSc) constructor
        // → Required in subclass constructor before using this
        // → Passes id & email to parent → reuses parent's initialization
        // → Without super() → ReferenceError: Must call super before this

        this.jobTitle = jobTitle
        // Adds extra property specific to Job instances
        // → Each Job has id, email (from parent) + jobTitle (own)
    }
    // No extra methods here → inherits any from UserSc (none yet)
}

const usernameSc = new Job('sadri-masoodegmail.com', 2, 'Developer')
// Why new Job(...) ?
// → new does:
//   1. Creates new empty object {}
//   2. Sets this to that object
//   3. Calls Job constructor
//   4. Job constructor calls super() → runs UserSc constructor
//   5. Adds jobTitle
//   6. Returns the new object

console.log(usernameSc)     
// → Output: Job { id: 'sadri-masoodegmail.com', email: 2, jobTitle: 'Developer' }
// Why Job in output (not UserSc)?
// → Constructor name is Job → JS shows class name in console
// → But internally it's still prototype chain: Job.prototype → UserSc.prototype → Object.prototype

// Summary: Why use class + extends + super?
// → Clean, readable way to create inheritance hierarchies
// → Reuses parent initialization (super)
// → All instances of Job inherit UserSc behavior
// → Can add/override methods easily
// → Modern standard in JavaScript (ES6+)
// → Much clearer than old constructor + User.prototype = Object.create(User.prototype)

//////////////////////////////////////////////////////////////////////////////////
// getters-and-setters
// const fullName = 'Masood Sadri'
// const parts = fullName.split(' ')
// console.log(parts)         // → [ 'Masood', 'Sadri' ]
// console.log(parts[0])      // → Masood
// Why this example?
// → Shows basic string splitting → useful when setter needs to parse input
// → Prepares understanding for how setter can split value and assign parts

// const productTest = {
//     title: 'book',
//     price: 79,
//     productInfo() {
//         return console.log(`Title: ${this.title} - Price: ${this.price}`)
//     }
// }

// console.log(productTest.productInfo())
// Why this regular method doesn't work as getter?
// → It's a normal function → called with () → productTest.productInfo()
// → Returns undefined (because console.log returns undefined)
// → Not a getter → can't be accessed as property (productTest.productInfo)

// const productTest = {
//     title: 'book',
//     price: 79,
//     get productInfo() {
//         return console.log(`Title: ${this.title} - Price: ${this.price}`)
//     },
//     set productInfo(value) {
//         parts = value.split(' ')
//         this.title = parts[0]
//         this.price = parts[1]
//     }
// }

productTest.productInfo = 'Book2 59'
// Why productTest.productInfo = ... (no parentheses)?
// → Because productInfo is a setter → treated like a property assignment
// → Setter is automatically called when you assign value to productInfo
// → value parameter receives 'Book2 59'

console.log(productTest.productInfo)
// → Calls the getter → runs console.log inside getter
// → Outputs: "Title: Book2 - Price: 59"
// → Then console.log prints undefined (because getter returns console.log's result)

// How getters & setters work in object literal
// get productInfo() { ... }
// → Defines a getter → accessed like property: productTest.productInfo
// → No () needed → runs code inside and returns its value
// → Here it logs info but returns undefined (console.log returns undefined)
// → Real getter usually returns a value (not logs)

// set productInfo(value) { ... }
// → Defines a setter → called when assigning: productTest.productInfo = 'something'
// → value is the assigned value ('Book2 59')
// → Splits string → updates title & price
// → Allows "virtual" properties → user thinks it's one property but it controls multiple

// Why use getters/setters instead of regular methods?
// → Cleaner API: looks like normal property access/assignment
//   productTest.productInfo = 'New Title 100'  // setter
//   console.log(productTest.productInfo)       // getter
// → Hides implementation details → user doesn't see split logic
// → Can add validation, formatting, side effects (e.g. save to storage)
// → Very common in modern JS (Vue, React state, API wrappers)

// Summary: Your example shows
// → Getter can run side effects (console.log) but usually returns data
// → Setter parses input and updates multiple properties
// → Together they create a "virtual" productInfo property
// → Very powerful for clean, readable object interfaces

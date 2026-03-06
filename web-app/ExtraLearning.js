
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


//////////////////////////////////////////////////////////////////////////////////
// challenge-16
class UserChallenge16 {
    // Why class UserChallenge16?
    // → Modern ES6 class syntax → cleaner way to define objects with constructor & properties
    // → Acts as blueprint for creating user instances with id & email

    constructor(id, email) {
        this.id = id
        this.email = email
        // Why constructor?
        // → Special method called automatically when using new UserChallenge16(...)
        // → this refers to the newly created instance
        // → Initializes instance properties (id & email)
        // → Can have only one constructor per class
    }

    // Getter: defines a virtual property that runs code when accessed
    get UserInfoCh16() {
        return `'ID: ${this.id} - Email: ${this.email}`
        // Why get UserInfoCh16() { ... } ?
        // → Creates a getter property → accessed like normal property: usernameCh16.UserInfoCh16
        // → No parentheses needed → looks like reading a field
        // → this refers to the current instance
        // → Returns formatted string → useful for display
        // → Note: starts with single quote ' — probably typo, should be ` or just string
    }

    // Setter: defines code that runs when assigning to the property
    set UserInfoCh16(value) {
        const parts = value.split(' ')
        this.id = parts[0]
        this.email = parts[1]
        // Why set UserInfoCh16(value) { ... } ?
        // → Runs automatically when assigning: usernameCh16.UserInfoCh16 = 'something'
        // → value is whatever was assigned (e.g. '6 test@test.com')
        // → Splits string by space → assumes format "id email"
        // → Updates instance properties (id & email)
        // → Allows treating UserInfoCh16 as one "virtual" property that controls two real ones
        // → Powerful for clean API: user thinks it's one field but it updates multiple
    }
}

const usernameCh16 = new UserChallenge16(2, 'sadri.masood@gmail.com')
// Why new UserChallenge16(...) ?
// → new does:
//   1. Creates new empty object {}
//   2. Sets this to that object
//   3. Runs constructor → sets id=2, email='sadri.masood@gmail.com'
//   4. Returns the new object
// → usernameCh16 is instance of UserChallenge16

usernameCh16.UserInfoCh16 = '6 test@test.com'
// Why assignment (no parentheses)?
// → Because UserInfoCh16 is a setter → treated like normal property assignment
// → Setter is automatically called
// → value = '6 test@test.com'
// → split(' ') → parts = ['6', 'test@test.com']
// → this.id = '6'
// → this.email = 'test@test.com'
// → Updates the instance properties

console.log(usernameCh16)       
// → Output: UserChallenge16 { id: '6', email: 'test@test.com' }
// Why id & email changed?
// → Setter ran → overwrote original values
// → Shows getters/setters create "virtual" properties that control real data

// Summary: Why use getter & setter in class?
// → Makes object look like it has a single property UserInfoCh16
// → Getter: reading usernameCh16.UserInfoCh16 → returns formatted string
// → Setter: assigning usernameCh16.UserInfoCh16 = '...' → parses & updates id/email
// → Cleaner API than separate methods (e.g. setInfo(value), getInfo())
// → Hides implementation (splitting string) → user doesn't see details
// → Very common pattern in modern JS for computed/virtual properties
// → Note: getter returns string with leading ' → probably typo (should be ` or remove quote)


//////////////////////////////////////////////////////////////////////////////////
// callback-function
const productsCallback = [{
    title: 'Book1',
    price: 79
}, {
    title: 'Book2',
    price: 29
}, {
    title: 'Book3',
    price: 59
}]
// Why array of objects?
// → Simulates a list of products (real data source)
// → Each has title & price → useful for mapping/formatting

// getProductsCallback = () => {
//     setTimeout(() => {
//         const fetchProductsCallback = productsCallback.map((item) => {
//             return `Product: ${item.title} - Price: ${item.price}`
//         })
//         console.log(fetchProductsCallback)
//     }, 2000)
// }
// Why setTimeout(..., 2000)?
// → Simulates asynchronous delay (like API call or network fetch)
// → Code inside runs after 2 seconds → mimics real-world async behavior

// createProductsCallback = () => {
//     setTimeout(() => {
//         productsCallback.push({
//             title: 'New Book',
//             price: 99
//         })
//     }, 3000)
// }
// createProductsCallback()
// getProductsCallback()
// // output: 
// // [
// //   'Product: Book1 - Price: 79',
// //   'Product: Book2 - Price: 29',
// //   'Product: Book3 - Price: 59'
// // ]

// Why this version prints only 3 products?
// → createProductsCallback adds item after 3 seconds
// → getProductsCallback logs after 2 seconds
// → When getProductsCallback runs → new book not added yet (race condition)
// → Classic async problem: callback runs too early → misses update
// → Shows why we need callbacks or promises to coordinate async operations

getProductsCallback = () => {
    setTimeout(() => {
        const fetchProductsCallback = productsCallback.map((item) => {
            return `Product: ${item.title} - Price: ${item.price}`
        })
        console.log(fetchProductsCallback)
    }, 2000)
}

createProductsCallback = (callback) => {
    setTimeout(() => {
        productsCallback.push({
            title: 'New Book',
            price: 99
        })
        callback()
        // Why call callback() here?
        // → After adding new product → immediately call the passed function
        // → Guarantees getProductsCallback runs AFTER createProductsCallback finishes
        // → Solves race condition → ensures data is updated before logging
    }, 3000)
}

createProductsCallback(getProductsCallback)
// Why pass getProductsCallback as argument?
// → This is the callback pattern
// → createProductsCallback takes a function as parameter
// → Runs that function only after its own work is done
// → Classic way to handle "do this, then do that" in async code

// output: 
// [
//   'Product: Book1 - Price: 79',
//   'Product: Book2 - Price: 29',
//   'Product: Book3 - Price: 59',
//   'Product: New Book - Price: 99'
// ]
// Why now 4 products?
// → createProductsCallback finishes first (adds item)
// → Then calls getProductsCallback → sees updated array
// → Perfect coordination → no race condition

// Summary: Callback pattern demonstrated
// → First version: two independent setTimeout → race condition → misses update
// → Second version: pass callback → run it only after async work is done
// → Classic solution for "do A, then do B" when A is asynchronous
// → Before Promises/async-await → callbacks were main way to handle async flow
// → Still used today (e.g. event listeners, array methods like forEach/map/filter)






//////////////////////////////////////////////////////////////////////////////////////
// promises
const productsPromises = [{
    title: 'Book1',
    price: 79
}, {
    title: 'Book2',
    price: 29
}, {
    title: 'Book3',
    price: 59
}]
// Why array of products?
// → Simulates real data source (like database or API response)
// → Used to demonstrate async add + fetch pattern

getProductsPromises = () => {
    setTimeout(() => {
        const fetchProductsPromises = productsPromises.map((item) => {
            return `Product: ${item.title} - Price: ${item.price}`
        })
        console.log(fetchProductsPromises)
    }, 2000)
}
// Why setTimeout in getProductsPromises?
// → Simulates asynchronous operation (e.g. fetching from server)
// → Delays logging by 2 seconds → mimics network/API delay
// → map() transforms each product into formatted string

createProductsPromises = () => {
    // Why return new Promise(...) ?
    // → Promises are the modern way to handle async operations
    // → Allows chaining .then() / .catch() → cleaner than callbacks
    // → Makes it easy to say "do this, then do that"
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            productsPromises.push({
                title: 'New Book',
                price: 99
            })
            const error = false
            if (!error) {
                resolve()
                // Why resolve() ?
                // → Signals success → triggers .then() handler
                // → Can pass data: resolve(newProducts) if needed
            } else {
                reject('Error')
                // Why reject('Error') ?
                // → Signals failure → triggers .catch() handler
                // → Can pass error object/message → useful for debugging
            }
        }, 3000)
        // Why 3000ms delay?
        // → Longer than getProducts delay → simulates real async add operation
    })
}

createProductsPromises()
    .then(getProductsPromises)
    // Why .then(getProductsPromises) ?
    // → Runs getProductsPromises only AFTER promise resolves (add finishes)
    // → Guarantees new book is added before logging → no race condition
    // → Cleaner than nested callbacks → linear readable flow

    .catch(err => {
        console.log(err)
        // Why .catch() ?
        // → Handles rejection (error case)
        // → Prevents unhandled promise rejection warnings
        // → Can log/show user-friendly message
    })
// output: 
// [
//   'Product: Book1 - Price: 79',
//   'Product: Book2 - Price: 29',
//   'Product: Book3 - Price: 59',
//   'Product: New Book - Price: 99'
// ]
// Why 4 products now?
// → createProductsPromises finishes first (adds 'New Book')
// → resolve() → triggers .then() → runs getProductsPromises
// → Logs updated array → includes new item
// → Solves the race condition from callback version

// Summary: Why Promises are better than plain callbacks here
// → Linear flow: create → then get → looks like synchronous code
// → No nesting ("callback hell")
// → Easy error handling with .catch()
// → Can chain more .then() if needed
// → Modern standard (before async/await) for async sequencing
// → In real apps: replace setTimeout with fetch/API calls

//////////////////////////////////////////////////////////////////////////////////////
// async-await
const productsPromisesAsync = [{
    title: 'Book1',
    price: 79
}, {
    title: 'Book2',
    price: 29
}, {
    title: 'Book3',
    price: 59
}]
// Why array of products?
// → Simulates real data source (like database or API response)
// → Used to demonstrate async add + fetch pattern

getProductsPromisesAsync = () => {
    setTimeout(() => {
        const fetchProductsPromisesAsync = productsPromisesAsync.map((item) => {
            return `Product: ${item.title} - Price: ${item.price}`
        })
        console.log(fetchProductsPromisesAsync)
    }, 2000)
}
// Why setTimeout in getProductsPromisesAsync?
// → Simulates asynchronous operation (e.g. fetching from server)
// → Delays logging by 2 seconds → mimics network/API delay
// → map() transforms each product into formatted string
// → This function is synchronous but contains async behavior inside

createProductsPromisesAsync = () => {
    // Why return new Promise(...) ?
    // → Promises are the foundation for async/await
    // → Allows awaiting the add operation → guarantees order
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            productsPromisesAsync.push({
                title: 'New Book',
                price: 99
            })
            const error = false
            if (!error) {
                resolve()
                // Why resolve() with no value?
                // → Signals success → lets await continue
                // → Could pass data: resolve('Added successfully')
            } else {
                reject('Error')
                // Why reject('Error') ?
                // → Signals failure → would trigger catch in async function
                // → Can pass error object/message → useful for debugging
            }
        }, 3000)
        // Why 3000ms delay?
        // → Longer than getProducts delay → simulates real async add operation
        // → Ensures we can test proper sequencing
    })
}

async function getData() {
    // Why async keyword before function?
    // → Marks function as asynchronous → allows use of await inside
    // → Lets function return a Promise implicitly
    // → Makes code look synchronous while handling async operations

    await createProductsPromisesAsync()
    // Why await here?
    // → Pauses execution until the Promise resolves
    // → Guarantees new book is added before next line runs
    // → No race condition → clean sequential flow
    // → If Promise rejects → jumps to catch block

    getProductsPromisesAsync()
    // → Runs only after await finishes → sees updated array
    // → Logs 4 products → includes 'New Book'
}

getData()
// Why call getData() ?
// → Triggers the async sequence
// → Because it's async → returns Promise (but we don't need to await it here)

// output:
// [
//   'Product: Book1 - Price: 79',
//   'Product: Book2 - Price: 29',
//   'Product: Book3 - Price: 59',
//   'Product: New Book - Price: 99'
// ]
// Why 4 products?
// → await waits for createProductsPromisesAsync to finish
// → Only then runs getProductsPromisesAsync → sees the pushed item
// → Solves the race condition perfectly

// Summary: Why async/await is powerful here
// → Makes async code look synchronous → much easier to read & reason about
// → No nesting (no "callback hell" or long .then() chains)
// → Error handling with try/catch (not shown here but possible)
// → Guarantees order: add → then get → no race condition
// → Modern standard in JavaScript (replaces callback-heavy code)
// → In real apps: replace setTimeout with fetch/API calls


//////////////////////////////////////////////////////////////////////////////////////
// rest-parameters

// const checkOut = (priceone, priceTwo) => {
//     return priceone + priceTwo
// }
// Why this version is limited?
// → Fixed number of parameters (only 2 prices)
// → Cannot accept 1, 3, 5, or any variable number of prices
// → If you call checkOut(29, 59, 89) → extra arguments are ignored
// → Not flexible for real shopping cart / checkout scenarios

const checkOut = (...price) => {
    // Why ...price (rest parameter)?
    // → Collects ALL remaining arguments into a real array called price
    // → ... is the spread/rest syntax — when used in parameter list = rest
    // → Allows function to accept ANY number of arguments (0, 1, 10, 100...)
    // → Very powerful for functions like sum, average, checkout total, etc.

    let sum = 0
    // Why initialize sum = 0?
    // → Starting point for accumulation
    // → Safe even if no arguments are passed (sum = 0)

    price.forEach(item => sum += item)
    // Why .forEach() ?
    // → Loops over every number in the price array
    // → Adds each item to sum
    // → Arrow function → concise & modern
    // → Alternative: price.reduce((sum, item) => sum + item, 0)

    return sum
    // Why return sum?
    // → Function's purpose is to calculate total → returns the result
    // → Caller can use it: const total = checkOut(10, 20, 30)
}

// console.log(checkOut(29,59))
// → Would output: 88
// → Works with 2 arguments (rest collects them into array [29, 59])

console.log(checkOut(29,59, 29, 89))
// → Output: 206
// → 29 + 59 + 29 + 89 = 206
// → Rest parameter collects ALL arguments → no matter how many
// → Shows the flexibility: works with 2, 4, 0, or 100 arguments

// Summary: Why rest parameters (...args) are very useful
// → Makes function accept variable number of arguments
// → Arguments become a real array → can use .forEach, .reduce, .map, etc.
// → No need to use arguments object (old way, not array, tricky)
// → Very common in modern JS: sum, max, console.log, React props, etc.
// → Can have only ONE rest parameter, and it must be last
//   e.g. function example(a, b, ...rest) { }  ← correct
//   function wrong(...a, b) { }               ← SyntaxError

// Even better version using reduce (more concise):
// const checkOut = (...price) => price.reduce((sum, item) => sum + item, 0)


//////////////////////////////////////////////////////////////////////////////////////
// challenge-17
// Username
// Total Price
// Products: Book1, Book2, Book3

const carsDetails = (username, totalPrice, ...products) => {
    // Why three parameters: username, totalPrice, ...products ?
    // → username and totalPrice are fixed/required arguments
    // → ...products is rest parameter → collects ALL remaining arguments into array
    // → Allows calling function with any number of products (0, 1, 5, 20...)
    // → Very flexible → perfect for shopping cart, order summary, etc.

    console.log(`Username: ${username}`)
    // Why template literal (`...`) ?
    // → Modern way to insert variables → cleaner than 'Username: ' + username
    // → Reads like normal sentence → very readable
    // → ${username} → expression inside ${} is evaluated

    console.log(`Total Price: ${totalPrice}`)
    // Same reason → inserts totalPrice value cleanly

    console.log(`Products: ${products.join(', ')}`)
    // Why products.join(', ') ?
    // → products is array → join turns it into string: 'Book1, Book2, Book3'
    // → ', ' separator → nice human-readable list with commas and space
    // → If products = [] → join returns empty string → "Products: "
    // → Very common pattern for printing lists nicely
}
// Why arrow function here?
// → No need for own this → safe & concise
// → Modern style → very common for utility/helper functions
// → One-liner body → could even be written as single return if needed

carsDetails('MasoodSadri', 188, 'Book1', 'Book2', 'Book3')
// Why call like this?
// → username = 'MasoodSadri'
// → totalPrice = 188
// → ...products collects the rest → ['Book1', 'Book2', 'Book3']
// → Rest parameter automatically gathers everything after the second argument

// Output:
// Username: MasoodSadri
// Total Price: 188
// Products: Book1, Book2, Book3

// Summary: Why this pattern is very powerful (rest parameters + template literals)
// → Flexible number of products → no fixed limit
// → Clean output formatting → looks professional
// → Easy to extend: add tax, discount, date, etc.
// → Real-world usage: checkout summary, order confirmation, log function
// → Could be improved with:
//   - Validation (check totalPrice is number)
//   - Better formatting (e.g. $188.00)
//   - Return object instead of console.log


// OR
// const carsDetails = (username, totalPrice, ...products) => {
//     console.log(`Username: ${username}`);
//     console.log(`Total Price: $${totalPrice.toFixed(2)}`);
//     console.log(`Products: ${products.join(', ') || 'None'}`);
// };
// carsDetails('MasoodSadri', 188, 'Book1', 'Book2', 'Book3')


//////////////////////////////////////////////////////////////////////////////////////

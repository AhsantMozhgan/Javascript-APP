
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
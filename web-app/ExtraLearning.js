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
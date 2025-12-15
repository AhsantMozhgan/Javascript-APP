// This code is about updating and displaying a shopping cart array.
// Write JavaScript code that:

// - Creates a constant array named `cartItems` with the values `['book1', 'book2', 'book3', 'book4']`.  
// - Removes the first and the third items from the array.  
// - Adds a new item `'book5'` to the end of the array.  
// - Loops through the final array and prints each product in this format:  
//   `1 - Product Name: book2`  

// Use array methods that can remove items from the beginning, remove items at a specific index, and add items to the end of the array.


const cartItems = ['book1', 'book2', 'book3', 'book4']

// Remove first and thierd item
cartItems.shift()            //[ 'book2', 'book3', 'book4' ]
cartItems.splice(1, 1)       //[ 'book2', 'book4' ]
// Add new Item
cartItems.push('book5')      //[ 'book2', 'book4', 'book5' ]
// console.log(cartItems)

// Show array product
cartItems.forEach(function(item, index) {
    const num = index + 1
    console.log(`${num} - Product Name: ${item}`)
})
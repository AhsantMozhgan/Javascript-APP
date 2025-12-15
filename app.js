// This code continues the shopping cart theme by deleting specific products from an array of objects.

// Write JavaScript code that:

// - Creates a constant array named `productItems` containing 4 objects, each with a `title` property: `'Book1'`, `'Book2'`, `'Book3'`, and `'Book4'`.  
// - Defines a function named `deleteProduct` that takes two parameters: `products` (array) and `productTitle` (string).  
// - Inside the function:  
//   - Uses `findIndex` to find the index of the product whose `title` matches `productTitle` (case-insensitive comparison).  
//   - If found (index > -1), removes that product using `splice`.  
//   - If not found, prints `'Product Not Found!'` to the console.  
// - Calls `deleteProduct(productItems, 'book2')`.  
// - Prints the final `productItems` array to the console.

const productItems = [{
    title: 'Book1',
}, {
    title: 'Book2',
}, {
    title: 'Book3',
}, {
    title: 'Book4',
}]

const deleteProduct = function(products, productTitle) {
    const indexValue = products.findIndex(function(item) {
        return item.title.toLowerCase() === productTitle.toLowerCase()
    })
    if (indexValue > -1) {
        products.splice(indexValue, 1)
    } else {
        console.log('Product Not Found!')
    }
}


deleteProduct(productItems, 'book2')    //[ { title: 'Book1' }, { title: 'Book3' }, { title: 'Book4' } ]
// deleteProduct(productItems, 'Test')
console.log(productItems)

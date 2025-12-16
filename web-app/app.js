// 1. Select the button with the ID "add-product" and listen for a click event.
//    When this button is clicked, the function runs and logs a message in the console.
document.querySelector('#add-product').addEventListener('click', function(e) {
    console.log('Product Created!')
    // This simulates an action — like creating or adding a new product.
    // In a real app, this could also add a new <div> or <p> element to the page.
})


// 2. Select the button with the ID "remove-all-products" and listen for a click event.
//    When clicked, this event handler removes all elements with the class "product".
document.querySelector('#remove-all-products').addEventListener('click', function(e) {

    // Optional debug message to confirm the button was clicked.
    // console.log('Product Removed!')

    // 3. Select all elements that have the class "product".
    //    querySelectorAll('.product') returns a NodeList of all matching elements.
    document.querySelectorAll('.product').forEach(function(item) {
        
        // 4. Loop through each selected element and remove it from the DOM.
        //    The remove() method deletes the element completely from the webpage.
        item.remove()
    })
})

// Attach a 'submit' event listener to the form with id="add-product-form".
// When user clicks submit or presses Enter in the form, this runs.
document.querySelector('#add-product-form').addEventListener('submit', function(e) {
    // e.preventDefault() stops the form's default behavior (page reload/refresh).
    // Without this, the page would reload after submit, losing all JavaScript state.
    e.preventDefault()
    
    // e.target = the form element that was submitted
    // e.target.elements.productTitle = the input field named "productTitle" inside the form
    // .value = whatever the user typed in that input
    // This logs the new product title to console (later you'll add it to the products array).
    console.log(e.target.elements.productTitle.value)
    
    // Clear the input field so user can type the next product immediately.
    // Sets the input's value back to empty string after capturing it.
    e.target.elements.productTitle.value = ''
})

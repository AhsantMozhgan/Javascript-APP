// Define an array of product objects, each containing a 'title' key.
// This is the data source that will be shown and filtered on the page.
const products = [{
    title: 'Node js Design Patterns'
}, {
    title: 'You Dont Know JS: this & Object Prototypes '
}, {
    title: 'Functional React'
}, {
    title: 'You Dont Know JS: Async & Performance'
}]

// Define an object to store the current filter state.
// 'searchItem' will always hold whatever the user has typed in the search box.
const filters = {
    searchItem: ''
}

// Define a function that:
// 1) filters products according to the search text
// 2) clears the current list in the DOM
// 3) renders the filtered products on the page.
const renderProducts = function(products, filters) {
    // Use Array.prototype.filter to create a new array that contains
    // only the products whose title includes the search text.
    // Both strings are converted to lowercase so the match is case-insensitive.
    const filteredProducts = products.filter(function(item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })

    // Clear any previously rendered products inside the element with id="products".
    // This ensures we do not keep old results when re-rendering.
    document.querySelector('#products').innerHTML = ''

    // For each product in the filtered list:
    // - create a <p> element
    // - set its text to the product title
    // - append it to the #products container so it appears on the page.
    filteredProducts.forEach(function(item) {
        const productEl = document.createElement('p')
        productEl.textContent = item.title
        document.querySelector('#products').appendChild(productEl)
    })
}

// Call renderProducts once at the beginning so that all products
// are shown before the user types anything.
renderProducts(products, filters)

// Attach an input event listener to the search box (id="search-products").
// The 'input' event fires on every keystroke, so the list updates live as the user types.
document.querySelector('#search-products').addEventListener('input', function(e) {
    // Update the filter state with the current value of the input field.
    filters.searchItem = e.target.value

    // Re-run the rendering logic using the updated search text,
    // which re-filters the products and re-draws the list in the DOM.
    renderProducts(products, filters)
})

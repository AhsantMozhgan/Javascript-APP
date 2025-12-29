// Define an array of product objects, each containing a 'title' key.
// This acts as our data source to be filtered and displayed.
const products = [{
    title: 'Node js Design Patterns'
}, {
    title: 'You Dont Know JS: this & Object Prototypes '
}, {
    title: 'Functional React'
}, {
    title: 'You Dont Know JS: Async & Performance'
}]

// Define an object to store filter information.
// Currently, it only has 'searchItem', representing the user’s search query.
const filters = {
    searchItem: ''
}

// Define a function that takes 'products' and 'filters' 
// and logs the products that match the search term.
const renderProducts = function(products, filters) {
    // The 'filter()' method loops through all products.
    // For each product, it checks whether its title (converted to lowercase)
    // includes the current search term (also in lowercase).
    // This makes the search case-insensitive.
    const filteredProducts = products.filter(function(item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })

    // Display the filtered list in the console.
    // In a real application, this is where you might update the DOM instead.
    console.log(filteredProducts)
}

// Call 'renderProducts' initially to show all products before any search input.
renderProducts(products, filters)

// Add an event listener to the search input field in the DOM.
// Each time the user types into this field ('input' event),
// the filter’s 'searchItem' value updates with the current input,
// and the product list is re-rendered to reflect the new search.
document.querySelector('#search-products').addEventListener('input', function(e) {
    filters.searchItem = e.target.value
    renderProducts(products, filters)
})


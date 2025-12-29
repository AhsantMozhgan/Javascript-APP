// Initialize empty array to store all products.
// Starts empty so users can add their own products.
const products = []

// Object to hold current filter state.
// 'searchItem' tracks what user typed in search box.
const filters = {
    searchItem: ''
}

// Renders filtered products to the page.
// Takes current products array + filters object as parameters.
const renderProducts = function(products, filters) {
    // Filter products: keep only those whose title contains search text.
    // .toLowerCase() on both makes search case-insensitive ("React" matches "react").
    const filteredProducts = products.filter(function(item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })
    
    // Clear existing products from DOM to avoid duplicates.
    // Without this, old results would stack with new ones.
    document.querySelector('#products').innerHTML = ''
    
    // Loop through filtered results and create <p> elements for each.
    filteredProducts.forEach(function(item) {
        const productEl = document.createElement('p')
        productEl.textContent = item.title  // Safe from XSS (no innerHTML)
        document.querySelector('#products').appendChild(productEl)
    })
}

// Initial render: show empty list (no products yet).
renderProducts(products, filters)

// Live search: updates products list as user types.
// 'input' event fires on every keystroke.
document.querySelector('#search-products').addEventListener('input', function(e) {
    // Update filter state with current input value.
    filters.searchItem = e.target.value
    // Re-render with new filter applied.
    renderProducts(products, filters)
})

// Add new product form handler.
document.querySelector('#add-product-form').addEventListener('submit', function(e) {
    // Prevent page reload (form default behavior).
    e.preventDefault()
    
    // Create new product object from form input.
    // 'exist: true' property added but not used yet (future feature?).
    products.push({
        title: e.target.elements.productTitle.value,
        exist: true
    })
    
    // Instantly re-render to show new product.
    renderProducts(products, filters)
    
    // Clear form input for next entry.
    e.target.elements.productTitle.value = ''
})

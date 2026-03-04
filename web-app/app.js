// Pre-filled products array for testing / demo
// Why start with some data?
// → Makes the page useful immediately (you see something without adding manually)
// → Good for testing search + filter features right away
const products = [{
    title: 'Book1',
    exist: true
}, {
    title: 'Book2',
    exist: false
}, {
    title: 'Book3',
    exist: true
}, {
    title: 'Book4',
    exist: false
}]

// Single object that holds all current filter settings
// Why one object instead of separate variables?
// → Easy to pass all filters together to render function
// → Simple to add more filters later (price range, category, etc.)
const filters = {
    searchItem: '',
    availableProducts: false
    // Why false by default? → Show all products initially (most common UX expectation)
}

// Main function: filters data → updates the page
const renderProducts = function(products, filters) {
    // First filter: match search text (case-insensitive)
    // Why .toLowerCase() on both sides?
    // → Makes search ignore case ("book" finds "Book1")
    let filteredProducts = products.filter(function(item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })

    // Second filter: only available products if checkbox is checked
    // Why separate filter call?
    // → Easier to read and debug than one big complex condition
    filteredProducts = filteredProducts.filter(function(item) {
        if (filters.availableProducts) {
            return item.exist   // only keep items where exist is true
            // Note: item.exist is boolean, so return item.exist works directly
        } else {
            return true         // no filtering → show everything
        }
    })
    
    // Clear old content before adding new
    // Why necessary?
    // → Prevents duplicate items piling up every time we re-render
    document.querySelector('#products').innerHTML = ''
    
    // Create one <p> element per filtered product
    // Why document.createElement + .textContent?
    // → Safer than innerHTML (protects against XSS if titles ever come from users)
    // → Clean and modern DOM manipulation
    filteredProducts.forEach(function(item) {
        const productEl = document.createElement('p')
        productEl.textContent = item.title
        document.querySelector('#products').appendChild(productEl)
    })
}

// Show initial list when page loads (with pre-filled products)
renderProducts(products, filters)

// Live search: re-filter every time user types
// Why 'input' event instead of 'keyup'?
// → Catches paste, voice input, drag-drop — more complete user interactions
document.querySelector('#search-products').addEventListener('input', function(e) {
    filters.searchItem = e.target.value
    // Why no .trim() here?
    // → Allows searching with leading/trailing spaces (intentional in this version)
    renderProducts(products, filters)
})

// Handle form submission (adding new product)
document.querySelector('#add-product-form').addEventListener('submit', function(e) {
    e.preventDefault()   // Stop page reload → keeps app feeling smooth
    
    // Add new item to array
    products.push({
        title: e.target.elements.productTitle.value,
        exist: true   // New products are always "available" by default
    })
    
    // Update display immediately
    renderProducts(products, filters)
    
    // Clear input field → ready for next entry
    e.target.elements.productTitle.value = ''
    // Nice UX touch: user can keep typing without clicking again
})

// Checkbox toggle: show/hide unavailable products
// Why 'change' event?
// → Fires exactly when checkbox state changes (checked ↔ unchecked)
document.querySelector('#available-products').addEventListener('change', function(e) {
    filters.availableProducts = e.target.checked
    renderProducts(products, filters)
})
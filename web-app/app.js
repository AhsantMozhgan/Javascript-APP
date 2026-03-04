// Array to store all products – starts empty
// Why let instead of const?
// → We will modify the array (push new items) so we need a variable that can be reassigned
let products = []

// Single object that holds all current filter settings
// Why one object instead of separate variables?
// → Easy to pass all filters together to render function
// → Simple to add more filters later (price range, category, etc.)
const filters = {
    searchItem: '',
    availableProducts: false
    // Why false by default?
    // → Show all products initially (most common and intuitive UX expectation)
}

// Attempt to load previously saved products from localStorage
const productJSON = localStorage.getItem('products')
// Why check !== null ?
// → localStorage.getItem returns null when the key doesn't exist (first visit, cleared storage, etc.)
if (productJSON !== null) {
    products = JSON.parse(productJSON)
    // Why JSON.parse?
    // → localStorage only stores strings → we convert the saved JSON string back to real array of objects
}

// Main function: filters data → clears old content → renders new list on page
const renderProducts = function(products, filters) {
    // First filter: match search text (case-insensitive)
    // Why .toLowerCase() on both sides?
    // → Makes search ignore case ("book" finds "Book1", "BOOK", etc.)
    let filteredProducts = products.filter(function(item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })

    // Second filter: only available products if checkbox is checked
    // Why separate filter call?
    // → Easier to read, debug, and extend than one big complex condition
    filteredProducts = filteredProducts.filter(function(item) {
        if (filters.availableProducts) {
            return item.exist   // only keep items where exist is true
            // Note: item.exist is boolean → return item.exist works directly (no need === true)
        } else {
            return true         // no filtering → show everything
        }
    })
    
    // Clear old content before adding new
    // Why necessary?
    // → Prevents duplicate <p> elements piling up every time we re-render
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

// Show initial list when page loads (either empty or from localStorage)
renderProducts(products, filters)

// Live search: re-filter every time user types/pastes
// Why 'input' event instead of 'keyup' / 'keydown'?
// → Catches paste, voice input, drag-drop, IME composition — more complete user interactions
document.querySelector('#search-products').addEventListener('input', function(e) {
    filters.searchItem = e.target.value
    // Why no .trim() here?
    // → Allows searching with leading/trailing spaces (intentional in this version)
    renderProducts(products, filters)
})

// Handle form submission (adding new product)
document.querySelector('#add-product-form').addEventListener('submit', function(e) {
    e.preventDefault()   // Stop page reload → keeps app feeling smooth (single-page-like)
    
    // Add new item to array
    products.push({
        title: e.target.elements.productTitle.value,
        exist: true   // New products are always "available" by default
    })

    // Save updated array to localStorage after every change
    // Why JSON.stringify?
    // → localStorage only accepts strings → we convert array → JSON string
    localStorage.setItem('products', JSON.stringify(products))

    // Update display immediately
    renderProducts(products, filters)
    
    // Clear input field → ready for next entry
    e.target.elements.productTitle.value = ''
    // Nice UX touch: user can keep typing without clicking again
})

// Checkbox toggle: show/hide unavailable products
// Why 'change' event?
// → Fires exactly when checkbox state changes (checked ↔ unchecked)
// → More precise than 'click' (which can fire on label too)
document.querySelector('#available-products').addEventListener('change', function(e) {
    filters.availableProducts = e.target.checked
    renderProducts(products, filters)
})
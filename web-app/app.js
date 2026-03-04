// Load products using helper function from function.js
// Why not load directly here?
// → Keeps app.js clean and focused on application flow
// → Reuses the same loading logic everywhere → single source of truth
let products = getSaveProducts()

// Single object that holds all current filter settings
// Why one object instead of separate variables?
// → Easy to pass all filters together to render function
// → Simple to add more filters later (price range, category, sort order, etc.)
const filters = {
    searchItem: '',
    availableProducts: false
    // Why false by default?
    // → Show all products initially (most common and intuitive UX expectation)
}

// Show initial list when page loads (either empty or restored from storage)
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
        id: uuidv4(),
        title: e.target.elements.productTitle.value,
        exist: true   // New products are always "available" by default
    })

    // Persist the updated list immediately
    // Why call saveProducts right after push?
    // → Ensures data survives refresh / close / reopen
    // → Keeps storage in sync with memory
    saveProducts(products)

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
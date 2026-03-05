// Load products using helper function from function.js
// Why not load directly here?
// → Keeps app.js clean and focused on application flow
// → Reuses the same loading logic everywhere → single source of truth
let products = getSaveProducts()
// Why let (not const)?
// → products needs to be reassigned when storage event fires
// → Allows live sync when data changes in other tabs/windows

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
    
    // Add new item to array with unique ID
    const id = uuidv4()
    products.push({
        id: id,
        title: e.target.elements.productTitle.value,
        price: '',
        exist: true   // New products are always "available" by default
    })

    // Persist the updated list immediately
    // Why call saveProducts right after push?
    // → Ensures data survives refresh / close / reopen
    // → Triggers storage event in other tabs/windows → enables live sync
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

// Listen for storage changes from other tabs/windows
window.addEventListener('storage', function(e) {
    if (e.key === 'products') {
        products = JSON.parse(e.newValue)
        // Why re-parse e.newValue?
        // → storage event gives new value as string → convert back to array
        // → Keeps local products variable in sync with storage

        // Re-render list with latest data
        renderProducts(products, filters)
        // Why re-render?
        // → If another tab added/edited/removed product → see changes live
        // → True multi-tab/multi-window synchronization
    }
})

// ────────────────────────────────────────────────
// Moment.js date/time exploration / testing section
// ────────────────────────────────────────────────

// Create moment object for current date/time
const now = moment()
// Why moment() instead of new Date()?
// → Moment.js provides much nicer API for formatting, adding/subtracting time, locales, etc.
// → Easier to read and work with dates (especially for display)

// console.log(now.toString())
// → Prints something like: "Wed Mar 04 2026 21:58:00 GMT-0800"

// Examples of chaining operations (commented out)
// now.add(1, 'year')
// now.add(1, 'year').subtract(2, 'days')
// console.log(now.toString())
// Why chaining?
// → Moment is immutable by default when chaining → returns new moment object
// → Very fluent and readable

// Format date in human-readable way
console.log(now.format('MMMM Do, YYYY'))
// → Outputs: March 4th, 2026 (or similar depending on locale)
// Why .format()?
// → Extremely flexible & readable output
// → Supports many tokens: MMMM = full month, Do = day with ordinal, YYYY = 4-digit year
// → Perfect for displaying "Created: March 4th, 2026" in UI later
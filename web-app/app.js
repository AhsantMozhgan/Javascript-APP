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
// Date & Timestamp exploration / testing section
// ────────────────────────────────────────────────

// Create current date object
const now = new Date()
// Why new Date() without arguments?
// → Returns current date & time at the moment of execution
// → Useful for timestamps, createdAt, updatedAt fields

// console.log(now)
// → Prints full readable date/time (e.g. Wed Mar 04 2026 21:09:00 GMT-0800)

// Individual component getters (commented out)
// console.log(`Year: ${now.getFullYear()}`)     → e.g. 2026
// console.log(`Month: ${now.getMonth()}`)       → 0–11 (0 = January!)
// console.log(`Day: ${now.getDate()}`)          → 1–31
// console.log(`Hour: ${now.getHours()}`)        → 0–23
// console.log(`Minutes: ${now.getMinutes()}`)
// console.log(`Second: ${now.getSeconds()}`)
// Why these methods?
// → Allow extracting specific parts of date/time
// → Useful for formatting, comparisons, or displaying custom dates

// Get milliseconds since Jan 1, 1970 (Unix timestamp in ms)
const timestamp = now.getTime()
// console.log(timestamp)
// → Large number (e.g. 1767486540000) → unique point in time

// Convert timestamp back to Date object
const myDate = new Date(timestamp)
// Why do this?
// → Demonstrates round-trip: Date → timestamp → Date
// → Shows that getTime() captures exact moment
// → Useful pattern when storing dates in localStorage/database (store number, recreate Date later)

console.log(`Year: ${myDate.getFullYear()}`)
// → Should print same year as now.getFullYear()
// → Verifies the timestamp → Date conversion works correctly
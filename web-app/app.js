// Load products using helper function from function.js
// Why not load directly here?
// → Keeps app.js clean and focused on application flow (event listeners, rendering)
// → Reuses the same loading logic everywhere → single source of truth (DRY principle)
// → Makes maintenance easier: change loading once → affects whole app
let products = getSaveProducts()
// Why let (not const)?
// → products needs to be reassigned when the 'storage' event fires
// → Allows live synchronization when data changes in other tabs/windows

// Single object that holds all current filter settings
// Why one object instead of separate variables?
// → Easy to pass all filters together to renderProducts(products, filters)
// → Simple to add more filters later (e.g. priceMin, category, sortBy) without changing many places
// → Centralizes state → easier to debug and extend
const filters = {
    searchItem: '',
    availableProducts: false,
    // Why false by default?
    // → Show all products initially → most common and intuitive UX expectation
    // → Users usually want to see everything first, then narrow down
    sortBy: 'byEdited'
    // Why sortBy added?
    // → Stores current sorting preference from dropdown
    // → Default 'byEdited' → shows most recently updated first (common in lists)
}

// Show initial list when page loads (either empty or restored from storage)
renderProducts(products, filters)
// Why call renderProducts immediately?
// → Ensures UI shows correct (filtered/sorted) data right away
// → Sets up starting state before any user interaction

// Live search: re-filter every time user types/pastes
// Why 'input' event instead of 'keyup' / 'keydown'?
// → Catches paste, voice input, drag-drop, IME composition (e.g. Persian typing)
// → More complete user interactions than keyup/keydown alone
document.querySelector('#search-products').addEventListener('input', function(e) {
    filters.searchItem = e.target.value
    // Why no .trim() here?
    // → Allows searching with leading/trailing spaces (intentional in this version)
    // → Gives user flexibility — trimming can be added later if needed
    renderProducts(products, filters)
    // Why re-render on every input?
    // → Instant feedback → live search feels responsive and modern
})

// Handle form submission (adding new product)
document.querySelector('#add-product-form').addEventListener('submit', function(e) {
    e.preventDefault()   // Stop page reload → keeps app feeling smooth (single-page-like)
    // Why preventDefault()?
    // → Prevents full page refresh → maintains state and fast UX
    // → Classic single-page app behavior even in multi-page setup
    
    // Add new item to array with unique ID
    const id = uuidv4()
    // Why uuidv4()?
    // → Generates unique random ID → safe for remove/edit (no duplicate risk)
    // → Better than array index (which changes when items are deleted)
    const timestamp = moment().valueOf()
    // Why moment().valueOf() for timestamp?
    // → Returns milliseconds since 1970 (Unix timestamp in ms)
    // → Precise, numeric, easy to store/compare/sort
    // → moment handles timezones/locales consistently
    products.push({
        id: id,
        title: e.target.elements.productTitle.value,
        price: '',
        exist: true,   // New products are always "available" by default
        created: timestamp,
        updated: timestamp
        // Why created & updated?
        // → Tracks when product was added and last modified
        // → Enables sorting by newest/edited, showing "last edited X ago"
    })

    // Persist the updated list immediately
    // Why call saveProducts right after push?
    // → Ensures data survives refresh / close / reopen
    // → Triggers 'storage' event in other tabs/windows → enables live sync
    saveProducts(products)

    // Update display immediately
    renderProducts(products, filters)
    
    // Clear input field → ready for next entry
    e.target.elements.productTitle.value = ''
    // Nice UX touch: user can keep typing without clicking again
    // → Reduces friction → encourages adding multiple items quickly
})

// Checkbox toggle: show/hide unavailable products
// Why 'change' event?
// → Fires exactly when checkbox state changes (checked ↔ unchecked)
// → More precise than 'click' (which can fire on label too)
// → Standard event for checkboxes
document.querySelector('#available-products').addEventListener('change', function(e) {
    filters.availableProducts = e.target.checked
    renderProducts(products, filters)
    // Why re-render?
    // → Instantly updates visible list → responsive filtering
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
        // → Makes app feel more real-time without backend/WebSocket
    }
})

// Listen for sort dropdown changes
document.querySelector('#sort').addEventListener('change', function(e) {
    filters.sortBy = e.target.value
    // Update filters.sortBy with selected value
    // → 'byEdited' or 'byCreated' from <option value>
    renderProducts(products, filters)
    // Why re-render?
    // → Instantly re-sort and re-display list → responsive sorting
    // → Uses current search/filter state + new sort order
})
// Select title input
const titleElement = document.querySelector('#product-title')
// Why querySelector('#id')?
// → Fastest & most reliable way to target unique element by id

// Select price input
const priceElement = document.querySelector('#product-price')
// Same reason — consistent, readable DOM access

// Select remove button
const removeElement = document.querySelector('#remove-product')
// Why separate variable?
// → Makes event listener code cleaner & reusable

// Extract product ID from URL hash
// Example: edit-product.html#abc123 → productId = "abc123"
const productId = location.hash.substring(1)
// Why location.hash + substring(1)?
// → Simple client-side way to pass ID without query params or backend
// → Works 100% with static files (no server needed)
// → Common pattern in vanilla JS multi-page apps

// Load all products from shared localStorage function
let products = getSaveProducts()
// Why let (not const)?
// → products can be reassigned later when storage event updates it
// → Allows sync with changes made on other tabs/windows

// Find the product to edit
let product = products.find(function(item) {
    return item.id === productId
    // Relies on unique .id (from uuidv4())
})

// Safety check: if product doesn't exist → go back to list
if (product === undefined) {
    location.assign('/index.html')
    // Why location.assign()?
    // → Adds current page to history → user can press back if needed
    // → Prevents staying on broken/blank edit page
    // → Good user experience & error handling
}

// Fill form with current values
titleElement.value = product.title
// Why .value = ... ?
// → Pre-fills input → user sees current data and can edit

priceElement.value = product.price
// Same idea — works even if price is number (auto-converted to string)

// Auto-save title on every keystroke/change
titleElement.addEventListener('input', function(e) {
    product.title = e.target.value
    saveProducts(products)
    // Why 'input' event?
    // → Real-time saving → changes saved as user types (no "Save" button needed)
    // → Modern, frictionless UX
    // Why saveProducts() every time?
    // → Immediate persistence → survives refresh/close/reopen
    // → Other tabs/windows will see changes via storage event
})

// Auto-save price on every change
priceElement.addEventListener('input', function(e) {
    product.price = e.target.value
    saveProducts(products)
    // Same real-time save pattern as title
    // Note: if price should be numeric → parseFloat(e.target.value) later
})

// Delete product when remove button clicked
removeElement.addEventListener('click', function(e) {
    removeProduct(product.id)
    // Calls shared removeProduct() from function.js
    saveProducts(products)
    // Persist deletion immediately
    location.assign('./index.html')
    // Redirect back to list → user sees updated list
    // Why ./index.html (relative)?
    // → Works if edit page is in same folder
    // → /index.html (absolute) also fine — both correct here
})

// Listen for storage changes from other tabs/windows
window.addEventListener('storage', function(e) {
    if (e.key === 'products') {
        products = JSON.parse(e.newValue)
        // Why re-parse e.newValue?
        // → storage event gives new value as string → convert back to array
        // → Keeps local products variable in sync with storage

        // Re-find product (in case it was deleted on another tab)
        product = products.find(function(item) {
            return item.id === productId
        })

        if (product === undefined) {
            location.assign('/index.html')
            // If product was deleted elsewhere → redirect to list
            // Prevents editing non-existent item
        }

        // Update form fields with latest data
        titleElement.value = product.title
        priceElement.value = product.price
        // Why update inputs?
        // → If someone else edits the same product in another tab → see live changes
        // → True multi-tab sync via browser's storage event
    }
})
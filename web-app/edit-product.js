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
const products = getSaveProducts()
// Why reuse getSaveProducts()?
// → Same data source as main page → true sync across pages
// → DRY: one loading function for entire app

// Find the product to edit
const product = products.find(function(item) {
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

// Auto-save title on every change
titleElement.addEventListener('input', function(e) {
    product.title = e.target.value
    saveProducts(products)
    // Why 'input' event?
    // → Real-time saving → changes saved as user types
    // → No need for "Save" button → modern, frictionless UX
    // Why saveProducts() every time?
    // → Immediate persistence → survives refresh/close
})

// Auto-save price on every change
priceElement.addEventListener('input', function(e) {
    product.price = e.target.value
    saveProducts(products)
    // Same real-time save pattern as title
    // Note: if price should be number → parseFloat(e.target.value) later
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
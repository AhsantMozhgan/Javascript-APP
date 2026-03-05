// Select the title input field
const titleElement = document.querySelector('#product-title')
// Why querySelector with #id ?
// → Fast & precise — targets the specific element by its unique id

// Select the price input field
const priceElement = document.querySelector('#product-price')
// Same reason — clear, reliable DOM access

// Get the product ID from the URL hash
// location.hash = "#abc123" → substring(1) removes the # → "abc123"
const productId = location.hash.substring(1)
// Why use hash (#) for ID?
// → Common pattern for single-page apps or simple multi-page setups
// → No need for query params (?id=abc) or server-side routing
// → Works perfectly with static files (no backend needed)

// Load all saved products from localStorage
const products = getSaveProducts()
// Why reuse getSaveProducts()?
// → Single source of truth — same loading logic as index.html
// → Keeps code DRY (Don't Repeat Yourself)

// Find the product we want to edit by its id
const product = products.find(function(item) {
    return item.id === productId
    // Assumes each product has unique .id (from uuidv4())
})

// If product not found → redirect back to main page
if (product === undefined) {
    location.assign('/index.html')
    // Why location.assign() instead of location.href = ... ?
    // → assign() adds to history → user can go back
    // → But here it's fine either way — prevents staying on broken edit page
    // → Good safety net for invalid/missing IDs
}

// Populate the form fields with current product data
titleElement.value = product.title
// Why .value = ... ?
// → Fills the input with existing title → user can edit it

priceElement.value = product.price
// Same idea for price
// Note: assumes product has .price property
// → If price is number → it will be converted to string automatically (OK for input)
// Quick test / demo line (can be removed later)
// Why console.log(uuidv4()) ?
// → Probably testing if the uuid library is loaded or available
// → uuidv4() generates a unique random ID (v4 = random-based)
// → Useful when you plan to add unique .id to each product
// → Note: this line will throw an error unless you have included uuid library (e.g. <script src="https://cdn.jsdelivr.net/npm/uuid@latest/dist/umd/uuidv4.min.js"></script>)
console.log(uuidv4())

// Helper: Load products from localStorage or return empty array
const getSaveProducts = function() {
    // Attempt to load previously saved products
    const productJSON = localStorage.getItem('products')
    
    // Why check !== null ?
    // → localStorage.getItem returns null when no data exists yet
    //   (first visit, storage cleared, incognito without persistence, etc.)
    // → JSON.parse(null) would crash with SyntaxError → this prevents the app from breaking
    if (productJSON !== null) {
        return JSON.parse(productJSON)
        // Why JSON.parse?
        // → localStorage stores data as strings only
        // → This converts the saved JSON string back into a real array of objects
        // → After parse → products is usable with .push(), .filter(), .findIndex(), etc.
    } else {
        return []
        // Why return [] instead of undefined/null?
        // → Always returns the same type (array) → no extra null checks needed elsewhere
        // → Prevents runtime errors when calling products.push() or .filter() on undefined
    }
}

// Helper: Save products array to localStorage
const saveProducts = function(products) {
    // Why JSON.stringify?
    // → localStorage.setItem only accepts strings
    // → Without stringify → it would save "[object Object]" (useless data)
    // → Turns array into proper JSON string that can be parsed later
    localStorage.setItem('products', JSON.stringify(products))
    
    // Why no try/catch?
    // → In beginner/learning projects it's common to omit for simplicity
    // → In real apps you should add try { ... } catch (err) { console.error(err) }
    //   because setItem can fail (storage quota exceeded, private mode, security policy)
}

// New function: Remove a product by its id
const removeProduct = function(id) {
    // Find the index of the product with matching id
    // Why .findIndex() instead of .find() ?
    // → .findIndex() returns the numeric position → perfect for .splice()
    // → .find() would return the object itself → you'd still need another loop to remove
    const productIndex = products.findIndex(function(item) {
        return item.id === id
        // Assumes every product has a unique .id property (e.g. from uuidv4())
    })
    
    // Why check productIndex > -1 ?
    // → .findIndex() returns -1 if nothing matches → prevents splice(-1) error
    if (productIndex > -1) {
        products.splice(productIndex, 1)
        // .splice(index, 1) removes exactly one item at that position
        // Why mutate the array directly?
        // → Simple & efficient for small lists
        // → products is a global variable → changes are immediately visible
    }
    // Note: no return value → this is a side-effect function (mutates products)
}

// Main rendering function: filters → clears old UI → rebuilds product list
const renderProducts = function(products, filters) {
    // First filter: match search text (case-insensitive)
    // Why .toLowerCase() twice?
    // → Ensures "Book" matches "book", "BOOK", "bOoK" → user-friendly search
    let filteredProducts = products.filter(function(item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })

    // Second filter: only available products if checkbox checked
    // Why separate filters?
    // → Very readable & debuggable
    // → Easy to add more filters (price, category, date) without messy code
    filteredProducts = filteredProducts.filter(function(item) {
        if (filters.availableProducts) {
            return item.exist   // boolean → direct return is clean
        } else {
            return true         // show everything
        }
    })
    
    // Clear previous content
    // Why innerHTML = '' ?
    // → Fastest & simplest way to remove all children
    // → Without this → duplicates would accumulate on every re-render
    document.querySelector('#products').innerHTML = ''
    
    // Render each filtered item using helper
    // Why delegate to createProductDOM?
    // → Keeps renderProducts focused on logic & flow
    // → createProductDOM owns the HTML structure → easy to change layout
    filteredProducts.forEach(function(item) {
        document.querySelector('#products').appendChild(createProductDOM(item))
    })
}

// Helper: Create full DOM element for one product (with remove functionality)
const createProductDOM = function(product) {
    const productEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const productItem = document.createElement('span')
    const removeButton = document.createElement('button')

    checkbox.setAttribute('type', 'checkbox')
    productEl.appendChild(checkbox)
    // Why checkbox?
    // → Future feature placeholder (toggle exist?, select multiple?)
    // → Already in layout → no need to restructure DOM later

    productItem.textContent = product.title
    productEl.appendChild(productItem)

    removeButton.textContent = 'Remove'
    productEl.appendChild(removeButton)
    
    // Wire up the remove button immediately
    // Why addEventListener here inside createProductDOM?
    // → Each button gets its own listener with closure access to the current product.id
    // → No need for event delegation or data attributes
    // → Simple and works well for small-to-medium lists
    removeButton.addEventListener('click', function() {
        removeProduct(product.id)
        // After removal → save to localStorage immediately
        saveProducts(products)
        // After removal → re-render the filtered list
        renderProducts(products, filters)
    })
    
    return productEl
}
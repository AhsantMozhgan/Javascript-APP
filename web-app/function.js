// Quick test / demo line (can be removed later)
// Why console.log(uuidv4()) ?
// → Tests whether the uuid library (uuid.js) is properly loaded and functional
// → uuidv4() generates a random UUID (version 4) → ideal for unique product IDs
// → Helps confirm the script is included correctly before relying on it
// → Will throw ReferenceError if uuid.js is missing or not loaded in HTML
console.log(uuidv4())

// Helper: Load products from localStorage or return empty array
const getSaveProducts = () => {
    // Attempt to load previously saved products
    const productJSON = localStorage.getItem('products')
    
    // Why check !== null ?
    // → localStorage.getItem returns null when no data was ever saved
    //   (first visit, storage cleared, private browsing, etc.)
    // → JSON.parse(null) would throw SyntaxError → this guard prevents crash
    if (productJSON !== null) {
        return JSON.parse(productJSON)
        // Why JSON.parse?
        // → localStorage stores data as strings only
        // → Converts saved JSON string back into real array of objects
        // → After this → products has .id, .title, .exist, .created, .updated, etc.
    } else {
        return []
        // Why return [] instead of undefined/null?
        // → Always returns consistent type (array) → safer for .push(), .filter(), etc.
        // → Avoids extra null/undefined checks in calling code
    }
}

// Helper: Save products array to localStorage
const saveProducts = (products) => {
    // Why JSON.stringify?
    // → localStorage.setItem only accepts strings
    // → Without stringify → saves useless "[object Object]" strings
    // → Turns array into valid JSON string that can be parsed later
    localStorage.setItem('products', JSON.stringify(products))
    
    // Why no try/catch?
    // → Kept simple for learning → errors are rare in local dev
    // → In real apps: add try/catch for quota exceeded or security blocks
}

// Remove a product by its unique id
const removeProduct = (id) => {
    // Find position of product with matching id
    // Why .findIndex()?
    // → Returns numeric index → perfect for .splice()
    // → .find() would return object → harder to remove from array
    // Relies on every product having unique .id (from uuidv4())
    const productIndex = products.findIndex(item => {item.id === id})
    
    // Why check > -1 ?
    // → .findIndex returns -1 if no match → .splice(-1) would be invalid
    if (productIndex > -1) {
        products.splice(productIndex, 1)
        // Removes exactly one item at that index
        // Mutates global products array → changes visible everywhere
    }
    // No return value → side-effect function (modifies products)
}

// Toggle the 'exist' property of a product by id
const toggleProduct = (id) => {
    // Find the product object by id
    // Why .find() instead of .findIndex() here?
    // → We want the object itself to modify .exist
    // → No need for index → direct property change
    const product = products.find(item => {item.id === id})
    
    // Why check !== undefined ?
    // → Prevents error if id not found (though unlikely with proper buttons)
    if (product !== undefined) {
        product.exist = !product.exist
        // Toggles boolean: true → false, false → true
        // Simple inversion → clean & idiomatic (no if/else needed)
    }
}

// Sort products based on current sort preference
const sortProduct = (products, sortBy) => {
    if (sortBy === 'byEdited') {
        return products.sort((a,b) => {
            // Sort descending (most recent first)
            // Why a.updated > b.updated → -1 ?
            // → If a was updated more recently → put a before b
            if (a.updated > b.updated) {
                return -1
            } else if (a.updated < b.updated) {
                return 1
            } else {
                return 0
            }
        })
    } else if(sortBy === 'byCreated') {
        return products.sort((a,b) => {
            // Sort descending (newest first)
            // Why a.created > b.created → -1 ?
            // → If a was created more recently → put a before b
            if (a.created > b.created) {
                return -1
            } else if (a.created < b.created) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return products
        // Default case: no sorting → return original array
        // Why return products directly?
        // → Preserves current order when no valid sortBy is selected
    }
}

// Main rendering function: filters → sorts → clears → rebuilds DOM list
const renderProducts = (products, filters) => {
    // Apply sorting first (modifies products in place)
    // Why sort before filtering?
    // → Sorting should apply to the full list → then filter the sorted result
    // → Ensures correct order even when filtering is active
    // → Note: products.sort() mutates the array → that's intentional here
    products = sortProduct(products, filters.sortBy)
    
    // First filter: case-insensitive title search
    // Why .toLowerCase() on both?
    // → Users expect "book" to match "Book", "BOOK", "bOoK" → intuitive search
    let filteredProducts = products.filter((item) => {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })

    // Second filter: available products only if checkbox checked
    // Why separate filter calls?
    // → Much more readable & debuggable
    // → Easy to add more filters later without messy chaining
    filteredProducts = filteredProducts.filter((item) => {
        if (filters.availableProducts) {
            return item.exist   // boolean return is clean & idiomatic
        } else {
            return true         // show all
        }
    })
    
    // Clear previous content
    // Why innerHTML = '' ?
    // → Fastest & simplest way to remove all children
    // → Prevents duplicate items on every re-render
    document.querySelector('#products').innerHTML = ''
    
    // Render each filtered (and sorted) product using helper
    // Why delegate to createProductDOM?
    // → Keeps renderProducts focused on filtering/sorting/loop logic
    // → createProductDOM owns item structure → easy to change layout
    filteredProducts.forEach(function(item) {
        document.querySelector('#products').appendChild(createProductDOM(item))
    })
}

// Helper: Create full DOM structure for one product
const createProductDOM = (product) => {
    const productEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const productItem = document.createElement('a')   // <a> for clickable edit link
    const removeButton = document.createElement('button')

    checkbox.setAttribute('type', 'checkbox')
    // Why checkbox.checked = !product.exist ?
    // → If exist = true (available) → unchecked (not "unavailable")
    // → If exist = false → checked (marks as unavailable)
    // → Visual state matches logical state
    checkbox.checked = !product.exist
    productEl.appendChild(checkbox)

    // Wire up toggle on change
    // Why inside createProductDOM?
    // → Each checkbox gets its own listener with closure over current product.id
    // → No need for event delegation or data-id attributes
    checkbox.addEventListener('change', function(e) {
        toggleProduct(product.id)
        saveProducts(products)          // persist toggle immediately
        renderProducts(products, filters) // refresh UI
    })

    // Make title clickable → opens edit page for this product
    productItem.textContent = product.title
    productItem.setAttribute('href', `./edit-product.html#${product.id}`)
    // Why <a> with href to edit page + #id ?
    // → Clicking title opens edit page → intuitive navigation
    // → Hash (#id) passes product ID → no query params or server needed
    productEl.appendChild(productItem)

    removeButton.textContent = 'Remove'
    productEl.appendChild(removeButton)
    
    // Wire up remove button
    // Why addEventListener here?
    // → Each button knows exactly which product.id to remove (via closure)
    // → Clean, no global event listeners or delegation needed
    removeButton.addEventListener('click', function() {
        removeProduct(product.id)
        saveProducts(products)          // save after removal
        renderProducts(products, filters) // refresh list
    })
    
    return productEl
}

// Helper: Generate Persian relative time message for last edit
const lastEditMessage = (timestamp) => {
    return `Last Edit: ${moment(timestamp).locale('fa').fromNow()}`
    // Why moment(timestamp).locale('fa').fromNow() ?
    // → .fromNow() → "X minutes ago", "2 hours ago", "3 days ago" etc.
    // → .locale('fa') → Persian text: "۵ دقیقه پیش", "۲ ساعت پیش", "۳ روز پیش"
    // → Works because jalali-moment extends moment with Persian locale
    // → Very user-friendly for showing how recently product was modified
}
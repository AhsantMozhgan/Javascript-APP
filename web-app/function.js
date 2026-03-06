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
    return productJSON !== null ? JSON.parse(productJSON) : []
    // Why this ternary alternative?
    // → Very concise one-liner → does the same as if/else above
    // → Common pattern when result is simple
    // → Note: typo in your code → SON.parse should be JSON.parse
    // → Arrow function body with implicit return (no curly braces)
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
// Arrow function with single parameter → parentheses optional but kept for clarity

// Remove a product by its unique id
const removeProduct = (id) => {
    // Find position of product with matching id
    // Why .findIndex()?
    // → Returns numeric index → perfect for .splice()
    // → .find() would return object → harder to remove from array
    const productIndex = products.findIndex(item => item.id === id)
    // Arrow callback → short, implicit return
    
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
    const product = products.find(item => item.id === id)
    // Arrow callback → very concise
    
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
    // → Sorting should apply to full list → then filter the sorted result
    // → Ensures correct order even when filtering is active
    products = sortProduct(products, filters.sortBy)
    
    // First filter: case-insensitive title search
    // Why .toLowerCase() on both?
    // → Users expect "book" to match "Book", "BOOK", "bOoK" → intuitive search
    let filteredProducts = products.filter(item => {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })

    // Second filter: available products only if checkbox checked
    filteredProducts = filteredProducts.filter(item => {
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
    filteredProducts.forEach(item => {
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
    checkbox.checked = !product.exist
    productEl.appendChild(checkbox)

    checkbox.addEventListener('change', e => {
        toggleProduct(product.id)
        saveProducts(products)
        renderProducts(products, filters)
    })

    productItem.textContent = product.title
    productItem.setAttribute('href', `./edit-product.html#${product.id}`)
    productEl.appendChild(productItem)

    removeButton.textContent = 'Remove'
    productEl.appendChild(removeButton)
    
    removeButton.addEventListener('click', () => {
        removeProduct(product.id)
        saveProducts(products)
        renderProducts(products, filters)
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
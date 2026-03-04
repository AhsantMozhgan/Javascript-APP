console.log(uuidv4())

// Helper: Load products from localStorage or return empty array
const getSaveProducts = function() {
    // Attempt to load previously saved products
    const productJSON = localStorage.getItem('products')
    
    // Why check !== null ?
    // → localStorage.getItem returns null when no data was saved yet
    //   (first time visiting the page, storage cleared, incognito mode without persistence, etc.)
    // → Trying JSON.parse(null) would throw "Unexpected token n in JSON at position 0"
    // → This guard clause prevents the entire app from crashing on first load
    if (productJSON !== null) {
        return JSON.parse(productJSON)
        // Why JSON.parse?
        // → localStorage always returns a string (or null)
        // → JSON.parse converts the stored string '[{"title":"Book1","exist":true},...]' 
        //   back into a real JavaScript array of objects
        // → After this line, we can use .push(), .filter(), etc. normally
    } else {
        return []
        // Why return [] instead of undefined or null?
        // → Guarantees consistent return type: always an array
        // → Prevents downstream errors (e.g. products.push() would fail on undefined)
        // → Makes calling code simpler — no extra null checks needed
    }
}

// Helper: Save products array to localStorage
const saveProducts = function(products) {
    // Why JSON.stringify?
    // → localStorage.setItem only accepts strings as values
    // → Without stringify → you'd store "[object Object]" (useless)
    // → JSON.stringify turns the array into a proper JSON string that can be parsed later
    localStorage.setItem('products', JSON.stringify(products))
    
    // Why no try/catch around setItem?
    // → In small learning projects it's often skipped for simplicity
    // → In real applications you would wrap it in try/catch because:
    //   - quota exceeded (storage full)
    //   - private browsing may block persistence
    //   - some browsers throw in certain security contexts
    // → For now it's fine — errors are rare in local dev
}

// Main rendering function: filters data → clears old UI → rebuilds product list
const renderProducts = function(products, filters) {
    // First filter: match search text (case-insensitive)
    // Why .toLowerCase() on both sides?
    // → Users expect case-insensitive search ("book" should find "Book1", "BOOK", etc.)
    // → Very common UX pattern in search features
    let filteredProducts = products.filter(function(item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })

    // Second filter: show only available products when checkbox is checked
    // Why separate .filter() calls instead of one combined condition?
    // → Much more readable and maintainable
    // → Easier to debug (you can log filteredProducts after each step)
    // → Simple to add more filters later without creating a monster condition
    filteredProducts = filteredProducts.filter(function(item) {
        if (filters.availableProducts) {
            return item.exist   // only keep items where exist === true
            // Note: since exist is boolean, returning it directly is clean & idiomatic
            // No need for return item.exist === true
        } else {
            return true         // no restriction — show every item
        }
    })
    
    // Clear previous content
    // Why innerHTML = '' ?
    // → Fastest & simplest way to remove all children for small-to-medium lists
    // → Without clearing → every re-render would append duplicates endlessly
    document.querySelector('#products').innerHTML = ''
    
    // Why use createProductDOM instead of creating elements inline here?
    // → Separation of concerns: renderProducts handles filtering & loop logic
    // → createProductDOM owns the structure of one item → easier to change layout later
    // → Makes code modular: you can test or reuse createProductDOM independently
    filteredProducts.forEach(function(item) {
        document.querySelector('#products').appendChild(createProductDOM(item))
    })
}

// Helper: Create DOM structure for one product item
const createProductDOM = function(product) {
    // Create main container for the product row
    const productEl = document.createElement('div')
    // Why <div> instead of <p>?
    // → More flexible container — allows multiple child elements (checkbox, text, button)
    // → Better semantics for a list item with interactive parts

    // Create checkbox (future use: toggle availability, select for bulk delete, etc.)
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    productEl.appendChild(checkbox)
    // Why add checkbox now even if not wired up?
    // → Prepares the UI for future features without changing layout later
    // → Keeps visual consistency when you add event listeners

    // Create span for the product title
    const productItem = document.createElement('span')
    productItem.textContent = product.title
    productEl.appendChild(productItem)
    // Why <span> for title?
    // → Inline element → good for flowing with checkbox & button
    // → .textContent is safe (escapes HTML) → protects against XSS if titles come from users

    // Create remove button
    const removeButton = document.createElement('button')
    removeButton.textContent = 'Remove'
    productEl.appendChild(removeButton)
    // Why add remove button now?
    // → Sets up the UI for the next logical feature (deleting products)
    // → You can add event listener later without restructuring DOM

    // Return the complete element so renderProducts can append it
    return productEl
}
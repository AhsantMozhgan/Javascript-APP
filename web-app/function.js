// Helper: Load products from localStorage or return empty array
const getSaveProducts = function() {
    // Attempt to load previously saved products
    const productJSON = localStorage.getItem('products')
    // Why check !== null ?
    // → localStorage.getItem returns null when the key doesn't exist (first visit, cleared storage, etc.)
    if (productJSON !== null) {
        return JSON.parse(productJSON)
        // Why JSON.parse?
        // → localStorage only stores strings → we convert the saved JSON string back to real array of objects
    } else {
        return []
        // Why return [] instead of undefined/null?
        // → Consistent return type → caller always gets an array
        // → Prevents errors when doing .push() or .filter() later
    }
}

// Helper: Save products array to localStorage
const saveProducts = function(products) {
    // Why JSON.stringify?
    // → localStorage only accepts strings → we convert array → JSON string
    localStorage.setItem('products', JSON.stringify(products))
    // Why no try/catch here?
    // → In simple learning apps it's often omitted
    // → In production you'd add error handling (quota exceeded, private mode, etc.)
}

// Main rendering function: filters → clears → rebuilds DOM list
const renderProducts = function(products, filters) {
    // First filter: match search text (case-insensitive)
    // Why .toLowerCase() on both sides?
    // → Makes search ignore case ("book" finds "Book1", "BOOK", etc.)
    let filteredProducts = products.filter(function(item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })

    // Second filter: only available products if checkbox is checked
    // Why separate filter call?
    // → Easier to read, debug, and extend than one big complex condition
    filteredProducts = filteredProducts.filter(function(item) {
        if (filters.availableProducts) {
            return item.exist   // only keep items where exist is true
            // Note: item.exist is boolean → return item.exist works directly
        } else {
            return true         // no filtering → show everything
        }
    })
    
    // Clear old content before adding new
    // Why necessary?
    // → Prevents duplicate <p> elements piling up every time we re-render
    document.querySelector('#products').innerHTML = ''
    
    // Why delegate creation to createProductDOM?
    // → Cleaner code: renderProducts focuses on filtering & structure
    // → createProductDOM can be extended later (add classes, buttons, price, etc.)
    filteredProducts.forEach(function(item) {
        document.querySelector('#products').appendChild(createProductDOM(item))
    })
}

// Helper: Create DOM element for one product
const createProductDOM = function(product) {
    const productEl = document.createElement('p')
    productEl.textContent = product.title
    return productEl
    // Why return the element instead of appending directly?
    // → Makes function reusable & testable
    // → renderProducts decides where to put it
}
// ────────────────────────────────────────────────
// Commented-out part: example of how to SAVE an object to localStorage
// ────────────────────────────────────────────────
// const product = {
//     title: 'Book',
//     price:79
// }
// Why create an object first?
// → localStorage is often used to save structured data (not just single strings)

// const productJSON = JSON.stringify(product)
// Why JSON.stringify() is necessary:
// → localStorage can ONLY store strings
// → without stringify → saving object directly would save "[object Object]" (useless)
// → JSON.stringify turns the object into a proper string: '{"title":"Book","price":79}'

// console.log(productJSON)
// → helpful during development to verify what is actually being saved

// localStorage.setItem('product', productJSON)
// Why 'product' as key?
// → clear, descriptive name → easy to understand what this item contains
// → setItem(key, value) is the standard method to store data
// ────────────────────────────────────────────────


// ────────────────────────────────────────────────
// Active code: how to READ and RESTORE data from localStorage
// ────────────────────────────────────────────────
const productJSON = localStorage.getItem('product')
// How getItem works:
// → returns the stored string if key exists
// → returns null if key does not exist (e.g. first visit, storage cleared)

// Why store the result in a variable?
// → makes code easier to read and debug
// → allows checking / parsing in next step

const product = JSON.parse(productJSON)
// How JSON.parse works:
// → converts valid JSON string back into real JavaScript object
// → after this line, product.title and product.price can be accessed normally

// Why no safety check here? (potential issue)
// → if productJSON is null → JSON.parse(null) throws an error → script stops
// → in learning examples this is acceptable, but in real apps you should add:
// if (productJSON) { ... } + try { ... } catch { ... }

console.log(`Title: ${product.title} - Price: ${product.price}`)
// Why template literal (`${}`) instead of + concatenation?
// → much more readable and less error-prone
// → modern JavaScript style (ES6+)
// → output example: Title: Book - Price: 79
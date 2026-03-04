// ────────────────────────────────────────────────
// localStorage Basics: Simple key-value storage in the browser
// Persists even after closing tab/browser (unlike variables that reset on refresh)
// Limit: ~5-10 MB per origin, strings only (numbers, arrays, objects must be converted)
// ────────────────────────────────────────────────

// Example 1: Store a single simple value (string)
// Key = 'product', Value = 'Book'
// Why? Quick way to save one piece of data (e.g. last viewed item, user preference)
localStorage.setItem('product', 'Book')

// Example 2: Retrieve & log the value (for testing/debugging)
// Why console.log? Great way to verify storage worked without UI
// Uncomment when needed:
// console.log(localStorage.getItem('product'))   // → outputs: "Book"

// Example 3: Remove one specific item
// Useful when user logs out, clears preference, etc.
// Uncomment to test:
// localStorage.removeItem('product')

// Example 4: Clear EVERYTHING in localStorage for this site
// Why .clear()? Nuclear option – use carefully!
// Good for "Reset app" button or during development to start fresh
localStorage.clear()

// ────────────────────────────────────────────────
// IMPORTANT: For your Book Store app – how to store the PRODUCTS array properly
// localStorage ONLY stores STRINGS → you MUST use JSON.stringify() and JSON.parse()
// This is the #1 mistake beginners make (trying to save array/object directly)
// ────────────────────────────────────────────────

// Correct pattern for saving your products array:
// 1. When adding a product → after push():
// localStorage.setItem('products', JSON.stringify(products));

// 2. When page loads → restore from storage:
// const saved = localStorage.getItem('products');
// const products = saved ? JSON.parse(saved) : [];   // fallback to empty array if nothing saved

// 3. Why this pattern?
// - JSON.stringify(products) → turns [{title:"Book1", exist:true}, ...] into string
// - JSON.parse() → turns string back into real array of objects
// - Without JSON → localStorage.setItem('products', products) would save "[object Object]"
// - Using || [] or ternary prevents errors on first visit (no data yet)

// Bonus best practice for your app:
// - Call save after every change (add product, future delete/edit)
// - Load once on page start (before first renderProducts())
// - Example helper functions:

// function saveProducts() {
//     localStorage.setItem('products', JSON.stringify(products));
// }

// function loadProducts() {
//     const saved = localStorage.getItem('products');
//     return saved ? JSON.parse(saved) : [];
// }

// Then in your code:
// const products = loadProducts();           // at top
// ... after push(...): saveProducts();       // in submit handler
// ... after any future delete/edit: saveProducts();
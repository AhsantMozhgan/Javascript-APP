// This is a minimal starting point for handling the sort dropdown.
// It currently only logs the selected value — perfect for testing/debugging.

// ────────────────────────────────────────────────
// Listen for changes on the sort dropdown
// ────────────────────────────────────────────────
document.querySelector("#sort").addEventListener('change', function(e) {
    // e.target = the <select> element that triggered the event
    // e.target.value = the value attribute of the chosen <option>
    console.log("User selected sort option:", e.target.value);
    
    // ── Why console.log here? ──
    // Great for development: quickly verify the event fires and value is read correctly
    // Later you'll replace this with real sorting logic
    
    // Next steps (what you'll probably add soon):
    // 1. Read current products array
    // 2. Sort it based on e.target.value
    // 3. Re-render the list (call renderProducts(products, filters))
});

// ────────────────────────────────────────────────
// Example: How you would implement actual sorting later
// (commented out for now – add when ready)
//
// function sortProducts() {
//     const sortBy = document.querySelector("#sort").value;
//     
//     if (sortBy === "byCreated") {
//         // Assume each product has a createdAt: Date or ISO string
//         products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first
//     } 
//     else if (sortBy === "byEdited") {
//         // Assume each product has an updatedAt: Date or ISO string
//         products.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // most recently edited first
//     }
//     
//     renderProducts(products, filters); // re-draw the UI with sorted list
// }
// 
// Why Date subtraction works for sorting?
// → new Date() gives timestamp (ms since 1970)
// → Subtracting gives positive/negative → sort() uses that to order
// → For descending (newest first): b - a
// → For strings in ISO format (e.g. "2025-03-01"), you can even sort lexicographically without Date objects (faster)
//
// Tip: Add timestamps when creating products:
// products.push({
//     title: title,
//     exist: true,
//     createdAt: new Date().toISOString(),   // or just new Date()
//     updatedAt: new Date().toISOString()
// });
// Update updatedAt whenever you edit a product
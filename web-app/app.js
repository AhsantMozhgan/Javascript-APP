// Create an array of product objects, each with a title and a Boolean 'exist' property
// 'exist: true' means the product is available; 'exist: false' means it's not in stock
const productItems = [
  { title: 'Book1', exist: true },
  { title: 'Book2', exist: false },
  { title: 'Book3', exist: true },
  { title: 'Book4', exist: false }
]

// Filter the array to only include products where 'exist' is true
// This creates a new array containing the products that are available
const availableProducts = productItems.filter(function(item) {
  return item.exist === true
})

// Create a new <h2> element to display the number of available products
const message = document.createElement('h2')

// Use template literal to insert the count of available products dynamically
message.textContent = `Number of available products: ${availableProducts.length}`

// Append the <h2> element to the <body> of the HTML document
// This makes the summary visible on the webpage
document.querySelector('body').appendChild(message)

// Loop through all products (both available and unavailable)
productItems.forEach(function(item) {
  // Create a <p> element for each product title
  const p = document.createElement('p')
  p.textContent = item.title
  
  // Add each <p> element to the <body> so all product titles appear on the page
  document.querySelector('body').appendChild(p)
})

document.querySelector('#add-product-form').addEventListener('submit', function(e) {
    e.preventDefault()
    // e.target.elements.productTitle.value
    console.log(e.target.elements.productTitle.value)
    e.target.elements.productTitle.value = ''
})

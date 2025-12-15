const cartItems = ['book1', 'book2', 'book3', 'book4']

cartItems.forEach(function(item) {
    console.log(item)
}) 


cartItems.forEach(function(item, index) {
    console.log(item)
    console.log(index)
}) 
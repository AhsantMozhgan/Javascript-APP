const cartItems = ['book1', 'book2', 'book3', 'book4']
// cartItems.push('book5')
// cartItems.pop()
// cartItems.unshift('first Item')     //[ 'first Item', 'book1', 'book2', 'book3', 'book4' ]
// cartItems.shift()                   //[ 'book1', 'book2', 'book3', 'book4' ]

// cartItems.splice(0, 2)   //[ 'book3', 'book4' ]
// cartItems.splice(1, 2)      //[ 'book1', 'book4' ]
// cartItems.splice(1, 2, 'New Item')      //[ 'book1', 'New Item', 'book4' ]
cartItems.splice(0, 2, 'New Item')      //[ 'New Item', 'book3', 'book4' ]

cartItems[2] = 'New Item'   //[ 'New Item', 'book3', 'New Item' ]      

console.log(cartItems)

const cartItems = ['book1', 'book2', 'book3', 'book4']

for (let count = 0; count < cartItems.length; count++) {
    // console.log(cartItems[count])
    const num = count + 1
    const productName = cartItems[count]
    console.log(`${num} - product Name: ${productName}`)
}
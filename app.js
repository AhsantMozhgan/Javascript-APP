const cartItems = [{
    title: 'Book1',
    price: 29
}, {
    title: 'Book2',
    price: 59
}, {
    title: 'Book3',
    price: 79
}]

// const indexValue = cartItems.findIndex(function(item, index) {
//     return item.title === 'book2'
// })
// console.log(indexValue)     //1

const findProducts = function(cart, productTitle) {
    const indexValue = cart.findIndex(function(item, index) {
        // return item.title === productTitle
        return item.title.toLowerCase() === productTitle
    })
    return cart[indexValue]
}
const result = findProducts(cartItems, 'book3')
console.log(result)
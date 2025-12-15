const productItems = [{
    title: 'Book1',
    exist: true
}, {
    title: 'Book2',
    exist: false
}, {
    title: 'Book3',
    exist: true
}, {
    title: 'Book4',
    exist: false
}]

// const numbers = [12, 22, 9, 3, 2]
// const filteredNumbers = numbers.filter(function(item) {
//     return item >= 10
// })
// console.log(filteredNumbers)    //[ 12, 22 ]

const productNotExist = function(products) {
    return products.filter(function(item) {
        // return item.exist === false
        return !item.exist
    })
}
let result = productNotExist(productItems)
console.log(result) //[ { title: 'Book2', exist: false }, { title: 'Book4', exist: false } ]
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

const sortProduct = function(products) {
    products.sort(function(a, b) {
        if (a.exist === true && b.exist === false) {
            return -1
        } else if (b.exist === true && a.exist === false) {
            return 1
        } else {
            return 0
        }
    })
}
sortProduct(productItems)
console.log(productItems)   //   { title: 'Book1', exist: true },
                            //   { title: 'Book3', exist: true },
                            //   { title: 'Book2', exist: false },
                            //   { title: 'Book4', exist: false }
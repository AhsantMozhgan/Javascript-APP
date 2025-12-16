// const p = document.querySelector('p')
// // console.log(p)

// p.remove()

const ps = document.querySelectorAll('p')
// console.log(ps)

ps.forEach(function(item) {
    // item.remove()
    // console.log(item.textContent)
    item.textContent = 'Update p'
})
// how does this JavaScript code remove 'JS' from certain paragraphs from a webpage(web-app)?
const paragraphs = document.querySelectorAll('p')

paragraphs.forEach(function(item) {
    if (item.textContent.includes('JS')) {
        item.remove()
    }
})
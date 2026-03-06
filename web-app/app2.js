const getBtn = document.querySelector('#get-btn')
const postBtn = document.querySelector('#post-btn')
// Why querySelector('#id') ?
// → Selects elements by unique id → fast & reliable
// → Stored in variables → cleaner code, reusable references
// → Makes event listener attachment simple and readable

sendHttpRequest = (method, url, data) => {
    // Why this reusable function?
    // → Central place for all HTTP requests → DRY (Don't Repeat Yourself)
    // → Works for both GET and POST (and other methods)
    // → Returns a Promise → perfect for .then() chaining or async/await

    return fetch(url)
    // Why fetch(url) ?
    // → Modern browser API for HTTP requests (replaces XMLHttpRequest)
    // → Returns a Promise → resolves to Response object
    // → Simpler syntax than XHR → no need for xhr.open / xhr.send
    // → Note: method & data parameters are not used yet → see below

        .then(res => {
            return res.json()
            // Why res.json() ?
            // → Response object has .json() method → parses body as JSON
            // → Returns another Promise → resolves to JS object/array
            // → Most APIs (like JSONPlaceholder) return JSON → very common
        })
    // Why no .catch() here?
    // → Left to caller → getData/postData can handle errors individually
    // → Makes sendHttpRequest generic & reusable
}

// GET example using Fetch + Promise
const getData = () => {
    sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts/1')
        .then(responseData => {
            console.log(responseData)
            // Why .then(responseData => ...) ?
            // → Runs when fetch + res.json() succeeds
            // → responseData = parsed JSON object → e.g. { id: 1, title: "...", body: "..." }
            // → JSONPlaceholder /posts/1 returns one sample post
        })
        // Why no .catch() here?
        // → Optional → network errors will still show in console
        // → In real app: add .catch(err => console.error('GET failed:', err))
}

// POST example (placeholder — your challenge to implement)
const postData = () => {
    // Empty for now → your task to complete
    // → Typical POST with fetch:
    // sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', {
    //     title: 'New Post',
    //     body: 'This is the content',
    //     userId: 1
    // })
    // .then(res => console.log('Created:', res))
    // .catch(err => console.log('POST error:', err))
}
// Why postData is empty?
// → Placeholder → you need to fill it to send POST request
// → JSONPlaceholder supports fake POST → returns created object with new id
// → To send data: pass third argument (object) to sendHttpRequest
// → Fetch automatically handles JSON.stringify + Content-Type header

getBtn.addEventListener('click', getData)
postBtn.addEventListener('click', postData)
// Why addEventListener('click', ...) ?
// → Attaches click handler → runs getData/postData when button clicked
// → Modern & preferred over onclick="..." in HTML
// → Clean separation: HTML = structure, JS = behavior
const getBtn = document.querySelector('#get-btn')
const postBtn = document.querySelector('#post-btn')
// Why querySelector('#id') ?
// → Selects elements by unique id → fast & reliable
// → Stored in variables → cleaner code, reusable references
// → Makes event listener attachment simple and readable

sendHttpRequest = (method, url, data) => {
    // Why this reusable function?
    // → Central place for all HTTP requests → DRY (Don't Repeat Yourself)
    // → Works for GET, POST, PUT, DELETE — just change method & data
    // → Returns Promise → perfect for .then() chaining or async/await

    return fetch(url, {
        method: method,
        // Why method: method ?
        // → Dynamically sets HTTP method ('GET', 'POST', etc.)
        // → Passed as first argument → very flexible

        body: JSON.stringify(data),
        // Why JSON.stringify(data) ?
        // → Converts JS object to JSON string → required for POST/PUT body
        // → For GET → data is undefined → body becomes undefined (ignored)
        // → Fetch automatically skips body for GET/HEAD

        headers: data ? {'Content-Type': 'application/json'} : {}
        // Why conditional headers?
        // → Only set 'Content-Type' when sending data (POST/PUT)
        // → GET requests don't need it → empty object {} is safe
        // → Tells server the body is JSON → JSONPlaceholder expects this
    })

        .then(res => {
            return res.json()
            // Why res.json() ?
            // → Response object has .json() method → parses body as JSON
            // → Returns another Promise → resolves to JS object/array
            // → Most APIs (like JSONPlaceholder) return JSON → very common
            // → If not JSON → would reject → can be caught later
        })
    // Why no .catch() here?
    // → Left to caller → getData/postData can handle errors individually
    // → Makes sendHttpRequest generic & reusable
    // → Network errors or bad status still propagate to .catch()
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

// POST example (now implemented)
const postData = () => {
    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', {
        userId: 2,
        id: 2,
        title: 'Post Title',
        body: 'Post Body'
        // Why this data object?
        // → Matches JSONPlaceholder expected format for /posts
        // → Fake POST → server returns similar object with new id (usually 101)
        // → Shows how to send real JSON body
    })
    .then(responseData => console.log('Created:', responseData))
    // → responseData = { userId: 2, id: 101, title: 'Post Title', body: 'Post Body' }
    // → id auto-incremented by server → proves POST worked
    .catch(err => console.log('POST error:', err))
    // → Catches network errors, CORS, invalid JSON, etc.
}

getBtn.addEventListener('click', getData)
postBtn.addEventListener('click', postData)
// Why addEventListener('click', ...) ?
// → Attaches click handler → runs getData/postData when button clicked
// → Modern & preferred over onclick="..." in HTML
// → Clean separation: HTML = structure, JS = behavior
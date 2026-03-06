const getBtn = document.querySelector('#get-btn')
const postBtn = document.querySelector('#post-btn')
// Why querySelector('#id') ?
// → Selects elements by unique id → fast & reliable
// → Stored in variables → cleaner code, reusable references

const sendHttpsRequest = (method, url, data) => {
    // Why function with 3 parameters?
    // → method: 'GET' or 'POST' (or others)
    // → url: target endpoint
    // → data: optional body for POST/PUT (undefined for GET)
    // → Reusable for any HTTP request type

    const promise = new Promise((resolve, reject) => {
        // Why new Promise(...) ?
        // → Wraps old callback-based XHR into modern Promise API
        // → Allows .then() / .catch() chaining or async/await
        // → Makes code linear & readable

        const xhr = new XMLHttpRequest()
        // Why XMLHttpRequest() ?
        // → Classic browser API for HTTP requests (pre-Fetch era)
        // → Still useful for learning low-level HTTP or legacy support

        xhr.open(method, url)
        // Why xhr.open(method, url) ?
        // → Configures request method ('GET', 'POST') and URL
        // → Does NOT send yet — just prepares

        xhr.responseType = 'json'
        // Why responseType = 'json' ?
        // → Automatically parses response as JSON
        // → xhr.response becomes JS object → no need for JSON.parse()

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json')
            // Why setRequestHeader?
            // → Tells server we're sending JSON data
            // → Only needed for POST/PUT with body
            // → JSONPlaceholder requires this for POST
        }

        xhr.onload = () => {
            resolve(xhr.response)
            // Why resolve(xhr.response) ?
            // → Success (status 200-299) → fulfills Promise
            // → Passes parsed JSON to .then()
            // → xhr.onload fires when response is fully received
        }

        xhr.onerror = () => {
            reject('Error')
            // Why reject('Error') ?
            // → Network error, CORS, timeout, etc. → rejects Promise
            // → Triggers .catch() → graceful error handling
            // → Could be improved: reject(xhr.statusText || 'Network Error')
        }

        xhr.send(JSON.stringify(data))
        // Why xhr.send(JSON.stringify(data)) ?
        // → Sends request to server
        // → For GET → data is undefined → send() with no argument
        // → For POST → converts JS object → JSON string → sends as body
        // → Must be after setRequestHeader for Content-Type
    })

    return promise
    // Why return promise?
    // → Lets caller use .then() / .catch() or await
    // → Turns callback-style XHR into Promise-based API
}

// GET example using Promise
const getData = () => {
    sendHttpsRequest('GET', 'https://jsonplaceholder.typicode.com/posts/1')
        .then(res => {
            console.log(res)
            // Why .then(res => ...) ?
            // → Runs when Promise resolves → res = parsed JSON object
            // → JSONPlaceholder /posts/1 returns { userId, id, title, body }
        })
        .catch(err => {
            console.log(err)
            // Why .catch(err => ...) ?
            // → Runs on reject (network error, 404, etc.)
            // → Handles failures → prevents unhandled rejection
        })
}

// POST example (now implemented)
const postData = () => {
    sendHttpsRequest('POST', 'https://jsonplaceholder.typicode.com/posts', {
        userId: 2,
        id: 2,
        title: 'Post Title',
        body: 'Post Body'
        // Why this data object?
        // → Matches JSONPlaceholder expected format
        // → Fake POST → server returns similar object with new id
    })
        .then(res => console.log('Created:', res))
        // → res = { userId: 2, id: 101, title: 'Post Title', body: 'Post Body' }
        // → id usually becomes 101 (JSONPlaceholder auto-increments)
        .catch(err => console.log('POST error:', err))
}
// Why send data as object?
// → sendHttpsRequest converts to JSON string automatically
// → setRequestHeader('Content-Type', 'application/json') tells server
// → JSONPlaceholder echoes back the sent data + new id

getBtn.addEventListener('click', getData)
postBtn.addEventListener('click', postData)
// Why addEventListener('click', ...) ?
// → Runs getData/postData when button clicked
// → Modern & clean → preferred over onclick="..." in HTML
const getBtn = document.querySelector('#get-btn')
const postBtn = document.querySelector('#post-btn')
// Why querySelector('#id') ?
// → Selects elements by unique id → fast & reliable
// → Stored in variables → cleaner code, reusable references

const sendHttpsRequest = (method, url) => {
    // Why this reusable function?
    // → Wraps XMLHttpRequest in a Promise → modern & cleaner async handling
    // → Can be used for both GET & POST (and other methods)
    // → Avoids repeating XHR setup code everywhere
    // → Makes code more readable & maintainable

    const promise = new Promise((resolve, reject) => {
        // Why new Promise((resolve, reject) => { ... }) ?
        // → Creates Promise that controls success/failure
        // → resolve(value) → fulfills promise → triggers .then()
        // → reject(error) → rejects promise → triggers .catch()
        // → Bridge between old XHR callbacks and modern Promise/async-await

        const xhr = new XMLHttpRequest()
        // Why XMLHttpRequest() ?
        // → Classic browser API for HTTP requests (pre-Fetch era)
        // → Gives full control: method, headers, responseType, error handling

        xhr.open(method, url)
        // Why xhr.open(method, url) ?
        // → Initializes request: 'GET'/'POST', target URL
        // → Does NOT send request yet — just configures

        xhr.responseType = 'json'
        // Why responseType = 'json' ?
        // → Automatically parses response as JSON
        // → xhr.response becomes JS object/array → no manual JSON.parse()
        // → Very convenient for JSON APIs

        xhr.onload = () => {
            resolve(xhr.response)
            // Why resolve(xhr.response) ?
            // → Success → passes parsed JSON to .then() handler
            // → xhr.onload fires on successful responses (status 200-299)
        }

        xhr.onerror = () => {
            reject('Error')
            // Why reject('Error') ?
            // → Network error, timeout, CORS issue, etc. → triggers .catch()
            // → Simple string error here — could be more detailed (xhr.status, xhr.statusText)
        }

        xhr.send()
        // Why xhr.send() ?
        // → Actually sends the request to server
        // → For GET → no body → send() with no arguments
        // → For POST → send(JSON.stringify(data))
    })

    return promise
    // Why return the Promise?
    // → Allows caller to chain .then() / .catch() or await it
    // → Turns old callback-style XHR into Promise-based API
}

// GET example using Promise
const getData = () => {
    // sendHttpsRequest('GETs', 'https://jsonplaceholder.typicode.com/posts/1') //Error
    // Why 'GETs' typo was commented out?
    // → Shows common mistake → 'GETs' is invalid → would fail silently
    // → Correct method is 'GET'

    sendHttpsRequest('GETc', 'https://jsonplaceholder.typicode.com/posts/1')
        .then(res => {
            console.log(res)
            // Why .then(res => ...) ?
            // → Runs when Promise resolves → res = parsed JSON from API
            // → JSONPlaceholder returns post object → e.g. { id: 1, title: "...", body: "..." }
        })
        .catch(err => {
            console.log(err)
            // Why .catch(err => ...) ?
            // → Runs on reject (network error, 404, etc.)
            // → Handles failures gracefully → no uncaught promise error
        })
}

// POST example (placeholder — your challenge to implement)
const postData = () => {
    // Empty for now → your challenge to implement POST
    // → Typical POST with XHR + Promise:
    //   sendHttpsRequest('POST', 'https://jsonplaceholder.typicode.com/posts')
    //     .then(res => console.log('Created:', res))
    //     .catch(err => console.log('POST error:', err))
    // → To send data:
    //   xhr.setRequestHeader('Content-Type', 'application/json')
    //   xhr.send(JSON.stringify({ title: 'New Post', body: 'Content...' }))
}
// Why postData is empty?
// → Placeholder → you need to fill it to send POST request
// → JSONPlaceholder supports fake POST → returns created object with id

getBtn.addEventListener('click', getData)
postBtn.addEventListener('click', postData)
// Why addEventListener('click', ...) ?
// → Attaches click handler → runs getData/postData when button clicked
// → Modern & preferred over onclick="..." in HTML
// → Clean separation: HTML = structure, JS = behavior
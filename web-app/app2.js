const getBtn = document.querySelector('#get-btn')
const postBtn = document.querySelector('#post-btn')
// Why querySelector('#id') ?
// → Selects elements by unique id → fast & reliable
// → Stored in variables → cleaner code, reusable references

const getData = () => {
    const xhr = new XMLHttpRequest()
    // Why new XMLHttpRequest() ?
    // → Classic way to make HTTP requests in browser (before fetch)
    // → Allows full control: GET/POST, headers, progress, etc.
    // → Still used in legacy code or when fetch is not available

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1')
    // Why xhr.open('GET', url) ?
    // → Configures request: method = GET, URL = JSONPlaceholder test API
    // → JSONPlaceholder is fake REST API → perfect for learning/testing
    // → /posts/1 → returns one sample post object

    xhr.responseType = 'json'
    // Why responseType = 'json' ?
    // → Tells XHR to automatically parse response as JSON
    // → xhr.response becomes JavaScript object → no need for JSON.parse()
    // → Very convenient (otherwise response is string)

    xhr.onload = () => {
        console.log(xhr.response)
        // Why xhr.onload ?
        // → Event fires when response is fully received (status 200-299)
        // → xhr.response → parsed JSON object (thanks to responseType)
        // → In real app: you would update DOM here (e.g. show post title/body)
    }

    xhr.send()
    // Why xhr.send() ?
    // → Actually sends the request to server
    // → For GET → no body → send() with no arguments
    // → For POST/PUT → send(JSON.stringify(data))
}
// Why getData as arrow function?
// → No this binding needed → safe & concise
// → Modern style → common for event handlers

const postData = () => {
    // Empty for now → your challenge to implement POST
    // → Typical POST with XHR:
    //   xhr.open('POST', url)
    //   xhr.setRequestHeader('Content-Type', 'application/json')
    //   xhr.send(JSON.stringify({ title: '...', body: '...' }))
}
// Why postData is empty?
// → Placeholder → you need to fill it to send POST request
// → Next step: implement POST to https://jsonplaceholder.typicode.com/posts

getBtn.addEventListener('click', getData)
postBtn.addEventListener('click', postData)
// Why addEventListener('click', ...) ?
// → Attaches click handler → runs getData/postData when button clicked
// → Modern & preferred over onclick="..." in HTML
// → Clean separation: HTML = structure, JS = behavior
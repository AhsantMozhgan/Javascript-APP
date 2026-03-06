const getBtn = document.querySelector('#get-btn')
const postBtn = document.querySelector('#post-btn')
// Why querySelector('#id') ?
// → Selects buttons by their unique id → very fast & reliable
// → Stored in variables → code becomes cleaner and more readable
// → Makes attaching event listeners simple and maintainable

const getData = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
    // Why axios.get(...) ?
    // → Axios is a very popular Promise-based HTTP client
    // → Automatically handles:
    //   - JSON parsing (res.data is already JS object)
    //   - 'Content-Type' header for POST
    //   - Rejects on non-2xx status (unlike fetch)
    // → Much simpler syntax than fetch or XMLHttpRequest

    .then(res => {
        console.log(res)
        // Why res instead of res.data?
        // → Axios response object has many useful fields:
        //   res.data     → the actual JSON payload (most used)
        //   res.status   → HTTP status code (200, 201, etc.)
        //   res.statusText → "OK", "Created", etc.
        //   res.headers  → response headers
        //   res.config   → request config
        // → Logging whole res → good for learning Axios structure
        // → In real app: usually console.log(res.data) or use res.data directly
    })
    // Why no .catch() here?
    // → Optional for demo → network/404 errors will show as unhandled rejection in console
    // → In real app: add .catch(err => console.error('GET failed:', err.message || err))
}

// POST example using Axios
const postData = () => {
    axios.post('https://jsonplaceholder.typicode.com/posts', {
        userId: 2,
        id: 2,
        title: 'Post Title',
        body: 'Post Body'
        // Why pass object directly as second argument?
        // → Axios automatically:
        //   - JSON.stringify(data)
        //   - Sets 'Content-Type': 'application/json'
        //   - Sends as request body
        // → Much simpler than fetch or XHR
        // → JSONPlaceholder fake API expects this format
    }).then(res => {
        console.log(res)
        // What does res contain on POST?
        // → res.data = { userId: 2, id: 101, title: 'Post Title', body: 'Post Body' }
        // → id usually becomes 101 (JSONPlaceholder auto-increments)
        // → res.status = 201 (Created)
        // → Shows POST was successful
    })
    // Why no .catch() here?
    // → Optional for demo → same as getData
    // → In production: add .catch(err => console.error('POST failed:', err.message || err))
}

getBtn.addEventListener('click', getData)
postBtn.addEventListener('click', postData)
// Why addEventListener('click', ...) ?
// → Attaches click handler → runs getData/postData when button is clicked
// → Modern & preferred over onclick="..." in HTML
// → Clean separation: HTML = structure, JS = behavior
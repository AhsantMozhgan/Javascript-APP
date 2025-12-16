// Example of a 'change' event listener (commented out):
// The 'change' event triggers only when the input loses focus *and* its value was modified.
// document.querySelector('#search-products').addEventListener('change', function(e) {
//     // console.log(e)  // You can log the full event object to inspect details.
//     console.log(e.target.value) // Logs the final input value after the user is done editing.
// })


// Active event listener using 'input':
// 1. Select the input element with the ID "search-products".
// 2. Listen for the 'input' event, which triggers instantly whenever the user types, deletes, or pastes text.
document.querySelector('#search-products').addEventListener('input', function(e) {

    // 3. e.target represents the input field that triggered the event.
    // 4. e.target.value gives the current text inside the input field.
    //    Logging it shows the live search term as the user types.
    console.log(e.target.value)
})

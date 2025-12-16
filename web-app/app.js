// 1. Select the first <button> element on the page.
//    document.querySelector('button') grabs the first button it finds in the HTML document.
document.querySelector('button').addEventListener('click', function(e) {

    // 2. This function runs every time the button is clicked.
    //    The 'e' parameter represents the event object that gives details about the click (like which element was clicked).
    
    // console.log(e) // (Optional) You can uncomment this to inspect the event details in the browser console.

    // 3. Change the text displayed on the button.
    //    e.target refers to the HTML element that triggered the event — here, the button.
    //    Setting textContent replaces the button’s text with 'New Value'.
    e.target.textContent = 'New Value'
})

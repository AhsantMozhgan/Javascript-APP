let getUserInfo = function(name, id) {
    return `Name: ${name} - ID: ${id}`
}

let showResult = getUserInfo('Mozhan', 22)
// Does not return default values
console.log(showResult)     // Name: Mozhan ID: 22
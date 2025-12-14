// let userInfo = {
//     userId: 22,
//     userName: 'Mozhgan',
//     role: 'Admin'
// }
// console.log(`user role is: ${userInfo.role}`)        // user role is: Admin

let userInfoOne = {
    userId: 22,
    username: 'Mozhy',
    role: 'Admin'
}

let userInfoTwo = {
    userId: 12,
    username: 'Test',
    role: 'User'
}

let fetchUserData = function(user) {
    console.log(`Username is: ${user.username}`)
}
fetchUserData(userInfoOne)  // Mozhy
fetchUserData(userInfoTwo)  // Test
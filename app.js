// let course = {
//     name: 'Advance JS',
//     studentLimit: 30,
//     studentCount: 0,
//     checkAvailability: function(courseSize) {
//         console.log(courseSize)
//     }
// }

// course.checkAvailability(20)       // 20

//OR
// let course = {
//     name: 'Advance JS',
//     studentLimit: 30,
//     studentCount: 0,
//     checkAvailability: function(courseSize) {
//         // console.log(courseSize)
//         return true
//     }
// }

// let status1 = course.checkAvailability(20)
//  console.log(status1)    //true

// //OR
// let course = {
//     name: 'Advance JS',
//     studentLimit: 30,
//     studentCount: 0,
//     checkAvailability: function(courseSize) {
//         console.log(this.name)
//         return true
//     }
// }

// let status1 = course.checkAvailability(20)
//  console.log(status1)    // Advance JS
//                         // true

//OR
let course = {
    name: 'Advance JS',
    studentLimit: 30,
    studentCount: 0,
    checkAvailability: function(courseSize) {
        let leftCount = this.studentLimit - this.studentCount
        return courseSize <= leftCount
    }
}

let status1 = course.checkAvailability(20)
 console.log(status1)    // true

 let status2 = course.checkAvailability(35)
 console.log(status2)    // false
                    
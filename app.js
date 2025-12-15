// This code builds an account object that tracks multiple income and outgo items, then summarizes them.

// Write JavaScript code that:

// - Creates an object named `account` with these properties:  
//   - `name` set to `'Mozhgan'`  
//   - `outgo` as an empty array  
//   - `income` as an empty array  
//   - A method `addOutgo(description, amount)` that adds an object with `description` and `amount` to the `outgo` array  
//   - A method `addIncome(description, amount)` that adds an object with `description` and `amount` to the `income` array  
//   - A method `getAccounSummary()` that:
//     - Calculates total outgo and total income  
//     - Calculates the balance as income minus outgo  
//     - Returns a summary string in this format:  
//       `Mozhgan - Balance: 902, Income: 1000, Outgo: 98`  

// - Uses the methods to:  
//   - Add an outgo `'cafe'` with amount `39`  
//   - Add an outgo `'book'` with amount `59`  
//   - Add an income `'job'` with amount `1000`  

// - Logs the result of `account.getAccounSummary()` to the console.


const account = {
    name: 'Mozhgan',
    outgo: [],
    income: [],
    addOutgo: function(description, amount) {
        this.outgo.push({
            description: description,
            amount: amount
        })
    },
    addIncome: function(description, amount) {
        this.income.push({
            description: description,
            amount: amount
        })
    },
    getAccounSummary: function() {
        let totalOutgo = 0
        let totalIncom = 0
        let accountBalance = 0
        this.outgo.forEach(function(item) {
            totalOutgo = totalOutgo + item.amount
        })
        this.income.forEach(function(item) {
            totalIncom = totalIncom + item.amount
        })
        accountBalance = totalIncom - totalOutgo
        return (
            `${this.name} - Balance: ${accountBalance}, Income: ${totalIncom}, Outgo: ${totalOutgo}   `
        )
    }
}


account.addOutgo('cafe', 39)
account.addOutgo('book', 59)
account.addIncome('job', 1000)
console.log(account.getAccounSummary())
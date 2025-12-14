let userAccount = {
    fullName: 'MozhganAhsant',
    outgo: 0,
    income: 0
}

let addOutgo = function(account, amount) {
    account.outgo = account.outgo + amount
}

let addIncome = function(account, income) {
    account.income = account.income + income
}

let getAccountdata = function(account) {
    let balance = account.income - account.outgo
    return `Account Name: ${account.fullName} - Balance: ${balance}`
}

addIncome(userAccount, 2000)
addOutgo(userAccount, 160)
addOutgo(userAccount, 200)

console.log(getAccountdata(userAccount))    // Account Name: MozhganAhsant - Balance: 1640
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountExpenses = void 0;
const expense_1 = require("./expense");
const business_expense_1 = require("./business_expense");
class AccountExpenses {
    constructor(id) {
        this.id = id;
        this.expenseList = [];
    }
    addExpense(expense) {
        console.log(`Adding new expense ...`);
        this.expenseList.push(expense);
    }
    print() {
        for (let e of this.expenseList) {
            if (e instanceof expense_1.Expense) {
                console.log(`${e.name}, ${e.amount} CHF`);
            }
        }
        /*
        Note: the for-of syntax is equivalent to:
        for (let i in this.expenseList) {
            console.log(this.expenseList[i].name, this.expenseList[i].amount);
        }
        */
    }
}
exports.AccountExpenses = AccountExpenses;
let a = new AccountExpenses(0);
let e = new business_expense_1.BusinessExpense();
e.name = "Flux compensation";
e.amount = 42.41;
//a.addExpense(e);
//a.print();

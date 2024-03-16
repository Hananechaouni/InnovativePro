import { Expense } from "../model/expense";
import { AccountExpenses } from "../model/account_expenses";
import { DataAccess } from "./data_access";

export class ExpenseCtrl {

    static dataAccess: DataAccess = new DataAccess();
    static accountExpenses: AccountExpenses = new AccountExpenses(0);

    static async addExpense(e: Expense) {
        ExpenseCtrl.accountExpenses.addExpense;
        await DataAccess.connect();
        await DataAccess.createExpense(e);
    }
    static async getExpenses() {
        await DataAccess.connect();
        ExpenseCtrl.accountExpenses.expenseList = await DataAccess.readExpenses();
        return ExpenseCtrl.accountExpenses.expenseList;
    }
}

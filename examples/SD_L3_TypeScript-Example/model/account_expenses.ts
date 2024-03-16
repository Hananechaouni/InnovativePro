import { Expense } from './expense';
import { BusinessExpense } from './business_expense';
import { ConsumerExpense } from './consumer_expense';
import { IExpense } from './iexpense';

export class AccountExpenses {
    private id: number;
    expenseList: IExpense[];
    constructor(id: number) {
        this.id = id;
        this.expenseList = [];
    }
    addExpense(expense: IExpense): void {
        console.log(`Adding new expense ...`);
        this.expenseList.push(expense);
    }        
    print(): void {
        for (let e of this.expenseList) {
            if (e instanceof Expense) {
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
let a = new AccountExpenses(0);
let e : Expense = new BusinessExpense();
e.name = "Flux compensation";
e.amount = 42.41;
//a.addExpense(e);
//a.print();

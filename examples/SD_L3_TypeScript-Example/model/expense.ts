import { IExpense } from "./iexpense";

export class Expense implements IExpense {
    protected id: number;
    name: string;
    amount: number;
    category: string;
    tip: number;
    constructor() {
        this.id = 0;
        this.name = "";
        this.amount = 0;
        this.category = "";
        this.tip = 0;
    }
    addTip(tip: number): void {
        console.log(`adding tip ${tip} to expense amount ...`);
        this.amount += tip;
        this.tip = tip;
        console.log(`new expense amount: ${this.amount}`);
    }
    setId(id: number) {
        if (id == 0) {
            this.id = id;
        }
    }
}

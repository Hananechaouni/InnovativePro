"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
class Expense {
    constructor() {
        this.id = 0;
        this.name = "";
        this.amount = 0;
        this.category = "";
        this.tip = 0;
    }
    addTip(tip) {
        console.log(`adding tip ${tip} to expense amount ...`);
        this.amount += tip;
        this.tip = tip;
        console.log(`new expense amount: ${this.amount}`);
    }
    setId(id) {
        if (id == 0) {
            this.id = id;
        }
    }
}
exports.Expense = Expense;

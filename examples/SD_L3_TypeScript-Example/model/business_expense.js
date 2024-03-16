"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessExpense = void 0;
const expense_1 = require("./expense");
class BusinessExpense extends expense_1.Expense {
    constructor() {
        super();
        this.tripId = 0;
    }
    setBusinessTrip(tripId) {
        this.tripId = tripId;
    }
}
exports.BusinessExpense = BusinessExpense;

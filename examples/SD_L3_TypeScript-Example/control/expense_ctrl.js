"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCtrl = void 0;
const account_expenses_1 = require("../model/account_expenses");
const data_access_1 = require("./data_access");
class ExpenseCtrl {
    static addExpense(e) {
        return __awaiter(this, void 0, void 0, function* () {
            ExpenseCtrl.accountExpenses.addExpense;
            yield data_access_1.DataAccess.connect();
            yield data_access_1.DataAccess.createExpense(e);
        });
    }
    static getExpenses() {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_access_1.DataAccess.connect();
            ExpenseCtrl.accountExpenses.expenseList = yield data_access_1.DataAccess.readExpenses();
            return ExpenseCtrl.accountExpenses.expenseList;
        });
    }
}
exports.ExpenseCtrl = ExpenseCtrl;
ExpenseCtrl.dataAccess = new data_access_1.DataAccess();
ExpenseCtrl.accountExpenses = new account_expenses_1.AccountExpenses(0);

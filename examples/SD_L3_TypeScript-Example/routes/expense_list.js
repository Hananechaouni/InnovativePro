"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const expense_ctrl_1 = require("../control/expense_ctrl");
let router = express_1.default.Router();
exports.router = router;
router.get(`/expense_list`, (req, res) => {
    console.log(`Page requested with URL ${req.url}`);
    expense_ctrl_1.ExpenseCtrl.getExpenses().then(expense_list => {
        res.render('expense_list', {
            title: 'Expense Tracker',
            headline: 'Expenses',
            expenses: expense_list
        });
    });
});
router.post(`/expense_list`, (req, res, next) => {
    res.redirect('/expense');
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const expense_1 = require("../model/expense");
const consumer_expense_1 = require("../model/consumer_expense");
const business_expense_1 = require("../model/business_expense");
const expense_ctrl_1 = require("../control/expense_ctrl");
let router = express_1.default.Router();
exports.router = router;
router.get(`/expense`, (req, res) => {
    console.log(`Page requested with URL ${req.url}`);
    res.render('expense', {
        title: 'Expense Tracker',
        headline: 'Enter an Expense'
    });
});
router.post(`/expense`, (req, res, next) => {
    console.log(`New expense entered, name ${req.body.name}, amount ${req.body.amount}, category ${req.body.category}, type ${req.body.exp_type}`);
    let e = new expense_1.Expense();
    if (req.body.exp_type === "consumer") {
        e = new consumer_expense_1.ConsumerExpense();
    }
    else if (req.body.exp_type === "business") {
        e = new business_expense_1.BusinessExpense();
    }
    e.name = req.body.name;
    e.amount = req.body.amount;
    e.category = req.body.category;
    expense_ctrl_1.ExpenseCtrl.addExpense(e).then(() => {
        res.redirect('/expense_list');
    });
});

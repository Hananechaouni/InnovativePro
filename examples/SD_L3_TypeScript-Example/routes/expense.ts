import express from "express";
import { Expense } from "../model/expense"
import { ConsumerExpense } from "../model/consumer_expense"
import { BusinessExpense } from "../model/business_expense"
import { ExpenseCtrl } from "../control/expense_ctrl"
import { AccountExpenses } from "../model/account_expenses";

let router = express.Router();
router.get(`/expense`,
    (req: express.Request, res: express.Response) => {

        console.log(`Page requested with URL ${req.url}`);

        res.render('expense', {
            title: 'Expense Tracker',
            headline: 'Enter an Expense'            
        });
    });
router.post(`/expense`,
    (req: express.Request, res: express.Response, next: express.NextFunction) => {

        console.log(`New expense entered, name ${req.body.name}, amount ${req.body.amount}, category ${req.body.category}, type ${req.body.exp_type}`); 

        let e: Expense = new Expense();

        if (req.body.exp_type === "consumer") {
            e = new ConsumerExpense();
        } else if (req.body.exp_type === "business") {
            e = new BusinessExpense();
        }
        e.name = req.body.name;
        e.amount = req.body.amount;
        e.category = req.body.category;

        ExpenseCtrl.addExpense(e).then( () => {
            res.redirect('/expense_list');
        });
    });
export { router };

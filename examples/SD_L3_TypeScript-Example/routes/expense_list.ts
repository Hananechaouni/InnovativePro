import express from "express";
import { ExpenseCtrl } from "../control/expense_ctrl"

let router = express.Router();
router.get(`/expense_list`,
    (req: express.Request, res: express.Response) => {
        console.log(`Page requested with URL ${req.url}`);

        ExpenseCtrl.getExpenses().then( expense_list => {
            res.render('expense_list', { 
                title: 'Expense Tracker',
                headline: 'Expenses',
                expenses: expense_list
            });
        });

    });
router.post(`/expense_list`,
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.redirect('/expense');
});
export { router };

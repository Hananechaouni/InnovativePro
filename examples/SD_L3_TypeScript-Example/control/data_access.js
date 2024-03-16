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
exports.DataAccess = void 0;
const expense_1 = require("../model/expense");
const consumer_expense_1 = require("../model/consumer_expense");
const business_expense_1 = require("../model/business_expense");
const { Client } = require('pg');
const type_consumer = "consumer";
const type_business = "business";
class DataAccess {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (DataAccess.postgreClient == null) {
                DataAccess.postgreClient = new Client({
                    user: 'postgres',
                    host: 'localhost',
                    database: 'postgres',
                    password: '',
                    port: 5433,
                });
                yield DataAccess.postgreClient.connect();
                yield DataAccess.createTables();
            }
        });
    }
    static disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield DataAccess.postgreClient.end();
        });
    }
    static createTables() {
        return __awaiter(this, void 0, void 0, function* () {
            let createTableCategory = "CREATE TABLE IF NOT EXISTS category (id SERIAL PRIMARY KEY, name TEXT)";
            let createTableExpense = "CREATE TABLE IF NOT EXISTS expense (id SERIAL PRIMARY KEY, name TEXT, amount decimal(10,2), type TEXT, category_id INT, " +
                "FOREIGN KEY (category_id) REFERENCES category(id))";
            DataAccess.postgreClient.query(createTableCategory, (err, res) => {
                //console.log(err, res);
            });
            DataAccess.postgreClient.query(createTableExpense, (err, res) => {
                //console.log(err, res);
            });
        });
    }
    static readExpenses() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "SELECT e.id, e.name, e.amount, e.type, c.name as category " +
                "FROM expense e, category c " +
                "WHERE e.category_id = c.id";
            let expenses = [];
            const res = yield DataAccess.postgreClient.query(query);
            if (res != null && res.rows.length > 0) {
                for (let row of res.rows) {
                    let e = new expense_1.Expense();
                    let type = row.type;
                    if (type === type_consumer) {
                        e = new consumer_expense_1.ConsumerExpense();
                    }
                    else if (type === type_business) {
                        e = new business_expense_1.BusinessExpense();
                    }
                    e.setId(row.id);
                    e.name = row.name;
                    e.amount = row.amount;
                    e.category = row.category;
                    expenses.push(e);
                }
            }
            return expenses;
        });
    }
    static getCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = 0;
            let query = "SELECT id FROM category WHERE name = $1";
            const res = yield DataAccess.postgreClient.query(query, [name]);
            if (res != null && res.rows.length > 0) {
                id = res.rows[0].id;
            }
            return id;
        });
    }
    static createExpense(e) {
        return __awaiter(this, void 0, void 0, function* () {
            let category_id = yield this.getCategory(e.category);
            if (category_id == 0) {
                category_id = yield this.createCategory(e.category);
            }
            let type = "";
            if (e instanceof consumer_expense_1.ConsumerExpense) {
                type = type_consumer;
            }
            else if (e instanceof business_expense_1.BusinessExpense) {
                type = type_business;
            }
            const res = yield DataAccess.postgreClient.query("INSERT INTO expense (name, amount, type, category_id) VALUES ($1, $2, $3, $4) RETURNING id", [e.name, e.amount, type, category_id]);
            if (res != null && res.rows.length > 0) {
                console.log(`Expense inserted`);
            }
        });
    }
    static createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            let category_id = 0;
            const res = yield DataAccess.postgreClient.query("INSERT INTO category (name) VALUES ($1) RETURNING id", [category]);
            if (res != null && res.rows.length > 0) {
                category_id = res.rows[0].id;
                console.log(`Category inserted`);
            }
            return category_id;
        });
    }
}
exports.DataAccess = DataAccess;

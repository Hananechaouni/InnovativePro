import { Expense } from "../model/expense";
import { ConsumerExpense } from "../model/consumer_expense";
import { BusinessExpense } from "../model/business_expense";
const { Client } = require('pg')

const type_consumer = "consumer";
const type_business = "business";

export class DataAccess {

    private static postgreClient: any;

    static async connect() {
        if (DataAccess.postgreClient == null) {
            DataAccess.postgreClient = new Client({
                user: 'postgres',
                host: 'localhost',
                database: 'postgres',
                password: '',
                port: 5433,
            });
            await DataAccess.postgreClient.connect();
            await DataAccess.createTables();
        }
    }
    static async disconnect() {
        await DataAccess.postgreClient.end();
    }

    static async createTables() {
        let createTableCategory: string = 
        "CREATE TABLE IF NOT EXISTS category (id SERIAL PRIMARY KEY, name TEXT)";

        let createTableExpense: string = 
        "CREATE TABLE IF NOT EXISTS expense (id SERIAL PRIMARY KEY, name TEXT, amount decimal(10,2), type TEXT, category_id INT, " +
        "FOREIGN KEY (category_id) REFERENCES category(id))";
        
        DataAccess.postgreClient.query(createTableCategory, (err: any, res: any) => {
            //console.log(err, res);
        });
        DataAccess.postgreClient.query(createTableExpense, (err: any, res: any) => {
            //console.log(err, res);
        });
    }

    static async readExpenses() {
        let query: string = 
        "SELECT e.id, e.name, e.amount, e.type, c.name as category " +
        "FROM expense e, category c " +
        "WHERE e.category_id = c.id";
        
        let expenses : Expense[] = [];

        const res = await DataAccess.postgreClient.query(query);

        if (res != null && res.rows.length > 0) {
            for (let row of res.rows) {
                let e = new Expense();
                let type = row.type;
                if (type === type_consumer) {
                    e = new ConsumerExpense();
                } else if (type === type_business) {
                    e = new BusinessExpense();
                }
                e.setId(row.id);
                e.name = row.name;
                e.amount = row.amount;
                e.category = row.category;
                expenses.push(e);
            }
          }
          
          return expenses;
    }

    static async getCategory(name: string) {

        let id: number = 0;
        let query: string = "SELECT id FROM category WHERE name = $1";

        const res = await DataAccess.postgreClient.query(query, [name]);

        if (res != null && res.rows.length > 0) {
            id = res.rows[0].id;    
        }

        return id;
    }

    static async createExpense(e: Expense) {

        let category_id = await this.getCategory(e.category);

        if (category_id == 0) {
            category_id = await this.createCategory(e.category);
        }

        let type = "";
        if (e instanceof ConsumerExpense) {
            type = type_consumer;
        } else if (e instanceof BusinessExpense) {
            type = type_business;
        }

        const res = await DataAccess.postgreClient.query(
            "INSERT INTO expense (name, amount, type, category_id) VALUES ($1, $2, $3, $4) RETURNING id", 
            [e.name, e.amount, type, category_id]);
        
        if (res != null && res.rows.length > 0) {
            console.log(`Expense inserted`)
        }
    }
    
    static async createCategory(category: string) {
        let category_id = 0;

        const res = await DataAccess.postgreClient.query(
            "INSERT INTO category (name) VALUES ($1) RETURNING id", [category]);
        
        if (res != null && res.rows.length > 0) {
            category_id = res.rows[0].id;
            console.log(`Category inserted`)
        }

        return category_id;
    }

}

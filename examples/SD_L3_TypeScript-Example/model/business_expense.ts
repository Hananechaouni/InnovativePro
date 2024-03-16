import { Expense } from "./expense";
export class BusinessExpense extends Expense {
    tripId: number;
    constructor() {
        super();
        this.tripId = 0;
    }
    setBusinessTrip(tripId : number): void {
        this.tripId = tripId;
    }
}

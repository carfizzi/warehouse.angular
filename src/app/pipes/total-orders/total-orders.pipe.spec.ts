import { Order } from "../../models/database/order";
import { TotalOrder } from "../../models/total-order";
import { TotalOrdersPipe } from "./total-orders.pipe";

describe('TotalOrdersPipe', () => {
    const pipe = new TotalOrdersPipe();

    it('should transforms generic orders', () => {
        let orders = [new Order('123', new Date(), 4), new Order('456', new Date(), 2), new Order('123', new Date(), 2), new Order('456', new Date(), 6), new Order('ABC', new Date(), 2)];
        let expectedTotalOrders = [new TotalOrder('123', 6), new TotalOrder('456', 8), new TotalOrder('ABC', 2)];
        let computedTotalOrders = pipe.transform(orders);
        for (let index = 0; index < computedTotalOrders.length; index++) {
            expect(computedTotalOrders[index].total).toBe(expectedTotalOrders[index].total);
            expect(computedTotalOrders[index].type).toBe(expectedTotalOrders[index].type);   
        }
    });

    it('should transform empty orders', () => {
        let orders: Order[] = [];
        expect(pipe.transform(orders).length).toBe(0);
    })
});
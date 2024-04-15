import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Observable, queueScheduler, scheduled, switchMap } from "rxjs";
import { Order } from "../models/database/order";

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends Dexie {
  public orders: Dexie.Table<Order, number>;

  constructor() {
    super('warehouse-db');
    this.version(1).stores({
      orders: '++id, packaging_code_ext, insertion_date, quantity'
    });

    this.orders = this.table('orders');
  }
  
  /**
   * Gets all orders
   * @returns all orders 
   */
  public getAllOrders(): Observable<Order[]> {
    return scheduled(this.orders.toArray(), queueScheduler);
  }

  /**
   * Deletes all orders
   */
  public deleteAllOrders(): Observable<Order[]> {
    return scheduled(this.orders.clear(), queueScheduler)
      .pipe(
        switchMap(res => this.getAllOrders())
      );
  }

  // CRUD methods for Orders table
  public addOrder(order: Order): Observable<Order[]> {
    return scheduled(this.orders.add(order), queueScheduler)
    .pipe(
      switchMap(res => {
        return this.getAllOrders();
      })
    );
  }

  public getOrder(id: number): Observable<Order | undefined> {
    return scheduled(this.orders.get(id), queueScheduler);
  }

  public updateOrder(id: number, changes: Partial<Order>): Observable<number> {
    return scheduled(this.orders.update(id, changes), queueScheduler);
  }

  public deleteOrder(id: number): Observable<void> {
    return scheduled(this.orders.delete(id), queueScheduler);
  }

}


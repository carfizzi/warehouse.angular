import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { from, Observable } from "rxjs";
import { Order } from "../models/database/order";
import { Packaging } from "../models/database/packaging";

@Injectable({
  providedIn: 'root'
})
export class DBService extends Dexie {
  public packagings: Dexie.Table<Packaging, string>;
  public orders: Dexie.Table<Order, number>;

  constructor() {
    super('warehouse-db');
    this.version(1).stores({
      packagings: 'code, label',
      orders: '++id, packaging_code_ext, insertion_date'
    });

    this.packagings = this.table('packagings');
    this.orders = this.table('orders');
  }

  // CRUD methods for Packagings table
  public addPackaging(packaging: Packaging): Observable<string> {
    return from(this.packagings.add(packaging));
  }

  public getPackaging(code: string): Observable<Packaging | undefined> {
    return from(this.packagings.get(code));
  }

  public updatePackaging(code: string, changes: Partial<Packaging>): Observable<number> {
    return from(this.packagings.update(code, changes));
  }

  public deletePackaging(code: string): Observable<void> {
    return from(this.packagings.delete(code));
  }

  // Bulk read method for Packagings table
  public getAllPackagings(): Observable<Packaging[]> {
    return from(this.packagings.toArray());
  }

  // Bulk read method for Orders table
  public getAllOrders(): Observable<Order[]> {
    return from(this.orders.toArray());
  }

  // CRUD methods for Orders table
  public addOrder(order: Order): Observable<number> {
    return from(this.orders.add(order));
  }

  public getOrder(id: number): Observable<Order | undefined> {
    return from(this.orders.get(id));
  }

  public updateOrder(id: number, changes: Partial<Order>): Observable<number> {
    return from(this.orders.update(id, changes));
  }

  public deleteOrder(id: number): Observable<void> {
    return from(this.orders.delete(id));
  }
}


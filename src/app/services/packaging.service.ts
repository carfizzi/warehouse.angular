import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { map, Observable, queueScheduler, scheduled, Subject, switchMap, tap } from "rxjs";
import { Packaging } from "../models/database/packaging";

@Injectable({
  providedIn: 'root'
})
export class PackagingsService extends Dexie {
  public packagings: Dexie.Table<Packaging, string>;
  private packagingAddedSubject = new Subject<Packaging>();
  
  constructor() {
    super('warehouse-db');
    this.version(1).stores({
      packagings: 'code, label',
    });

    this.packagings = this.table('packagings');
  }

  /**
   * Adds packaging
   * @param packaging 
   * @returns Inserted packaging code
   */
  public addPackaging(packaging: Packaging): Observable<Packaging[]> {
    return scheduled(this.packagings.add(packaging), queueScheduler)
      .pipe(
        switchMap(res => {
          this.packagings = this.table('packagings');
          return this.packagings.toArray();
        })
      )
  }

  /**
   * Gets an Observable that emits when a new packaging is added
   * @returns Observable of added packaging
   */
  public getPackagingAddedSignal(): Observable<Packaging[]> {
    return this.packagingAddedSubject.pipe(
      switchMap(() => this.getAllPackagings())
    );
  }

  public getPackaging(code: string): Observable<Packaging | undefined> {
    return scheduled(this.packagings.get(code), queueScheduler);
  }

  public updatePackaging(code: string, changes: Partial<Packaging>): Observable<number> {
    return scheduled(this.packagings.update(code, changes), queueScheduler);
  }

  public deletePackaging(code: string): Observable<Packaging[]> {
    return scheduled(this.packagings.delete(code), queueScheduler)
      .pipe(
        switchMap(res => {
          this.packagings = this.table('packagings');
          return this.packagings.toArray();
        })
      );
  }

  /**
   * Gets all packagings
   * @returns All available packagings 
   */
  public getAllPackagings(): Observable<Packaging[]> {
    return scheduled(this.packagings.toArray(), queueScheduler);
  }
}

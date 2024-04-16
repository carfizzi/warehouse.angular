import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Observable, queueScheduler, scheduled, switchMap } from "rxjs";
import { Packaging } from "../models/database/packaging";

@Injectable({
  providedIn: 'root'
})
export class PackagingsService extends Dexie {
  public packagings: Dexie.Table<Packaging, string>;
  
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
          return this.getAllPackagings();
        })
      )
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
        switchMap(() => {
          return this.getAllPackagings();
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


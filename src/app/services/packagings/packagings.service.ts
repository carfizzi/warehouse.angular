import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { catchError, Observable, of, queueScheduler, scheduled, switchMap, tap, throwError } from "rxjs";
import { Packaging } from "../../models/database/packaging";

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
   * Adds new packaging
   * @param packaging 
   * @returns Observable with new packaging code or error
   */
  public addPackaging(packaging: Packaging): Observable<string | Error> {
    let additionOperationResult = this.packagings.add(packaging)
      .catch(err => new Error(err.message));
    return scheduled(additionOperationResult, queueScheduler)
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      )
  }

  public getPackaging(code: string): Observable<Packaging | undefined> {
    return scheduled(this.packagings.get(code), queueScheduler);
  }

  public updatePackaging(code: string, changes: Partial<Packaging>): Observable<number> {
    return scheduled(this.packagings.update(code, changes), queueScheduler);
  }

  public deletePackaging(code: string): Observable<void | Error> {
    let packagingDeletionOperationResult = this.packagings.delete(code)
      .catch(err => new Error(err.message));
    return scheduled(packagingDeletionOperationResult, queueScheduler)
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Gets all packagings
   * @returns All available packagings 
   */
  public getAllPackagings(): Observable<Packaging[]> {
    return scheduled(this.packagings.toArray(), queueScheduler)
      .pipe(
        catchError(error => {
          console.error('Error fetching packagings:', error);
          // Handle error gracefully and return an empty array to prevent breaking the stream
          return of([]);
        })
      );;
  }
}


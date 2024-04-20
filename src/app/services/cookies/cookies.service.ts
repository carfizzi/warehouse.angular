import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor(
    private cookieService: CookieService
  ) { }

  // Method to save a string value to a cookie
  setCookie(key: string, value: string, expireDays: number = 7): void {
    this.cookieService.set(key, value, expireDays, undefined, undefined, true, 'Strict');
  }

  // Method to retrieve a string value from a cookie
  getCookie(key: string): string | undefined {
    return this.cookieService.get(key);
  }

  // Method to check if a cookie with the given key exists
  checkCookie(key: string): boolean {
    return this.cookieService.check(key);
  }

  // Method to delete a cookie with the given key
  deleteCookie(key: string): void {
    this.cookieService.delete(key);
  }
}
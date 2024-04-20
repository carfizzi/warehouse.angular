import { Injectable } from '@angular/core';
import { CookieStorageService } from './cookies/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public currentTheme: Theme = Theme.Light;

  constructor(
    private cookieStorageService: CookieStorageService
  ) { }

  public toggleTheme(): void {
    let cookieTheme = this.cookieStorageService.getCookie('theme');
    this.currentTheme = cookieTheme === undefined || cookieTheme !== 'dark' ? Theme.Dark : Theme.Light;
    let newTheme = this.currentTheme === Theme.Dark ? 'dark' : 'light';
    this.setHtmlTheme(newTheme);
    this.cookieStorageService.setCookie('theme', newTheme);
  }

  public setUserTheme(): void {
    let cookieTheme = this.cookieStorageService.getCookie('theme');

    this.setHtmlTheme(cookieTheme ?? 'light');
    this.currentTheme = cookieTheme === 'dark' ? Theme.Dark : Theme.Light;
  }

  private setHtmlTheme(newTheme: string) {
    document.querySelector('html')?.setAttribute('data-bs-theme', newTheme);
  }

}

enum Theme {
  Light = 0,
  Dark = 1,
}

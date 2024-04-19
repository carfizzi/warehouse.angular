import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public currentTheme: Theme = Theme.Light;

  constructor() { }

  public toggleTheme(): void {
    let newTheme = this.currentTheme === Theme.Dark ? 'light' : 'dark';
    document.querySelector('html')?.setAttribute('data-bs-theme', newTheme);
    this.currentTheme = this.currentTheme === Theme.Dark ? Theme.Light : Theme.Dark;
  }
}

enum Theme {
  Light = 0,
  Dark = 1,
}

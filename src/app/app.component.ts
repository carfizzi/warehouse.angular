import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/page/header/header.component";
import { FooterComponent } from "./components/page/footer/footer.component";
import { ToastsComponent } from "./components/toasts/toasts.component";
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastsComponent]
})
export class AppComponent implements OnInit {
  title = 'warehouse';

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.themeService.setUserTheme();
  }
}

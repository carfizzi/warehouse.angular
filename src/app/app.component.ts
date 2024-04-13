import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/page/header/header.component";
import { FooterComponent } from "./components/page/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'warehouse';

  public isDarkThemeOn: boolean = false;
}

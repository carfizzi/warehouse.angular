import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../../services/theme.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule, NgbCollapseModule, RouterLink
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { 
    public isMenuCollapsed: boolean = true;
    
    constructor(
        private themeService: ThemeService,
    ) { }

    public toggleTheme(): void {
        this.themeService.toggleTheme();
        this.isMenuCollapsed = true;
    }
}

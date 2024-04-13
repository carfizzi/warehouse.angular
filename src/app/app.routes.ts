import { Routes } from '@angular/router';
import { PackagingsComponent } from './components/page/packagings/packagings.component';

export const routes: Routes = [
    { path: 'packagings', component: PackagingsComponent, pathMatch: 'full' },
    { path: '**', redirectTo: 'packagings' },
];

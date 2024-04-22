import { Routes } from '@angular/router';
import { PackagingsComponent } from './components/page/packagings/packagings.component';
import { OrdersComponent } from './components/page/orders/orders.component';
import { HomeComponent } from './components/page/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'packagings', component: PackagingsComponent, pathMatch: 'full' },
    { path: 'orders', component: OrdersComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '' },
];

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Packaging } from '../../../models/database/packaging';
import { PackagingsService } from '../../../services/packaging.service';
import { AsyncPipe } from '@angular/common';
import { PackagingsContainerComponent } from "../../packagings-container/packagings-container.component";
import { Order } from '../../../models/database/order';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-packagings',
  standalone: true,
  templateUrl: './packagings.component.html',
  styleUrl: './packagings.component.css',
  imports: [AsyncPipe, PackagingsContainerComponent]
})
export class PackagingsComponent implements OnInit {
  public packagings$: Observable<Packaging[]> = new Observable<Packaging[]>();
  public orders$: Observable<Order[]> = new Observable<Order[]>();
  public isEditModeOn: boolean = false;
  public mockPackaging: Packaging = { code: '5678B', label: 'Big Pallet' } as Packaging;

  constructor(
    private packagingsService: PackagingsService,
    private ordersService: OrdersService,
  ) { }

  public ngOnInit(): void {
    this.packagings$ = this.packagingsService.getAllPackagings();
    this.orders$ = this.ordersService.getAllOrders();
  }

  public addPackaging(packaging: Packaging): void {
    this.packagings$ = this.packagingsService.addPackaging(packaging);
  }

  public deletePackaging(packaging: Packaging): void {
    this.packagings$ = this.packagingsService.deletePackaging(packaging.code);
  }

  public toggleEditMode(): void {
    this.isEditModeOn = !this.isEditModeOn;
  }

}

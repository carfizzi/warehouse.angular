import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrdersContainerComponent } from "../../orders-container/orders-container.component";
import { Observable } from 'rxjs';
import { Order } from '../../../models/database/order';
import { OrdersService } from '../../../services/orders/orders.service';
import { OrdersHandlerComponent } from "../../orders-handler/orders-handler.component";
import { Packaging } from '../../../models/database/packaging';
import { PackagingsService } from '../../../services/packagings/packagings.service';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-orders',
    standalone: true,
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css',
    imports: [
        CommonModule,
        OrdersContainerComponent,
        OrdersHandlerComponent,
        NgbAlert,
    ]
})
export class OrdersComponent implements OnInit {
    public orders$: Observable<Order[]> = new Observable<Order[]>();
    public packagings$: Observable<Packaging[]> = new Observable<Packaging[]>();

    constructor(
        private ordersService: OrdersService,
        private packagingsService: PackagingsService,
        private modalService: NgbModal,
    ) { }

    public ngOnInit(): void {
        this.orders$ = this.ordersService.getAllOrders();
        this.packagings$ = this.packagingsService.getAllPackagings();
    }

    public addOrder(order: Order): void {
        this.orders$ = this.ordersService.addOrder(order);
    }

    public emptyOrder(): void {
        this.orders$ = this.ordersService.deleteAllOrders();
    }

    open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
                this.emptyOrder();
			},
			(reason) => {
			},
		);
	}

}

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
import { ToastService } from '../../../services/toast/toast.service';
import { PackagingTypeToLabelPipe } from '../../../pipes/packaing-type-to-label/packaging-type-to-label.pipe';
import { ToastType } from '../../../enums/toast-type';

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
        PackagingTypeToLabelPipe,
    ]
})
export class OrdersComponent implements OnInit {
    public orders$: Observable<Order[]> = new Observable<Order[]>();
    public packagings$: Observable<Packaging[]> = new Observable<Packaging[]>();

    constructor(
        private ordersService: OrdersService,
        private packagingsService: PackagingsService,
        private modalService: NgbModal,
        private toastService: ToastService,
    ) { }

    public ngOnInit(): void {
        this.orders$ = this.ordersService.getAllOrders();
        this.packagings$ = this.packagingsService.getAllPackagings();
    }

    public addOrder(order: Order): void {
        this.orders$ = this.ordersService.addOrder(order);
        this.toastService.show('Success', `Correctly registered ${order.quantity} pieces for packaging ${order.packaging_code_ext}`, ToastType.Success);
    }

    public emptyOrder(): void {
        this.orders$ = this.ordersService.deleteAllOrders();
        this.toastService.show('Success', 'Correctly emptied current shipments!', ToastType.Success);

    }

    public openModal(content: TemplateRef<any>): void {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            (result) => {
                this.emptyOrder();
            },
            (reason) => {
            },
        );
    }

}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Packaging } from '../../models/database/packaging';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/database/order';
import { ToastService } from '../../services/toast/toast.service';
import { ToastType } from '../../enums/toast-type';

@Component({
    selector: 'app-orders-handler',
    standalone: true,
    imports: [
        CommonModule, FormsModule
    ],
    templateUrl: './orders-handler.component.html',
    styleUrl: './orders-handler.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersHandlerComponent {
    @Input() packagings: Packaging[] = [];

    @Output() insertOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();

    public newPackagingCode: string | undefined;
    public newOrderQuantity: number = 1;

    constructor (
        private toastService: ToastService,
    ) { }

    public insertNewOrder(newPackagingCode: string | undefined, quantity: number) {
        if (!newPackagingCode || newPackagingCode.length === 0) {
            this.toastService.show('Warning', 'Please select a packaging!', ToastType.Warn);
            return;
        }

        let newOrder: Order = new Order(newPackagingCode, new Date(), quantity);
        this.insertOrderEvent.emit(newOrder);
    }

    public addOneQuantity(event: Event): void {
        event.preventDefault();
        this.newOrderQuantity++;
    }

    public subctractOneQuantity(event: Event): void {
        event.preventDefault();
        this.newOrderQuantity--;
    }

    @HostListener('document:keydown.enter', ['$event'])
    private onEnterKeyPressed(event: KeyboardEvent) {
        this.insertNewOrder(this.newPackagingCode, this.newOrderQuantity);
    }

 }

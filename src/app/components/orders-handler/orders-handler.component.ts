import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Packaging } from '../../models/database/packaging';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/database/order';

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

    public insertNewOrder(newPackagingCode: string | undefined, quantity: number) {
        if (!newPackagingCode || newPackagingCode.length === 0)
            return;

        let newOrder: Order = new Order(newPackagingCode, new Date(), quantity);
        this.insertOrderEvent.emit(newOrder);
    }

    pippo() {
        console.log(JSON.stringify(this.newPackagingCode));

    }

 }

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Order } from '../../models/database/order';
import { TotalOrdersPipe } from "../../pipes/total-orders.pipe";
import { PackagingTypeToLabelPipe } from '../../pipes/packaging-type-to-label.pipe';
import { Packaging } from '../../models/database/packaging';

@Component({
    selector: 'app-orders-container',
    standalone: true,
    templateUrl: './orders-container.component.html',
    styleUrl: './orders-container.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TotalOrdersPipe,
        PackagingTypeToLabelPipe
    ]
})
export class OrdersContainerComponent {
    @Input() orders: Order[] = [];
    @Input() packagings: Packaging[] = [];
}

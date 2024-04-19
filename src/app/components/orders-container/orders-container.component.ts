import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Order } from '../../models/database/order';
import { TotalOrdersPipe } from "../../pipes/total-orders/total-orders.pipe";
import { PackagingTypeToLabelPipe } from '../../pipes/packaing-type-to-label/packaging-type-to-label.pipe';
import { Packaging } from '../../models/database/packaging';
import { OrdersDateRangePipe } from "../../pipes/orders-date-range/orders-date-range.pipe";
import { TotalOrder } from '../../models/total-order';

@Component({
    selector: 'app-orders-container',
    standalone: true,
    templateUrl: './orders-container.component.html',
    styleUrl: './orders-container.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TotalOrdersPipe,
        PackagingTypeToLabelPipe,
        OrdersDateRangePipe,
    ],
    providers: [OrdersDateRangePipe, TotalOrdersPipe, DatePipe, PackagingTypeToLabelPipe]
})
export class OrdersContainerComponent {
    @Input() orders: Order[] = [];
    @Input() packagings: Packaging[] = [];

    @Output() cleanOrdersEvent: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('emailSender') emailSender!: ElementRef;

    public mailToHref: string = 'mailto:indirizzo@email.com?subject=oggettomail&body=corpomail';

    private readonly newLineChar: string = '%0D%0A';

    constructor(
        private totalOrdersPipe: TotalOrdersPipe,
        private ordersDateRangePipe: OrdersDateRangePipe,
        private datePipe: DatePipe,
        private packagingTypeToLabelPipe: PackagingTypeToLabelPipe,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }

    public async notifyManagerAndCleanOrders(): Promise<void> {
        let totalOrders = this.totalOrdersPipe.transform(this.orders);
        let orderDateRange = this.ordersDateRangePipe.transform(this.orders);

        if (!orderDateRange)
            return;

        this.mailToHref = `mailto:warehouse.manager@email.com?subject=${this.buildOrderPeriodString(orderDateRange?.minDate, orderDateRange?.maxDate)}&body=${this.buildOrderPeriodString(orderDateRange?.minDate, orderDateRange?.maxDate)}:${this.newLineChar}${this.buildOrderBody(totalOrders, this.packagings)}`;
        this.changeDetectorRef.detectChanges();

        this.emailSender.nativeElement.click();

        this.cleanOrdersEvent.emit();
    }


    private buildOrderPeriodString(minDate: Date, maxDate: Date): string {
        if (minDate.getDate() == maxDate.getDate() && minDate.getMonth() === maxDate.getMonth() && minDate.getFullYear() === maxDate.getFullYear())
            return `Packagings used on ${this.datePipe.transform(minDate, 'longDate')}`;
        return `Packagings used from ${this.datePipe.transform(minDate, 'longDate')} and ${this.datePipe.transform(maxDate, 'longDate')}`
    }

    private buildOrderBody(totalOrders: TotalOrder[], packagings: Packaging[]) {
        let ordersString: string = '';
        totalOrders.forEach(group => {
            ordersString += `${this.packagingTypeToLabelPipe.transform(group.type, packagings)}: ${group.total}${this.newLineChar}`;
        });

        return ordersString;
    }

}

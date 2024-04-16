import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Packaging } from '../../models/database/packaging';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/database/order';

@Component({
    selector: 'app-packagings-container',
    standalone: true,
    imports: [
        CommonModule, FormsModule
    ],
    templateUrl: './packagings-container.component.html',
    styleUrl: './packagings-container.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagingsContainerComponent {
    @Input() packagings: Packaging[] = [];
    @Input() orders: Order[] = [];
    @Input() isInputMode: boolean = true;

    @Output() deletePackagingEvent = new EventEmitter<Packaging>();
    @Output() insertPackagingEvent = new EventEmitter<Packaging>();

    public newPackagingCode: string = '';
    public newPackagingLabel: string = '';

    /**
     * Deletes packaging, if it is not referenced in the orders
     * @param packaging to be deleted
     * @returns void 
     */
    public deletePackaging(packaging: Packaging): void {
        let ordersWithGivenPackaging = this.orders.filter(o => o.packaging_code_ext === packaging.code);
        if (ordersWithGivenPackaging.length > 0)
            return;

        this.deletePackagingEvent.emit(packaging);
    }

    public insertPackaging(code: string, label: string): void {
        if (code === '' || label === '')
            return;

        let newPackaging = new Packaging(code, label);
        this.newPackagingCode = '';
        this.newPackagingLabel = '';
        this.insertPackagingEvent.emit(newPackaging);
    }
}

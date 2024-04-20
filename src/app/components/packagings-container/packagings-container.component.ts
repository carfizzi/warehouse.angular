import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Packaging } from '../../models/database/packaging';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/database/order';
import { ToastService } from '../../services/toast/toast.service';
import { ToastType } from '../../enums/toast-type';

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

    constructor(
        private toastService: ToastService,
    ) { }

    /**
     * Signals event of packaging removal, if it is not referenced in the orders
     * @param packaging to be deleted
     * @returns void 
     */
    public deletePackaging(packaging: Packaging): void {
        let ordersWithGivenPackaging = this.orders.filter(o => o.packaging_code_ext === packaging.code);
        if (ordersWithGivenPackaging.length > 0) {
            this.toastService.show('Warning', 'The packaging that you are trying to remove is currently in use!', ToastType.Warn);
            return;
        }

        this.deletePackagingEvent.emit(packaging);
    }

    /**
     * Signals event to insert new packaging, if it is valid
     * @param code 
     * @param label 
     * @returns packaging 
     */
    public insertPackaging(code: string, label: string): void {
        if (code === '' || label === '') {
            this.toastService.show('Warning', 'Please provide a valid code or label for the new package!', ToastType.Warn);
            return;
        }

        let newPackaging = new Packaging(code, label);
        this.newPackagingCode = '';
        this.newPackagingLabel = '';

        this.insertPackagingEvent.emit(newPackaging);
    }

    @HostListener('document:keydown.enter', ['$event'])
    private onEnterKeyPressed(event: KeyboardEvent) {
        this.insertPackaging(this.newPackagingCode, this.newPackagingLabel);
    }
}

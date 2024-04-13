import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Packaging } from '../../models/database/packaging';
import { FormsModule } from '@angular/forms';

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
    @Input() isInputMode: boolean = true;

    @Output() deletePackagingEvent = new EventEmitter<Packaging>();
    @Output() insertPackagingEvent = new EventEmitter<Packaging>();

    public newPackagingCode: string = '';
    public newPackagingLabel: string = '';

    public deletePackaging(packaging: Packaging): void {
        this.deletePackagingEvent.emit(packaging);
    }

    public insertPackaging(code: string, label: string): void {
        let newPackaging = new Packaging(code, label);
        this.insertPackagingEvent.emit(newPackaging);
    }
 }

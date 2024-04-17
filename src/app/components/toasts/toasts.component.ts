import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ToastType } from '../../enums/toast-type';
import { NgbToast, NgbToastHeader } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-toasts',
    standalone: true,
    imports: [
        CommonModule, NgbToast, NgbToastHeader
    ],
    templateUrl: './toasts.component.html',
    styleUrl: './toasts.component.css',
})
export class ToastsComponent {
    public ToastType = ToastType;

    constructor(
        public toastService: ToastService,
    ) { }
 }

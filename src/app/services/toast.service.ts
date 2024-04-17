import { Injectable } from '@angular/core';
import { ToastInfo } from '../models/toast-info';
import { ToastType } from '../enums/toast-type';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toasts: ToastInfo[] = [];

  constructor() { }

  public show(header: string, body: string, type = ToastType.Standard): void {
    this.toasts.push(new ToastInfo(header, body, type));
  }

  public remove(toast: ToastInfo): void {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}

import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'canAddOrder',
  standalone: true,
})
export class CanAddOrderPipe implements PipeTransform {

  transform(value: number | string | undefined): boolean {
    if (typeof(value) === 'string' || !value)
      return false;
    return value > 0 && value <= 1000
  }

}

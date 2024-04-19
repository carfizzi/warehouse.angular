import { Pipe, type PipeTransform } from '@angular/core';
import { Order } from '../../models/database/order';
import { DateRange } from '../../models/date-range';

@Pipe({
  name: 'ordersDateRange',
  standalone: true,
})
export class OrdersDateRangePipe implements PipeTransform {

  transform(orders: Order[]): DateRange | undefined {
    if (!orders || orders.length === 0) {
      return undefined;
    }

    const dates = orders.map(order => order.insertion_date.getTime());
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    return { minDate, maxDate };
  }

}

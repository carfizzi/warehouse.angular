import { Pipe, type PipeTransform } from '@angular/core';
import { Order } from '../models/database/order';
import { TotalOrder } from '../models/total-order';

@Pipe({
  name: 'totalOrders',
  standalone: true,
})
export class TotalOrdersPipe implements PipeTransform {

  /**
   * Reduce orders by packaging type
   * @param orders: orders list
   * @returns Grouped orders list
   */
  public transform(orders: Order[]): TotalOrder[] {
    return orders.reduce((summary: TotalOrder[], order: Order) => {
      const index = summary.findIndex(item => item.type === order.packaging_code_ext);
      if (index !== -1) {
        summary[index].total += order.quantity;
      } else {
        summary.push({ type: order.packaging_code_ext, total: order.quantity });
      }
      return summary;
    }, []);
  }
}

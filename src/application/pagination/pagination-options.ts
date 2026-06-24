import { ORDER_DIRECTION } from './order-direction';

export class PaginationOptions<T> {
  public readonly page: number;
  public readonly count: number;
  public readonly order: {
    by: keyof T | 'id';
    order: ORDER_DIRECTION;
  }[];

  constructor(options: {
    page: number;
    count: number;
    order?: {
      by: keyof T | 'id';
      order: ORDER_DIRECTION;
    }[];
  }) {
    const {
      page = 0,
      count = 10,
      order = [
        {
          by: 'id',
          order: 'desc',
        },
      ],
    } = options;
    this.page = page;
    this.count = count;
    this.order = order.map((o) => {
      return {
        by: o.by,
        order: o.order,
      };
    });
  }
}

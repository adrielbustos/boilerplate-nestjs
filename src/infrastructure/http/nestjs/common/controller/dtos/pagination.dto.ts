import { PaginationOptions } from '@/application/pagination';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationOptionsDto {
  @IsNumber()
  page: number = 0;

  @IsNumber()
  limit: number = 10;

  @IsString()
  @IsOptional()
  @IsIn(['ASC', 'asc', 'DESC', 'desc'])
  order?: 'ASC' | 'DESC' | 'asc' | 'desc';

  @IsString()
  @IsOptional()
  order_by?: string;

  public toPaginationOptions<T>(): PaginationOptions<T> {
    return new PaginationOptions({
      count: this.limit,
      page: this.page,
      //   order: this.order_by,
      //   order: this.order,
      //   order_by: this.order_by,
    });
  }
}

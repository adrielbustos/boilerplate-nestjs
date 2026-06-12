export class Page<T> {
  data: T | null = null;
  total_elements: number = 0;
  total_pages: number = 0;
  current_page: number = 0;
  page_size: number = 0;
  has_next: boolean = false;
  has_previous: boolean = false;
  constructor(params: { total: number; page: number; limit: number; data: T }) {
    this.data = params.data || null;
    this.total_elements = params.total;
    this.page_size = params.limit;
    this.current_page = Math.ceil(params.page / params.limit) + 1;
    this.total_pages = Math.ceil(params.total / params.limit);
    this.has_next = this.current_page < this.total_pages;
    this.has_previous = this.current_page > 1;
  }
}

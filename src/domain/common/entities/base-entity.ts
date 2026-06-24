export interface BaseEntityI extends Record<string, any> {
  id: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class BaseEntity implements BaseEntityI {
  id: string = '';
  active: boolean = true;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  deletedAt: Date | null = null;
  constructor() {}
}

import type { User } from './Users';
import { Warehouse as BaseWarehouse } from './Warehouses';

export interface WarehouseMember {
  id: number;
  userId: number;
  user: User;
  warehouseId: number;
  warehouse: Partial<Warehouse>;
}

export interface Warehouse
  extends Pick<
    BaseWarehouse,
    'id' | 'tradeName' | 'addressCity' | 'addressState' | 'document'
  > {}

export interface ResponseWarehouseMember {
  id: number;
  name: string;
  email: string;
  warehouseMembers: WarehouseMember[];
}

export interface WarehouseMember {
  id: number;
  userId: number;
  warehouseId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  warehouse: Partial<Warehouse>;
}

export interface PaginatedWarehouseMember extends ResponseWarehouseMember {}

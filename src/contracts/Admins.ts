import type { User } from './Users';

export interface Admin {
  id: number;
  userId: number;
  user: User;
}

export interface PaginatedAdmin extends Admin {}

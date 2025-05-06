import { IAction } from 'contracts';

export interface IModule {
  id: number;
  name: string;
  actions: IAction[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

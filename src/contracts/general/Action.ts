import { IModule } from 'contracts';

export interface IAction {
  id: number;
  description: string;
  code: string;
  group?: string | null;
  module: IModule
}

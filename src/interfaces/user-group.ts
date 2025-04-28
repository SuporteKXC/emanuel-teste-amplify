import { IGroup } from "./group";
import { User } from "./user";


export interface UserGroup {
  id: number;
  user: User | null;
  groups: IGroup[];
}

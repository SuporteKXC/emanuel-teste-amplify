import { Business } from "./business";
import { User } from "./user";


export interface UserBusinessLine {
  user: User | null;
  business_lines: Business[];
}

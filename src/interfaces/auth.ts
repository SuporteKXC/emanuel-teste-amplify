export interface Auth {
  user_id: number;
  name: string;
  email: string;
  new_password: boolean;
  accessToken?: string;
  app_access: boolean;
  days_left_password: number;
  roles: string[];
  root: boolean;
}

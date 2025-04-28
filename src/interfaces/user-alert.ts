export interface UserAlert {
  id: number;
  description: string;
  user: {
    id: number;
    name: string;
  };
  alert: {
    id: number | null;
  };
}

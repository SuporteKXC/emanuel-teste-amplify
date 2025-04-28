export interface Alert {
  id: number;
  name: string;
  description: string;
  module: {
    id: number;
  };
  user_alert: {
    id: number | null;
    user: {
      id:  number | null;
    };
  };
}

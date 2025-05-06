export interface UserSecondaryEmailData {
  id: number;
  user_id: number;
  email: string;
  expiry_date: string;
  created_at?: string;
  updated_at?: string;
}
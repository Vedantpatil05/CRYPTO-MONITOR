export interface Cryptocurrency {
  id: number;
  name: string;
  symbol: string;
  price: number;
  percent_change_24h: number;
  last_updated: string;
}

export interface Alert {
  id: string;
  user_id: string;
  cryptocurrency_id: number;
  target_price: number;
  condition: 'above' | 'below';
  created_at: string;
  triggered: boolean;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}
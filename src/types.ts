export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: string;
  market_cap: number;
  price_change_percentage_24h: number;
  image?: string;
}

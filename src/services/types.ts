export interface MarketChart {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

export interface ErrorResponse {
  status: {
    error_message: string;
  };
}

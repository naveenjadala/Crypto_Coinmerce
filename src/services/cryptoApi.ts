import { Crypto } from '../types';
import { baseApi } from './baseApi';
import { MarketChart } from './types';

export const cryptoApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCoins: builder.query<Crypto[], void>({
      query: () =>
        'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
    }),
    getCoinDetails: builder.query({
      query: (id: string) => `coins/${id}`,
    }),
    getCoinChart: builder.query<MarketChart, { id: string; days: number }>({
      query: ({ id, days }) =>
        `coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetCoinDetailsQuery,
  useGetCoinChartQuery,
} = cryptoApi;

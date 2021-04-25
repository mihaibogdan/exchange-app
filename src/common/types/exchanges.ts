export interface IRates {
  base: string;
  rates: {
    [key: string]: number;
  };
}

export enum ExchangeType {
  Buy = 'buy',
  Sell = 'sell',
}

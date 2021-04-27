import { IAccount } from 'common/types/account';

export interface IRates {
  base: string;
  rates: {
    [key: string]: number;
  };
}

export interface IExchangeMember {
  account: IAccount;
  exchangeAmount: string;
}

export enum ExchangeType {
  Buy = 'buy',
  Sell = 'sell',
}

export enum ExchangeAccountType {
  Buyer = 'buyer',
  Seller = 'seller',
}

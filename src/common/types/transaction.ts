import { ExchangeType } from 'common/types/exchanges';

export interface ITransaction {
  id: string;
  type: ExchangeType;
  mainCurrency: string;
  secondaryCurrency: string;
  mainAmount: string;
  secondaryAmount: string;
  timestamp: number;
}

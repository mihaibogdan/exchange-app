import { IAccount } from 'common/types/account';
import { IRates } from 'common/types/exchanges';

export const changeMainAccount = (account: IAccount) => ({
  type: 'CHANGE_MAIN_ACCOUNT',
  body: { account },
});

export const changeMainAmount = (value: string, exchangeRates: IRates) => ({
  type: 'CHANGE_MAIN_AMOUNT',
  body: { value, exchangeRates },
});

export const changeSecondaryAccount = (account: IAccount) => ({
  type: 'CHANGE_SECONDARY_ACCOUNT',
  body: { account },
});

export const changeSecondaryAmount = (
  value: string,
  exchangeRates: IRates
) => ({
  type: 'CHANGE_SECONDARY_AMOUNT',
  body: { value, exchangeRates },
});

export const toggleType = () => ({
  type: 'TOGGLE_TYPE',
  body: {},
});

export const resetValues = () => ({
  type: 'RESET_AMOUNTS',
  body: {},
});

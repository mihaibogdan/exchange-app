import { IRates } from 'common/types/exchanges';

export const changeMainValue = (value: string, exchangeRates: IRates) => ({
  type: 'CHANGE_MAIN_VALUE',
  body: { value, exchangeRates },
});

export const changeSecondaryValue = (value: string, exchangeRates: IRates) => ({
  type: 'CHANGE_SECONDARY_VALUE',
  body: { value, exchangeRates },
});

export const toggleType = () => ({
  type: 'TOGGLE_TYPE',
  body: {},
});

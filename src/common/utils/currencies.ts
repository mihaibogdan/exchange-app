import { currencySymbol } from 'common/constants/currencies';

export const getCurrencySymbol = (currency: string): string => {
  if (!currencySymbol[currency]) return '';

  return currencySymbol[currency];
};

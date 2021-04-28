import { IRates } from 'common/types/exchanges';

/**
 * We only have exchange rates relative to a single currency, so any exchange between two currency
 * will happen through that currency.
 * e.g.: GBP->EUR will act like GBP->Base currency->EUR
 */
export const exchange = (
  amount: number,
  source: string,
  destination: string,
  exchangeRates: IRates,
  decimals = 2
): string => {
  if (!exchangeRates) return '';

  const { rates } = exchangeRates;
  if (!rates?.[source] || !rates?.[destination]) return amount.toString();
  if (source === destination) return amount.toString();

  const baseAmount = amount / rates[source];
  const finalAmount = baseAmount * rates[destination];

  return finalAmount.toFixed(decimals);
};

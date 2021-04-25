import { IRates } from 'common/types/rates';

/**
 * We only have exchange rates relative to a single currency, so any exchange between two currency
 * will happen through that currency.
 * e.g.: GBP->EUR will act like GBP->Base currency->EUR
 */
export const exchange = (
  amount: number,
  source: string,
  destination: string,
  exchangeRates: IRates
): number => {
  const { rates } = exchangeRates;
  if (!rates[source] || !rates[destination]) return amount;
  if (source === destination) return amount;

  const baseAmount = amount / rates[source];
  const finalAmount = baseAmount * rates[destination];

  return finalAmount;
};

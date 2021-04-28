import { IRates } from 'common/types/exchanges';

import { exchange } from './exchangeRates';

const exchangeRates: IRates = {
  base: 'USD',
  rates: {
    EUR: 0.826641,
    GBP: 0.720534,
    USD: 1,
  },
};

describe('Exchange rates utils', () => {
  it('checks that 1 USD = 1 USD', () => {
    const input = 1;
    const result = exchange(input, 'USD', 'USD', exchangeRates);

    expect(result).toBe('1');
  });

  it('should correctly convert GBP to EUR', () => {
    const input = 100;
    const result = exchange(input, 'GBP', 'EUR', exchangeRates);
    const expectedResult = '114.73';
    expect(result).toBe(expectedResult);
  });
});

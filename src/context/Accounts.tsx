import React, { useState, useCallback, useMemo } from 'react';

import { IAccount } from 'common/types/account';
import { ExchangeType, IExchangeMember } from 'common/types/exchanges';
interface IProps {
  children: React.ReactNode;
}

export interface IAccountsContext {
  accounts: IAccount[];
  exchangeBetweenAccounts: (
    main: IExchangeMember,
    secondary: IExchangeMember,
    type: ExchangeType
  ) => void;
}

const bankAccounts: IAccount[] = [
  {
    id: '239fc813-fd0e-45a2-a3cc-4b8007ac2318',
    currency: 'USD',
    currencyName: 'United States Dollar',
    currencySymbol: '$',
    balance: 1700,
    countryCode: 'US',
  },
  {
    id: '28172914-2409-4b3b-a527-62c7ac9b3f10',
    currency: 'GBP',
    currencyName: 'British Pound',
    currencySymbol: '£',
    balance: 15040,
    countryCode: 'GB',
  },
  {
    id: '4a784950-cf9c-414a-9858-734aedc0f4a5',
    currency: 'EUR',
    currencyName: 'Euro',
    currencySymbol: '€',
    balance: 50,
    countryCode: 'EU',
  },
  {
    id: 'd0e192a6-3055-4cc9-8933-0e81a293cecb',
    currency: 'RON',
    currencyName: 'Romanian Leu',
    currencySymbol: 'RON',
    balance: 400,
    countryCode: 'RO',
  },
];

export const AccountsContext = React.createContext(null);

const AccountsContextProvider = ({ children }: IProps) => {
  const [accounts, setAccounts] = useState<IAccount[]>(bankAccounts);

  const exchangeBetweenAccounts = useCallback(
    (main: IExchangeMember, secondary: IExchangeMember, type: ExchangeType) => {
      const sign = type === ExchangeType.Sell ? -1 : 1;
      setAccounts(
        accounts.map(account => {
          let newBalance = account.balance;
          if (account.id === main.account.id) {
            newBalance += sign * parseFloat(main.exchangeValue);
          }
          if (account.id === secondary.account.id) {
            newBalance += -sign * parseFloat(main.exchangeValue);
          }

          return {
            ...account,
            balance: newBalance,
          };
        })
      );
    },
    [accounts]
  );

  const contextValue = useMemo<IAccountsContext>(
    () => ({
      accounts,
      exchangeBetweenAccounts,
    }),
    [accounts, exchangeBetweenAccounts]
  );

  return (
    <AccountsContext.Provider value={contextValue}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsContextProvider;

import React, { useState, useCallback, useMemo } from 'react';

import { IAccount } from 'common/types/account';
interface IProps {
  children: React.ReactNode;
}

export interface IAccountsContext {
  accounts: IAccount[];
  exchange: () => void;
}

const bankAccounts: IAccount[] = [
  {
    id: '239fc813-fd0e-45a2-a3cc-4b8007ac2318',
    currency: 'USD',
    currencySymbol: '$',
    balance: 1700,
    countryCode: 'US',
  },
  {
    id: '28172914-2409-4b3b-a527-62c7ac9b3f10',
    currency: 'GBP',
    currencySymbol: '£',
    balance: 15040,
    countryCode: 'UK',
  },
  {
    id: '28172914-2409-4b3b-a527-62c7ac9b3f10',
    currency: 'EUR',
    currencySymbol: '€',
    balance: 50,
    countryCode: 'EU',
  },
  {
    id: 'd0e192a6-3055-4cc9-8933-0e81a293cecb',
    currency: 'RON',
    currencySymbol: 'RON',
    balance: 400,
    countryCode: 'RO',
  },
];

export const AccountsContext = React.createContext(null);

const AccountsContextProvider = ({ children }: IProps) => {
  const [accounts] = useState<IAccount[]>(bankAccounts);

  const exchange = useCallback(() => {}, [accounts]);

  const contextValue = useMemo<IAccountsContext>(
    () => ({
      accounts,
      exchange,
    }),
    [accounts, exchange]
  );

  return (
    <AccountsContext.Provider value={contextValue}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsContextProvider;

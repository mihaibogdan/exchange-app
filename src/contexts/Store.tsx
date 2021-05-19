import React, { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IAccount } from 'common/types/account';
import { ITransaction } from 'common/types/transaction';
import { ExchangeType, IExchangeMember } from 'common/types/exchanges';
// import { API_BASE_URL } from 'common/constants/api';

interface IProps {
  children: React.ReactNode;
}

export interface IStoreContext {
  accounts: IAccount[];
  transactions: ITransaction[];
  exchangeBetweenAccounts: (
    main: IExchangeMember,
    secondary: IExchangeMember,
    type: ExchangeType
  ) => void;
  // refreshTransactions: (startDate: string, endDate: string) => void;
}

const bankAccounts: IAccount[] = [
  {
    id: '467d35f9-84c0-48ca-98ef-cbb6d250f2a5',
    currency: 'AED',
    currencyName: 'United Arab Emirates Dirham',
    balance: 500,
    countryCode: 'AE',
  },
  {
    id: 'b80c05d6-bb75-4c3a-aaa6-6c26cb97758c',
    currency: 'AUD',
    currencyName: 'Australian Dollar',
    balance: 200.43,
    countryCode: 'AU',
  },
  {
    id: '2dabdb53-3a1f-4b90-a4a9-7ac459154428',
    currency: 'BGN',
    currencyName: 'Bulgarian Lev',
    balance: 100,
    countryCode: 'BG',
  },
  {
    id: '4a784950-cf9c-414a-9858-734aedc0f4a5',
    currency: 'EUR',
    currencyName: 'Euro',
    balance: 250,
    countryCode: 'EU',
  },
  {
    id: '28172914-2409-4b3b-a527-62c7ac9b3f10',
    currency: 'GBP',
    currencyName: 'British Pound',
    balance: 15040,
    countryCode: 'GB',
  },
  {
    id: 'd0e192a6-3055-4cc9-8933-0e81a293cecb',
    currency: 'RON',
    currencyName: 'Romanian Leu',
    balance: 400,
    countryCode: 'RO',
  },
  {
    id: '239fc813-fd0e-45a2-a3cc-4b8007ac2318',
    currency: 'USD',
    currencyName: 'United States Dollar',
    balance: 1700,
    countryCode: 'US',
  },
];

export const StoreContext = React.createContext(null);

const StoreContextProvider = ({ children }: IProps) => {
  const [accounts, setAccounts] = useState<IAccount[]>(bankAccounts);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  // useEffect(() => {
  //   const startDate = '2020-01-01-11-00-00';
  //   const endDate = '2020-01-01-12-00-00';

  //   const fetchTransactions = async () => {
  //     try {
  //       const res = await fetch(
  //         `${API_BASE_URL}/from/${startDate}/to/${endDate}`,
  //         {
  //           method: 'POST',
  //         }
  //       );
  //       const transactions = await res.json();
  //       setTransactions(transactions);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchTransactions();
  // }, []);

  const exchangeBetweenAccounts = useCallback(
    (main: IExchangeMember, secondary: IExchangeMember, type: ExchangeType) => {
      const sign = type === ExchangeType.Sell ? -1 : 1;

      setAccounts(
        accounts.map(account => {
          let newBalance = account.balance;
          if (account.id === main.account.id) {
            newBalance += sign * parseFloat(main.exchangeAmount);
          }
          if (account.id === secondary.account.id) {
            newBalance += -sign * parseFloat(secondary.exchangeAmount);
          }

          return {
            ...account,
            balance: newBalance,
          };
        })
      );

      setTransactions([
        {
          id: uuidv4(),
          timestamp: Date.now(),
          mainCurrency: main.account.currency,
          mainAmount: main.exchangeAmount,
          secondaryCurrency: secondary.account.currency,
          secondaryAmount: secondary.exchangeAmount,
          type,
        },
        ...transactions,
      ]);
    },
    [accounts, transactions]
  );

  // const refreshTransactions = useCallback(
  //   async (startDate: string, endDate: string) => {
  //     try {
  //       const res = await fetch(
  //         `${API_BASE_URL}/from/${startDate}/to/${endDate}`
  //       );
  //       const newTransactions = await res.json();
  //       setTransactions([...transactions, ...newTransactions]);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   },
  //   [transactions]
  // );

  const contextValue = useMemo<IStoreContext>(
    () => ({
      accounts,
      transactions,
      exchangeBetweenAccounts,
      // refreshTransactions,
    }),
    [accounts, exchangeBetweenAccounts]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

import React, { useContext } from 'react';

import { IStoreContext, StoreContext } from 'context/Store';
import { ITransaction } from 'common/types/transaction';
import { Wrapper, StyledTransaction } from './styled';

const TransactionsList = (props: React.HTMLAttributes<HTMLElement>) => {
  const { transactions } = useContext<IStoreContext>(StoreContext);

  return (
    <Wrapper {...props}>
      {transactions.map((transaction: ITransaction) => (
        <StyledTransaction
          key={transaction.id}
          type={transaction.type}
          mainCurrency={transaction.mainCurrency}
          mainAmount={transaction.mainAmount}
          secondaryCurrency={transaction.secondaryCurrency}
          secondaryAmount={transaction.secondaryAmount}
        />
      ))}
    </Wrapper>
  );
};

export default TransactionsList;

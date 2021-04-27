import React, { useContext } from 'react';

import { IStoreContext, StoreContext } from 'context/Store';
import { ITransaction } from 'common/types/transaction';
import { Wrapper, StyledTransaction } from './styled';
import Typography from '../Typography';

const TransactionsList = (props: React.HTMLAttributes<HTMLElement>) => {
  const { transactions } = useContext<IStoreContext>(StoreContext);

  return (
    <Wrapper {...props}>
      <Typography variant="h2">History</Typography>
      {transactions.length === 0 && (
        <Typography shade="light">No transactions for now.</Typography>
      )}
      {transactions.map((transaction: ITransaction) => (
        <StyledTransaction
          key={transaction.id}
          timestamp={transaction.timestamp}
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

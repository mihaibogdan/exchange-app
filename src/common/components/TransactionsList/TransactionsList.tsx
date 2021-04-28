import React, { useContext } from 'react';

import { IStoreContext, StoreContext } from 'context/Store';
import { ITransaction } from 'common/types/transaction';
import Typography from 'common/components/Typography';
import { Wrapper, StyledTransaction } from './styled';

const TransactionsList = (props: React.HTMLAttributes<HTMLElement>) => {
  const { transactions } = useContext<IStoreContext>(StoreContext);

  return (
    <Wrapper {...props}>
      <Typography variant="h2">History</Typography>
      {transactions.length === 0 && (
        <Typography shade="light">No transactions for now.</Typography>
      )}
      <div role="list">
        {transactions.map((transaction: ITransaction) => (
          <StyledTransaction
            key={transaction.id}
            timestamp={transaction.timestamp}
            type={transaction.type}
            mainCurrency={transaction.mainCurrency}
            mainAmount={transaction.mainAmount}
            secondaryCurrency={transaction.secondaryCurrency}
            secondaryAmount={transaction.secondaryAmount}
            role="listitem"
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default TransactionsList;

import React, { useContext } from 'react';
// import RefreshLineIcon from 'remixicon-react/RefreshLineIcon';

import { IStoreContext, StoreContext } from 'contexts/Store';
import { ITransaction } from 'common/types/transaction';
import Typography from 'common/components/Typography';
import { Row } from 'common/styles/layout';
import { Wrapper, StyledTransaction } from './styled';
// import Button from '../Button';

const TransactionsList = (props: React.HTMLAttributes<HTMLElement>) => {
  const { transactions } = useContext<IStoreContext>(StoreContext);

  return (
    <Wrapper {...props}>
      <Row>
        <Typography variant="h2">History</Typography>
        {/* <Button
          variant="icon"
          small
          style={{ marginLeft: 15 }}
          onClick={() =>
            refreshTransactions('2020-01-01-12-00-00', '2020-01-01-13-00-00')
          }
        >
          <RefreshLineIcon />
        </Button> */}
      </Row>

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

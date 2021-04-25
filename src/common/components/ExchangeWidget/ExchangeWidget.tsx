import React, { useContext } from 'react';

import { ExchangeRatesContext } from 'context/ExchangeRates';
import { exchange } from 'common/utils/exchangeRates';
import { IAccount } from 'common/types/account';
import { ExchangeType } from 'common/types/exchanges';
import Typography from 'common/components/Typography';
import { Wrapper } from './styled';

interface IProps {
  mainAccount: IAccount;
  mainValue: string;
  secondaryAccount: IAccount;
  secondaryValue: string;
  type: ExchangeType;
}

const Exchange = ({ mainAccount, secondaryAccount, type }: IProps) => {
  const { exchangeRates } = useContext(ExchangeRatesContext);

  return (
    <Wrapper>
      <Typography variant="h1">
        {type === ExchangeType.Buy ? 'Buy' : 'Sell'} {mainAccount.currency}
      </Typography>
      <Typography variant="caption" color="primary" className="market-order">
        {`Market order • 1 ${mainAccount.currencySymbol} = ${exchange(
          1,
          mainAccount.currency,
          secondaryAccount.currency,
          exchangeRates
        ).toFixed(4)} ${secondaryAccount.currencySymbol}`}
      </Typography>
    </Wrapper>
  );
};

export default Exchange;

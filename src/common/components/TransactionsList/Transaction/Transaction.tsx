import React from 'react';
import BuyIcon from 'remixicon-react/ArrowLeftLineIcon';
import SellIcon from 'remixicon-react/ArrowRightLineIcon';

import { ExchangeType } from 'common/types/exchanges';
import Typography from 'common/components/Typography';
import { getCurrencySymbol } from 'common/utils/currencies';
import { Column } from 'common/styles/layout';
import { StyledTransaction, BadgeIcon, AmountBox } from './styled';

interface IProps extends React.HTMLAttributes<HTMLElement> {
  type: ExchangeType;
  timestamp: number;
  mainCurrency: string;
  mainAmount: string;
  secondaryCurrency: string;
  secondaryAmount: string;
}

const Transaction = ({
  type,
  timestamp,
  mainCurrency,
  mainAmount,
  secondaryCurrency,
  secondaryAmount,
  ...props
}: IProps) => {
  const renderDescription = () =>
    `${type === ExchangeType.Sell ? 'Sold' : 'Bought'} ${mainCurrency} ${
      type === ExchangeType.Sell ? 'for' : 'with'
    } ${secondaryCurrency}`;

  return (
    <StyledTransaction {...props}>
      <BadgeIcon>
        {type === ExchangeType.Sell ? <SellIcon /> : <BuyIcon />}
      </BadgeIcon>
      <Column>
        <Typography className="description">{renderDescription()}</Typography>
        <Typography variant="caption" shade="light" noWrap>
          {('0' + new Date(timestamp).getHours()).substr(-2)}:
          {('0' + new Date(timestamp).getMinutes()).substr(-2)}
        </Typography>
      </Column>
      <AmountBox>
        <Typography variant="caption" noWrap>
          {type === ExchangeType.Sell ? '-' : '+'} {mainAmount}{' '}
          {getCurrencySymbol(mainCurrency)}
        </Typography>
        <Typography variant="caption" shade="light" noWrap>
          {type === ExchangeType.Sell ? '+' : '-'} {secondaryAmount}{' '}
          {getCurrencySymbol(secondaryCurrency)}
        </Typography>
      </AmountBox>
    </StyledTransaction>
  );
};

export default Transaction;

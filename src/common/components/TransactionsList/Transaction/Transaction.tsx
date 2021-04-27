import React from 'react';
import ExchangeIcon from 'remixicon-react/ExchangeLineIcon';
import Typography from 'common/components/Typography';

import { ExchangeType } from 'common/types/exchanges';
import { StyledTransaction, BadgeIcon, AmountBox } from './styled';
import { getCurrencySymbol } from 'common/utils/currencies';

interface IProps extends React.HTMLAttributes<HTMLElement> {
  type: ExchangeType;
  mainCurrency: string;
  mainAmount: string;
  secondaryCurrency: string;
  secondaryAmount: string;
}

const Transaction = ({
  type,
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
        <ExchangeIcon />
      </BadgeIcon>
      <Typography className="description">{renderDescription()}</Typography>
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

import React from 'react';
import { NumberFormatValues } from 'react-number-format';
import ArrowDropDownIcon from 'remixicon-react/ArrowDropDownLineIcon';

import { IAccount } from 'common/types/account';
import { ExchangeAccountType } from 'common/types/exchanges';
import { Row } from 'common/styles/layout';
import { formatNumber } from 'common/utils/numbers';
import { Wrapper, AccountButton, BalanceButton, NumberInput } from './styled';
import Typography from '../Typography';

interface IProps {
  className?: string;
  account: IAccount;
  value: number;
  type: ExchangeAccountType;
  onValueChange?: (value: number) => void;
}

const ExchangeInput = ({
  account,
  value,
  type,
  onValueChange,
  className = '',
}: IProps) => {
  return (
    <Wrapper className={className}>
      <Row spaceBetween>
        <AccountButton variant="empty">
          {account.currency} <ArrowDropDownIcon />
        </AccountButton>
        <NumberInput
          value={value}
          suffix={` ${account.currencySymbol}`}
          prefix={type === ExchangeAccountType.Seller ? '-' : '+'}
          thousandSeparator
          placeholder={`0 ${account.currencySymbol}`}
          allowNegative={false}
          onValueChange={(values: NumberFormatValues) => {
            onValueChange(Math.abs(values.floatValue));
          }}
        />
      </Row>
      <Row spaceBetween>
        <BalanceButton
          variant="empty"
          onClick={() => onValueChange(account.balance)}
        >
          Balance: {formatNumber(account.balance)} {account.currencySymbol}
        </BalanceButton>
        {value > account.balance && type === ExchangeAccountType.Seller && (
          <Typography variant="caption" color="error" className="error">
            exceeds balance
          </Typography>
        )}
      </Row>
    </Wrapper>
  );
};

export default ExchangeInput;

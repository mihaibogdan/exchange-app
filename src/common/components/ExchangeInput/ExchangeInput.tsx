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
  value: string;
  type: ExchangeAccountType;
  onValueChange?: (value: string) => void;
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
          decimalScale={2}
          onValueChange={(values: NumberFormatValues) => {
            let newValue = values.value;
            if (newValue[0] === '-') newValue = newValue.substr(1);
            if (value !== newValue) onValueChange(newValue);
          }}
        />
      </Row>
      <Row spaceBetween>
        <BalanceButton
          variant="empty"
          onClick={() => onValueChange(account.balance.toFixed(2))}
        >
          Balance: {formatNumber(account.balance)} {account.currencySymbol}
        </BalanceButton>
        {+value > account.balance && type === ExchangeAccountType.Seller && (
          <Typography variant="caption" color="error" className="error">
            exceeds balance
          </Typography>
        )}
      </Row>
    </Wrapper>
  );
};

export default ExchangeInput;

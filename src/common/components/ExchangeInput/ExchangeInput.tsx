import React, { useState, useRef } from 'react';
import { NumberFormatValues } from 'react-number-format';
import ArrowDropDownIcon from 'remixicon-react/ArrowDropDownLineIcon';

import { IAccount } from 'common/types/account';
import { ExchangeAccountType } from 'common/types/exchanges';
import { Row } from 'common/styles/layout';
import { formatNumber } from 'common/utils/numbers';
import { getCurrencySymbol } from 'common/utils/currencies';
import Typography from 'common/components/Typography';
import AccountsModal from 'common/components/AccountsModal';
import { Wrapper, AccountButton, BalanceButton, NumberInput } from './styled';

interface IProps {
  account: IAccount;
  value: string;
  type: ExchangeAccountType;
  onValueChange?: (value: string) => void;
  onAccountChange?: (account: IAccount) => void;
  className?: string;
}

const ExchangeInput = ({
  account,
  value,
  type,
  onValueChange,
  onAccountChange,
  className = '',
}: IProps) => {
  const [isChangingCurrency, setIsChangingCurrency] = useState(false);
  const inputRef = useRef(null);

  return (
    <Wrapper className={className}>
      <Row spaceBetween>
        <AccountButton
          variant="empty"
          onClick={() => {
            setIsChangingCurrency(true);
          }}
        >
          {account.currency} <ArrowDropDownIcon />
        </AccountButton>
        <NumberInput
          value={value}
          suffix={` ${getCurrencySymbol(account.currency)}`}
          prefix={type === ExchangeAccountType.Seller ? '-' : '+'}
          thousandSeparator
          placeholder={`0 ${getCurrencySymbol(account.currency)}`}
          allowNegative={false}
          decimalScale={2}
          getInputRef={inputRef}
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
          Balance: {formatNumber(account.balance)}{' '}
          {getCurrencySymbol(account.currency)}
        </BalanceButton>
        {+value > account.balance && type === ExchangeAccountType.Seller && (
          <Typography variant="caption" color="error" className="error">
            exceeds balance
          </Typography>
        )}
      </Row>
      <AccountsModal
        isOpen={isChangingCurrency}
        onClose={() => setIsChangingCurrency(false)}
        selectedAccount={account}
        onSelectAccount={(newAccount: IAccount) => {
          onAccountChange(newAccount);
          if (type === ExchangeAccountType.Seller) {
            inputRef.current?.focus();
          }
        }}
      />
    </Wrapper>
  );
};

export default ExchangeInput;

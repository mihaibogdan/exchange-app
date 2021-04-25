import React, { useContext, useReducer, useMemo } from 'react';
import ArrowDownIcon from 'remixicon-react/ArrowDownLineIcon';
import ArrowUpIcon from 'remixicon-react/ArrowUpLineIcon';

import { ExchangeRatesContext } from 'context/ExchangeRates';
import { exchange } from 'common/utils/exchangeRates';
import { IAccount } from 'common/types/account';
import { ExchangeAccountType, ExchangeType } from 'common/types/exchanges';
import Typography from 'common/components/Typography';
import ExchangeInput from 'common/components/ExchangeInput';
import {
  changeMainValue,
  changeSecondaryValue,
  toggleType,
} from './logic/actions';
import reducer from './logic/reducer';
import { Wrapper, InputsArea, DirectionButton } from './styled';
import Button from '../Button';

interface IProps {
  mainAccount: {
    account: IAccount;
    value: string;
  };
  secondaryAccount: {
    account: IAccount;
    value: string;
  };
  exchangeType: ExchangeType;
}

const ExchangeWidget = ({
  mainAccount,
  secondaryAccount,
  exchangeType,
}: IProps) => {
  const { exchangeRates } = useContext(ExchangeRatesContext);
  const [state, dispatch] = useReducer(reducer, {
    main: mainAccount,
    secondary: secondaryAccount,
    type: exchangeType,
  });
  const { main, secondary, type } = state;
  const exceedsBalance = useMemo(() => {
    if (type === ExchangeType.Sell) {
      if (main.account.balance < main.value) return true;
    }

    if (type === ExchangeType.Buy) {
      if (secondary.account.balance < secondary.value) return true;
    }

    return false;
  }, [main, secondary, type]);

  const onChangeMainValue = (value: number) => {
    dispatch(changeMainValue(value, exchangeRates));
  };

  const onChangeSecondaryValue = (value: number) => {
    dispatch(changeSecondaryValue(value, exchangeRates));
  };

  const onTypeToggle = () => {
    dispatch(toggleType());
  };

  return (
    <Wrapper>
      <Typography variant="h1">
        {type === ExchangeType.Buy ? 'Buy' : 'Sell'} {main.account.currency}
      </Typography>
      <Typography variant="caption" color="primary" className="market-order">
        {`Market order • 1 ${main.account.currencySymbol} = ${exchange(
          1,
          main.account.currency,
          secondary.account.currency,
          exchangeRates
        ).toFixed(4)} ${secondary.account.currencySymbol}`}
      </Typography>

      <InputsArea>
        <ExchangeInput
          className="main-account"
          account={main.account}
          value={main.value}
          type={
            type === ExchangeType.Sell
              ? ExchangeAccountType.Seller
              : ExchangeAccountType.Buyer
          }
          onValueChange={onChangeMainValue}
        />
        <DirectionButton variant="icon" color="primary" onClick={onTypeToggle}>
          {type === ExchangeType.Sell ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </DirectionButton>
        <ExchangeInput
          account={secondary.account}
          value={secondary.value}
          type={
            type === ExchangeType.Sell
              ? ExchangeAccountType.Buyer
              : ExchangeAccountType.Seller
          }
          onValueChange={onChangeSecondaryValue}
        />
      </InputsArea>
      <Button
        variant="contained"
        color="primary"
        disabled={exceedsBalance}
        className="exchange-button"
      >
        {`${type === ExchangeType.Sell ? 'Sell' : 'Buy'} ${
          main.account.currency
        } for ${secondary.account.currency}`}
      </Button>
    </Wrapper>
  );
};

export default ExchangeWidget;

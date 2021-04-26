import React, { useContext, useReducer, useMemo, useEffect } from 'react';
import ArrowDownIcon from 'remixicon-react/ArrowDownLineIcon';
import ArrowUpIcon from 'remixicon-react/ArrowUpLineIcon';

import {
  ExchangeRatesContext,
  IExchangeRatesContext,
} from 'context/ExchangeRates';
import { AccountsContext, IAccountsContext } from 'context/Accounts';
import { exchange } from 'common/utils/exchangeRates';
import { IAccount } from 'common/types/account';
import { ExchangeAccountType, ExchangeType } from 'common/types/exchanges';
import Typography from 'common/components/Typography';
import ExchangeInput from 'common/components/ExchangeInput';
import Button from 'common/components/Button';
import {
  changeMainAccount,
  changeMainValue,
  changeSecondaryAccount,
  changeSecondaryValue,
  resetValues,
  toggleType,
} from './logic/actions';
import reducer from './logic/reducer';
import { Wrapper, InputsArea, DirectionButton } from './styled';

interface IProps {
  mainCurrency: string;
  secondaryCurrency: string;
}

const ExchangeWidget = ({ mainCurrency, secondaryCurrency }: IProps) => {
  const { exchangeRates } = useContext<IExchangeRatesContext>(
    ExchangeRatesContext
  );
  const { accounts, exchangeBetweenAccounts } = useContext<IAccountsContext>(
    AccountsContext
  );
  const [state, dispatch] = useReducer(reducer, {
    main: {
      account: accounts.find(a => a.currency === mainCurrency),
      exchangeValue: '',
    },
    secondary: {
      account: accounts.find(a => a.currency === secondaryCurrency),
      exchangeValue: '',
    },
    type: ExchangeType.Sell,
  });
  const { main, secondary, type } = state;

  useEffect(() => {
    const mainAccount = accounts.find(
      (a: IAccount) => a.currency === main.account.currency
    );
    const secondaryAccount = accounts.find(
      (a: IAccount) => a.currency === secondary.account.currency
    );

    dispatch(changeMainAccount(mainAccount));
    dispatch(changeSecondaryAccount(secondaryAccount));
  }, [accounts]);

  const exceedsBalance = useMemo(() => {
    if (type === ExchangeType.Sell) {
      if (main.account.balance < main.exchangeValue) return true;
    }

    if (type === ExchangeType.Buy) {
      if (secondary.account.balance < secondary.exchangeValue) return true;
    }

    return false;
  }, [main, secondary, type]);

  const onChangeMainAccount = (account: IAccount) => {
    dispatch(changeMainAccount(account));
    dispatch(changeMainValue(main.exchangeValue, exchangeRates));
  };

  const onChangeMainValue = (exchangeValue: string) => {
    dispatch(changeMainValue(exchangeValue, exchangeRates));
  };

  const onChangeSecondaryAccount = (account: IAccount) => {
    dispatch(changeSecondaryAccount(account));
    dispatch(changeMainValue(secondary.exchangeValue, exchangeRates));
  };

  const onChangeSecondaryValue = (exchangeValue: string) => {
    dispatch(changeSecondaryValue(exchangeValue, exchangeRates));
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
          exchangeRates,
          4
        )} ${secondary.account.currencySymbol}`}
      </Typography>

      <InputsArea>
        <ExchangeInput
          className="main-account"
          account={main.account}
          value={main.exchangeValue}
          type={
            type === ExchangeType.Sell
              ? ExchangeAccountType.Seller
              : ExchangeAccountType.Buyer
          }
          onValueChange={onChangeMainValue}
          onAccountChange={onChangeMainAccount}
        />
        <DirectionButton variant="icon" color="primary" onClick={onTypeToggle}>
          {type === ExchangeType.Sell ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </DirectionButton>
        <ExchangeInput
          account={secondary.account}
          value={secondary.exchangeValue}
          type={
            type === ExchangeType.Sell
              ? ExchangeAccountType.Buyer
              : ExchangeAccountType.Seller
          }
          onValueChange={onChangeSecondaryValue}
          onAccountChange={onChangeSecondaryAccount}
        />
      </InputsArea>
      <Button
        variant="contained"
        color="primary"
        disabled={
          exceedsBalance ||
          Number.parseFloat(main.exchangeValue) === 0 ||
          isNaN(Number.parseFloat(main.exchangeValue))
        }
        className="exchange-button"
        onClick={() => {
          exchangeBetweenAccounts(main, secondary, type);
          dispatch(resetValues());
        }}
      >
        {`${type === ExchangeType.Sell ? 'Sell' : 'Buy'} ${
          main.account.currency
        } for ${secondary.account.currency}`}
      </Button>
    </Wrapper>
  );
};

export default ExchangeWidget;

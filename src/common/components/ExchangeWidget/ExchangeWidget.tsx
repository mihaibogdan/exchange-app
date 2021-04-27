import React, { useContext, useReducer, useMemo, useEffect } from 'react';
import ArrowDownIcon from 'remixicon-react/ArrowDownLineIcon';
import ArrowUpIcon from 'remixicon-react/ArrowUpLineIcon';

import {
  ExchangeRatesContext,
  IExchangeRatesContext,
} from 'context/ExchangeRates';
import { StoreContext, IStoreContext } from 'context/Store';
import { IAccount } from 'common/types/account';
import { ExchangeAccountType, ExchangeType } from 'common/types/exchanges';
import { exchange } from 'common/utils/exchangeRates';
import { getCurrencySymbol } from 'common/utils/currencies';
import Typography from 'common/components/Typography';
import ExchangeInput from 'common/components/ExchangeInput';
import Button from 'common/components/Button';
import {
  changeMainAccount,
  changeMainAmount,
  changeSecondaryAccount,
  changeSecondaryAmount,
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
  const { accounts, exchangeBetweenAccounts } = useContext<IStoreContext>(
    StoreContext
  );
  const [state, dispatch] = useReducer(reducer, {
    main: {
      account: accounts.find(a => a.currency === mainCurrency),
      exchangeAmount: '',
    },
    secondary: {
      account: accounts.find(a => a.currency === secondaryCurrency),
      exchangeAmount: '',
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
      if (main.account.balance < main.exchangeAmount) return true;
    }

    if (type === ExchangeType.Buy) {
      if (secondary.account.balance < secondary.exchangeAmount) return true;
    }

    return false;
  }, [main, secondary, type]);

  const onChangeMainAccount = (account: IAccount) => {
    dispatch(changeMainAccount(account));
    dispatch(changeMainAmount(main.exchangeAmount, exchangeRates));
  };

  const onChangeMainAmount = (exchangeAmount: string) => {
    dispatch(changeMainAmount(exchangeAmount, exchangeRates));
  };

  const onChangeSecondaryAccount = (account: IAccount) => {
    dispatch(changeSecondaryAccount(account));
    dispatch(changeMainAmount(secondary.exchangeAmount, exchangeRates));
  };

  const onChangeSecondaryAmount = (exchangeAmount: string) => {
    dispatch(changeSecondaryAmount(exchangeAmount, exchangeRates));
  };

  const onTypeToggle = () => {
    dispatch(toggleType());
  };

  const onExchange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (exceedsBalance || !main.exchangeAmount) return;

    exchangeBetweenAccounts(main, secondary, type);
    dispatch(resetValues());
  };

  return (
    <Wrapper>
      <Typography variant="h1">
        {type === ExchangeType.Buy ? 'Buy' : 'Sell'} {main.account.currency}
      </Typography>
      <Typography variant="caption" color="primary" className="market-order">
        {`Market order • 1 ${getCurrencySymbol(
          main.account.currency
        )} = ${exchange(
          1,
          main.account.currency,
          secondary.account.currency,
          exchangeRates,
          4
        )} ${getCurrencySymbol(secondary.account.currency)}`}
      </Typography>

      <form onSubmit={onExchange}>
        <InputsArea>
          <ExchangeInput
            className="main-account"
            account={main.account}
            value={main.exchangeAmount}
            type={
              type === ExchangeType.Sell
                ? ExchangeAccountType.Seller
                : ExchangeAccountType.Buyer
            }
            onValueChange={onChangeMainAmount}
            onAccountChange={onChangeMainAccount}
          />
          <DirectionButton
            variant="icon"
            color="primary"
            onClick={onTypeToggle}
          >
            {type === ExchangeType.Sell ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </DirectionButton>
          <ExchangeInput
            account={secondary.account}
            value={secondary.exchangeAmount}
            type={
              type === ExchangeType.Sell
                ? ExchangeAccountType.Buyer
                : ExchangeAccountType.Seller
            }
            onValueChange={onChangeSecondaryAmount}
            onAccountChange={onChangeSecondaryAccount}
          />
        </InputsArea>
        <Button
          variant="contained"
          color="primary"
          disabled={
            exceedsBalance ||
            Number.parseFloat(main.exchangeAmount) === 0 ||
            isNaN(Number.parseFloat(main.exchangeAmount))
          }
          className="exchange-button"
          type="submit"
        >
          {`${type === ExchangeType.Sell ? 'Sell' : 'Buy'} ${
            main.account.currency
          } for ${secondary.account.currency}`}
        </Button>
      </form>
    </Wrapper>
  );
};

export default ExchangeWidget;

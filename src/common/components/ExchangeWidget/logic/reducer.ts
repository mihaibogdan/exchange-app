import { IAccount } from 'common/types/account';
import { ExchangeType, IRates } from 'common/types/exchanges';
import createReducer from 'common/utils/createReducer';
import { exchange } from 'common/utils/exchangeRates';

export interface IExchangeWidgetState {
  main: {
    account: IAccount;
    value: string | number;
  };
  secondary: {
    account: IAccount;
    value: string | number;
  };
  type: ExchangeType;
}

function CHANGE_MAIN_VALUE(
  nextState: IExchangeWidgetState,
  payload: { body: { value: number; exchangeRates: IRates } }
) {
  const { value, exchangeRates } = payload.body;
  if (!value) {
    nextState.main.value = '';
    nextState.secondary.value = '';
    return;
  }

  const exchangedValue = exchange(
    value,
    nextState.main.account.currency,
    nextState.secondary.account.currency,
    exchangeRates
  );
  nextState.main.value = value;
  nextState.secondary.value = exchangedValue;
}

function CHANGE_SECONDARY_VALUE(
  nextState: IExchangeWidgetState,
  payload: { body: { value: number; exchangeRates: IRates } }
) {
  const { value, exchangeRates } = payload.body;
  if (!value) {
    nextState.main.value = '';
    nextState.secondary.value = '';
    return;
  }

  const exchangedValue = exchange(
    value,
    nextState.secondary.account.currency,
    nextState.main.account.currency,
    exchangeRates
  );

  nextState.main.value = exchangedValue;
  nextState.secondary.value = value;
}

function TOGGLE_TYPE(nextState: IExchangeWidgetState) {
  if (nextState.type === ExchangeType.Buy) {
    nextState.type = ExchangeType.Sell;
  } else {
    nextState.type = ExchangeType.Buy;
  }
}

const reducer = createReducer<IExchangeWidgetState>(
  {
    main: {
      account: null,
      value: '',
    },
    secondary: {
      account: null,
      value: '',
    },
    type: ExchangeType.Buy,
  },
  {
    CHANGE_MAIN_VALUE,
    CHANGE_SECONDARY_VALUE,
    TOGGLE_TYPE,
  }
);

export default reducer;

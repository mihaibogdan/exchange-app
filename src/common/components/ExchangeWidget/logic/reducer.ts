import { IAccount } from 'common/types/account';
import { ExchangeType, IExchangeMember, IRates } from 'common/types/exchanges';
import createReducer from 'common/utils/createReducer';
import { exchange } from 'common/utils/exchangeRates';

export interface IExchangeWidgetState {
  main: IExchangeMember;
  secondary: IExchangeMember;
  type: ExchangeType;
}

function CHANGE_MAIN_ACCOUNT(
  nextState: IExchangeWidgetState,
  payload: { body: { account: IAccount; exchangeRates: IRates } }
) {
  const { account } = payload.body;

  if (nextState.secondary.account.id === account.id) {
    nextState.secondary.account = nextState.main.account;
  }
  nextState.main.account = account;
}

function CHANGE_MAIN_VALUE(
  nextState: IExchangeWidgetState,
  payload: { body: { value: string; exchangeRates: IRates } }
) {
  const { value, exchangeRates } = payload.body;
  if (!value) {
    nextState.main.exchangeValue = '';
    nextState.secondary.exchangeValue = '';
    return;
  }

  const exchangedValue = exchange(
    parseFloat(value),
    nextState.main.account.currency,
    nextState.secondary.account.currency,
    exchangeRates
  );
  nextState.main.exchangeValue = value;
  nextState.secondary.exchangeValue = exchangedValue;
}

function CHANGE_SECONDARY_ACCOUNT(
  nextState: IExchangeWidgetState,
  payload: { body: { account: IAccount; exchangeRates: IRates } }
) {
  const { account } = payload.body;

  if (nextState.main.account.id === account.id) {
    nextState.main.account = nextState.secondary.account;
  }
  nextState.secondary.account = account;

  // nextState.secondary.value = exchangedValue;
}

function CHANGE_SECONDARY_VALUE(
  nextState: IExchangeWidgetState,
  payload: { body: { value: string; exchangeRates: IRates } }
) {
  const { value, exchangeRates } = payload.body;
  if (!value) {
    nextState.main.exchangeValue = '';
    nextState.secondary.exchangeValue = '';
    return;
  }

  const exchangedValue = exchange(
    parseFloat(value),
    nextState.secondary.account.currency,
    nextState.main.account.currency,
    exchangeRates
  );

  nextState.main.exchangeValue = exchangedValue;
  nextState.secondary.exchangeValue = value;
}

function TOGGLE_TYPE(nextState: IExchangeWidgetState) {
  if (nextState.type === ExchangeType.Buy) {
    nextState.type = ExchangeType.Sell;
  } else {
    nextState.type = ExchangeType.Buy;
  }
}
function RESET_VALUES(nextState: IExchangeWidgetState) {
  nextState.main.exchangeValue = '';
  nextState.secondary.exchangeValue = '';
}

const reducer = createReducer<IExchangeWidgetState>(
  {
    main: {
      account: null,
      exchangeValue: '',
    },
    secondary: {
      account: null,
      exchangeValue: '',
    },
    type: ExchangeType.Buy,
  },
  {
    CHANGE_MAIN_ACCOUNT,
    CHANGE_MAIN_VALUE,
    CHANGE_SECONDARY_ACCOUNT,
    CHANGE_SECONDARY_VALUE,
    TOGGLE_TYPE,
    RESET_VALUES,
  }
);

export default reducer;

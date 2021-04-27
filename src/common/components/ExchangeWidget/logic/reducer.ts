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

function CHANGE_MAIN_AMOUNT(
  nextState: IExchangeWidgetState,
  payload: { body: { value: string; exchangeRates: IRates } }
) {
  const { value, exchangeRates } = payload.body;
  if (!value) {
    nextState.main.exchangeAmount = '';
    nextState.secondary.exchangeAmount = '';
    return;
  }

  const exchangedValue = exchange(
    parseFloat(value),
    nextState.main.account.currency,
    nextState.secondary.account.currency,
    exchangeRates
  );
  nextState.main.exchangeAmount = value;
  nextState.secondary.exchangeAmount = exchangedValue;
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

function CHANGE_SECONDARY_AMOUNT(
  nextState: IExchangeWidgetState,
  payload: { body: { value: string; exchangeRates: IRates } }
) {
  const { value, exchangeRates } = payload.body;
  if (!value) {
    nextState.main.exchangeAmount = '';
    nextState.secondary.exchangeAmount = '';
    return;
  }

  const exchangedValue = exchange(
    parseFloat(value),
    nextState.secondary.account.currency,
    nextState.main.account.currency,
    exchangeRates
  );

  nextState.main.exchangeAmount = exchangedValue;
  nextState.secondary.exchangeAmount = value;
}

function TOGGLE_TYPE(nextState: IExchangeWidgetState) {
  if (nextState.type === ExchangeType.Buy) {
    nextState.type = ExchangeType.Sell;
  } else {
    nextState.type = ExchangeType.Buy;
  }
}
function RESET_AMOUNTS(nextState: IExchangeWidgetState) {
  nextState.main.exchangeAmount = '';
  nextState.secondary.exchangeAmount = '';
}

const reducer = createReducer<IExchangeWidgetState>(
  {
    main: {
      account: null,
      exchangeAmount: '',
    },
    secondary: {
      account: null,
      exchangeAmount: '',
    },
    type: ExchangeType.Buy,
  },
  {
    CHANGE_MAIN_ACCOUNT,
    CHANGE_MAIN_AMOUNT,
    CHANGE_SECONDARY_ACCOUNT,
    CHANGE_SECONDARY_AMOUNT,
    TOGGLE_TYPE,
    RESET_AMOUNTS,
  }
);

export default reducer;

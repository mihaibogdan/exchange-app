import { IAccount } from 'common/types/account';
import { ExchangeType } from 'common/types/exchanges';
import createReducer from 'common/utils/createReducer';

export interface IExchangesState {
  main: {
    account: IAccount;
    exchangeValue: string;
  };
  secondary: {
    account: IAccount;
    exchangeValue: string;
  };
  type: ExchangeType;
}

function CHANGE_VALUE(nextState: IExchangesState, payload) {
  nextState.main.exchangeValue = payload.body.value;
}

const reducer = createReducer<IExchangesState>(
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
    CHANGE_VALUE,
  }
);

export default reducer;

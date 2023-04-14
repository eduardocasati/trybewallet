import { REQUEST_CURRENCY_LIST, EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

export const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EXPENSE: {
    return {
      ...state,
      expenses: [],
      editor: false,
      idToEdit: 0,
    };
  }

  case REQUEST_CURRENCY_LIST: {
    console.log(action.payload);
    return {
      ...state,
      currencies: action.payload,
    };
  }

  default:
    return state;
  }
};

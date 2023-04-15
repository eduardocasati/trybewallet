import { EXPENSE, REQUEST_CURRENCY_LIST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY_LIST: {
    return {
      ...state,
      currencies: action.payload,
    };
  }

  case EXPENSE: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      // expenses: state.expenses
      //   .map((expense) => (expense.id === action.id ? action.payload : expense)),
    };
  }

  default:
    return state;
  }
};

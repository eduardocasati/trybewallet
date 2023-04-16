import {
  EDIT_EXPENSE,
  EXPENSE,
  EXPENSE_TO_BE_DELETED,
  IS_EDITING_EXPENSE,
  REQUEST_CURRENCY_LIST,
  SET_ID_TO_EDIT,
  TOTAL_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalExpenses: 0,
};

export const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY_LIST: {
    return { ...state,
      currencies: action.payload,
    };
  }
  case EXPENSE: {
    return { ...state,
      expenses: [...state.expenses, action.payload],
    };
  }
  case EXPENSE_TO_BE_DELETED: {
    return { ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== action.payload),
    };
  }
  case IS_EDITING_EXPENSE: {
    return { ...state,
      editor: action.payload,
    };
  }
  case SET_ID_TO_EDIT: {
    return { ...state,
      idToEdit: action.payload,
    };
  }
  case EDIT_EXPENSE: {
    return {
      ...state,
      idToEdit: action.payload.id,
      expenses: state.expenses
        .map((expense) => (expense.id === state.idToEdit ? action.payload : expense)),
    };
  }
  case TOTAL_EXPENSES: {
    return { ...state,
      totalExpenses: state.expenses
        .reduce(
          (acc, expense) => acc
        + Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask),
          0,
        ),
    };
  }
  default:
    return state;
  }
};

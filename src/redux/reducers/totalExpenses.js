import { SUBTRACT_EXPENSE, TOTAL_EXPENSES } from '../actions';

const INITIAL_STATE = {
  totalExpenses: 0,
};

export const totalExpensesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOTAL_EXPENSES: {
    return {
      totalExpenses: action.payload + state.totalExpenses,
    };
  }

  case SUBTRACT_EXPENSE: {
    return {
      totalExpenses: Math.abs(state.totalExpenses - action.payload),
    };
  }

  default:
    return state;
  }
};

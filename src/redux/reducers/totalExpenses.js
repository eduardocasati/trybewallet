import { TOTAL_EXPENSES } from '../actions';

const INITIAL_STATE = {
  totalExpenses: 0,
};

export const totalExpensesReducer = (state = INITIAL_STATE, action) => {
  const total = state.totalExpenses;
  switch (action.type) {
  case TOTAL_EXPENSES: {
    return {
      totalExpenses: action.payload + total,
    };
  }

  default:
    return state;
  }
};

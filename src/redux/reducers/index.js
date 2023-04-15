import { combineReducers } from 'redux';
import { totalExpensesReducer } from './totalExpenses';
import { userReducer } from './user';
import { walletReducer } from './wallet';

export const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
  totalExpenses: totalExpensesReducer,
});

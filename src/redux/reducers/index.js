import { combineReducers } from 'redux';
import { userReducer } from './user';
import { walletReducer } from './wallet';

export const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
});

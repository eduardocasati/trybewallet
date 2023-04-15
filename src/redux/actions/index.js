import { requestCurrencyAPI } from '../../services';

export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_CURRENCY_LIST = 'REQUEST_CURRENCY_LIST';
export const EXPENSE = 'EXPENSE';
export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';

export const saveUser = (user) => ({
  type: USER_EMAIL,
  payload: user,
});

export const fetchCurrencyList = () => async (dispatch) => {
  const currenciesList = await requestCurrencyAPI();
  delete currenciesList.USDT;
  // .filter((currency) => currency !== 'USDT');
  const currenciesListArray = Object.keys(currenciesList);
  dispatch({
    type: REQUEST_CURRENCY_LIST,
    payload: currenciesListArray,
  });
};

export const saveExpense = (expense) => ({
  type: EXPENSE,
  payload: expense,
});

export const sumTotalExpenses = (expenseValue) => ({
  type: TOTAL_EXPENSES,
  payload: expenseValue,
});

import { fetchCurrencyAPI } from '../../services';

export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_CURRENCY_LIST = 'REQUEST_CURRENCY_LIST';
export const EXPENSE = 'EXPENSE';

export const saveUser = (user) => ({
  type: USER_EMAIL,
  payload: user,
});

export const fetchCurrencyList = () => async (dispatch) => {
  const currenciesList = await fetchCurrencyAPI();
  const filterUSDT = Object.keys(currenciesList)
    .filter((currency) => currency !== 'USDT');
  dispatch({
    type: REQUEST_CURRENCY_LIST,
    payload: filterUSDT,
  });
};

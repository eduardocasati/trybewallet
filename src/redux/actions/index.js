import { requestCurrencyAPI } from '../../services';

export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_CURRENCY_LIST = 'REQUEST_CURRENCY_LIST';
export const EXPENSE = 'EXPENSE';
export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';
export const EXPENSE_TO_BE_DELETED = 'EXPENSE_TO_BE_DELETED';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const IS_EDITING_EXPENSE = 'IS_EDITING_EXPENSE';
export const SET_ID_TO_EDIT = 'SET_ID_TO_EDIT';

export const saveUser = (user) => ({
  type: USER_EMAIL,
  payload: user,
});

export const fetchCurrencyList = () => async (dispatch) => {
  const currenciesList = await requestCurrencyAPI();
  delete currenciesList.USDT;
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

export const sumTotalExpenses = () => ({
  type: TOTAL_EXPENSES,
});

export const deleteExpense = (expenseId) => ({
  type: EXPENSE_TO_BE_DELETED,
  payload: expenseId,
});

export const toggleEditExpense = (isEditing) => ({
  type: IS_EDITING_EXPENSE,
  payload: isEditing,
});

export const setIdToEdit = (idToEdit) => ({
  type: SET_ID_TO_EDIT,
  payload: idToEdit,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  payload: expense,
});

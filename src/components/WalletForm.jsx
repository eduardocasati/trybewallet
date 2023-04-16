import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  editExpense,
  fetchCurrencyList,
  saveExpense,
  sumTotalExpenses,
  toggleEditExpense,
} from '../redux/actions';
import { requestCurrencyAPI } from '../services';

import '../style/WalletForm.css';

class WalletForm extends Component {
  state = {
    description: '',
    tag: '',
    value: '',
    currency: '',
    method: '',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyList());
    this.setState({
      tag: 'Alimentação',
      currency: 'USD',
      method: 'Dinheiro',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  fetchCurrencyAPI = async () => {
    const { isEditing } = this.props;
    const data = await requestCurrencyAPI();
    if (isEditing) {
      return this.handleClick();
    }
    this.setState({
      exchangeRates: data,
    }, () => this.handleClick());
  };

  handleClick = async () => {
    this.setState({
      description: '',
      value: '',
    });
    this.handleSaveExpense();
  };

  handleSaveExpense = () => {
    const {
      dispatch,
      expensesCounter,
      isEditing,
      expenseIdToEdit,
      expenses,
    } = this.props;
    const {
      description,
      tag,
      value,
      currency,
      method,
      exchangeRates,
    } = this.state;
    if (isEditing) {
      dispatch(editExpense({
        id: expenseIdToEdit,
        value,
        currency,
        method,
        tag,
        description,
        exchangeRates,
      }));
      dispatch(toggleEditExpense(false));
      dispatch(sumTotalExpenses((expenses.reduce(
        (acc, expense) => acc
        + Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask),
        0,
      ))));
    }
    if (!isEditing) {
      dispatch(saveExpense({
        id: expensesCounter.length,
        value,
        currency,
        method,
        tag,
        description,
        exchangeRates,
      }));
      dispatch(sumTotalExpenses((expenses.reduce(
        (acc, expense) => acc
        + Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask),
        0,
      ))));
    }
  };

  render() {
    const { currencies, isEditing } = this.props;
    const {
      description,
      tag,
      value,
      currency,
      method,
    } = this.state;

    return (
      <div
        className={
          isEditing ? 'wallet-form wallet-form--is-editing' : 'wallet-form'
        }
      >
        <div className="wallet-form__container">
          <label htmlFor="description">
            <span>Descrição</span>
            <input
              value={ description }
              onChange={ this.handleChange }
              type="text"
              name="description"
              id="description"
              className="wallet-form--description"
              placeholder={ isEditing && 'Editar descrição' }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="tag">
            <span>Tag</span>
            <select
              value={ tag }
              onChange={ this.handleChange }
              name="tag"
              id="tag"
              className="wallet-form--tag"
              data-testid="tag-input"
            >
              <option value="Alimentação">
                Alimentação
              </option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <div className="wallet-form__container">
          <label htmlFor="value">
            <span>Valor</span>
            <input
              value={ value }
              onChange={ this.handleChange }
              type="number"
              name="value"
              id="value"
              className="wallet-form--value"
              placeholder={ isEditing && 'Editar valor' }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency">
            <span>Moeda</span>
            <select
              value={ currency }
              onChange={ this.handleChange }
              name="currency"
              id="currency"
              className="wallet-form--currency"
              data-testid="currency-input"
            >
              {
                currencies.map((crrnc) => (
                  <option key={ crrnc } value={ crrnc }>{crrnc}</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="paymentMethod">
            <span>Método de pagamento</span>
            <select
              onChange={ this.handleChange }
              value={ method }
              name="method"
              id="method"
              className="wallet-form--payment-method"
              data-testid="method-input"
            >
              <option value="Dinheiro">
                Dinheiro
              </option>
              <option value="Cartão de crédito">
                Cartão de crédito
              </option>
              <option value="Cartão de débito">
                Cartão de débito
              </option>
            </select>
          </label>
          <div className="wallet-form__button">
            <button
              type="button"
              onClick={ () => this.fetchCurrencyAPI() }
            >
              {
                isEditing ? 'Editar despesa' : 'Adicionar despesa'
              }
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expensesCounter: state.wallet.expenses,
  isEditing: state.wallet.editor,
  expenseIdToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expensesCounter: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  isEditing: PropTypes.bool.isRequired,
  expenseIdToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf({ }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);

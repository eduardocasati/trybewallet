import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencyList } from '../redux/actions';

import '../style/WalletForm.css';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyList());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div className="wallet-form">
        <div className="wallet-form__container">
          <label htmlFor="description">
            <span>Descrição</span>
            <input
              type="text"
              name="description"
              id="description"
              className="wallet-form--description"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="tag">
            <span>Categoria</span>
            <select
              name="tag"
              id="tag"
              className="wallet-form--tag"
              data-testid="tag-input"
            >
              <option value="Cartão de Crédito">
                Alimentação
              </option>
              <option value="Cartão de Crédito">Lazer</option>
              <option value="Cartão de Crédito">Trabalho</option>
              <option value="Cartão de Crédito">Transporte</option>
              <option value="Cartão de Crédito">Saúde</option>
            </select>
          </label>
        </div>
        <div className="wallet-form__container">
          <label htmlFor="value">
            <span>Valor</span>
            <input
              type="number"
              name="value"
              id="value"
              className="wallet-form--value"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency">
            <span>Moeda</span>
            <select
              name="currency"
              id="currency"
              className="wallet-form--currency"
              data-testid="currency-input"
            >
              {
                currencies.map((currency) => (
                  <option key={ currency } value={ currency }>{currency}</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="paymentMethod">
            <span>Método de pagamento</span>
            <select
              name="paymentMethod"
              id="paymentMethod"
              className="wallet-form--payment-method"
              data-testid="method-input"
            >
              <option value="Dinheiro">
                Dinheiro
              </option>
              <option value="Cartão de cŕedito">
                Cartão de crédito
              </option>
              <option value="Cartão de débito">
                Cartão de débito
              </option>
            </select>
          </label>
          <div className="wallet-form__button">
            <button type="button">Adicionar nova despesa</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);

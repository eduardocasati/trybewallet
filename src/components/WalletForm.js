import React, { Component } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import '../style/WalletForm.css';

class WalletForm extends Component {
  render() {
    return (
      <div className="wallet-form">
        <label htmlFor="value">
          <span>Valor:</span>
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency">
          <span>Moeda:</span>
          <select name="currency" id="currency" data-testid="currency-input">
            <option value="BRL">BRL</option>
          </select>
        </label>
        <label htmlFor="paymentMethod">
          <span>Método de pagamento:</span>
          <select
            name="paymentMethod"
            id="paymentMethod"
            data-testid="currency-input"
          >
            <option value="Cartão de Crédito">Cartão de Crédito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <span>Categoria:</span>
          <select name="tag" id="tag" data-testid="tag-input">
            <option value="Cartão de Crédito">Alimentação</option>
            <option value="Cartão de Crédito">Lazer</option>
            <option value="Cartão de Crédito">Trabalho</option>
            <option value="Cartão de Crédito">Transporte</option>
            <option value="Cartão de Crédito">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          <span>Descrição:</span>
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
          />
        </label>
        <button type="button"><AiOutlinePlus size={ 16 } /></button>
      </div>
    );
  }
}

export default WalletForm;

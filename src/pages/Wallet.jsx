import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import '../style/Wallet.css';

import expensesIcon from '../assets/expenses-icon-full.png';

import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    const { totalExpenses } = this.props;
    return (
      <div className="wallet">
        <Header />
        <div className="wallet-form__box">
          <WalletForm />
          <div className="total-expenses">
            <h2>
              Total de Despesas
              {' '}
              <img src={ expensesIcon } alt="Expenses icon" />
            </h2>
            <span>
              <span
                className={
                  totalExpenses === 0
                    ? undefined : 'total-expenses--red'
                }
              >
                {' '}
                {Number(totalExpenses).toFixed(2)}
              </span>
              <span>BRL</span>
            </span>
          </div>
        </div>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalExpenses: state.wallet.totalExpenses,
});

Wallet.propTypes = {
  totalExpenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Wallet);

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import '../style/Wallet.css';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet">
        <Header />
        <div className="wallet-form__box">
          <WalletForm />
          <div className="total-expenses">
            <h2>Total de Despesas</h2>
            <span>
              0
              {' '}
              <span>BRL</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);

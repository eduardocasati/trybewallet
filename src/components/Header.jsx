import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import { connect } from 'react-redux';

import '../style/Header.css';

import logo from '../assets/logo.png';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <div className="header">
        <div className="header__container">
          <div className="logo">
            <img src={ logo } alt="Money with wings" />
            <span>trybewallet</span>
          </div>
          <span className="header__expenses">
            Total de Despesas:
            {' '}
            <span className="header__total" data-testid="total-field">
              {
                Number(totalExpenses).toFixed(2)
              }
            </span>
            <span>
              <span
                className="header__total"
                data-testid="header-currency-field"
              >
                {' '}
                BRL
              </span>
            </span>
          </span>
          <div className="header__info">
            <span className="header__user" data-testid="email-field">
              <HiOutlineUser size={ 18 } />
              {' '}
              { email }
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);

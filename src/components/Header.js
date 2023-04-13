import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../style/Header.css';

import logo from '../assets/logo.svg';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div className="header">
        <div className="header__container">
          <div className="header__logo">
            <img src={ logo } alt="Money with wings" />
            <h1>Trybewallet</h1>
          </div>
          <div className="header__info">
            <span className="header__user" data-testid="email-field">
              { email }
            </span>
            <span>
              Total de Despesas:
              {' '}
              <span className="header__total" data-testid="total-field">
                0
              </span>
              {' '}
              <span
                className="header__total"
                data-testid="header-currency-field"
              >
                BRL
              </span>
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

export default connect(mapStateToProps)(Header);

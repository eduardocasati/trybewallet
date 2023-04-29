import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import "../style/Login.css";

import heroImage from "../assets/hero-image.png";
import logo from "../assets/logo.png";
import tracedUnderline from "../assets/traced-underline.png";
import { saveUser } from "../redux/actions";

class Login extends React.Component {
  state = {
    emailInput: "",
    pwdInput: "",
    validInfo: true,
  };

  componentDidMount() {
    Swal.fire({
      title: 'Seja bem-vindo(a) ao Trybe Wallet!',
      text: "Esta é uma aplicação Front-end e, portanto, não há nenhum tipo de coleta ou persistência de dados. Para acessar a carteira basta inserir um email qualquer em um formato válido (ex: usuario@email.com) e uma senha de pelo menos 6 caracteres (ex: 123456).",
      confirmButtonText: "Fechar",
      confirmButtonColor: '#39559E',
      allowOutsideClick: true,
      customClass: {
        title: 'custom-swall-title',
      },
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => this.validateLogin()
    );
  };

  validateLogin = () => {
    const { emailInput, pwdInput } = this.state;
    const pwdLength = 6;
    const emailFormat = /^\S+@\S+\.\S+$/;

    if (!emailInput.match(emailFormat) || pwdInput.length < pwdLength) {
      return this.setState({
        validInfo: true,
      });
    }

    this.setState({
      validInfo: false,
    });
  };

  handleLogin = (emailInput) => {
    const { dispatch, history } = this.props;
    dispatch(saveUser(emailInput));
    history.push("/carteira");
  };

  render() {
    const { emailInput, pwdInput, validInfo } = this.state;
    return (
      <div className="login">
        <div className="header header--transparent">
          <div className="header__container">
            <div className="logo">
              <img
                src={logo}
                alt="Money with wings"
                className="header--transparent"
              />
              <span className="header--transparent">trybewallet</span>
            </div>
          </div>
        </div>
        <div className="hero">
          <div className="hero__title">
            <h1>
              <span>
                Gerencie
                <img src={tracedUnderline} alt="Traced underline" />
              </span>{" "}
              suas finanças pessoais de forma inteligente e eficiente
            </h1>
            <div className="login__inputs">
              <input
                value={emailInput}
                onChange={this.handleChange}
                type="email"
                name="emailInput"
                id="emailInput"
                placeholder="Email"
                data-testid="email-input"
              />
              <input
                value={pwdInput}
                onChange={this.handleChange}
                type="password"
                name="pwdInput"
                id="pwdInput"
                placeholder="Senha"
                data-testid="password-input"
              />
              <button
                onClick={() => this.handleLogin(emailInput)}
                type="button"
                disabled={validInfo}
              >
                Entrar
              </button>
            </div>
          </div>
          <div className="hero__image">
            <img src={heroImage} alt="Hero" />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);

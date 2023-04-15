import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';

import '../style/Table.css';

const tableHeaderColumns = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  ' Moeda de conversão',
  'Editar/Excluir',
];

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div className="table">
        <table>
          <thead>
            <tr>
              <div className="table__header">
                {tableHeaderColumns.map((column) => (
                  <th key={ column }>{column}</th>
                ))}
              </div>
            </tr>
          </thead>
          <tbody>
            <div className="table__body">
              {expenses.map((expense) => (
                <tr key={ expense.id } className="table__expense-row">
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)}
                  </td>
                  <td>
                    {(
                      Number(expense.value)
                      * Number(expense.exchangeRates[expense.currency].ask)
                    ).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <div className="table__buttons">
                      <FaRegEdit className="table__button table__button-edit" />
                      <FaTrash className="table__button table__button-delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </div>
          </tbody>
          <tfoot>
            <div className="table__footer" />
          </tfoot>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      exchangeRates: PropTypes.shape({
        USD: PropTypes.shape({
          code: PropTypes.string.isRequired,
          codein: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          high: PropTypes.string.isRequired,
          low: PropTypes.string.isRequired,
          varBid: PropTypes.string.isRequired,
          pctChange: PropTypes.string.isRequired,
          bid: PropTypes.string.isRequired,
          ask: PropTypes.string.isRequired,
          timestamp: PropTypes.string.isRequired,
          create_date: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Table);

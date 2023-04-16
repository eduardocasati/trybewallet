import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import {
  deleteExpense,
  setIdToEdit,
  sumTotalExpenses,
  toggleEditExpense,
} from '../redux/actions';

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
  handleDeleteExpense = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(expenseId));
    dispatch(sumTotalExpenses());
  };

  toggleEditingExpense = (isEditing, idToEdit) => {
    const { dispatch } = this.props;
    dispatch(toggleEditExpense(isEditing));
    dispatch(setIdToEdit(idToEdit));
  };

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
                    {Number(
                      expense.exchangeRates[expense.currency].ask,
                    ).toFixed(2)}
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
                      <button
                        onClick={ () => this.toggleEditingExpense(true, expense.id) }
                        className="table__button table__button-edit"
                        type="button"
                        data-testid="edit-btn"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={ () => this.handleDeleteExpense(
                          expense.id,
                        ) }
                        className="table__button table__button-delete"
                        type="button"
                        data-testid="delete-btn"
                      >
                        <FaTrash />
                      </button>
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
    PropTypes.shape({ }).isRequired,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);

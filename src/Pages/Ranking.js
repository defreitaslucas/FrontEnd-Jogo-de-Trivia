import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Ranking extends Component {
handleGoHomeClick = () => {
  const { history } = this.props;
  history.push('/');
}

render() {
  return (
    <>
      <div data-testid="ranking-title">Ranking</div>
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ this.handleGoHomeClick }
      >
        Voltar ao inicio

      </button>
    </>
  );
}
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;

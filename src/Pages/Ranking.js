import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { readRanking } from '../services/localStorage';

export class Ranking extends Component {
handleGoHomeClick = () => {
  const { history } = this.props;
  history.push('/');
}

rankingGenerator = () => {
  const ranking = readRanking();
  const rankingSorted = ranking.sort((a, b) => b.score - a.score);
  return rankingSorted.map((user, index) => (
    <li key={ user.picture } clas="ranking-li">
      <img src={ user.picture } alt="user" />
      <p data-testid={ `player-name-${index}` }>{user.name}</p>
      <p data-testid={ `player-score-${index}` }>{user.score}</p>
    </li>));
}

render() {
  return (
    <>
      <header data-testid="ranking-title" className="ranking-header">
        Ranking
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleGoHomeClick }
        >
          Voltar ao inicio
        </button>
      </header>
      <div className="ranking-main">
        <ul className="ranking-ul">{this.rankingGenerator()}</ul>
      </div>
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

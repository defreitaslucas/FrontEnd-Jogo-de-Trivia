import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

export class Feedback extends Component {
  state = {
    message: 'Well Done!',
  }

  componentDidMount() {
    this.sendText();
  }

  sendText = () => {
    const { assertions } = this.props;
    const number = 3;
    if (assertions < number) {
      this.setState({ message: 'Could be better...' });
    }
  }

  handleClickGame = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { message } = this.state;
    const { score, assertions } = this.props;
    return (
      <>
        <Header />
        <div className="feedback-main">
          <p data-testid="feedback-text" className="feedback-message">
            { message }
          </p>
          <div className="total-score">
            <p>Pontuação Total:</p>
            <p data-testid="feedback-total-score">
              { score }
            </p>
          </div>
          <div className="total-assertion">
            <p>Questões Acertadas:</p>
            <p data-testid="feedback-total-question" className="total-assertion">
              {' '}
              { assertions }
            </p>
          </div>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleClickRanking }
          >
            Ver ranking
          </button>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleClickGame }
          >
            Play Again!
          </button>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

export class Feedback extends Component {
  state = {
    mensage: 'Well Done!',
  }

  componentDidMount() {
    this.sendText();
  }

  sendText = () => {
    const { assertions } = this.props;
    const number = 3;
    if (assertions < number) {
      this.setState({ mensage: 'Could be better...' });
    }
  }

  handleClickGame = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { mensage } = this.state;
    const { score, assertions } = this.props;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          { mensage }
        </div>
        <p>Pontuação Total:</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p>Questões Acertadas:</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClickGame }
        >
          Play Again!
        </button>
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

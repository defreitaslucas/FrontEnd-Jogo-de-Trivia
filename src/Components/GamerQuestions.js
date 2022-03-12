import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
// import { getOptionClick } from '../Redux/Actions';
import { MAGIC_NUMBER_05 } from '../services/api';
import './css/answerStyle.css';
import Timer from './Timer';
import { getAnswerButtonStatus, userInfo, getInitialButtonState } from '../Redux/Actions';

const MAGIC_NUMBER_10 = 10;
const MAGIC_NUMBER_3 = 3;
class GamerQuestions extends Component {
    state = {
      name: '',
      email: '',
      counter: 0,
      score: 0,
      token: '',
      buttonNext: false,
      assertions: 0,
    };

  pointRules = (difficulty) => {
    const { dataInfo, name, email, token, timerValue } = this.props;
    const points = MAGIC_NUMBER_10 + (Number(timerValue) * Number(difficulty));
    this.setState((prevState) => ({
      name,
      email,
      score: prevState.score + points,
      token,
    }), () => dataInfo(this.state));
  }

  sumPoints = (question) => {
    const difficulty = question.getAttribute('level');
    switch (difficulty) {
    case 'easy':
      this.pointRules(1);
      break;
    case 'medium':
      this.pointRules(2);
      break;
    case 'hard':
      this.pointRules(MAGIC_NUMBER_3);
      break;
    default:
      break;
    }
  }

  handleClick = ({ target }) => {
    const { setAnswerButtonHasBeenClickedToTrue, name, email } = this.props;
    setAnswerButtonHasBeenClickedToTrue();
    const buttons = target.parentNode.childNodes;
    buttons.forEach((button) => {
      switch (button.className) {
      case 'incorrect':
        button.classList.add('incorrectRed');
        break;
      case 'correct':
        button.classList.add('correctGreen');
        this.sumPoints(target);
        this.setState((prevState) => ({
          assertions: prevState.assertions + 1,
        }));
        break;
      default:
        break;
      }
    });
    const { points } = this.state;
    localStorage.setItem('ranking', JSON.stringify([{ name, score: points, picture: `https://www.gravatar.com/avatar/${md5(email)}` }]));
    this.setState({ buttonNext: true });
  }

  generateAnswers = (number) => {
    const { questions, buttonDisable } = this.props;
    const currentQuestion = questions[number];
    const { incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer, difficulty } = currentQuestion;
    const answers = incorrectAnswers.map((incorrectAnswer, index) => {
      const dataTestId = `wrong-answer-${index}`;
      return (
        <button
          type="button"
          key={ index }
          data-testid={ dataTestId }
          className="incorrect"
          disabled={ buttonDisable }
          onClick={ this.handleClick }

        >
          {incorrectAnswer}

        </button>
      );
    });
    answers.push(
      <button
        type="button"
        key={ correctAnswer }
        data-testid="correct-answer"
        className="correct"
        disabled={ buttonDisable }
        onClick={ this.handleClick }
        level={ difficulty }
      >
        {correctAnswer}

      </button>,
    );
    answers.sort(() => MAGIC_NUMBER_05 - Math.random());
    return answers;
  }

  generateButtonNext = () => (
    <div>
      <button
        data-testid="btn-next"
        type="button"
        onClick={ this.generateNextQuestion }
      >
        Next
      </button>
    </div>
  )

  generateNextQuestion = () => {
    const { buttonTimerInitial } = this.props;
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }), () => buttonTimerInitial());
  }

  mountedQuestion = (number) => {
    const { questions } = this.props;
    if (questions.length - 1 >= number) {
      return (
        <div>
          <h1 data-testid="question-category">{questions[number].category}</h1>
          <p data-testid="question-text">{questions[number].question}</p>
          <div data-testid="answer-options">{this.generateAnswers(number)}</div>
        </div>
      );
    }
    this.sendFeedbackPage();
  }

  sendFeedbackPage = () => {
    const { history } = this.props;
    return history?.push('/feedback');
  }

  render() {
    const { counter, buttonNext } = this.state;
    const { questions } = this.props;
    return (
      <div>
        {
          questions.length && this.mountedQuestion(counter)
        }
        {
          buttonNext && this.generateButtonNext()
        }
        <Timer />
      </div>
    );
  }
}

GamerQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonDisable: PropTypes.bool.isRequired,
  setAnswerButtonHasBeenClickedToTrue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dataInfo: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  timerValue: PropTypes.number.isRequired,
  buttonTimerInitial: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
  buttonDisable: state.buttonStateGame.status,
  timerValue: state.buttonStateGame.timer,
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswerButtonHasBeenClickedToTrue: () => dispatch(getAnswerButtonStatus()),
  dataInfo: (state) => dispatch(userInfo(state)),
  buttonTimerInitial: () => dispatch(getInitialButtonState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamerQuestions);

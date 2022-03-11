import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getOptionClick } from '../Redux/Actions';
import { MAGIC_NUMBER_05 } from '../services/api';
import './css/answerStyle.css';
import Timer from './Timer';

const MAGIC_NUMBER_10 = 10;
const MAGIC_NUMBER_3 = 3;

class GamerQuestions extends Component {
  state = {
    counter: 0,
    points: 0,
    timeLeft: 0,
  }

  pointRules = (difficulty, timeLeft) => {
    const points = MAGIC_NUMBER_10 + (timeLeft * difficulty);
    return Number(points);
  }

  sumPoints = (question, timeLeft) => {
    const difficulty = question.getAttribute('level');
    switch (difficulty) {
    case 'easy':
      console.log(this.pointRules(1, timeLeft));
      break;
    case 'medium':
      console.log(this.pointRules(2, timeLeft));
      break;
    case 'hard':
      console.log(this.pointRules(MAGIC_NUMBER_3, timeLeft));
      break;
    default:
      break;
    }
  }

  handleClick = ({ target }) => {
    const { timerValue } = this.props;

    const buttons = target.parentNode.childNodes;
    buttons.forEach((button) => {
      switch (button.className) {
      case 'incorrect':
        button.classList.add('incorrectRed');
        break;
      case 'correct':
        button.classList.add('correctGreen');
        this.sumPoints(target, timerValue);
        break;
      default:
        break;
      }
    });
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

  mountedQuestion = (number) => {
    const { questions } = this.props;
    return (
      <div>
        <h1 data-testid="question-category">{questions[number].category}</h1>
        <p data-testid="question-text">{questions[number].question}</p>
        <div data-testid="answer-options">{this.generateAnswers(number)}</div>
      </div>
    );
  }

  render() {
    const { counter } = this.state;
    const { questions } = this.props;
    return (
      <div>
        {
          questions.length && this.mountedQuestion(counter)
        }
        <Timer />
      </div>
    );
  }
}

GamerQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonDisable: PropTypes.bool.isRequired,
  optionSelected: PropTypes.number.isRequired,
  timerValue: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
  buttonDisable: state.buttonStateGame,
});

export default connect(mapStateToProps)(GamerQuestions);

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MAGIC_NUMBER_05 } from '../services/api';
import './css/answerStyle.css';
import Timer from './Timer';

class GamerQuestions extends Component {
  state = {
    counter: 0,
    buttonNext: false,
  }

  handleClick = ({ target }) => {
    const buttons = target.parentNode.childNodes;
    buttons.forEach((button) => {
      switch (button.className) {
      case 'incorrect':
        button.classList.add('incorrectRed');
        break;
      case 'correct':
        button.classList.add('correctGreen');
        break;
      default:
        break;
      }
    });
    this.setState({ buttonNext: true });
  }

  generateAnswers = (number) => {
    const { questions, buttonDisable } = this.props;
    const currentQuestion = questions[number];
    const { incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = currentQuestion;
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
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }));
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
    const { counter, buttonNext } = this.state;
    const { questions } = this.props;
    return (
      <div>
        <Timer />
        {
          questions.length && this.mountedQuestion(counter)
        }
        {
          buttonNext && this.generateButtonNext()
        }
      </div>
    );
  }
}

GamerQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonDisable: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
  buttonDisable: state.buttonStateGame,
});

export default connect(mapStateToProps)(GamerQuestions);

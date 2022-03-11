import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MAGIC_NUMBER_05 } from '../services/api';
import './css/answerStyle.css';

class GamerQuestions extends Component {
  state = {
    counter: 0,
    timer: 30,
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
  }

  generateAnswers = (number) => {
    const { questions } = this.props;
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
        onClick={ this.handleClick }
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
    const { counter, timer } = this.state;
    const { questions } = this.props;
    console.log(timer);
    return (
      <div>
        {
          questions.length && this.mountedQuestion(counter)
        }
      </div>
    );
  }
}

GamerQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(GamerQuestions);

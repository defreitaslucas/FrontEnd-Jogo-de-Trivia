import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import he from 'he';
import { MAGIC_NUMBER_05 } from '../services/api';
import Timer from './Timer';
import { getAnswerButtonStatus, userInfo, getInitialButtonState } from '../Redux/Actions';
import { addUserInRanking } from '../services/localStorage';

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
      buttonClassCorrect: '',
      buttonClassIncorrect: '',
    };

    componentDidMount() {
      const { name, email, token } = this.props;
      this.setState({
        name,
        email,
        token,
      });
    }

  pointRules = (difficulty) => {
    const { dataInfo, name, email, token, timerValue } = this.props;
    const points = MAGIC_NUMBER_10 + (Number(timerValue) * Number(difficulty));
    console.log(points);
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
    // const { setAnswerButtonHasBeenClickedToTrue } = this.props;
    // setAnswerButtonHasBeenClickedToTrue();
    this.setState({
      buttonClassCorrect: 'correctGreen',
      buttonClassIncorrect: 'incorrectRed',
    });
    switch (target.id) {
    case 'incorrect':
      console.log('errado');
      break;
    case 'correct':
      console.log('certo');
      this.sumPoints(target);
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }));
      break;
    default:
      break;
    }
    this.setState({ buttonNext: true });
  }

  generateAnswers = (number) => {
    const { questions, buttonDisable } = this.props;
    const { buttonClassCorrect, buttonClassIncorrect } = this.state;
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
          className={ `incorrect ${buttonClassIncorrect}` }
          disabled={ buttonDisable }
          onClick={ this.handleClick }
          id="incorrect"

        >
          {he.decode(incorrectAnswer)}

        </button>
      );
    });
    answers.push(
      <button
        type="button"
        key={ correctAnswer }
        data-testid="correct-answer"
        className={ `correct ${buttonClassCorrect}` }
        disabled={ buttonDisable }
        onClick={ this.handleClick }
        level={ difficulty }
        id="correct"
      >
        {he.decode(correctAnswer)}

      </button>,
    );
    return answers.sort(() => MAGIC_NUMBER_05 - Math.random());
  }

  generateButtonNext = () => (
    <button
      className="next-button"
      data-testid="btn-next"
      type="button"
      onClick={ this.generateNextQuestion }
    >
      Next
    </button>
  )

  generateNextQuestion = () => {
    // const answerButtons = target.parentNode.previousSibling.lastChild.childNodes;
    // answerButtons.forEach((button) => {
    //   switch (button.className) {
    //   case 'incorrect incorrectRed':
    //     button.classList.remove('incorrect', 'incorrectRed', 'correct', 'correctGreen');
    //     button.classList.add('incorrect');
    //     break;
    //   case 'correct correctGreen':
    //     button.classList.remove('correct', 'correctGreen', 'incorrect', 'incorrectRed');
    //     button.classList.add('correct');
    //     break;
    //   default:
    //     break;
    //   }
    // });
    this.setState({
      buttonClassCorrect: '',
      buttonClassIncorrect: '',
    });
    const { buttonTimerInitial } = this.props;
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }), () => buttonTimerInitial());
  }

  mountedQuestion = (number) => {
    const { questions } = this.props;
    if (questions.length - 1 >= number) {
      return (
        <div className="questions">
          <h1 data-testid="question-category" className="question-category">
            {questions[number].category}
          </h1>
          <div className="question-and-answers">
            <p data-testid="question-text" className="game-question">
              {he.decode(questions[number].question)}
            </p>
            <div data-testid="answer-options" className="game-options">
              {this.generateAnswers(number)}
            </div>
          </div>
        </div>
      );
    }
    this.sendFeedbackPage();
  }

  sendFeedbackPage = () => {
    this.saveUserInLocalStorage();
    const { history } = this.props;
    return history?.push('/feedback');
  }

  saveUserInLocalStorage = () => {
    const { score, name, email } = this.state;
    const lsObj = { name, score, picture: `https://www.gravatar.com/avatar/${md5(email)}` };
    addUserInRanking(lsObj);
  }

  render() {
    const { counter, buttonNext } = this.state;
    const { questions } = this.props;
    return (
      <div className="game-div">
        {
          questions.length && this.mountedQuestion(counter)
        }
        <Timer />
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
  // setAnswerButtonHasBeenClickedToTrue: PropTypes.func.isRequired,
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

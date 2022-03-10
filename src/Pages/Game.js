import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GamerQuestions from '../Components/GamerQuestions';
import Header from '../Components/Header';
import { generateQuestions } from '../Redux/Actions';
import { getQuestions, getTokenApi } from '../services/api';

export class Game extends Component {
  state = {
  }

  async componentDidMount() {
    let questions = await getQuestions();
    if (!questions.results.length) {
      await getTokenApi();
      questions = await getQuestions();
    }
    this.setState({
      questions: questions.results,
    }, () => {
      const { saveQuestions } = this.props;
      saveQuestions(questions.results);
    });
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        <GamerQuestions />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: (payload) => dispatch(generateQuestions(payload)) });

export default connect(null, mapDispatchToProps)(Game);

Game.propTypes = {
  saveQuestions: PropTypes.func.isRequired,
};

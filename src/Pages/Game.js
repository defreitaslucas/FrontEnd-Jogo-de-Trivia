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
    if (!questions.length) {
      await getTokenApi();
      questions = await getQuestions();
    }

    const { saveQuestions } = this.props;
    saveQuestions(questions || []);
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <GamerQuestions history={ history } />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: (payload) => dispatch(generateQuestions(payload)) });

export default connect(null, mapDispatchToProps)(Game);

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveQuestions: PropTypes.func.isRequired,
};

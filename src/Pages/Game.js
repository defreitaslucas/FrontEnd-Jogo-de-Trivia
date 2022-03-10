import React, { Component } from 'react';
import Header from '../Components/Header';
import { getQuestions, getTokenApi } from '../services/api';

export class Game extends Component {
  state = {
    questions: [],
  }

  async componentDidMount() {
    let questions = await getQuestions();
    if (!questions.results.length) {
      await getTokenApi();
      questions = await getQuestions();
    }
    this.setState({
      questions: questions.results,
    });
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default Game;

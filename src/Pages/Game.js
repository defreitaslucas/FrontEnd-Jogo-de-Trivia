import React, { Component } from 'react';
import Header from '../Components/Header';
import { getQuestions } from '../services/api';

export class Game extends Component {
  state = {
    questions: [],
  }

  async componentDidMount() {
    const questions = await getQuestions();
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

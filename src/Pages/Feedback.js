import React, { Component } from 'react';
import Header from '../Components/Header';

export class Feedback extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
      </div>
    );
  }
}

export default Feedback;

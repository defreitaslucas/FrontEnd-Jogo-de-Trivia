import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// const random = Math.floor(Math.random() * 5)

class GamerQuestions extends Component {
  randomQuestion = async () => {
    const { questions } = this.props;

    const random = Math.floor(Math.random() * questions.length);

    const randomElement = questions[random];

    this.setState({ questions: randomElement });
  }

  render() {
    // const { questions } = this.state;
    // console.log(randomQuestion);
    // const { category, correct_answer: correctAnswer,
    //   question: questionText, incorrect_answers: incorrectAnswers, type } = question;
    // console.log(questions[this.randomQuestion()]?.category);
    return (
      <div>
        {/* <h1>{questions[this.randomQuestion()]?.category}</h1> */}

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

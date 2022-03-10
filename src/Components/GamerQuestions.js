import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';

class GamerQuestions extends Component {
  randomQuestion = () => {
    const { questions } = this.props;

    const random = Math.floor(Math.random() * questions.length);

    const randomElement = questions[random];

    return randomElement;
  }

  mountedQuestion = (objRandom) => (
    <div>
      <h1>{ objRandom.category }</h1>
      <p>{ objRandom.question }</p>

    </div>
  )

  render() {
    const objRandom = this.randomQuestion();
    console.log(objRandom);

    // const arr = [0, 1, 2, 3, 4];
    // console.log();
    return (
      <div>
        {
          objRandom
            ? this.mountedQuestion(objRandom) : <Loading />
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

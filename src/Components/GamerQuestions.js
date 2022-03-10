import React, { Component } from 'react';
import { connect } from 'react-redux';

class GamerQuestions extends Component {
  render() {
    console.log(this.props.questions);
    return (
      <div>
        Categoria
        {' '}
        {}
        perguntas
        opcoes
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(GamerQuestions);

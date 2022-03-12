import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

export class Feedback extends Component {
  state = {
    mensage: 'Well Done!',
  }

  componentDidMount() {
    this.sendText();
  }

  sendText = () => {
    const { assertions } = this.props;
    const number = 3;
    if (assertions < number) {
      this.setState({ mensage: 'Could be better...' });
    }
  }

  render() {
    const { mensage } = this.state;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          { mensage }
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);

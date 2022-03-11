import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getButtonState } from '../Redux/Actions';

export class Timer extends Component {
  state = {
    timer: 30,
  }

  componentDidMount() {
    const numberInterval = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, numberInterval);
    // buttonStateFalse(buttonDisable);
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { buttonStateTrue, enableAnswersButton } = this.props;
    const zero = 0;
    if (enableAnswersButton || timer === zero) {
      clearInterval(this.interval);
      buttonStateTrue(timer);
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div id="timer">
        { timer }
      </div>
    );
  }
}

Timer.propTypes = {
  buttonStateTrue: PropTypes.func.isRequired,
  enableAnswersButton: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  enableAnswersButton: state.buttonStateGame.status,
});

const mapDispatchToProps = (dispatch) => ({
  buttonStateTrue: (payload) => dispatch(getButtonState(payload)),
  // buttonStateFalse: () => dispatch(getInitialButtonState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

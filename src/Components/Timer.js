import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getButtonState } from '../Redux/Actions';

export class Timer extends Component {
  state = {
    timer: 30,
  }

  componentDidMount() {
    this.count();
  }

  componentDidUpdate(prevProps) {
    const { interval, timer } = this.state;
    const { buttonStateTrue, enableAnswersButton } = this.props;
    const zero = 0;
    if (enableAnswersButton || timer === zero) {
      clearInterval(interval);
      buttonStateTrue(timer);
    }
    if (enableAnswersButton !== prevProps.enableAnswersButton) {
      this.resetTimer();
    }
  }

  count = () => {
    const numberInterval = 1000;
    const interval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, numberInterval);
    this.setState({ interval });
  }

  resetTimer = () => {
    this.setState(() => ({
      timer: 30,
    }), this.count());
  }

  render() {
    const { timer } = this.state;
    return (
      <div className="timer">
        <FontAwesomeIcon icon={ faClock } />
        { timer }
      </div>
    );
  }
}

Timer.propTypes = {
  buttonStateTrue: PropTypes.func.isRequired,
  enableAnswersButton: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  enableAnswersButton: state.buttonStateGame.status,
  timer: state.buttonStateGame.timer,
});

const mapDispatchToProps = (dispatch) => ({
  buttonStateTrue: (payload) => dispatch(getButtonState(payload)),
  // buttonStateFalse: () => dispatch(getInitialButtonState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

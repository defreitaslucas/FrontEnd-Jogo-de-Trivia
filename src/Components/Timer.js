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
    const { buttonStateTrue } = this.props;
    const zero = 0;
    if (timer === zero) {
      clearInterval(this.interval);
      buttonStateTrue();
    }
  }

  render() {
    const { timer } = this.state;
    const { buttonStateTrue } = this.props;
    console.log(buttonStateTrue);
    return (
      <div>
        { timer }
      </div>
    );
  }
}

Timer.propTypes = {
  buttonStateTrue: PropTypes.func.isRequired,
  // buttonStateFalse: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  buttonStateTrue: () => dispatch(getButtonState()),
  // buttonStateFalse: () => dispatch(getInitialButtonState()),
});

export default connect(null, mapDispatchToProps)(Timer);

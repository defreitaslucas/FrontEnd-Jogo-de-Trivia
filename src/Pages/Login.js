import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import Input from '../Components/Input';
import { userInfo } from '../Redux/Actions';
import { getTokenApi } from '../services/api';

class Login extends React.Component {
    state = {
      name: '',
      email: '',
      isDisabled: true,
      token: '',
    }

handleSettingClick = () => {
  const { history } = this.props;
  history.push('/settings');
}

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    this.setState({ [name]: value }, () => this.buttonHandleChange());
  };

  buttonHandleChange = () => {
    const { name, email } = this.state;
    if (name.length && email.length) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleClick = async () => {
    const { history } = this.props;
    const { dataInfo } = this.props;
    const resultado = await getTokenApi();
    this.setState({
      token: resultado.token,
    }, () => {
      dataInfo(this.state);
      history.push('/game');
    });
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Input
            type="text"
            datatestid="input-player-name"
            onChange={ (event) => this.handleChange(event) }
            value={ name }
            placeholder="Nome"
            name="name"
            required
          />
          <Input
            type="text"
            datatestid="input-gravatar-email"
            onChange={ (event) => this.handleChange(event) }
            value={ email }
            placeholder="Email"
            name="email"
            required
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play

          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettingClick }
          >
            Configurações
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  dataInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dataInfo: (state) => dispatch(userInfo(state)) });

export default connect(null, mapDispatchToProps)(Login);

import React from 'react';
import logo from '../trivia.png';
import Input from '../Components/Input';

class Login extends React.Component {
    state = {
      name: '',
      email: '',
      isDisabled: true,
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
          >
            Play

          </button>
        </header>
      </div>
    );
  }
}

export default Login;

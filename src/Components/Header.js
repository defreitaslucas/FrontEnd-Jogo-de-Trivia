import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchApiGravatar from '../services/api';

class Header extends React.Component {
  state = {
    image: '',
  }

  async componentDidMount() {
    const { email } = this.props;
    const urlImageUser = await fetchApiGravatar(email);
    this.setState({ image: urlImageUser });
  }

  render() {
    const { image } = this.state;
    const { name, score } = this.props;

    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            alt="userImage"
            src={ image }
          />
          <p data-testid="header-score">
            Placar:
            { score }
          </p>
          <p data-testid="header-player-name">{ name }</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,

});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faBullseye } from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component {
  state = {

  }

  componentDidMount() {
  }

  render() {
    const { name, email, score } = this.props;
    return (
      <header>
        <div className="player_info">
          <img
            data-testid="header-profile-picture"
            alt="userImage"
            src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          />
          <p data-testid="header-player-name">
            { name }
            {' '}
            <FontAwesomeIcon icon={ faGamepad } />
          </p>
        </div>
        <p data-testid="header-score">
          { score }
          {' '}
          <FontAwesomeIcon icon={ faBullseye } />
        </p>
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

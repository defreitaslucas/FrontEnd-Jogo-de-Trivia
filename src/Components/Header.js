import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  state = {

  }

  componentDidMount() {
    const { score } = this.props;
    this.setState({ score });
  }

  render() {
    const { name, email } = this.props;
    const { score } = this.state;
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            alt="userImage"
            src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          />
          <p data-testid="header-score">
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

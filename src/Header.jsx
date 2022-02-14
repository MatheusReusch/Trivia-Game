import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

function Header(props) {
  const { nome, placar, imagem } = props;
  return (
    <div>
      <img alt="imagem" data-testid="header-profile-picture" src={ imagem } />
      <h2 data-testid="header-player-name">{nome}</h2>
      <h2 data-testid="header-score">{placar}</h2>
    </div>
  );
}

const mapStateToProps = (state) => ({
  imagem: state.player.hash,
  nome: state.player.name,
  email: state.player.gravatarEmail,
  placar: state.player.score,
});

Header.propTypes = {
  nome: propTypes.string.isRequired,
  placar: propTypes.string.isRequired,
  imagem: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);

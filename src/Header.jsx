import React from "react";
import { connect } from "react-redux";

function Header(props) {
  return (
    <div>
      <img alt="imagem" data-testid="header-profile-picture" src={props.imagem}></img>
      <h2 data-testid="header-player-name">{props.nome}</h2>
      <h2 data-testid="header-score">{props.placar}</h2>
    </div>
  );
}

const mapStateToProps = (state) => ({
  imagem: state.player.hash,
  nome: state.player.name,
  email: state.player.gravatarEmail,
  placar: state.player.score,
});

export default connect(mapStateToProps)(Header);

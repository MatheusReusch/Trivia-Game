import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Feedback extends React.Component {
  render() {
    const { nome, imagem, placar } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <img src={ imagem } alt="imagem" data-testid="header-profile-picture" />
        <h2 data-testid="header-score">{placar}</h2>
        <h2 data-testid="header-player-name">{nome}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.player.name,
  imagem: state.player.picture,
  placar: state.player.score,
});

Feedback.propTypes = {
  nome: propTypes.string.isRequired,
  placar: propTypes.string.isRequired,
  imagem: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);

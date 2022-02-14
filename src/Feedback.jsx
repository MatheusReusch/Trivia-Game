import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Feedback extends React.Component {
  render() {
    const { nome, imagem, placar, assertions, history } = this.props;
    const tres = 3;
    console.log(JSON.parse(localStorage.getItem('ranking'))[0].assertions);
    return (
      <div>
        <h1>Feedback</h1>
        <img src={ imagem } alt="imagem" data-testid="header-profile-picture" />
        <h2 data-testid="header-score">{placar}</h2>
        <h2 data-testid="feedback-total-score">{placar}</h2>
        <h2 data-testid="feedback-total-question">{0}</h2>
        <h2 data-testid="header-player-name">{nome}</h2>
        { assertions < tres && <h2 data-testid="feedback-text">Could be better...</h2> }
        { assertions >= tres && <h2 data-testid="feedback-text">Well Done!</h2> }
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.player.name,
  imagem: state.player.picture,
  placar: state.player.score,
  assertions: state.pontos,
});

Feedback.propTypes = {
  nome: propTypes.string.isRequired,
  placar: propTypes.string.isRequired,
  imagem: propTypes.string.isRequired,
  assertions: propTypes.string.isRequired,
  history: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
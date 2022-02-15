import React from 'react';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  sortfunction = (a, b) => (b.score - a.score)

  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort(this.sortfunction);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Inicio
        </button>
        {ranking.map((el, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{el.name}</p>
            <img alt="imagem" src={ el.picture } />
            <p data-testid={ `player-score-${index}` }>{el.score}</p>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.func.isRequired,
};

export default Ranking;

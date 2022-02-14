import React from 'react';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
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
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.func.isRequired,
};

export default Ranking;

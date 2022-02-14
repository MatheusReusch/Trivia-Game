import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import { updateQuestions, saveScore } from './actions';

class Game extends React.Component {
  constructor() {
    super();
    const tres = 3;
    this.state = {
      indice: 0,
      numero: Math.round(Math.random() * (tres - 0) + 0),
      styleCorrect: '',
      styleIncorrect: '',
      timer: 30,
      disabled: false,
      pontos: 0,
      next: 'none',
    };
  }

  componentDidMount() {
    const mil = 1000;
    localStorage.setItem('acertos', 0);
    const { nome, imagem } = this.props;
    const player = [{ name: nome, assertions: 0, score: 0, picture: imagem }];
    localStorage.setItem('ranking', JSON.stringify(player));
    setInterval(() => {
      this.setState(
        (prevState) => ({ timer: prevState.timer - 1 }),
        () => {
          const { timer } = this.state;
          if (timer <= 0) {
            this.setState({ disabled: true });
          }
        },
      );
    }, mil);
  }

  onNextClick = () => {
    const quatro = 4;
    const { history } = this.props;
    const { indice } = this.state;
    if (indice < quatro) {
      this.setState((prevState) => ({
        indice: prevState.indice + 1,
      }));
    } else {
      history.push('/feedback');
    }
  };

  corCorreta = () => {
    this.setState({ styleCorrect: '3px solid rgb(6, 240, 15)' });
  };

  corIncorreta = () => {
    this.setState({ styleIncorrect: '3px solid rgb(255, 0, 0)' });
  };

  cor = () => {
    this.corCorreta();
    this.corIncorreta();
    this.setState({ next: '' });
  };

  onClickdoBotaoCerto = () => {
    const { indice, timer } = this.state;
    const { questions, salvarScore, score, nome, imagem } = this.props;
    this.setState(
      (prevState) => ({ pontos: prevState.pontos + 1 }),
      () => {
        this.cor();
        const { pontos } = this.state;
        const array = [{ name: nome, assertions: pontos, score: 0, picture: imagem }];
        localStorage.setItem('ranking', JSON.stringify(array));
        salvarScore(score, questions[indice].difficulty, timer, pontos);
      },
    );
  };

  render() {
    const {
      indice,
      numero,
      styleCorrect,
      styleIncorrect,
      timer,
      disabled,
      next,
    } = this.state;
    const { questions } = this.props;
    return (
      <div>
        <Header />
        <h2>{timer}</h2>
        {questions.length > 0 && numero <= 1 ? (
          <>
            <h2 data-testid="question-category">
              {questions[indice].category}
            </h2>
            <h2 data-testid="question-text">{questions[indice].question}</h2>
            <section data-testid="answer-options">
              <button
                type="button"
                disabled={ disabled }
                onClick={ () => {
                  this.onClickdoBotaoCerto();
                } }
                style={ { border: styleCorrect } }
                data-testid="correct-answer"
              >
                {questions[indice].correct_answer}
              </button>
              <button
                type="button"
                onClick={ () => this.cor() }
                style={ { border: styleIncorrect } }
                data-testid="wrong-answer-0"
              >
                {questions[indice].incorrect_answers[0]}
              </button>
              <button
                type="button"
                onClick={ () => this.cor() }
                style={ { border: styleIncorrect } }
                data-testid="wrong-answer-1"
              >
                {questions[indice].incorrect_answers[1]}
              </button>
              <button
                type="button"
                onClick={ () => this.cor() }
                style={ { border: styleIncorrect } }
                data-testid="wrong-answer-2"
              >
                {questions[indice].incorrect_answers[2]}
              </button>
            </section>
            <button
              type="button"
              style={ { display: next } }
              onClick={ () => {
                this.onNextClick();
              } }
              data-testid="btn-next"
            >
              Next
            </button>
          </>
        ) : (
          questions.length > 0 && (
            <>
              <h2 data-testid="question-category">
                {questions[indice].category}
              </h2>
              <h2 data-testid="question-text">{questions[indice].question}</h2>
              <section data-testid="answer-options">
                <button
                  type="button"
                  onClick={ () => this.cor() }
                  style={ { border: styleIncorrect } }
                  data-testid="wrong-answer-2"
                >
                  {questions[indice].incorrect_answers[2]}
                </button>
                <button
                  type="button"
                  onClick={ () => {
                    this.onClickdoBotaoCerto();
                  } }
                  style={ { border: styleCorrect } }
                  disabled={ disabled }
                  data-testid="correct-answer"
                >
                  {questions[indice].correct_answer}
                </button>
                <button
                  type="button"
                  onClick={ () => this.cor() }
                  style={ { border: styleIncorrect } }
                  data-testid="wrong-answer-0"
                >
                  {questions[indice].incorrect_answers[0]}
                </button>
                <button
                  type="button"
                  onClick={ () => this.cor() }
                  style={ { border: styleIncorrect } }
                  data-testid="wrong-answer-1"
                >
                  {questions[indice].incorrect_answers[1]}
                </button>
              </section>
              <button
                type="button"
                style={ { display: next } }
                onClick={ () => {
                  this.onNextClick();
                } }
                data-testid="btn-next"
              >
                Next
              </button>
            </>
          )
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setQuestions: (questoes) => dispatch(updateQuestions(questoes)),
  salvarScore: (score, difficulty, timer,
    pontos) => dispatch(saveScore(score, difficulty, timer, pontos)),
});

const mapStateToProps = (state) => ({
  questions: state.questoes,
  nome: state.player.name,
  imagem: state.player.hash,
  score: state.player.score,
});

Game.propTypes = {
  questions: propTypes.func.isRequired,
  nome: propTypes.string.isRequired,
  imagem: propTypes.string.isRequired,
  score: propTypes.string.isRequired,
  salvarScore: propTypes.string.isRequired,
  history: propTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

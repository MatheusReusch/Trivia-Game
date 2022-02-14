import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import { updateQuestions } from './actions';

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
    };
  }

  componentDidMount() {
    const mil = 1000;
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

  corCorreta = () => {
    this.setState({ styleCorrect: '3px solid rgb(6, 240, 15)' });
  };

  corIncorreta = () => {
    this.setState({ styleIncorrect: '3px solid rgb(255, 0, 0)' });
  };

  cor = () => {
    this.corCorreta();
    this.corIncorreta();
  };

  render() {
    const { indice, numero, styleCorrect, styleIncorrect, timer, disabled } = this.state;
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
                onClick={ () => this.cor() }
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
                  onClick={ () => this.cor() }
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
            </>
          )
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setQuestions: (questoes) => dispatch(updateQuestions(questoes)),
});

const mapStateToProps = (state) => ({
  questions: state.questoes,
});

Game.propTypes = {
  questions: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

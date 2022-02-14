import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { updateQuestions } from "./actions";

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      indice: 0,
      questions: [],
    };
  }

  componentDidMount() {
    this.handleApi();
  }

  handleApi = () => {
    fetch(
      `https://opentdb.com/api.php?amount=5&token=${localStorage.getItem(
        'token',
      )}`,
    )
      .then((res) => res.json())
      .then((data) => this.setState({ questions: data.results }));
  }

  render() {
    const { questions } = this.props;
    const { indice } = this.state;
    return (
      <div>
        <Header />
        {questions.length > 0 && (
          <>
            <h2 data-testid="question-category">
              {questions[indice].category}
            </h2>
            <h2 data-testid="question-text">{questions[indice].question}</h2>
            <section data-testid="answer-options">
              <button data-testid="correct-answer">
                {questions[indice].correct_answer}
              </button>
              <button data-testid={`wrong-answer-0`}>
                {questions[indice].incorrect_answers[0]}
              </button>
              <button data-testid={`wrong-answer-1`}>
                {questions[indice].incorrect_answers[1]}
              </button>
              <button data-testid={`wrong-answer-2`}>
                {questions[indice].incorrect_answers[2]}
              </button>
            </section>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questoes,
});

const mapDispatchToProps = (dispatch) => ({
    setQuestions: (questoes) => dispatch(updateQuestions(questoes)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);

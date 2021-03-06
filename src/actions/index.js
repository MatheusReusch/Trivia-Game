export const updateToken = (hash, name, email, data) => ({
  type: 'TOKEN',
  data,
  hash,
  name,
  email,
});

export const getToken = (hash, name, email) => async (dispatch) => {
  await fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('token', data.token);
      dispatch(updateToken(hash, name, email, data));
    });
};

export const saveScore = (score, difficulty, timer, pontos) => ({
  type: 'SCORE',
  score,
  difficulty,
  timer,
  pontos,
});

export const updateQuestions = (questoes) => ({
  type: 'QUESTIONS',
  questoes,
});

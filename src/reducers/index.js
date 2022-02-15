const INITAL_STATE = {
  token: '',
  questoes: [],
  pontos: 0,
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const dez = 10;
const trez = 3;

function questoes(state, action) {
  return {
    ...state,
    questoes: action.questoes,
  };
}

function leveling(state, action) {
  switch (action.difficulty) {
  case 'easy':
    return {
      ...state,
      pontos: action.pontos,
      player: {
        ...state.player,
        score: action.score + (dez + action.timer * 1),
      },
    };
  case 'medium':
    return {
      ...state,
      pontos: action.pontos,
      player: {
        ...state.player,
        score: action.score + (dez + action.timer * 2),
      },
    };
  case 'hard':
    return {
      ...state,
      pontos: action.pontos,
      player: {
        ...state.player,
        score: action.score + (dez + action.timer * trez),
      },
    };
  case 'reset':
    return {
      ...state,
      pontos: 0,
      player: {
        ...state.player,
        score: 0,
      },
    };
  default:
    return state;
  }
}

const reducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case 'TOKEN':
    return {
      ...state,
      token: action.data.token,
      player: {
        ...state.player,
        hash: `https://www.gravatar.com/avatar/${action.hash}`,
        name: action.name,
        gravatarEmail: action.email,
      },
    };
  case 'QUESTIONS':
    return questoes(state, action);
  case 'SCORE':
    return leveling(state, action);
  default:
    return state;
  }
};

export default reducer;

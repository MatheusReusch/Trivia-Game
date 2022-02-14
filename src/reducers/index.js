const INITAL_STATE = {
    token: '',
    questoes: [],
    player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
    }
  };
  
  const reducer = (state = INITAL_STATE, action) => {
    const dez = 10;
    const trez = 3;
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
        }
      };
    case 'QUESTIONS':
      return {
        ...state,
        questoes: action.questoes,
      };
    case 'SCORE':
      console.log(action.pontos);
      switch (action.difficulty) {
      case 'easy':
        return {
          ...state,
          score: action.score + (dez + (action.timer * 1)),
          pontos: action.pontos,
        };
      case 'medium':
        return {
          ...state,
          score: action.score + (dez + (action.timer * 2)),
          pontos: action.pontos,
        };
      case 'hard':
        return {
          ...state,
          score: action.score + (dez + (action.timer * trez)),
          pontos: action.pontos,
        };
      default: return state;
      }
    default:
      return state;
    }
  };
  
  export default reducer;
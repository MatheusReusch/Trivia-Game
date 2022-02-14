import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import propTypes from 'prop-types';
import { getToken, updateQuestions, updateToken } from './actions';

function Login(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { updateToken2 } = props;

  useEffect(() => {
    if (email !== '' && name !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, name]);

  return (
    <div>
      <input
        data-testid="input-player-name"
        type="text"
        onChange={ (event) => setName(event.target.value) }
      />
      <input
        data-testid="input-gravatar-email"
        type="text"
        onChange={ (event) => setEmail(event.target.value) }
      />
      <button
        type="button"
        data-testid="btn-play"
        disabled={ disabled }
        onClick={ async () => {
          const hash = md5(email).toString();
          console.log(hash);
          await fetch('https://opentdb.com/api_token.php?command=request')
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem('token', data.token);
              updateToken2(hash, name, email, data);
            });
          console.log(localStorage.getItem('token'));
          fetch(
            `https://opentdb.com/api.php?amount=5&token=${localStorage.getItem(
              'token',
            )}`,
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.results.length !== 0) {
                props.setQuestions(data.results);
              } else {
                console.log('errou');
                props.pegarToken(hash, name, email);
                fetch(
                  `https://opentdb.com/api.php?amount=5&token=${localStorage.getItem(
                    'token',
                  )}`,
                )
                  .then((response) => response.json())
                  .then((data2) => props.setQuestions(data2.results));
              }
            });
          props.history.push('/game');
        } }
      >
        Jogar
      </button>
      <h2 data-testid="settings-title">Configurações</h2>
      <button type="button" data-testid="btn-settings">
        Settings
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  pegarToken: (hash, name, email) => dispatch(getToken(hash, name, email)),
  setQuestions: (questoes) => dispatch(updateQuestions(questoes)),
  updateToken2: (hash, name, email,
    data) => dispatch(updateToken(hash, name, email, data)),
});

Login.propTypes = {
  setQuestions: propTypes.func.isRequired,
  pegarToken: propTypes.func.isRequired,
  history: propTypes.func.isRequired,
  updateToken2: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

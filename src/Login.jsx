import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import md5 from "crypto-js/md5";
import propTypes from "prop-types";
import { getToken, updateQuestions } from "./actions";

function Login(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (email !== "" && name !== "") {
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
        onChange={(event) => setName(event.target.value)}
      />
      <input
        data-testid="input-gravatar-email"
        type="text"
        onChange={(event) => setEmail(event.target.value)}
      />
      <button
        type="button"
        data-testid="btn-play"
        disabled={disabled}
        onClick={() => {
          const hash = md5(email).toString();
          console.log(hash);
          localStorage.setItem("token", hash);
          props.pegarToken(hash, name, email);
          fetch(`https://opentdb.com/api.php?amount=5&token=${props.token}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.response_code !== 3) {
                props.setQuestions(data.results);
              } else {
                props.pegarToken(hash, name, email);
                fetch(
                  `https://opentdb.com/api.php?amount=5&token=${props.token}`
                )
                  .then((response) => response.json())
                  .then((data) => props.setQuestions(data.results));
              }
            });
          props.history.push("/game");
        }}
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
});

Login.propTypes = {
  setQuestions: propTypes.func.isRequired,
  pegarToken: propTypes.func.isRequired,
  history: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

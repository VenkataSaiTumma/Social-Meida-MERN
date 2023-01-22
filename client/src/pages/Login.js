import { useContext, useRef } from "react";
import styled from "styled-components";
import { loginCall } from "../apiCall";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    // console.log(email.current.value);
  };

  // console.log(user);

  return (
    <Wrapper>
      <div className="login">
        <form className="loginBox" onSubmit={handleClick}>
          <input
            type="email"
            required
            placeholder="Email"
            className="inputField"
            ref={email}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="inputField"
            minLength="6"
            ref={password}
          />
          <button className="loginButton" type="submit" disabled={isFetching}>
            {isFetching ? <CircularProgress color="white" /> : "Login"}
          </button>
          <span className="Forgot">Forgot Password?</span>
          <Link to="/register">
            <button className="register">Register</button>
          </Link>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .login {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to left, #0b0c10, #1f2833);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loginBox {
    width: 300px;
    height: 300px;
    padding: 20px;
    background-color: #d1e8e2;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .inputField {
    height: 50px;
    border-radius: 10px;
    outline: none;
    border: 0px solid gray;
    font-size: 18px;
    padding-left: 20px;
  }

  .loginButton {
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #4056a1;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }

  .loginButton:disabled {
    cursor: not-allowed;
  }

  .Forgot {
    text-align: center;
    color: #4056a1;
  }

  .register {
    width: 50%;
    align-self: center;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #14a76c;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }
`;

export default Login;

import axios from "axios";
import { useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password Not Matched");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Wrapper>
      <div className="login">
        <form className="loginBox" onSubmit={handleClick}>
          <input
            placeholder="UserName"
            type="text"
            required
            ref={username}
            className="inputField"
          />
          <input
            placeholder="Email"
            type="email"
            required
            ref={email}
            className="inputField"
          />
          <input
            placeholder="Password"
            type="password"
            required
            ref={password}
            className="inputField"
            minLength="6"
          />
          <input
            placeholder="Password Again"
            type="password"
            required
            ref={passwordAgain}
            className="inputField"
          />
          <button className="loginButton" type="submit">
            SignUp
          </button>
          <Link to="/login">
            <button className="register">Login </button>
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
    background: linear-gradient(to left, #2c3531, #116466);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loginBox {
    width: 300px;
    height: 400px;
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

export default Register;

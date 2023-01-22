import React, { useReducer } from "react";
import AuthReducer from "./AuthReducer";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FOLLOW,
  UNFOLLOW,
} from "./AuthActions";

const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loginStart = (userCredential) => {
    dispatch({ type: LOGIN_START, payload: userCredential });
  };

  const loginSuccess = (user) => {
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  };

  const loginFailure = () => {
    dispatch({ type: LOGIN_FAILURE });
  };

  const follow = (userId) => {
    dispatch({ type: FOLLOW, payload: userId });
  };

  const unFollow = (userId) => {
    dispatch({ type: UNFOLLOW, payload: userId });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

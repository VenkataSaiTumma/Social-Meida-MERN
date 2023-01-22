import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FOLLOW,
  UNFOLLOW,
} from "./AuthActions";

const AuthReducer = (state, action) => {
  if (action.type === LOGIN_START) {
    return {
      user: null,
      isFetching: true,
      error: false,
    };
  }

  if (action.type === LOGIN_SUCCESS) {
    return {
      user: action.payload,
      isFetching: false,
      error: false,
    };
  }

  if (action.type === LOGIN_FAILURE) {
    return {
      user: null,
      isFetching: false,
      error: action.payload,
    };
  }

  if (action.type === FOLLOW) {
    return {
      ...state,
      user: {
        ...state.user,
        followings: [...state.user.followings, action.payload],
      },
    };
  }

  if (action.type === UNFOLLOW) {
    return {
      ...state,
      user: {
        ...state.user,
        followings: state.user.followings.filter(
          (following) => following !== action.payload
        ),
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default AuthReducer;

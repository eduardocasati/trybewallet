import { USER_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL: {
    return {
      email: action.payload,
    };
  }

  default:
    return state;
  }
};

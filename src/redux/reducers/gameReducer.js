import {
  SET_DECK_SIZE,
} from '../actions/types';

const INITIAL_STATE = {
  deckSize: 10
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DECK_SIZE:
      return { ...state, deckSize: action.payload}
    default:
      return state;
  }
};

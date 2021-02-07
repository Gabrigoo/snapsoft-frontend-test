import {
  SET_DECK_SIZE, START_NEW_GAME
} from '../actions/types';

const INITIAL_STATE = {
  deckSize: 10,
  deck: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DECK_SIZE:
      return { ...state, deckSize: action.payload}
    case START_NEW_GAME:
      return { ...state, deck: action.payload}
    default:
      return state;
  }
};

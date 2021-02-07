import {
  SET_DECK_SIZE,
  START_NEW_GAME,
  FLIP_CARD_FIRST,
  FLIP_CARD_SECOND_CORRECT,
  FLIP_CARD_SECOND_FALSE_INIT,
  FLIP_CARD_SECOND_FALSE_DELAY,
} from '../actions/types';

const INITIAL_STATE = {
  deckSize: 10,
  deck: [],
  currentFlipped: [],
  blockNewAction: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DECK_SIZE:
      return { ...state, deckSize: action.payload}
    case START_NEW_GAME:
      return { ...state, deck: action.payload, currentFlipped: [], blockNewAction: false }
    case FLIP_CARD_FIRST:
      const newDeckFirstFlip = [...state.deck];

      newDeckFirstFlip[action.payload.index] = {
        ...state.deck[action.payload.index],
        flipped: true
      };

      return {
        ...state,
        currentFlipped: [action.payload.value, action.payload.index],
        deck: newDeckFirstFlip
      }
    case FLIP_CARD_SECOND_CORRECT:
      const newDeckSecondCorrect = [...state.deck];
      newDeckSecondCorrect[state.currentFlipped[1]] = {
        ...state.deck[state.currentFlipped[1]],
        hit: true
      };
      newDeckSecondCorrect[action.payload.index] = {
        ...state.deck[action.payload.index],
        flipped: true,
        hit: true
      };

      return {
        ...state,
        currentFlipped: [],
        deck: newDeckSecondCorrect
      }
    case FLIP_CARD_SECOND_FALSE_INIT:
      const newDeckSecondFalseInit = [...state.deck];
      newDeckSecondFalseInit[action.payload.index] = {
        ...state.deck[action.payload.index],
        flipped: true,
        
      };

      return {
        ...state,
        deck: newDeckSecondFalseInit,
        blockNewAction: true
      }
    case FLIP_CARD_SECOND_FALSE_DELAY:
      const newDeckSecondFalseDelay = [...state.deck];
      newDeckSecondFalseDelay[state.currentFlipped[1]] = {
        ...state.deck[state.currentFlipped[1]],
        flipped: false,
      };
      newDeckSecondFalseDelay[action.payload.index] = {
        ...state.deck[action.payload.index],
        flipped: false,
      };

      return {
        ...state,
        deck: newDeckSecondFalseDelay,
        currentFlipped: [],
        blockNewAction: false
      }
    default:
      return state;
  }
};

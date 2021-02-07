import {
  SET_DECK_SIZE,
  START_NEW_GAME,
  FLIP_CARD_FIRST,
  FLIP_CARD_SECOND_CORRECT,
  FLIP_CARD_SECOND_FALSE_INIT,
  FLIP_CARD_SECOND_FALSE_DELAY,
  SET_NEW_BEST_SCORE,
  RESET_BEST_SCORE,
} from '../actions/types';

const INITIAL_STATE = {
  deckSize: 10,
  deck: [],
  currentFlipped: [],
  blockNewAction: false,
  currentTries: 0,
  bestScore: 0,
  matchedPairs: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DECK_SIZE:
      return { ...state, deckSize: action.payload}
    case START_NEW_GAME:
      return {
        ...state,
        deck: action.payload,
        currentFlipped: [],
        blockNewAction: false,
        currentTries: 0,
        matchedPairs: 0,
      }
    case RESET_BEST_SCORE:
      return {
        ...state,
        bestScore: 0,
      }
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
        deck: newDeckSecondCorrect,
        currentTries: state.currentTries + 1,
        matchedPairs: state.matchedPairs + 1,
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
        blockNewAction: true,
        currentTries: state.currentTries + 1,
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
    case SET_NEW_BEST_SCORE:
      return {
        ...state,
        bestScore: state.currentTries
      }
    default:
      return state;
  }
};

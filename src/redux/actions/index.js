import {
  SET_DECK_SIZE
} from './types';

export const setDeckSize = (size) =>{
  return {
    type: SET_DECK_SIZE,
    payload: size
  }
};
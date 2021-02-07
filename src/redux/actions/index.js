import {
  SET_DECK_SIZE,
  START_NEW_GAME
} from './types';
import cardList from '../../assets/images/cards/cardList';

function shuffleDeck(sourceArray) {
  const newArray = [...sourceArray];
  if (newArray.length > 1) {
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
  }
  return newArray;
}

export const setDeckSize = (size) => {
  return {
    type: SET_DECK_SIZE,
    payload: size
  }
};

export const startNewGame = (size) => {
  let newDeck = [];
  
  for (let i = 0; i < size/2; i++) {
    const newCard = {
      value: cardList[i],
      flipped: false,
      hit: false
    }
    newDeck.push(newCard);
    newDeck.push(newCard);
  }

  newDeck = shuffleDeck(newDeck);

  return {
    type: START_NEW_GAME,
    payload: newDeck
  }
};
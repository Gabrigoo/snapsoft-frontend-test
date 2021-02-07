import React from 'react';
import { connect } from 'react-redux';

import { flipCardFirst,
  flipCardSecondCorrect,
  flipCardSecondFalseInit,
  flipCardSecondFalseDelay,
  startNewGame,
  setNewBestScore,
} from '../redux/actions';
import Card from '../components/Card';
import './GameContainer.css';

const GameContainer = (props) => {

  if (props.matchedPairs === parseInt(props.deckSize) / 2) {
    if ((props.currentTries < props.bestScore) || (props.bestScore === 0)) {
      props.setNewBestScore()
    }
  }

  const onCardClick = (value, index) => {
    if (props.currentFlipped.length === 0) {
      props.flipCardFirst(value, index);
    } else if (props.currentFlipped[1] === index || props.blockNewAction) {
      // Do nothing
    } else if (props.currentFlipped[0] === value) {
      props.flipCardSecondCorrect(value, index)
    } else {
      props.flipCardSecondFalseInit(value, index)
      setTimeout(() => {
        props.flipCardSecondFalseDelay(value, index)
      }, 500)
    }
  }

  let content;

  if (props.gameOn) {
      content = (
        <>
          <div id="inner-header">
            <div id="inner-header-left">
              <p id="tries-label">Current tries:</p>
              <p id="tries-number">{props.currentTries}</p>
            </div>
            <div id="inner-header-center">
              <p id="best-label">Best:</p>
              <p id="best-number">{props.bestScore}</p>
            </div>
            <button onClick={() => props.startNewGame(props.deck.length)} id="restart-button">RESTART</button>
          </div>
          <div id="card-container">
            {props.deck.map((card, index) => {
              return <Card
                key={card.value + index}
                value={card.value}
                index={index}
                flipped={card.flipped}
                hit={card.hit}
                onCardClick={onCardClick}
              />
            })}
          </div>
        </>
    )
  } else {
    content = (
      <div id="welcome-page">
        <h1>SNAPSOFT</h1>
        <h3>MEMORY GAME</h3>
        <p>Click on the cards to reveal them.</p>
        <p>Find two matching cards in succession to gain points.</p>
        <p>The game ends when you find all the matching pairs</p>
        <p>Good luck!</p>
      </div>
    )
  }

  return (
    <div id="game-container">
      {content}
    </div>
  )
}

const mapStateToProps = (state) => ({
  gameOn: state.gameOn,
  deck: state.deck,
  deckSize: state.deckSize,
  matchedPairs: state.matchedPairs,
  currentFlipped: state.currentFlipped,
  blockNewAction: state.blockNewAction,
  currentTries: state.currentTries,
  bestScore: state.bestScore,
});

export default connect(
  mapStateToProps,
  {
    flipCardFirst,
    flipCardSecondCorrect,
    flipCardSecondFalseInit,
    flipCardSecondFalseDelay,
    startNewGame,
    setNewBestScore,
  },
)(GameContainer);
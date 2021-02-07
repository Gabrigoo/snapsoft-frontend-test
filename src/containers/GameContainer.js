import React from 'react';
import { connect } from 'react-redux';

import { flipCardFirst,
  flipCardSecondCorrect,
  flipCardSecondFalseInit,
  flipCardSecondFalseDelay,
} from '../redux/actions';
import Card from '../components/Card';
import './GameContainer.css';

const GameContainer = (props) => {

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

  return (
    <div id="game-container">
      <div id="inner-header">
        <div id="inner-header-left">
          <p id="tries-label">Current tries:</p>
          <p id="tries-number">{props.currentTries}</p>
        </div>
        <div id="inner-header-center">
          <p id="best-label">Best:</p>
          <p id="best-number">{props.bestScore}</p>
        </div>
        <button id="restart-button">RESTART</button>
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
    </div>
    
  )
}

const mapStateToProps = (state) => ({
  deck: state.deck,
  currentFlipped: state.currentFlipped,
  blockNewAction: state.blockNewAction,
  currentTries: state.currentTries,
  bestScore: state.bestScore,
});

export default connect(
  mapStateToProps, { flipCardFirst, flipCardSecondCorrect, flipCardSecondFalseInit, flipCardSecondFalseDelay },
)(GameContainer);
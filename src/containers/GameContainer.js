import React from 'react';
import { connect } from 'react-redux';

import { flipCardFirst, flipCardSecondCorrect, flipCardSecondFalse } from '../redux/actions';
import Card from '../components/Card';
import './GameContainer.css';

const GameContainer = (props) => {

  const onCardClick = (value, index) => {
    if (props.currentFlipped.length === 0) {
      props.flipCardFirst(value, index);
    } else if (props.currentFlipped[1] === index) {
      // Do nothing
    } else if (props.currentFlipped[0] === value) {
      props.flipCardSecondCorrect(value, index)
    } else {
      props.flipCardSecondFalse(value, index)
    }
  }

  return (
    <div id="game-container">
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
  )
}

const mapStateToProps = (state) => ({
  deck: state.deck,
  currentFlipped: state.currentFlipped
});

export default connect(
  mapStateToProps, { flipCardFirst, flipCardSecondCorrect, flipCardSecondFalse },
)(GameContainer);
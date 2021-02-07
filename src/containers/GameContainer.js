import React from 'react';
import { connect } from 'react-redux';

import Card from '../components/Card';
import './GameContainer.css';

const GameContainer = (props) => {

  return (
    <div id="game-container">
      {props.deck.map((card, index) => {
        return <Card
          key={card.value + index}
          value={card.value}
          flipped={card.flipped}
          hit={card.hit}
        />
      })}
    </div>
  )
}

const mapStateToProps = (state) => ({
  deck: state.deck
});

export default connect(
  mapStateToProps, null,
)(GameContainer);
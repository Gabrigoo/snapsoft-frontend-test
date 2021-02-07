import React from 'react';
import * as logos from '../assets/images/cards';

import './Card.css';

const Card = ({ value, index, flipped, hit, onCardClick }) => {

  return (
    <button
      onClick={() => onCardClick(value, index)}
      className={'card'}
      disabled={hit}
    >
      {flipped ? <img className="card-image" src={logos[value]} /> : null}
    </button>
  )
}

export default Card;
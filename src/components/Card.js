import React from 'react';
import * as logos from '../assets/images/cards';

import './Card.css';

const Card = (props) => {

  return (
    <div className="card">
      {props.flipped ? <img className="card-image" src={logos[props.value]} /> : null}
    </div>
  )
}

export default Card;
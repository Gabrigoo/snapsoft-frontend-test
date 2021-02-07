import React from 'react';
import { connect } from 'react-redux';

import { setDeckSize, startNewGame } from '../redux/actions';
import './Header.css';
import snapsoftLogo from '../assets/images/snapsoft-logo.svg'

const Header = (props) => {

  const onDropdownChange = (e) => {
    props.setDeckSize(e.target.value)
  }

  const startButtonClick = () => {
    props.startNewGame(props.deckSize)
  }
  
  return (
    <div id="header">
      <img id="snapsoft-logo" src={snapsoftLogo} />
      <h4>MEMORY GAME</h4>
      <form action="/action_page.php">
        <label htmlFor="deck-size">Deck size:</label>
        <select value={props.deckSize} onChange={onDropdownChange} name="deck-size" id="deck-size">
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
        </select>
      </form>
      <button onClick={startButtonClick}>START NEW GAME</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  deckSize: state.deckSize
});

export default connect(
  mapStateToProps,{ setDeckSize, startNewGame },
)(Header);


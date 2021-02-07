import React from 'react';
import './Header.css';
import snapsoftLogo from '../assets/images/snapsoft-logo.svg'

const Header = (props) => {
  
  return (
    <div id="header">
      <img id="snapsoft-logo" src={snapsoftLogo} />
      <h4>MEMORY GAME</h4>
      <button>START NEW GAME</button>
    </div>
  );
};

export default Header;

import React from 'react';
import './App.css';
import logo from './img/logo.png';

function AppHeader() {
  return (
    <nav className="app-header">

      <p className="top-logo"><img src={logo} alt="LOGO" /></p>

      {/* <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Categories</a></li>
        <li><a href="#">About us</a></li>
      </ul> */}

    </nav>
  );
}

export default AppHeader;

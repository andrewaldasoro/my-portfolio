import React from 'react';
import logo from '../../assets/logo-react.svg';
import './ReactLogo.scss';

export default function ReactLogo() {
  return (
    <div className="logo-container">
      <div className="text-container">
        <p>Developed with </p>
        <div className="fading-effect"></div>
      </div>
      <div className="image-container">
        <img src={logo} className="logo" alt="react logo" />
      </div>
    </div>
  );
}

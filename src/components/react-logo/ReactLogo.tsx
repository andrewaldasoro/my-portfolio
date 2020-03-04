import React from 'react';
import logo from '../../assets/logo-react.svg';
import './ReactLogo.scss';

export default function ReactLogo() {
  return (
    <div>
      <div className="image-container">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className="text-container">
        <p>Developed with </p>
        <div className="fading-effect"></div>
      </div>
    </div>
  );
}

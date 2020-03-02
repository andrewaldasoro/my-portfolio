import React from 'react';
import logo from '../../assets/logo-react.svg';
import './ReactLogo.scss';

export default function ReactLogo() {
  return (
    <div>
      <p>Developed with </p>
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
}

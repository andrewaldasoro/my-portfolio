import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo-react.svg';
import './ReactLogo.scss';

export default function ReactLogo() {
  const { t } = useTranslation();

  return (
    <div className="dw-container">
      <div className="text-container">
        <p>{t('developed_with')} ReactJS </p>
        <div className="fading-effect"></div>
      </div>
      <div className="logo-container">
        <img src={logo} className="logo" alt="React Logo" data-testid="react-logo"/>
      </div>
    </div>
  );
}

import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Main.scss';
import ProfileImage from './ProfileImage';
import ReactLogo from './ReactLogo'
import Content from './Content'
import Map from './Map';

import githubLogo from '../assets/logo-github.svg';
import linkedinLogo from '../assets/logo-linkedin.svg';
import trelloLogo from '../assets/logo-trello.svg';

const pjson = require('../../package.json');

console.log(`Version: ${pjson.version}`);

export class Emoji {
  public render: () => JSX.Element;

  private label: string | undefined;
  private symbol: string;

  constructor(symbol: string, label?: string) {
    this.symbol = symbol;
    this.label = label;

    this.render = () =>
      <span
        className="emoji"
        role="img"
        title={this.label ? this.label : ""}
        aria-label={this.label ? this.label : ""}
        aria-hidden={this.label ? "false" : "true"}
      >
        {this.symbol}
      </span>

  }

}

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

function Body() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const mailto: string = "mailto:" + pjson.author.email + "?subject=" + t('mail.subject') + "&body=" + t('mail.body');

  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <ProfileImage />
          <h1><a href={mailto}>Kev Andrew ALDASORO CHAVARRIA</a></h1>
          <ul>
            <li>
              <Link to={{ pathname: "/", hash: "#summary" }}>{t('summary.title')}</Link>
            </li>
            <li>
              <Link to={{ pathname: "/", hash: "#skills" }}>{t('skills.title')}</Link>
            </li>
            <li>
              <Link to={{ pathname: "/", hash: "#education" }}>{t('education.title')}</Link>  { /* Could be studies */}
            </li>
            <li>
              <Link to={{ pathname: "/map" }}>{t('map')}</Link>  { /* Could be studies */}
            </li>
          </ul>
        </header>
        <div className="body">
          <Switch>
            <Route exact path="/">
              <Content title="summary" />
              <Content title="skills" />
              <Content title="employment" />
              <Content title="education" />
            </Route>
            <Route path="/map">
              <Map />
            </Route>
          </Switch>
        </div>
        <footer className="footer">
          <ReactLogo />
          <address>
            Email: <a href={mailto}>{pjson.author.email}</a><br />
            <a href="https://github.com/andrewaldasoro/cv" target="_blank" rel="noopener noreferrer">
              <img src={githubLogo} alt="GitHub" title="GitHub" />
            </a><br />
            <a href="https://linkedin.com/in/andrewaldasoro/" target="_blank" rel="noopener noreferrer">
              <img src={linkedinLogo} alt="LinkedIn" title="LinkedIn" />
            </a><br />
            <a href="https://trello.com/b/2lJcsfa0" target="_blank" rel="noopener noreferrer">
              <img src={trelloLogo} alt="Trello" title="Trello" />
            </a>
          </address>
          <button onClick={() => changeLanguage('es')}>{new Emoji("ES 🌮", t('spanish')).render()}</button>
          <button onClick={() => changeLanguage('en')}>{new Emoji("EN 🍁", t('english')).render()}</button>
          <div className="version">{pjson.version}</div>
        </footer>
      </div >
    </BrowserRouter>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>Loader</div> {/* TODO */}
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
const Main = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Body />
    </Suspense>
  );
}

export default Main;

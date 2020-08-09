import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Main.scss';
import ProfileImage from '../profile-image/ProfileImage';
import ReactLogo from '../react-logo/ReactLogo'

import githubLogo from '../../assets/logo-github.svg';
import linkedinLogo from '../../assets/logo-linkedin.svg';
import trelloLogo from '../../assets/logo-trello.svg';

const pjson = require('../../../package.json');

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
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <AboutMe />
          </Route>
          <Route path="/featured">
            <FeaturedProyects />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <header className="header">
        {/* <h1>
          {t('title')}
        </h1> */}
        <ProfileImage />
        <h1>Kev Andrew ALDASORO CHAVARRIA</h1>
        <ul>
          <li>
            <Link to="/featured">{t('featured_projects')}</Link>
          </li>
          <li>
            <Link to="/career">{t('career')}</Link>  { /* Could be studies */}
          </li>
          {/* <li>
          <Link to="/contact" className="link">{t('contact')}</Link>  // TODO This will be on footer
        </li> */}
          {/* <li>
          <Link to="/about" className="link">{t('about_me')}</Link> // TODO Home body
        </li> */}
        </ul>
      </header>
      <div className="body">
        <AboutMe />
        { /* About me */}
      </div>
      <footer className="footer">
        <ReactLogo />
        <address>
          Email: <a href={"mailto:" + pjson.author.email}>{pjson.author.email}</a><br />
          <a href="https://github.com/andrewaldasoro/cv" target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="GitHub" title="GitHub" />
          </a><br />
          <a href="https://linkedin.com/in/andrewaldasoro/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinLogo} alt="LinkedIn" title="LinkedIn" />
          </a><br/>
          <a href="https://trello.com/b/2lJcsfa0" target="_blank" rel="noopener noreferrer">
            <img src={trelloLogo} alt="Trello" title="Trello" />
          </a>
        </address>
        <button onClick={() => changeLanguage('es')}>{new Emoji("🌮🇲🇽", t('spanish')).render()}</button>
        <button onClick={() => changeLanguage('en')}>{new Emoji("🍁🇨🇦", t('english')).render()}</button>
        <div className="version">{pjson.version}</div>
      </footer>
    </div>
  );

}

function AboutMe() {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('aboutme')}</h2>
      <div>
      </div>
    </div>
  );
}

function FeaturedProyects() {
  const { t } = useTranslation();

  return (
    <h2>{t('featured_projects')}</h2>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>Searching a job in Canada...</div>
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

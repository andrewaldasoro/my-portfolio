import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Main.scss';
import ReactLogo from '../react-logo'
import { useTranslation } from 'react-i18next';
const pjson = require('../../../package.json');

console.log(`Version: ${pjson.version}`);

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
        {t('title')}
      </header>
      <ul>
        <li>
          <Link to="/about" className="link">{t('aboutme')}</Link>
        </li>
        <li>
          <Link to="/featured" className="link">Featured Projects</Link>
        </li>
      </ul>
      <div className="body">
        <AboutMe />
      </div>
      <footer className="footer">
        <div className="version">Version: {pjson.version}</div>
        <ReactLogo />
        <button onClick={() => changeLanguage('en')}>en</button>
        <button onClick={() => changeLanguage('es')}>es</button>
      </footer>
    </div>
  );
}

function AboutMe() {
  const { t } = useTranslation();

  return (
    <h2>{t('aboutme')}</h2>
  );
}

function FeaturedProyects() {
  return (
    <div>
      <h2>Featured Proyects</h2>
    </div>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>Searching a job in Canada...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function Main() {
  return (
    <Suspense fallback={<Loader />}>
      <Body />
    </Suspense>
  );
}
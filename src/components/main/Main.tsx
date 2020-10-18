import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter,
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
              <Link to={{hash: "#summary"}}>{t('summary')}</Link>
            </li>
            <li>
              <Link to={{hash: "#skills"}}>{t('skills')}</Link>
            </li>
            <li>
              <Link to={{hash: "#education"}}>{t('education')}</Link>  { /* Could be studies */}
            </li>
          </ul>
        </header>
        <div className="body">
          <Switch>
            <Route exact path="/">
              <Summary />
              <Skills />
              <Employment />
              <Education />
            </Route>
            <Route path="/skills">
              <Skills />
            </Route>
            <Route path="/employment">
              <Employment />
            </Route>
            <Route path="/education">
              <Education />
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


function Summary() {
  const { t } = useTranslation();

  return (
    <div id="summary">
      <h2>{t('summary')}</h2>
      <div>
        Incididunt consectetur in est eu et enim nulla ex dolore cupidatat labore. Ex ea voluptate eu occaecat nostrud cupidatat anim culpa eu mollit laboris consectetur ullamco. Et qui consectetur ullamco laboris. Enim deserunt officia ex est ullamco et magna. Enim quis adipisicing aute exercitation tempor eiusmod velit laborum sunt consequat non. Adipisicing id adipisicing minim irure qui.

        Voluptate qui pariatur mollit commodo culpa eiusmod dolore aliqua reprehenderit enim elit proident labore commodo. Nulla amet veniam tempor culpa officia aute ad aliquip irure dolor. Elit sunt ut velit aliquip quis nisi ea occaecat enim minim amet reprehenderit cupidatat reprehenderit.

        Deserunt et amet ipsum mollit tempor. Sunt proident anim excepteur ipsum in ea ipsum excepteur ex sunt occaecat cupidatat. Esse dolore quis id exercitation aute nostrud. Minim excepteur qui officia excepteur elit amet. Id consequat tempor labore commodo enim elit nostrud pariatur ullamco et voluptate velit voluptate.

        Qui sunt sit consectetur elit excepteur dolore tempor. Sunt esse quis duis enim eu occaecat voluptate labore. Ad laborum enim amet non minim in fugiat Lorem occaecat sit enim adipisicing duis adipisicing. Cupidatat ipsum deserunt sit et nostrud irure anim fugiat voluptate commodo irure aliquip amet commodo. Pariatur ex officia amet aliqua consectetur cillum anim dolor magna excepteur incididunt. Pariatur nisi incididunt sint mollit laborum labore deserunt.

        Culpa ad tempor laboris nulla cillum magna reprehenderit tempor esse qui nisi. Qui est aliquip consectetur labore proident et esse amet. Eu exercitation laborum proident incididunt proident est excepteur. Duis proident aliquip magna do cupidatat elit ea id ut culpa nulla commodo commodo deserunt. Reprehenderit Lorem sint magna reprehenderit quis ullamco eu dolor.

        Dolore est enim ex eu. Aliquip qui sint irure deserunt eu pariatur incididunt eiusmod ut proident amet anim esse. Proident ipsum mollit enim ad. Sit laborum qui consectetur cillum minim sint sit quis quis enim aliqua occaecat nulla cillum. Culpa occaecat quis excepteur pariatur.

        Officia amet sit sit dolore do excepteur sit excepteur quis officia ut. Nostrud ex quis id elit ex ad velit irure cupidatat est. Amet esse exercitation culpa eiusmod elit cillum duis id quis labore. Sunt excepteur deserunt labore voluptate aliquip dolor esse proident pariatur. Voluptate ea amet occaecat enim aute commodo anim laborum cillum laborum.

        Nulla Lorem ullamco eiusmod consequat quis incididunt culpa consequat. Officia deserunt id tempor fugiat. Ad laboris nulla cupidatat elit ea labore Lorem ipsum. Adipisicing fugiat incididunt adipisicing commodo labore. Esse Lorem enim cupidatat sit laborum dolore officia mollit Lorem. Cillum deserunt aute voluptate commodo proident Lorem eiusmod in.

        Voluptate velit esse culpa reprehenderit voluptate cupidatat nostrud eiusmod laborum do irure. Sint magna qui nulla officia exercitation ut magna cupidatat adipisicing. Consectetur dolor ex eu ad deserunt occaecat duis nostrud fugiat voluptate velit. Nisi aliqua commodo et adipisicing commodo cupidatat. Ut minim sit adipisicing sit incididunt in.

        Sit eiusmod non aliquip proident sit consequat tempor. Exercitation mollit quis fugiat ipsum ex et sunt eu et. Sit tempor proident ea laboris irure ex amet commodo. Minim esse proident elit eu duis qui est duis irure ea cupidatat reprehenderit nostrud.
      </div>
    </div>
  );
}

function Skills() {
  const { t } = useTranslation();

  return (
    <div id="skills">
      <h2>{t('skills')}</h2>
      <div>
        Commodo occaecat laborum non ad adipisicing nulla minim id voluptate in labore do. Velit ea nulla ex adipisicing culpa dolor anim magna. Velit ipsum irure minim voluptate nulla voluptate. In mollit esse deserunt nulla quis reprehenderit nulla laboris. Consequat elit exercitation laborum ipsum dolore minim culpa laborum. Elit do excepteur cillum aliqua magna aliqua non quis voluptate proident qui nostrud est non.

        Eiusmod ullamco aliquip exercitation aute. Minim culpa enim anim deserunt cillum occaecat. Fugiat adipisicing quis tempor dolore amet dolor ullamco Lorem id ex minim pariatur dolore. Et deserunt esse aliqua veniam quis veniam do cillum mollit qui ad commodo qui cupidatat. Ipsum est culpa velit voluptate consequat adipisicing adipisicing amet veniam aliqua quis cillum.

        Proident ut culpa mollit dolore do et irure cupidatat velit cupidatat. Fugiat nostrud sit enim eiusmod aliqua Lorem nulla incididunt laboris quis veniam. Exercitation ea veniam amet amet. Ut qui laboris commodo officia cillum excepteur ea anim sint nulla anim aute veniam.

        Fugiat in officia qui esse ullamco non incididunt consequat non ex esse laborum deserunt. Fugiat consectetur deserunt id magna. Voluptate velit tempor culpa culpa deserunt. Dolor eiusmod incididunt labore reprehenderit laboris reprehenderit ullamco exercitation cupidatat reprehenderit sit. Eu occaecat labore labore minim sint incididunt nulla reprehenderit anim sit voluptate consectetur aliqua sint. Labore amet quis amet nisi excepteur. Anim ullamco do officia ea nulla est sit.

        Enim ad fugiat nostrud irure enim dolore cillum in deserunt mollit qui irure minim. Ex amet ad cupidatat ex labore eu. Enim eiusmod amet Lorem exercitation ea dolor amet. Elit culpa deserunt dolore sint dolore nostrud ipsum officia anim.
      </div>
    </div>
  );
}

function Employment() {
  const { t } = useTranslation();

  return (
    <div id="employment">
      <h2>{t('employment')}</h2>
      <div>
        Veniam magna consectetur incididunt laborum ipsum voluptate cupidatat excepteur. Cillum do consectetur tempor laboris dolore Lorem reprehenderit magna eu laborum. Pariatur proident consequat aliqua proident voluptate ea.

        Irure incididunt sint ipsum officia sint officia fugiat culpa id laborum duis ullamco. Pariatur occaecat consectetur reprehenderit sit proident do ad nulla tempor. Tempor et minim tempor proident consectetur ad qui in eiusmod ex cillum elit elit irure. Irure tempor do ipsum deserunt eu non pariatur cillum duis aliqua sit sit. Lorem minim est reprehenderit officia mollit deserunt consequat dolore pariatur enim non do dolore.

        Reprehenderit reprehenderit aute nisi id ipsum sint. Ex non dolor Lorem deserunt velit eu duis aute laboris. Nostrud aliquip officia sit excepteur fugiat eiusmod quis.

        Nulla labore fugiat qui ipsum excepteur enim enim culpa sit dolor qui esse labore. Elit consequat sit duis mollit et ad ut fugiat. Incididunt irure cupidatat dolor ex consequat consectetur velit tempor nostrud mollit dolore ea ex. Eiusmod Lorem nostrud eiusmod eu pariatur proident irure aliqua dolore.

        Cillum cillum magna consequat Lorem velit sint id velit minim voluptate exercitation velit cillum aliqua. Consequat officia occaecat ex et id ut eu commodo ad irure est aliquip qui est. Nisi officia Lorem ad commodo labore adipisicing sit enim duis irure consequat esse. Occaecat Lorem proident aliquip nulla reprehenderit est reprehenderit nulla qui laboris. Ad et sunt dolore exercitation irure fugiat eiusmod labore aliquip ad velit dolor. Voluptate dolor enim do tempor nisi.

        Aute sunt eu sit aute irure. Minim culpa adipisicing proident enim fugiat ea mollit sit. Ut dolor duis mollit esse labore minim culpa culpa commodo. Irure in in id sunt labore proident nisi irure ut ullamco elit sint proident. Sint minim ex exercitation aliqua enim ut sit commodo.

        Consectetur excepteur non voluptate esse ea tempor consectetur eu. Eiusmod eiusmod ad sunt labore velit nostrud veniam consequat fugiat ex officia laborum cupidatat. Est anim et exercitation mollit labore aliqua velit ea nostrud. Est cupidatat ea adipisicing ex in sit sunt officia proident enim ullamco. Dolor esse eiusmod sunt labore officia labore consectetur ullamco enim incididunt pariatur. Dolor magna officia et minim et cupidatat nulla.
      </div>
    </div>
  );
}

function Education() {
  const { t } = useTranslation();

  return (
    <div id="education">
      <h2>{t('education')}</h2>
      <div>
        Adipisicing laboris cupidatat deserunt magna aliquip sunt officia id ea. In aliquip nisi eiusmod sit excepteur sint consequat voluptate. Consectetur Lorem tempor veniam irure reprehenderit cillum nostrud dolor sit nulla cillum esse mollit sint. Sunt cillum nulla do Lorem ut. Quis nisi dolor laborum dolore enim dolore deserunt laborum velit eiusmod.

        Amet ad ut incididunt cupidatat dolore sit Lorem. In Lorem proident officia aliquip irure et nulla reprehenderit. Aliquip laboris elit tempor non. Esse quis ad nisi culpa in anim cupidatat.

        Dolor qui velit nulla eu aliquip aliqua cupidatat officia adipisicing voluptate minim minim laboris. Elit Lorem do duis reprehenderit ea exercitation officia incididunt do consequat et voluptate est reprehenderit. Consectetur et voluptate qui ut reprehenderit laboris sint ad reprehenderit ullamco excepteur tempor esse. In amet sint duis proident fugiat sint occaecat esse veniam. Ea officia nostrud id minim sit nisi veniam dolor eu et aute esse. Lorem dolore sit cillum anim nostrud voluptate tempor nisi ea aute ut voluptate consequat. Eu labore eu pariatur adipisicing.

        Ex ea ullamco id Lorem Lorem Lorem proident esse labore occaecat. Ad cupidatat anim eiusmod commodo id nisi consectetur eiusmod in magna sint enim. Irure non aliquip exercitation quis aliqua. Voluptate in commodo mollit officia sint ut.

        Cillum aliquip quis nulla duis velit reprehenderit sint aute. Quis amet incididunt anim et officia nulla do veniam ea. Commodo labore esse non adipisicing reprehenderit labore. Magna eu fugiat sint labore proident aute labore proident mollit magna labore magna. Exercitation culpa cupidatat excepteur cupidatat.

        Duis veniam sint amet Lorem reprehenderit. Culpa anim ipsum sit duis deserunt voluptate amet et exercitation et tempor proident. In officia excepteur elit Lorem.

        Dolor proident enim labore dolore aliquip anim commodo. Nostrud labore quis dolore laboris nisi fugiat fugiat qui commodo laboris labore cupidatat. Duis in sint non consequat enim consectetur. Ut anim in laboris eu eu dolore nostrud irure eu. Dolore occaecat id tempor voluptate culpa aliqua consectetur.

        Culpa excepteur tempor dolore duis nulla sunt. Dolor dolor ex qui officia consequat ut nisi deserunt Lorem tempor. Culpa veniam laboris ullamco nostrud ut consectetur. Labore dolor consequat commodo velit magna Lorem nulla ut reprehenderit sint aliqua ut proident elit.

        Labore minim eiusmod ullamco aliqua ut quis. Fugiat enim amet Lorem esse. Nisi velit pariatur qui esse ut culpa tempor nisi et laboris qui. Eiusmod non exercitation laborum ipsum consectetur amet. Aliquip ex consectetur id aute reprehenderit cillum amet et. Et elit amet officia et Lorem sunt deserunt labore occaecat fugiat labore ea et voluptate.F
      </div>
    </div>
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

import { defaultPage, pagesExcluding, REDIRECTS } from 'data/urls';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {AppHeader} from './header';
import {AppFooter} from './footer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ExternalRedirect } from 'components/external-redirect';
library.add(fas, far, fab);

require('./hacks');

export function App() {
  return (
    <div className='h-full flex flex-col' id='app'>
      <Helmet>
        <title>Mudit Gupta</title>
      </Helmet>
      <AppHeader />
      <main className='flex-grow z-10'>
        <Switch>
          {pagesExcluding('component', undefined).map(page => {
            const pathNames = page.aliases.map(path => '/'+path);
            // console.log(pathNames);
            return <Route key={page.title} exact={page.isMainPage} path={pathNames}>
              <page.component />
            </Route>;
          })}
          {REDIRECTS.map(redirect => {
            const pathNames = redirect.aliases.map(path => '/'+path);
            // console.log(pathNames, redirect.target);
            return <Route key={redirect.title} path={pathNames}>
              <ExternalRedirect target={redirect.target} />
            </Route>;
          })}
          <Route path='/'>
            <Redirect to={`/${defaultPage.aliases[0]}`} />
          </Route>
        </Switch>
      </main>
      <AppFooter className="absolute bottom-0" />
    </div>
  );
}

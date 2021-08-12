// import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppHeader from './header';
import AppFooter from './footer';

import Landing from 'components/landing';


import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

require('./hacks');


export default function App() {
  return (
    <div className='h-full flex flex-col' id='app'>
      <Helmet>
        <title>Mudit Gupta</title>
      </Helmet>
      <AppHeader />
      <main className='flex-grow z-10'>
        <Switch>
          <Route exact path={['/', '/main', '/home']}>
            <Landing />
          </Route>
          <Route path='/'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </main>
      <AppFooter />
    </div>
  );
}

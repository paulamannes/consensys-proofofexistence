import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleProvider } from 'drizzle-react'

import store from './store'
import drizzleOptions from './drizzleOptions'

// Layouts
import LoadingContainer from './layouts/home/LoadingContainer'


import { BrowserRouter, Switch } from 'react-router-dom'
import * as Layout from './components/layouts'
import * as GeneralPages from './components/pages-general'
import LayoutRoute from './routes/LayoutRoute'


ReactDOM.render((

  <DrizzleProvider options={drizzleOptions} store={store}>
    <LoadingContainer>
      <BrowserRouter>
        <Switch>
            <LayoutRoute exact layout={Layout.Default} path="/" component={ GeneralPages.Home } />

            <LayoutRoute layout={Layout.Default} component={GeneralPages.NotFound} />
        </Switch>
      </BrowserRouter>
    </LoadingContainer>
  </DrizzleProvider>
  ),
  document.getElementById('root')
);

import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import * as Layout from '../components/layouts'
import * as GeneralPages from '../components/pages-general'
import LayoutRoute from './LayoutRoute'

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <LayoutRoute exact layout={Layout.Default} path="/" component={ GeneralPages.Home } />

                    <LayoutRoute layout={Layout.Default} component={GeneralPages.NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router

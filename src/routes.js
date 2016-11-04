import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import Home from './components/home'
import Layout from './components/Layout'
import NotFound from './components/notFound'
import Owner from './components/owner'
import Service from './components/service'
import ServiceItem from './components/serviceItem'
import Shop from './components/shop'
import ShopItem from './components/shopItem'
import User from './components/user'

export default (
    <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="/:owner" component={Owner}>
            <IndexRedirect to="/:owner/service" />
            <Route path="/:owner/service" component={Service}>
                <Route path="/:owner/service/:serviceItemId" component={ServiceItem} />
            </Route>
            <Route path="/:owner/shop" component={Shop}>
                <Route path="/:owner/shop/:shopItemId" component={ShopItem} />
            </Route>
            <Route path="/:owner/user" component={User} />
        </Route>
        <Route path="*" component={NotFound} />
    </Route>
)
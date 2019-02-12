import React from 'react'
import Loadable from 'react-loadable'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Loading from '~/Loading/Loading'

const Home = Loadable({
  loader: () => import('@/pages/Home/Home'),
  loading: Loading
})

const Page = Loadable({
  loader: () => import('@/pages/Page/Page'),
  loading: Loading
})

const Counter = Loadable({
  loader: () => import('@/pages/Counter/Counter'),
  loading: Loading
})

const UserInfo = Loadable({
  loader: () => import('@/pages/UserInfo/UserInfo'),
  loading: Loading
})

const NotFound = Loadable({
  loader: () => import('@/pages/NotFound/NotFound'),
  loading: Loading
})

const Hooks = Loadable({
  loader: () => import('@/pages/Hooks/Hooks'),
  loading: Loading
})

export default function GetRouter(props) {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/page" component={Page} />
      <Route path="/counter" component={Counter} />
      <Route path="/userInfo" component={UserInfo} />
      <Route path="/hooks" component={Hooks} />
      <Route component={NotFound} />
    </Switch>
  )
}

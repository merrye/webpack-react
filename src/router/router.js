import React from 'react'
import Loadable from 'react-loadable'
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'

// import Bundle from './Bundle.jsx'
import Loading from './Loading.jsx'
// import Home from 'bundle-loader?lazy&name=home!@/pages/Home/Home.jsx'
// import Page from 'bundle-loader?lazy&name=page!@/pages/Page/Page.jsx'
// import Counter from 'bundle-loader?lazy&name=counter!@/pages/Counter/Counter.jsx'
// import UserInfo from 'bundle-loader?lazy&name=userInfo!@/pages/UserInfo/UserInfo.jsx'

// const createComponent = component => props => (
//   <Bundle load={component}>{Component => (Component ? <Component {...props} /> : <Loading />)}</Bundle>
// )

const Home = Loadable({
  loader: () => import('@/pages/Home/Home.jsx'),
  loading: Loading
})

const Page = Loadable({
  loader: () => import('@/pages/Page/Page.jsx'),
  loading: Loading
})

const Counter = Loadable({
  loader: () => import('@/pages/Counter/Counter.jsx'),
  loading: Loading
})

const UserInfo = Loadable({
  loader: () => import('@/pages/UserInfo/UserInfo.jsx'),
  loading: Loading
})

export default function GetRouter(props) {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page">Page</Link>
          </li>
          <li>
            <Link to="/counter">Counter</Link>
          </li>
          <li>
            <Link to="/userInfo">UserInfo</Link>
          </li>
        </ul>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/page" component={Page} />
          <Route path="/counter" component={Counter} />
          <Route path="/userInfo" component={UserInfo} />
          {/* <Route exact={true} path="/" component={createComponent(Home)} />
          <Route path="/page" component={createComponent(Page)} />
          <Route path="/counter" component={createComponent(Counter)} />
          <Route path="/userInfo" component={createComponent(UserInfo)} /> */}
        </Switch>
      </div>
    </Router>
  )
}

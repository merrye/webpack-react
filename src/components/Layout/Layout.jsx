import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'

import Nav from '~/Nav/Nav'
import GetRouter from '@/router/router'

// Router 组件下只能有一个 children

function Layout() {
  return (
    <Router>
      <>
        <Nav />
        <GetRouter />
      </>
    </Router>
  )
}

// 引用 react-hot-loader 使得修改代码的时候 不刷新页面 只更新修改过的内容
export default hot(module)(Layout)

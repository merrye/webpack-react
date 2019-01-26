import React from 'react'
import { hot } from 'react-hot-loader'
import GetRouter from './router/router'

function App() {
  return <GetRouter />
}

// 引用 react-hot-loader 使得修改代码的时候 不刷新页面 只更新修改过的内容
export default hot(module)(App)

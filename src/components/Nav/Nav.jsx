import React from 'react'
import { NavLink } from 'react-router-dom'
// NavLink / Link 必须包含在 Router 组件下

export default function Nav() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/page">Page</NavLink>
      </li>
      <li>
        <NavLink to="/counter">Counter</NavLink>
      </li>
      <li>
        <NavLink to="/userInfo">UserInfo</NavLink>
      </li>
    </ul>
  )
}

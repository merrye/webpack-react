import React from 'react'
import { Link } from 'react-router-dom'
import { throws } from 'assert'

import logo from '@/assets/images/logo.jpg'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <div>
          <p>Logo:</p>
          <img src={logo} alt="logo" />
        </div>
        <p>This is Home Compontent...</p>
      </>
    )
  }
}

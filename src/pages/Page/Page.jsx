import React from 'react'
import { Link } from 'react-router-dom'

export default class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  handleClick() {
    let count = this.state.count

    this.setState({ count: ++count })
  }

  render() {
    return (
      <>
        <p>This is Page component......</p>
        <p>------ I'm divide line ------</p>
        <p>count: {this.state.count}</p>
        <button onClick={this.handleClick.bind(this)}>Click to increatement count</button>
      </>
    )
  }
}

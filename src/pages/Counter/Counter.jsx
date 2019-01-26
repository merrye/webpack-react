import React from 'react'
import { connect } from 'react-redux'
import { increment, decrement, reset } from '@/redux/actions/counter'

function Counter(props) {
  return (
    <>
      <p>current count is {props.counter.count}</p>
      <button onClick={props.increment}>INCREMENMT</button>
      <button onClick={props.decrement}>DECREMENT</button>
      <button onClick={props.reset}>RESET</button>
    </>
  )
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

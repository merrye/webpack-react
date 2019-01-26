import { INCREMENT, DECREMENT, RESET } from '../actions/counter'

// 初始化 state
const initState = { count: 0 }

// reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        count: ++state.count
      }

    case DECREMENT:
      return {
        count: --state.count
      }

    case RESET:
      return {
        count: 0
      }

    default:
      return state
  }
}

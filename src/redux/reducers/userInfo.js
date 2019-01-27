import { GET_USER_INFO_FAIL, GET_USER_INFO_SUCCESS, GET_USER_INFO_REQUEST } from '../actions/userInfo'

const initState = {
  isLoading: false,
  userInfo: { name: 'Lubia', intro: 'this is initial state' },
  errorMessage: ''
}

export default function reduces(state = initState, action) {
  switch (action.type) {
    // 发起请求
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
        userInfo: {},
        errorMessage: ''
      }

    // 请求成功
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.result.data,
        // userInfo: action.userInfo,
        errorMessage: ''
      }

    // 请求失败
    case GET_USER_INFO_FAIL:
      return {
        ...state,
        isLoading: false,
        userInfo: {},
        errorMessage: 'Error'
      }

    default:
      return state
  }
}

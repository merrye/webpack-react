export const GET_USER_INFO_REQUEST = 'USER_INFO_GET_USER_INFO_REQUEST'
export const GET_USER_INFO_SUCCESS = 'USER_INFO_GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_FAIL = 'USER_INFO_GET_USER_INFO_FAIL'

function getUserInfoRequest() {
  return {
    type: GET_USER_INFO_REQUEST
  }
}

function getUserInfoSuccess(userInfo) {
  return {
    type: GET_USER_INFO_SUCCESS,
    userInfo
  }
}

function getUserInfoFail() {
  return {
    type: GET_USER_INFO_FAIL
  }
}

export function getUserInfo() {
  return {
    types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
    // promise: client => client.get('http://localhost:3000')
    promise: client => client.get('/api/users')
  }
  // return function(dispatch) {
  //   dispatch(getUserInfoRequest())
  //   return fetch('http://localhost:3000')
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(json => {
  //       dispatch(getUserInfoSuccess(json))
  //     })
  //     .catch(() => {
  //       dispatch(getUserInfoFail())
  //     })
  // }
}

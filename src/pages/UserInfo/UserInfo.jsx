import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '@/redux/actions/userInfo'

function UserInfo(props) {
  const { isLoading, userInfo, errorMessage } = props.userInfo
  return (
    <>
      {isLoading ? (
        'loading...'
      ) : errorMessage ? (
        errorMessage
      ) : (
        <>
          <p>user info</p>
          <p>name: {userInfo.name}</p>
          <p>intro: {userInfo.intro}</p>
        </>
      )}
      <button onClick={() => props.getUserInfo()}>Click to get user info</button>
    </>
  )
}

// const mapStateToProps = ({ userInfo }) => ({ userInfo })

// // const mapDispatchToProps = dispatch => ({ getUserInfo: dispatch(getUserInfo()) })
// const mapDispatchToProps = () => ({ getUserInfo })

export default connect(
  ({ userInfo }) => ({ userInfo }),
  { getUserInfo }
)(UserInfo)

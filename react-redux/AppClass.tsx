import React, { Component } from "react"
import { connect } from "react-redux"
import { TLogInReq, logIn, logOut, ThunkDispatch } from "./actions/user"
import { TRootState } from "./reducers"
import { TUserState } from "./reducers/modules/user"

interface StateToProps {
  user: TUserState
}

interface DispatchToProps {
  dispatchLogIn: ({ id, password }: TLogInReq) => void
  dispatchLogOut: () => void
}

class AppClass extends Component<StateToProps & DispatchToProps> {
  onClick = () => {
    this.props.dispatchLogIn({
      id: "songcs",
      password: "1234",
    })
  }

  onLogout = () => {
    this.props.dispatchLogOut()
  }

  render() {
    const { user } = this.props
    return (
      <div>
        {user.isLoggingIn ? (
          <div>로그인 중</div>
        ) : user.data ? (
          <div>{user.data.nickname}</div>
        ) : (
          "로그인 해주세요."
        )}
        {!user.data ? (
          <button onClick={this.onClick}>로그인</button>
        ) : (
          <button onClick={this.onLogout}>로그아웃</button>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: TRootState) => ({
  user: state.user,
})

// redux-thunk 설치 시 ThunkDispatch 제공한다.
const mapDispatchToProps = (dispatch: ThunkDispatch) => {
  return {
    dispatchLogIn: (data: TLogInReq) => dispatch(logIn(data)),
    dispatchLogOut: () => dispatch(logOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppClass)

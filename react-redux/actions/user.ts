import { addPost } from "./posts"

export const LOG_IN_REQUEST = "LOGIN_REQUEST" as const
export const LOG_IN_SUCCESS = "LOGIN_SUCCESS" as const
export const LOG_IN_FAILURE = "LOGIN_FAILURE" as const
export const LOG_OUT = "LOG_OUT" as const

export interface TLogInReq {
  id: string
  password: string
}

export interface LogInRequestAction {
  type: typeof LOG_IN_REQUEST
  data: TLogInReq
}
export const loginRequest = (data: TLogInReq): LogInRequestAction => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
}

export interface LogInSuccessAction {
  type: typeof LOG_IN_SUCCESS
  data: {
    userId: number
    nickname: string
  }
}
export const loginSuccess = (data: { userId: number; nickname: string }): LogInSuccessAction => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  }
}

export interface LogInFailureAction {
  type: typeof LOG_IN_FAILURE
  error: Error
}
export const loginFailure = (error: Error): LogInFailureAction => {
  return {
    type: LOG_IN_FAILURE,
    error,
  }
}

export interface ThunkDispatch {
  (thunkAction: ThunkAction): void
  <A>(action: A): A
  <TAction>(action: TAction | ThunkAction): TAction
}
type ThunkAction = (dispatch: ThunkDispatch) => void
export const logIn = (data: TLogInReq): ThunkAction => {
  return dispatch => {
    dispatch(loginRequest(data))
    try {
      setTimeout(() => {
        dispatch(
          loginSuccess({
            userId: 1,
            nickname: "ted chang",
          }),
        )
        dispatch(addPost("add post"))
      }, 1000)
    } catch (error: any) {
      dispatch(loginFailure(error))
    }
  }
}

export interface LogOutAction {
  type: typeof LOG_OUT
}

export const logOut = () => {
  return {
    type: LOG_OUT,
  }
}

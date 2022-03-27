import produce from "immer"
import {
  LogInRequestAction,
  LogInSuccessAction,
  LogInFailureAction,
  LogOutAction,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
} from "../../actions/user"

export interface TUserState {
  isLoggingIn: boolean
  data: {
    nickname: string
  } | null
}

const initialState: TUserState = {
  isLoggingIn: false,
  data: null,
}

export type UserReducerAction =
  | LogInRequestAction
  | LogInSuccessAction
  | LogInFailureAction
  | LogOutAction

const userReducer = (prevState = initialState, action: UserReducerAction): TUserState => {
  return produce(prevState, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.data = null
        draft.isLoggingIn = true
        break
      case LOG_IN_SUCCESS:
        draft.data = action.data
        draft.isLoggingIn = false
        break
      case LOG_IN_FAILURE:
        draft.data = null
        draft.isLoggingIn = false
        break
      case LOG_OUT:
        draft.data = null
        break
      default:
        break
    }
  })
}

export default userReducer

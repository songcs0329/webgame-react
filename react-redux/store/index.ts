import { AnyAction, applyMiddleware, compose, createStore, Dispatch, MiddlewareAPI } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import reducers from "../reducers"
// import { PostsReducerAction } from "../reducers/modules/posts"
// import { UserReducerAction } from "../reducers/modules/user"

const initialState = {
  user: {
    isLoggingIn: false,
    data: null,
  },
  posts: [],
}

// 위처럼 타입 다 잡아줘도 됨(정확하게 타입 정의할 경우)
// const firstMiddleWare = (store: MiddlewareAPI) => (next: Dispatch<PostsReducerAction & UserReducerAction>) => (action: PostsReducerAction & UserReducerAction) => {
const firstMiddleWare =
  (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    console.log("logging", action)
    next(action)
  }

const thunkMiddleWare = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
  if (typeof action == "function") {
    return action(store.dispatch, store.getState)
  }
  return next(action)
}

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(firstMiddleWare, thunkMiddleWare))
    : composeWithDevTools(applyMiddleware(firstMiddleWare, thunkMiddleWare))

const store = createStore(reducers, initialState, enhancer)

export default store

import { combineReducers } from "redux"
import postsReducer from "./modules/posts"
import userReducer from "./modules/user"

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
})

export type TRootState = ReturnType<typeof rootReducer>

export default rootReducer

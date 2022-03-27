import produce from "immer"
import { AddPostAction, ADD_POST } from "../../actions/posts"

export type TPostsState = string[]

const initialState: TPostsState = []

export type PostsReducerAction = AddPostAction

const postsReducer = (prevState = initialState, action: PostsReducerAction): TPostsState => {
  return produce(prevState, draft => {
    switch (action.type) {
      case ADD_POST:
        draft.push(action.data)
        break
      default:
        break
    }
  })
}

export default postsReducer

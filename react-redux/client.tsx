import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./store"
import App from "./App"
// import AppClass from "./AppClass"

ReactDOM.render(
  <Provider store={store}>
    <App />
    {/* <AppClass /> */}
  </Provider>,
  document.querySelector("#root"),
)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers";
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // React.StrictMode : 의도적으로 두번 rendering함.
  // 이는 개발중에만 발생하므로 , 빌드 후에는 일어나지 않는다.
  // 따라서 안심해도 된다.
  // <React.StrictMode>
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && // extension "Redux Devtools"
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

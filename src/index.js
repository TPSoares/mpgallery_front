import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Reducers from "./reducers/index";
import thunk from "redux-thunk";

const store = createStore(Reducers, applyMiddleware(thunk));
store.subscribe(() => console.log("store", store.getState()));

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, document.getElementById("root")
);
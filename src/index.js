import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Reducers from "./reducers/index";
import thunk from "redux-thunk";
import axios from 'axios';
window.axios = axios;

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };

const store = createStore(Reducers, loadState() , applyMiddleware(thunk));
store.subscribe(() => {
    saveState(store.getState());
    console.log("store", store.getState())
});

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, document.getElementById("root")
);
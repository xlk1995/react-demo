import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store";
import { Provider, useSelector, useDispatch } from "react-redux";
import {
  getCountStateValue,
  increment,
  decrement,
  addNumber,
} from "./store/counterReducer";

function App() {
  const counter = useSelector(getCountStateValue);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(addNumber(2))}>+2</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

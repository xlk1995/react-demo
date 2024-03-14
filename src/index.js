import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, BrowseRouter, RouterContext } from "./Router";

function Home() {
  return <h1>home</h1>;
}
function About() {
  return <h1>About</h1>;
}
function Main() {
  return <h1>Main</h1>;
}

function App() {
  return (
    <BrowseRouter>
      <RouterContext.Consumer>
        {(router) => (
          <div>
            <button onClick={() => router.goPath("/")}>home</button>
            <button onClick={() => router.goPath("/about")}>About</button>
            <button onClick={() => router.goPath("/main")}>Main</button>

            <Route path="/" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/main" component={Main}></Route>
          </div>
        )}
      </RouterContext.Consumer>
    </BrowseRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

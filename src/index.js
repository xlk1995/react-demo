import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const ThemeContext = React.createContext("dark");

class Son extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <button className={this.context}>我是一个按钮</button>;
  }
}

function Dad() {
  return (
    <div>
      <Son />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <div>
        <ThemeContext.Provider value="light">
          <Dad />
        </ThemeContext.Provider>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

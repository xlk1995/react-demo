import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const ThemeContext = React.createContext("dark");

class Son extends React.Component {
  // static contextType = ThemeContext;
  render() {
    console.log("son render");
    return <button className={this.context}>我是一个按钮</button>;
  }
}
Son.contextType = ThemeContext;

class Dad extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    console.log("dad render");
    return (
      <div>
        <Son />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  render() {
    console.log("app render");
    return (
      <div>
        <button onClick={this.handleClick}>点我好吗</button>

        <div>{this.state.count}</div>
        <ThemeContext.Provider value={this.state.count}>
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

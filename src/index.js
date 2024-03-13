import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class Home extends React.Component {
  clickMe = () => {
    console.log("我是Home，谁点了我");
  };
  render() {
    return <h1 onClick={this.clickMe}>Home</h1>;
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.buttonRef = React.createRef();
    this.homeRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.inputRef.current.focus();
    this.homeRef.current.clickMe();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef} />
        <hr />
        <button onClick={this.handleClick}>点我</button>
        <hr />
        <Home ref={this.homeRef} />
      </div>
    );
  }
}
class App extends React.Component {
  render() {
    return (
      <div>
        <Form />
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

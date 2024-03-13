import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class Home extends React.Component {
  render() {
    return <input ref={this.props.inputRef} type="text" />;
  }
}

class Form extends React.Component {
  input_Ref = (el) => {
    this.inputRef1 = el;
  };
  handleClick = () => {
    this.inputRef1.focus();
  };

  render() {
    return (
      <div>
        <Home inputRef={this.input_Ref} />
        <button onClick={this.handleClick}>点我</button>
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

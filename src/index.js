import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Test = React.forwardRef((props, ref) => {
  return (
    <div>
      <button ref={ref}>点我啊</button>
      {props.children}
    </div>
  );
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    console.log(this.ref, "=========");
  }
  render() {
    return (
      <div>
        <Test ref={this.ref}>
          <h1>hhhhhh</h1>
        </Test>
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

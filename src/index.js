import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
    }, 1000);
  }
  handleClick(params, e) {
    console.log(params, e);
  }
  render() {
    const { count } = this.state;
    const { type } = this.props;

    return (
      <div>
        <div onClick={this.handleClick.bind(this, "fff")}>{count}</div>
        <div>{type}</div>
      </div>
    );
  }
}

ReactDOM.render(<Test type="xxxx" />, document.getElementById("root"));

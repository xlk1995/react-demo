import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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
      close: true,
    };
    // this.handleClick = this.handleClick.bind(this);
  }
  // public class fields
  handleClick() {
    console.log(this);
    this.setState({
      close: false,
    });
  }
  render() {
    const { close } = this.state;
    return <div onClick={this.handleClick}>门 {close ? "关" : "开"}了</div>;
  }
}

ReactDOM.render(<Test />, document.getElementById("root"));

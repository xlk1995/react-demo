import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const Count = (props) => {
  const { type, count } = props;
  console.log("我count也执行了哦=======");
  return (
    <h1>
      {type} --- {count}
    </h1>
  );
};

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
  handleClick(params, e, ee) {
    console.log(params, e, ee);
  }
  render() {
    console.log("我reader重新执行了", "=====");
    const { count } = this.state;
    const { type } = this.props;
    return (
      <div>
        <div onClick={this.handleClick.bind(this, "fff", "gggg")}>{count}</div>
        <div>{type}</div>
        <Count type="你知道我在干什么吗" count={count} />
      </div>
    );
  }
}

ReactDOM.render(<Test type="xxxx" />, document.getElementById("root"));

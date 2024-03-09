import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      fruits: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    console.log(e.target.type, e.target.name);
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    console.log("submit", e);
    console.log("你喜欢的口味是" + this.state.val);
    e.preventDefault();
  }
  render() {
    const { val, inputVal } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="amount" />
          <select value={null} name="fruits">
            <option value="apple">苹果</option>
            <option value="orange">橘子</option>
            <option value="peer">梨子</option>
          </select>

          <input type="submit" value="提交" />
        </form>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);

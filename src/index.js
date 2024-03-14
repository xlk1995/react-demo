import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import bus from "./Bus";
import hoistNonReactStatic from "hoist-non-react-statics";

class Comments extends React.Component {
  render() {
    return (
      <ul>
        {this.props.data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
}
class Blog extends React.Component {
  render() {
    return <div>{this.props.data}</div>;
  }
}

// 高阶组件
function withCommentsAndBlog(Comp, selectData) {
  class logic extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(""),
      };
    }
    handleChange = (msg) => {
      this.setState({
        data: selectData(msg),
      });
    };
    componentDidMount() {
      bus.on(this.props.type, this.handleChange);
    }
    componentWillUnmount() {
      bus.off(this.props.type, this.handleChange);
    }
    render() {
      return <Comp data={this.state.data} {...this.props} />;
    }
  }
  return logic;
}
const commentsList = [],
  blogList = [];
const CommentsSub = withCommentsAndBlog(Comments, (msg) => {
  if (!msg) {
    return [];
  }
  commentsList.push(msg);
  return commentsList;
});
const BlogSub = withCommentsAndBlog(Blog, (msg) => {
  blogList.push(msg);
  return blogList;
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsList: [],
      blogList: [],
    };
    this.hellRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.hellRef, "hello");
  }
  postComments = (msg = 0) => {
    msg++;

    bus.emit("comment", msg);
  };
  postBlog = (msg = 1) => {
    msg++;
    bus.emit("blog", msg);
  };
  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.postComments(1)}>发comments</button>
          <button onClick={() => this.postBlog(2)}>发blog</button>
        </div>
        <div>
          <CommentsSub type="comment" />
          <hr />
          <BlogSub type="blog" />
          <HelleSub ref={this.hellRef} />
        </div>
      </div>
    );
  }
}

class Hello extends React.Component {
  static getName = () => {};
  render() {
    return <h1>hello word</h1>;
  }
}

function withHello(Comp) {
  class App extends React.Component {
    render() {
      const { forwardRef, ...rest } = this.props;

      return <Comp ref={forwardRef} {...rest} />;
    }
  }
  hoistNonReactStatic(App, Comp);
  return React.forwardRef((props, ref) => <App {...props} forwardRef={ref} />);
}

const HelleSub = withHello(Hello);
console.log(Hello.getName);
console.log(HelleSub.getName);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

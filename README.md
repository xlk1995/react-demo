## 1. 使用类组件让数据动起来

```
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    setInterval(() => {
      // this.state.count++;
      // 不能直接修改state的值
      this.setState({
        count: this.state.count + 1,
      });
    }, 1000);
  }
  render() {
    const { count } = this.state;
    return <div>{count}</div>;
  }
}
```

## 2. 外部怎么传值进来

直接写上去

```
<Test type="xxxx" />
```

内部接收

```
 const { type } = this.props;
```

函数组件的第一个值就是 props

```
const Count = (props) => {
  const { type } = props;
  return <h1>{type}</h1>;
};
```

## 3. 点击事件

1. 无法传递事件对象

```
<div onClick={ this.handleClick}>{count}</div>
```

2. 可以传递事件对象

```
<div onClick={(e) => this.handleClick("yyy", e)}>{count}</div>
```

每次 render 都会返回一个新的函数

3. 性能更好

```
<div onClick={(e) => this.handleClick.bind("yyy")}>{count}</div>
```

### this 丢失问题

如果想直接在函数里面操作 this，会出现 this 丢失的问题，此时 this 是 undefined

```
class Test extends React.component {
    handleClick(){
        this.setState({
            count:1
        })
    }
}
```

解决方法有三

```
<div onClick={()=> this.handleClick()}>门 {close ? "关" : "开"}了</div>;
```

```
this.handleClick = this.handleClick.bind(this)

<div onClick={this.handleClick}>门 {close ? "关" : "开"}了</div>;
```

```
// public class fields
handleClick = () => {}
```

## 4. state 和 props

1. state 更新会执行 render 函数
2. props 改变需要借助父组件的 state 更新
3. 定制化使用 props, 静态使用 state

## 生命周期

只有类组件才有生命周期， 一次状态的改变，会有 render 和 commit 阶段

render 阶段在 render 函数执行， 并在此阶段进行 dom 的 diff，找出需要改变的 dom， 然后在 commit 阶段将对应的 dom 提交到视图中

待更

## jsx 的各种用法

待更

## 受控组件

所有的状态都被 state 控制。把 value 设置为 null

### input/textarea

```
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      inputVal: e.target.value,
    });
  }
  render() {
    const { inputVal } = this.state;
    return (
      <div>
        <input value={inputVal} onChange={this.handleChange} />
      </div>
    );
  }
}
```

### select

```

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      val: e.target.value,
    });
  }
  handleSubmit(e) {
    console.log("submit", e);
    console.log("你喜欢的口味是" + this.state.val);
    e.preventDefault();
  }
  render() {
    const { val } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select value={val} onChange={this.handleChange}>
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
```

### 绑定多个值，需要 name

```
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
          <input
            type="number"
            value={inputVal}
            onChange={this.handleChange}
            name="amount"
          />
          <select value={val} onChange={this.handleChange} name="fruits">
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
```

## context

相当于 vue 的 provide/inject

使用步骤

1. React.createContext
2. context.provider 包裹起来
3. static contextType = context
4. this.context 来取值

```
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
```

```
Son.contextType = ThemeContext; // 只要有contextType 就是消费者
```

响应变化的能力到底是由谁提供的， 是 setState 还是生产消费者模型

组件只要定义了 contextType 就是消费者，消费者可以订阅生产者

context 可以无视中间组件的组织渲染， 依然可以响应生产者数据的变化

一个案例来判断，我们在 app, dad, son 的 render 函数中分别输出执行了，在 dad 组件中使用 showComponentUpdate。发现并不能阻断 render， 说明是消费了导致的更新

context 会根据引用标识来决定何时进行渲染， 本质上是 value 的浅比较，每次父组件重新渲染， 可能会触发消费者的意外渲染，

比如

```vue
value={{message: 'something'}}
```

需要把他提升到父节点的 state 中

```vue
this.state = { value: {message: 'something'} }
```

### 函数式组件使用消费者

接受一个回调函数, 从里面拿到 Context 中的值

```
function Son() {
  return (
    <ThemeContext.Consumer>
      {(value) => <button>{value}</button>}
    </ThemeContext.Consumer>
  );
}

```

## 错误边界

捕获渲染期间，生命周期方法和整个组件构造函数中捕获错误

无法捕获以下错误

1. 事件处理
2. 异步代码
3. 服务端渲染
4. 它自身抛出的错误

捕捉不到的错误可以使用 try catch

捕获错误组件需要两个生命周期钩子

```

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(err) {
    console.log("-----------");
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log("==", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>something has error......</h1>;
    }
    return this.props.children;
  }
}

class App extends React.Component {
  render() {
    // eslint-disable-next-line
    throw "模拟";
    // eslint-disable-next-line
    return <div>111</div>;
  }
}
```

## refs

允许我们访问 Dom 节点或者在 render 方法中创建 react 元素

何时使用 refs

1. 管理焦点。文本选择或者媒体播放
2. 强制触发动画
3. 集成第三方 dom 库

和 document 原生方法拿到的东西是一样的。

需要在挂载后才能拿到 dom 节点。控制台的值不太准确，可能会拿到修改之后的值，使用 debugger 更准确

使用方法如下

```
class App extends React.Component {
  constructor() {
    super();
    this.divRef = React.createRef();
    console.log(this.divRef);
    const div = document.querySelector("div");
    console.log(div, "--", { div });
  }
  componentDidMount() {
    console.log(this.divRef);
  }
  render() {
    return <div ref={this.divRef}>你好啊</div>;
  }
}
```

### 案例一

点击按钮的时候使 input 框聚焦，点击的时候触发子节点的方法

```
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
```

### 父节点通过 props 怎么拿到子组件中的 ref

```
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
```

### forwardRef

其实就是一个组件，其他组件可以拿到这个组件的东西

```
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
```

### 在高阶组件中使用 ref

待更新

## 高阶组件

传入一个组件，返回一个新的组件。

### 案例

需求：写一个发布订阅模型。

用高阶组件实现， 评论组件，博客组件。

静态属性复制，ref 转发

体会 Portal 创建的组件，他的事件冒泡顺序还是会遵循 react 组件的父子间的关系

#### 两个组件

```
class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: "",
      list: [],
    };
  }
  handleChange = (msg) => {
    this.setState({
      dataSource: msg,
      list: [...this.state.list, msg],
    });
  };
  componentDidMount() {
    bus.on("comment", this.handleChange);
  }
  componentWillUnmount() {
    bus.off("comment", this.handleChange);
  }
  render() {
    return (
      <ul>
        {this.state.list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
}
class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: "",
      list: [],
    };
  }
  handleChange = (msg) => {
    this.setState({
      dataSource: msg,
      list: [...this.state.list, msg],
    });
  };
  componentDidMount() {
    bus.on("blog", this.handleChange);
  }
  componentWillUnmount() {
    bus.off("blog", this.handleChange);
  }
  render() {
    return <div>{this.state.list}</div>;
  }
}
```

### 简易版高阶组件

```
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
        </div>
      </div>
    );
  }
}
```

### 注意的点

hoc 必须是纯函数

1. 不要在 hoc 中修改组件的原型
2. 不要在 render 中使用 hoc

### 复制静态属性

```
pnpm i hoist-non-react-statics
```

```
hoistNonReactStatic(App, Comp);
```

### 转发 ref

```
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
```

## hooks

### hooks 解决了什么问题

#### 在组件中复用逻辑很难

provider, consumers, 高阶组件， render props 等其他抽象层的组件会形成嵌套地狱

react 需要为共享逻辑状态提供更好的原生途径

可以从 hooks 组件中提取状态逻辑，使得这些逻辑可以单独复用测试。可以无需修改组件结构的情况下复用状态逻辑。

这使得在组件和社区共享 Hook 变得便捷

#### 复杂组件更难理解

在 class 组件中，业务逻辑太多，可能会导致代码很混乱。

为了解决这个问题， hook 将组件中相互关联部分拆分成更小函数

### 难以理解的 class

语法麻烦

## 常用的 hook

### useState

```
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>this count is {count}</div>
      <button onClick={() => setCount(count + 1)}>点我</button>
    </div>
  );
}
```

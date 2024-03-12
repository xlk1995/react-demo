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

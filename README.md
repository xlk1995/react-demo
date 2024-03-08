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
<div onClick={(e) => this.handleClick("yyy", e)}>{count}</div>
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

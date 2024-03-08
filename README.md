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

## 3. 点击事件怎么获取参数

1. 无法传递事件对象

```
<div onClick={ this.handleClick}>{count}</div>
```

2. 可以传递事件对象

```
<div onClick={(e) => this.handleClick("yyy", e)}>{count}</div>
```

3. 性能更好

```
<div onClick={(e) => this.handleClick("yyy", e)}>{count}</div>
```

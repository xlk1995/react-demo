import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const list = [
  {
    categoryName: "phone",
    name: "iphone11",
    stock: 10,
    price: 5000,
  },
  {
    categoryName: "phone",
    name: "iphone12",
    stock: 10,
    price: 6000,
  },
  {
    categoryName: "phone",
    name: "iphone13",
    stock: 0,
    price: 9000,
  },
  {
    categoryName: "computer",
    name: "m1",
    stock: 10,
    price: 7000,
  },
  {
    categoryName: "computer",
    name: "m2",
    stock: 0,
    price: 9000,
  },
  {
    categoryName: "computer",
    name: "m3",
    stock: 10,
    price: 10000,
  },
];

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const target = e.target;
    const { type, value, name } = target;
    const v = type === "text" ? value : target.checked;
    this.props.handleChangeSearch(name, v);
  }
  render() {
    const { keywords, hasStock } = this.props;
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          value={keywords}
          name="keywords"
        />
        <hr />
        <input
          type="checkbox"
          onChange={this.handleChange}
          checked={hasStock}
          name="hasStock"
        />
        只展示有库存的商品
        <hr />
      </div>
    );
  }
}
function CategoryTitle(props) {
  return (
    <tr>
      <th>{props.title}</th>
    </tr>
  );
}

function ProductItem(props) {
  const { product } = props;
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td style={{ color: product.stock === 0 ? "red" : "black" }}>
        {product.stock}
      </td>
    </tr>
  );
}

class TableWrapper extends React.Component {
  render() {
    const { list } = this.props;
    const row = [];
    let lastCategory = null;
    const { keywords, hasStock } = this.props;
    list.forEach((product) => {
      if (product.name.indexOf(keywords) === -1) {
        return;
      }
      if (hasStock && product.stock === 0) {
        return;
      }
      if (lastCategory !== product.categoryName) {
        row.push(
          <CategoryTitle
            key={product.categoryName}
            title={product.categoryName}
          />
        );
      }
      row.push(<ProductItem key={product.name} product={product} />);
      lastCategory = product.categoryName;
    });

    return (
      <table cellSpacing={0}>
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </table>
    );
  }
}

class SearchWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.state = {
      keywords: "",
      hasStock: false,
    };
  }
  handleChangeSearch(name, value) {
    console.log(name, value, "0000000");
    this.setState({
      [name]: value,
    });
  }
  render() {
    const { keywords, hasStock } = this.state;
    return (
      <div>
        <Search
          handleChangeSearch={this.handleChangeSearch}
          keywords={keywords}
          hasStock={hasStock}
        />
        <TableWrapper
          list={this.props.list}
          keywords={keywords}
          hasStock={hasStock}
        />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchWrapper list={list} />
  </React.StrictMode>
);

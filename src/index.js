import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

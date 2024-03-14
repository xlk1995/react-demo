import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>this count is {count}</div>
      <button onClick={() => setCount(count + 1)}>点我</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

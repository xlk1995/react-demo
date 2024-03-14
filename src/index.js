import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class Chat {
  constructor() {
    this.list = {};
  }
  subscribeMessage(id, callback) {
    const callbackList = this.list[id] || [];
    callbackList.push(callback);
    this.list[id] = callbackList;
  }

  unSubscribeMessage(id, callback) {
    const index = this.list[id].indexOf(callback);
    this.list[id].splice(index, 1);
  }

  publish(status) {
    Object.keys(this.list).forEach((id) => {
      this.list[id].forEach((callback) => {
        callback(status);
      });
    });
  }
}

const ChatApi = new Chat();

setTimeout(() => {
  ChatApi.publish("offline");
}, 2000);

function FriendStatus(props) {
  const [status, setStatus] = useState(null);

  function handleStatus(status) {
    console.log("handleStatus");
    setStatus(status);
  }
  useEffect(() => {
    console.log("subscribeMessage");
    ChatApi.subscribeMessage(props.id, handleStatus);
    return () => {
      console.log("unSubscribeMessage");
      ChatApi.unSubscribeMessage(props.id, handleStatus);
    };
  });

  if (status == null) {
    return <h1>loading....</h1>;
  }

  return <h1>{status}</h1>;
}

function App() {
  return (
    <div>
      <FriendStatus id="1" />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

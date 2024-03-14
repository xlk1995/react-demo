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
}, 1000);

function FriendStatus(props) {
  const status = useStatus(props.id);
  if (status == null) {
    return <h1>loading....</h1>;
  }
  return <h1>{status}</h1>;
}

function App() {
  const [id, setId] = useState(1);
  return (
    <div>
      <FriendStatus id={id} />
      <button onClick={() => setId(id + 1)}>按钮</button>
      {/* <FriendColor id="1" /> */}
    </div>
  );
}

function useStatus(id) {
  const [status, setStatus] = useState(null);

  function handleStatus(status) {
    console.log("handleStatus");
    setStatus(status);
  }
  useEffect(() => {
    console.log("subscribeMessage", id);
    ChatApi.subscribeMessage(id, handleStatus);
    return () => {
      console.log("unSubscribeMessage", id);
      ChatApi.unSubscribeMessage(id, handleStatus);
    };
  }, [id, status]);

  return status;
}

function FriendColor(props) {
  const status = useStatus(props.id);
  if (status == null) {
    return <h1>loading....</h1>;
  }

  return (
    <h1 style={{ color: status === "offline" ? "red" : "green" }}>{status}</h1>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

/**
 * Router的职责
 *  地址匹配组件
 *  可能跨层级
 */
import React, { useEffect, useState } from "react";

const RouterContext = React.createContext();

function Route(props) {
  const { path, component: Component } = props;
  return (
    <RouterContext.Consumer>
      {(router) => {
        return path === router.path ? <Component /> : null;
      }}
    </RouterContext.Consumer>
  );
}

function BrowseRouter(props) {
  const [path, setPath] = useState(() => {
    const { pathname } = window.location;
    return pathname || "/";
  });

  function handlePopState(event) {
    const { pathname } = window.location;
    setPath(pathname);
  }
  useEffect(function () {
    console.log("effect");
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  const goPath = function (path) {
    setPath(path);
    window.history.pushState({ path }, "", path);
  };

  const router = {
    path,
    goPath,
  };

  return (
    <RouterContext.Provider value={router}>
      {props.children}
    </RouterContext.Provider>
  );
}

export { Route, BrowseRouter, RouterContext };
